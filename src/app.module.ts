import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { PlayerService } from './player/player.service';

@Module({
    imports: [PlayerModule],
    providers: [PlayerService],
})
export class AppModule {}
