import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { SpotifyProvider } from './spotify.provider';

@Module({
  controllers: [MusicController],
  providers: [MusicService, SpotifyProvider],
})
export class MusicModule {}
