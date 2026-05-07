import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

@Injectable()
export class SpotifyProvider {
  constructor(private readonly configService: ConfigService) {}

  private accessToken: string | null = null;
  private tokenExpiration: number | null = null;

  async getAccessToken() {
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

    const data = (await response.json()) as SpotifyTokenResponse;

    this.tokenExpiration = Date.now() + data.expires_in * 1000 - 60000;
    return data.access_token;
  }
}
