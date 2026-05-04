import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [RoomsModule, SpotifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
