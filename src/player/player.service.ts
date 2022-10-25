import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-pplaery.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayerService {
    private players: Player[] = [];
    private readonly logger = new Logger(PlayerService.name);

    async createUpdatePlayer(dto: CreatePlayerDto): Promise<void> {
        this.logger.log(`createPlayerDto: ${dto}`);

        const { email } = dto;
        const findPlayer = await this.players.find(
            (player) => player.email === email,
        );

        if (findPlayer) {
            return this.update(findPlayer, dto);
        } else {
            await this.create(dto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const findPlayer = await this.players.find(
            (player) => player.email === email,
        );

        if (!findPlayer) {
            throw new NotFoundException(`Player not found by email: ${email}`);
        }

        return findPlayer;
    }

    async remove(email: string): Promise<void> {
        const findPlayer = await this.players.find(
            (player) => player.email === email,
        );
        this.players = this.players.filter(
            (player) => player.email !== findPlayer.email,
        );
    }

    private create(dto: CreatePlayerDto): void {
        const { name, cellphone, email } = dto;
        const player: Player = {
            _id: uuid(),
            name,
            cellphone,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlPlayerPhoto: 'www.google.com/foto123.jpg',
        };

        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    private update(findedPlayer: Player, dto: CreatePlayerDto): void {
        const { name } = dto;

        findedPlayer.name = name;
    }
}
