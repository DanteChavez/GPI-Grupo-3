import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { Appearance, AppearanceDocument } from './schemas/appearance.schema';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(Appearance.name) private appearanceModel: Model<AppearanceDocument>,
  ) {}

  async findAll(options: { search?: string; position?: string; club?: string; limit?: number } = {}): Promise<any[]> {
    const { search, position, club, limit = 20 } = options;
    const filter: any = {};

    if (search) {
      filter.name = new RegExp(search, 'i');
    }

    if (position) {
      filter.position = position;
    }

    if (club) {
      filter.current_club_name = new RegExp(club, 'i');
    }

    const players = await this.playerModel.find(filter).limit(limit).exec();
    return players.map((player) => this.mapPlayer(player));
  }

  async findOne(id: number): Promise<any> {
    const player = await this.playerModel.findOne({ player_id: id }).exec();
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return this.mapPlayer(player);
  }

  async findAppearances(playerId: number): Promise<any> {
    const appearances = await this.appearanceModel
      .find({ player_id: playerId })
      .sort({ date: -1 })
      .exec();

    // Aggregate stats
    const totalGoals = appearances.reduce((sum, a) => sum + (a.goals || 0), 0);
    const totalAssists = appearances.reduce((sum, a) => sum + (a.assists || 0), 0);
    const totalYellow = appearances.reduce((sum, a) => sum + (a.yellow_cards || 0), 0);
    const totalRed = appearances.reduce((sum, a) => sum + (a.red_cards || 0), 0);
    const totalMinutes = appearances.reduce((sum, a) => sum + (a.minutes_played || 0), 0);

    return {
      summary: {
        appearances: appearances.length,
        goals: totalGoals,
        assists: totalAssists,
        yellowCards: totalYellow,
        redCards: totalRed,
        minutesPlayed: totalMinutes,
      },
      recent: appearances.map((a) => ({
        gameId: a.game_id,
        date: a.date
          ? new Date(a.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
          : 'Fecha desconocida',
        competition: a.competition_id,
        goals: a.goals,
        assists: a.assists,
        yellowCards: a.yellow_cards,
        redCards: a.red_cards,
        minutesPlayed: a.minutes_played,
      })),
    };
  }

  private mapPlayer(player: PlayerDocument): any {
    return {
      id: player.player_id.toString(),
      name: player.name,
      first_name: player.first_name,
      last_name: player.last_name,
      team: player.current_club_name,
      current_club_id: player.current_club_id,
      position: player.position,
      sub_position: player.sub_position,
      date_of_birth: player.date_of_birth || null,
      market_value_in_eur: player.market_value_in_eur,
      highest_market_value_in_eur: player.highest_market_value_in_eur,
      image_url: player.image_url,
      height_in_cm: player.height_in_cm,
      foot: player.foot,
      city_of_birth: player.city_of_birth,
      country_of_birth: player.country_of_birth,
      country_of_citizenship: player.country_of_citizenship,
      agent_name: player.agent_name,
      last_season: player.last_season,
    };
  }
}
