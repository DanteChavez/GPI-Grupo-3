import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameLineupDocument = GameLineup & Document;

@Schema({ collection: 'game_lineups' })
export class GameLineup {
  @Prop()
  game_lineups_id: string;

  @Prop()
  date: Date;

  @Prop()
  game_id: number;

  @Prop()
  player_id: number;

  @Prop()
  club_id: number;

  @Prop()
  player_name: string;

  @Prop()
  type: string;

  @Prop()
  position: string;

  @Prop()
  number: string;

  @Prop()
  team_captain: number;
}

export const GameLineupSchema = SchemaFactory.createForClass(GameLineup);
