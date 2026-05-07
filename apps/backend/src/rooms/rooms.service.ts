import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IAddTrackPayload,
  ICreateRoomPayload,
  IDeleteTrackPayload,
  IJoinRoomPayload,
  IRoom,
  ISetPlayingPayload,
  IVoteTrackPayload,
  TCode,
} from '@vibe-queue/shared';
import {
  normalizeAddTrackData,
  normalizeCode,
  normalizeRoomActionsData,
  normalizeVoteTrackData,
} from '../helpers/normalizeData';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<TCode, IRoom>([
    [
      'demo',
      {
        code: 'demo',
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

  createRoom(data: ICreateRoomPayload) {
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

    return { room, user };
  }

  joinRoom(data: IJoinRoomPayload) {
    const { code, user } = normalizeRoomActionsData(data);

    const room = this.findRoom(code);

    if (room.users.some((us) => us.nickname === user.nickname))
      throw new BadRequestException(`Nickname ${user.nickname} already taken`);

    const newRoom = {
      ...room,
      users: [...room.users, user],
    };

    this.rooms.set(code, newRoom);

    return { room: newRoom, user };
  }

  addTrack(data: IAddTrackPayload) {
    const { code, track } = normalizeAddTrackData(data);

    const room = this.findRoom(code);

    const newRoom = {
      ...room,
      queue: [...room.queue, track],
    };

    this.rooms.set(code, newRoom);

    return newRoom;
  }

  deleteTrack(data: IDeleteTrackPayload) {
    const normalizedCode = normalizeCode(data.code);

    const room = this.findRoom(normalizedCode);

    const newRoom = {
      ...room,
      queue: room.queue.filter((track) => track.queueId !== data.queueId),
    };

    this.rooms.set(normalizedCode, newRoom);

    return newRoom;
  }

  voteTrack(data: IVoteTrackPayload) {
    const { code, queueId, nickname } = normalizeVoteTrackData(data);

    const room = this.findRoom(code);

    const track = room.queue.find((track) => track.queueId === queueId);

    if (!track) throw new NotFoundException('Cannot find track');

    const user = room.users.find((user) => user.nickname === nickname);

    if (!user) throw new NotFoundException('Cannot find user');

    const userLike = track.likedBy.find((us) => us.id === user.id);

    const newTrack = {
      ...track,
      votes: userLike ? track.votes - 1 : track.votes + 1,
      likedBy: userLike
        ? track.likedBy.filter((us) => us.id !== user.id)
        : [...track.likedBy, user],
    };

    const newRoom = {
      ...room,
      queue: room.queue.map((track) =>
        track.queueId === queueId ? newTrack : track,
      ),
    };

    this.rooms.set(code, newRoom);

    return newRoom;
  }

  setPlaying(data: ISetPlayingPayload) {
    const normalizedCode = normalizeCode(data.code);

    const room = this.findRoom(normalizedCode);

    const track = room.queue.find((track) => track.queueId === data.queueId);

    if (!track) throw new NotFoundException('Track not found');

    const newRoom = {
      ...room,
      queue: room.queue.filter((track) => track.queueId !== data.queueId),
      nowPlaying: track,
    };

    this.rooms.set(normalizedCode, newRoom);

    return newRoom;
  }
}
