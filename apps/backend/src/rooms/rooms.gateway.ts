import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type {
  IAddTrackPayload,
  IRoom,
  IVoteTrackPayload,
  IWatchRoomPayload,
  TCode,
  TId,
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
  userId?: TId;
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
export class RoomsGateway {
  @WebSocketServer()
  server!: RoomServer;
  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('room:watch')
  async handleWatchRoom(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody()
    data: IWatchRoomPayload,
  ) {
    const room = this.roomsService.findRoom(data.code);

    await client.join(room.code);

    client.data.roomCode = room.code;
    client.data.userId = data.userId;

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
}
