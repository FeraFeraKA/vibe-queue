import { BadRequestException } from '@nestjs/common';
import { IActionsRoom } from '../rooms/rooms.types';

export const normalizeData = ({ code, nickname }: IActionsRoom) => {
  const normalizedCode = code.trim().toLowerCase();
  const normalizedNickname = nickname.trim();

  if (normalizedCode.length === 0)
    throw new BadRequestException('Room code is required');

  if (!/^[a-z0-9-]{3,20}$/.test(normalizedCode))
    throw new BadRequestException(
      'Room code must be 3-20 characters and contain only letters, numbers, or hyphens',
    );

  if (normalizedNickname.length === 0)
    throw new BadRequestException('Nickname is required');

  if (normalizedNickname.length > 24)
    throw new BadRequestException('Nickname must be shorter than 24 symbols');

  return {
    code: normalizedCode,
    nickname: normalizedNickname,
  };
};
