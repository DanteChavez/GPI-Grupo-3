import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClubDocument = Club & Document;

@Schema({ collection: 'clubs' })
export class Club {
  @Prop()
  club_id: number;

  @Prop()
  club_code: string;

  @Prop()
  name: string;

  @Prop()
  domestic_competition_id: string;

  @Prop()
  squad_size: number;

  @Prop()
  average_age: number;

  @Prop()
  foreigners_number: number;

  @Prop()
  foreigners_percentage: number;

  @Prop()
  national_team_players: number;

  @Prop()
  stadium_name: string;

  @Prop()
  stadium_seats: number;

  @Prop()
  net_transfer_record: string;

  @Prop()
  last_season: number;

  @Prop()
  url: string;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
