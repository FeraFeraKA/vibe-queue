import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type {
  IAddTrackPayload,
  IDeleteTrackPayload,
  IRoom,
  ISetPlayingPayload,
  IUser,
  IVoteTrackPayload,
  IWatchRoomPayload,
  TCode,
} from '@vibe-queue/shared';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

interface IClientToServerEvents {
  'room:watch': (data: IWatchRoomPayload) => void;
  'track:vote': (data: IVoteTrackPayload) => void;
}

interface IServerToClientEvents {
  'room:updated': (room: IRoom) => void;
}

type TInterServerEvents = Record<never, never>;

interface IRoomSocketData {
  roomCode?: TCode;
  user?: IUser;
}

type RoomServer = Server<
  IClientToServerEvents,
  IServerToClientEvents,
  TInterServerEvents,
  IRoomSocketData
>;

type RoomSocket = Socket<
  IClientToServerEvents,
  IServerToClientEvents,
  TInterServerEvents,
  IRoomSocketData
>;

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
  },
})
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: RoomServer;
  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('room:watch')
  async handleWatchRoom(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody()
    data: IWatchRoomPayload,
  ) {
    const room = this.roomsService.ensureUser(data);

    await client.join(room.code);

    client.data.roomCode = room.code;
    client.data.user = data.user;

    this.server.to(room.code).emit('room:updated', room);

    return room;
  }

  @SubscribeMessage('track:vote')
  handleVoteTrack(
    @MessageBody()
    data: IVoteTrackPayload,
  ) {
    const room = this.roomsService.voteTrack(data);

    this.server.to(room.code).emit('room:updated', room);
  }

  @SubscribeMessage('track:add')
  handleAddTrack(
    @MessageBody()
    data: IAddTrackPayload,
  ) {
    const room = this.roomsService.addTrack(data);

    this.server.to(room.code).emit('room:updated', room);
  }

  @SubscribeMessage('track:delete')
  handleDeleteTrack(
    @MessageBody()
    data: IDeleteTrackPayload,
  ) {
    const room = this.roomsService.deleteTrack(data);

    this.server.to(room.code).emit('room:updated', room);
  }

  @SubscribeMessage('track:set-playing')
  handleSetPlaying(
    @MessageBody()
    data: ISetPlayingPayload,
  ) {
    const room = this.roomsService.setPlaying(data);

    this.server.to(room.code).emit('room:updated', room);
  }

  handleDisconnect(client: RoomSocket) {
    const code = client.data.roomCode;
    const user = client.data.user;

    if (!code || !user) return;

    const room = this.roomsService.leaveRoom({ code, userId: user.id });

    client.disconnect();

    this.server.to(room.code).emit('room:updated', room);
  }
}
