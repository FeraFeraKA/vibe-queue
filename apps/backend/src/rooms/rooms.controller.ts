import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import type { TCode, TNickname } from './rooms.types';

@Controller('rooms')
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
}
