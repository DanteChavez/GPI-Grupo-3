import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompetitionDocument = Competition & Document;

@Schema({ collection: 'competitions' })
export class Competition {
  @Prop()
  competition_id: string;

  @Prop()
  competition_code: string;

  @Prop()
  name: string;

  @Prop()
  sub_type: string;

  @Prop()
  type: string;

  @Prop()
  country_id: number;

  @Prop()
  country_name: string;

  @Prop()
  domestic_league_code: string;

  @Prop()
  confederation: string;

  @Prop()
  total_clubs: number;

  @Prop()
  url: string;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
