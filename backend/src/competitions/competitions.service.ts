import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Competition, CompetitionDocument } from './schemas/competition.schema';

@Injectable()
export class CompetitionsService {
  constructor(@InjectModel(Competition.name) private competitionModel: Model<CompetitionDocument>) {}

  async findAll(type?: string): Promise<any[]> {
    const filter: any = {};
    if (type) {
      filter.type = type;
    }
    const competitions = await this.competitionModel.find(filter).sort({ name: 1 }).exec();
    return competitions.map((c) => ({
      id: c.competition_id,
      code: c.competition_code,
      name: c.name,
      subType: c.sub_type,
      type: c.type,
      countryName: c.country_name,
      confederation: c.confederation,
      totalClubs: c.total_clubs,
    }));
  }
}
