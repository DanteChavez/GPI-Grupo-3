import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ collection: 'players' })
export class Player {
  @Prop()
  player_id: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  name: string;

  @Prop()
  last_season: number;

  @Prop()
  current_club_id: number;

  @Prop()
  player_code: string;

  @Prop()
  country_of_birth: string;

  @Prop()
  city_of_birth: string;

  @Prop()
  country_of_citizenship: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  sub_position: string;

  @Prop()
  position: string;

  @Prop()
  foot: string;

  @Prop()
  height_in_cm: number;

  @Prop()
  agent_name: string;

  @Prop()
  image_url: string;

  @Prop()
  url: string;

  @Prop()
  current_club_domestic_competition_id: string;

  @Prop()
  current_club_name: string;

  @Prop()
  market_value_in_eur: number;

  @Prop()
  highest_market_value_in_eur: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
