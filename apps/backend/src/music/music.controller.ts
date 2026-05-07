import { Body, Controller, Get } from '@nestjs/common';
import { SpotifyProvider } from './spotify.provider';

@Controller('music')
export class MusicController {
  constructor(private readonly spotifyProvider: SpotifyProvider) {}

  @Get('search')
  searchTracks(@Body('query') query: string) {
    return this.spotifyProvider.searchTracks(query);
  }
}
