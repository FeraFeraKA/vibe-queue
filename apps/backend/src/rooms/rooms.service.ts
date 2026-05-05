import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { normalizeData } from '../helpers/normalizeData';
import { IActionsRoom, IRoom, TCode } from './rooms.types';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<TCode, IRoom>([
    [
      'DEMO',
      {
        code: 'DEMO',
        users: [],
        nowPlaying: null,
        queue: [],
      },
    ],
  ]);

  findRoom(code: TCode) {
    const room = this.rooms.get(code);

    if (!room) throw new NotFoundException(`Room with code ${code} not found`);

    return room;
  }

  createRoom(data: IActionsRoom) {
    const { code, nickname } = normalizeData(data);

    if (this.rooms.has(code))
      throw new BadRequestException(`Room with code ${code} already exists`);

    const room = {
      code,
      users: [nickname],
      nowPlaying: null,
      queue: [],
    };

    this.rooms.set(code, room);

    return room;
  }

  joinRoom(data: IActionsRoom) {
    const { code, nickname } = normalizeData(data);

    const room = this.findRoom(code);

    if (room.users.includes(nickname))
      throw new BadRequestException(`Nickname ${nickname} already taken`);

    const newRoom = {
      ...room,
      users: [...room.users, nickname],
    };

    this.rooms.set(code, newRoom);

    return newRoom;
  }
}
