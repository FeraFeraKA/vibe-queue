import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [RoomsModule, SpotifyModule],
})
export class AppModule {}
