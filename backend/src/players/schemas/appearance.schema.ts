import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppearanceDocument = Appearance & Document;

@Schema({ collection: 'appearances' })
export class Appearance {
  @Prop()
  appearance_id: string;

  @Prop()
  game_id: number;

  @Prop()
  player_id: number;

  @Prop()
  player_club_id: number;

  @Prop()
  player_current_club_id: number;

  @Prop()
  date: Date;

  @Prop()
  player_name: string;

  @Prop()
  competition_id: string;

  @Prop()
  yellow_cards: number;

  @Prop()
  red_cards: number;

  @Prop()
  goals: number;

  @Prop()
  assists: number;

  @Prop()
  minutes_played: number;
}

export const AppearanceSchema = SchemaFactory.createForClass(Appearance);
