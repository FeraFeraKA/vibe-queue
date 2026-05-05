import { BadRequestException } from '@nestjs/common';
import {
  IActionsRoom,
  IAddTrack,
  ISearchTrack,
  TCode,
  TNickname,
} from '../rooms/rooms.types';

export const normalizeCode = (code: TCode) => {
  const normalizedCode = code.trim().toLowerCase();

  if (normalizedCode.length === 0)
    throw new BadRequestException('Room code is required');

  if (!/^[a-z0-9-]{3,20}$/.test(normalizedCode))
    throw new BadRequestException(
      'Room code must be 3-20 characters and contain only letters, numbers, or hyphens',
    );

  return normalizedCode;
};

const normalizeNickname = (nickname: TNickname) => {
  const normalizedNickname = nickname.trim();

  if (normalizedNickname.length === 0)
    throw new BadRequestException('Nickname is required');

  if (normalizedNickname.length > 24)
    throw new BadRequestException('Nickname must be shorter than 24 symbols');

  return normalizedNickname;
};

const normalizeTrack = (track: ISearchTrack) => {
  const normalizedTrack = {
    ...track,
    queueId: crypto.randomUUID(),
    votes: 0,
    likedBy: [],
  };

  return normalizedTrack;
};

export const normalizeRoomActionsData = ({ code, nickname }: IActionsRoom) => {
  const normalizedCode = normalizeCode(code);
  const normalizedNickname = normalizeNickname(nickname);

  const user = {
    id: crypto.randomUUID(),
    nickname: normalizedNickname,
  };

  return {
    code: normalizedCode,
    user,
  };
};

export const normalizeAddTrackData = ({ code, track }: IAddTrack) => {
  const normalizedCode = normalizeCode(code);
  const normalizedTrack = normalizeTrack(track);

  return { code: normalizedCode, track: normalizedTrack };
};
