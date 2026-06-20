import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { Club, ClubSchema } from './schemas/club.schema';
import { Player, PlayerSchema } from '../players/schemas/player.schema';
import { Game, GameSchema } from '../games/schemas/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Club.name, schema: ClubSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Game.name, schema: GameSchema },
    ]),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
