import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameEventDocument = GameEvent & Document;

@Schema({ collection: 'game_events' })
export class GameEvent {
  @Prop()
  game_event_id: string;

  @Prop()
  date: Date;

  @Prop()
  game_id: number;

  @Prop()
  minute: number;

  @Prop()
  type: string;

  @Prop()
  club_id: number;

  @Prop()
  club_name: string;

  @Prop()
  player_id: number;

  @Prop()
  description: string;

  @Prop()
  player_assist_id: number;
}

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
