import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ collection: 'games' })
export class Game {
  @Prop()
  game_id: number;

  @Prop()
  competition_id: string;

  @Prop()
  season: number;

  @Prop()
  round: string;

  @Prop()
  date: Date;

  @Prop()
  home_club_id: number;

  @Prop()
  away_club_id: number;

  @Prop()
  home_club_goals: number;

  @Prop()
  away_club_goals: number;

  @Prop()
  home_club_name: string;

  @Prop()
  away_club_name: string;

  @Prop()
  aggregate: string;

  @Prop()
  competition_type: string;

  @Prop()
  stadium: string;

  @Prop()
  attendance: number;

  @Prop()
  referee: string;

  @Prop()
  home_club_manager_name: string;

  @Prop()
  away_club_manager_name: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
