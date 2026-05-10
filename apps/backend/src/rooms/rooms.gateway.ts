import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { IVoteTrackPayload, TCode } from '@vibe-queue/shared';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
  },
})
export class RoomsGateway {
  @WebSocketServer()
  server!: Server;
  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      code: TCode;
    },
  ) {
    const room = this.roomsService.findRoom(data.code);

    client.join(room.code);

    client.emit('room:updated', room);

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
}
