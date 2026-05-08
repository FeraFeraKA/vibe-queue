import { Injectable } from '@nestjs/common';
import { ISearchTracksPayload } from '@vibe-queue/shared';
import { SpotifyProvider } from './spotify.provider';

@Injectable()
export class MusicService {
  constructor(private readonly spotifyProvider: SpotifyProvider) {}

  searchTracks({ query, provider }: ISearchTracksPayload) {
    if (provider === 'spotify') {
      return this.spotifyProvider.searchTracks(query);
    }

    // Add support for other providers here

    throw new Error(`Unsupported provider: ${provider}`);
  }
}
