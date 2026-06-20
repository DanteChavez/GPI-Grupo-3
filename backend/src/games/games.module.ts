import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GameSchema } from './schemas/game.schema';
import { GameEvent, GameEventSchema } from './schemas/game-event.schema';
import { GameLineup, GameLineupSchema } from './schemas/game-lineup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: GameEvent.name, schema: GameEventSchema },
      { name: GameLineup.name, schema: GameLineupSchema },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
