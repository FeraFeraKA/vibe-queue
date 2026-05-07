import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './music/music.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoomsModule,
    MusicModule,
  ],
})
export class AppModule {}
