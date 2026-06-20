import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player, PlayerSchema } from './schemas/player.schema';
import { Appearance, AppearanceSchema } from './schemas/appearance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Player.name, schema: PlayerSchema },
      { name: Appearance.name, schema: AppearanceSchema },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
