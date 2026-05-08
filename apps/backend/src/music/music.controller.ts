import { Controller, Get, Param } from '@nestjs/common';
import type { TProvider } from '@vibe-queue/shared';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('search/:query')
  searchTracks(
    @Param('query') query: string,
    @Param('provider') provider: TProvider,
  ) {
    return this.musicService.searchTracks({ query, provider });
  }
}
