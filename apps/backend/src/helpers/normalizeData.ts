import { BadRequestException } from '@nestjs/common';
import type {
  IAddTrackPayload,
  ICreateRoomPayload,
  IJoinRoomPayload,
  ISearchTrack,
  ITrack,
  IVoteTrackPayload,
  TCode,
  TNickname,
} from '@vibe-queue/shared';

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

const normalizeUser = (nickname: TNickname) => {
  const normalizedNickname = normalizeNickname(nickname);

  const user = {
    id: crypto.randomUUID(),
    nickname: normalizedNickname,
  };

  return user;
};

const normalizeTrack = (track: ISearchTrack): ITrack => {
  const normalizedTrack = {
    ...track,
    queueId: crypto.randomUUID(),
    votes: 0,
    likedBy: [],
  };

  return normalizedTrack;
};

export const normalizeRoomActionsData = ({
  code,
  nickname,
}: ICreateRoomPayload | IJoinRoomPayload) => {
  const normalizedCode = normalizeCode(code);
  const normalizedUser = normalizeUser(nickname);

  return {
    code: normalizedCode,
    user: normalizedUser,
  };
};

export const normalizeAddTrackData = ({ code, track }: IAddTrackPayload) => {
  const normalizedCode = normalizeCode(code);
  const normalizedTrack = normalizeTrack(track);

  return { code: normalizedCode, track: normalizedTrack };
};

export const normalizeVoteTrackData = ({
  code,
  queueId,
  nickname,
}: IVoteTrackPayload) => {
  const normalizedCode = normalizeCode(code);
  const normalizedNickname = normalizeNickname(nickname);

  return { code: normalizedCode, queueId, nickname: normalizedNickname };
};
