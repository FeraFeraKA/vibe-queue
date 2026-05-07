import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISearchTrack } from '@vibe-queue/shared';

interface ISpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

interface ISpotifySearchResponse {
  tracks: {
    items: ISpotifyTrack[];
  };
}

interface ISpotifyTrack {
  album: ISpotifyAlbum;
  artists: ISpotifyArtist[];
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
}

interface ISpotifyAlbum {
  artists: ISpotifyArtist[];
  images: ISpotifyImage[];
  name: string;
}

interface ISpotifyArtist {
  name: string;
}

interface ISpotifyImage {
  height: number;
  width: number;
  url: string;
}

@Injectable()
export class SpotifyProvider {
  constructor(private readonly configService: ConfigService) {}

  private accessToken: string | null = null;
  private tokenExpiration: number | null = null;

  private async getAccessToken() {
    if (
      this.accessToken &&
      this.tokenExpiration &&
      Date.now() < this.tokenExpiration
    ) {
      return this.accessToken;
    }

    this.accessToken = await this.getSpotifyToken();
    return this.accessToken;
  }

  private async getSpotifyToken() {
    const clientId = this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>(
      'SPOTIFY_CLIENT_SECRET',
    );

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException(
        'Failed to obtain Spotify access token. Check your credentials and try again.',
      );
    }

    const data = (await response.json()) as ISpotifyTokenResponse;

    this.tokenExpiration = Date.now() + data.expires_in * 1000 - 60000;
    return data.access_token;
  }

  private mapSpotifyTracks(tracks: ISpotifyTrack[]): ISearchTrack[] {
    return tracks.map((item) => ({
      provider: 'spotify',
      providerTrackId: item.id,
      title: item.name,
      artistText: item.artists.map((artist) => artist.name).join(', '),
      albumName: item.album.name,
      coverUrl: item.album.images[1].url ?? item.album.images[0].url ?? '', // Medium size of cover image
      durationMs: item.duration_ms,
      providerUrl: item.external_urls.spotify,
      explicit: item.explicit,
    }));
  }

  async searchTracks(query: string) {
    const accessToken = await this.getAccessToken();

    const params = new URLSearchParams({
      q: query,
      type: 'track',
      limit: '10',
      market: 'US',
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = (await response.json()) as ISpotifySearchResponse;

    if (!response.ok) {
      console.log('Spotify API error:', data);

      throw new InternalServerErrorException(
        'Failed to search tracks on Spotify. Please try again later.',
      );
    }

    const tracks = this.mapSpotifyTracks(data.tracks.items);

    return tracks;
  }
}
