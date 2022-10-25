import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-pplaery.dto';
import { Player } from './interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    async create(@Body() dto: CreatePlayerDto) {
        await this.playerService.createUpdatePlayer(dto);
    }

    @Get()
    async getPlayers(
        @Query('email') email: string,
    ): Promise<Player[] | Player> {
        if (email) {
            return await this.playerService.getPlayerByEmail(email);
        } else {
            return await this.playerService.getAllPlayers();
        }
    }

    @Delete()
    async remove(@Query('email') email: string): Promise<void> {
        this.playerService.remove(email);
    }
}
