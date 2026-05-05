import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  normalizeAddTrackData,
  normalizeCode,
  normalizeRoomActionsData,
} from '../helpers/normalizeData';
import { IActionsRoom, IAddTrack, IRoom, TCode } from './rooms.types';

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
    const normalizedCode = normalizeCode(code);

    const room = this.rooms.get(normalizedCode);

    if (!room) throw new NotFoundException(`Room with code ${code} not found`);

    return room;
  }

  createRoom(data: IActionsRoom) {
    const { code, user } = normalizeRoomActionsData(data);

    if (this.rooms.has(code))
      throw new BadRequestException(`Room with code ${code} already exists`);

    const room = {
      code,
      users: [user],
      nowPlaying: null,
      queue: [],
    };

    this.rooms.set(code, room);

    return room;
  }

  joinRoom(data: IActionsRoom) {
    const { code, user } = normalizeRoomActionsData(data);

    const room = this.findRoom(code);

    if (room.users.some((us) => us.nickname === user.nickname))
      throw new BadRequestException(`Nickname ${user.nickname} already taken`);

    const newRoom = {
      ...room,
      users: [...room.users, user],
    };

    this.rooms.set(code, newRoom);

    return newRoom;
  }

  addTrack(data: IAddTrack) {
    const { code, track } = normalizeAddTrackData(data);

    const room = this.findRoom(code);

    const newRoom = {
      ...room,
      queue: [...room.queue, track],
    };

    this.rooms.set(code, newRoom);

    return newRoom;
  }
}
