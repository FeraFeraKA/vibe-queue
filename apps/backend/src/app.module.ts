import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomsModule, SpotifyModule],
})
export class AppModule {}
