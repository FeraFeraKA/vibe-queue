import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import type { ISearchTrack, TCode, TNickname } from './rooms.types';

@Controller('room')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get(':code')
  findRoom(@Param('code') code: TCode) {
    return this.roomsService.findRoom(code);
  }

  @Post()
  createRoom(@Body('code') code: TCode, @Body('nickname') nickname: TNickname) {
    return this.roomsService.createRoom({ code, nickname });
  }

  @Patch(':code/join')
  joinRoom(@Param('code') code: TCode, @Body('nickname') nickname: TNickname) {
    return this.roomsService.joinRoom({ code, nickname });
  }

  @Patch(':code/tracks')
  addTrack(@Param('code') code: TCode, @Body('track') track: ISearchTrack) {
    return this.roomsService.addTrack({ code, track });
  }

  @Patch(':code/tracks/:queueId/vote')
  voteTrack(
    @Param('code') code: TCode,
    @Param('queueId') queueId: string,
    @Body('nickname') nickname: TNickname,
  ) {
    return this.roomsService.voteTrack({ code, queueId, nickname });
  }
}
