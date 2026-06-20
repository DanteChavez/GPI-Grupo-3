import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club, ClubDocument } from './schemas/club.schema';
import { Player, PlayerDocument } from '../players/schemas/player.schema';
import { Game, GameDocument } from '../games/schemas/game.schema';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Club.name) private clubModel: Model<ClubDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
  ) {}

  async findAll(options: { search?: string; competition?: string; limit?: number } = {}): Promise<any[]> {
    const { search, competition, limit = 20 } = options;
    const filter: any = {};

    if (search) {
      filter.name = new RegExp(search, 'i');
    }

    if (competition) {
      filter.domestic_competition_id = competition;
    }

    const clubs = await this.clubModel.find(filter).sort({ name: 1 }).limit(limit).exec();
    return clubs.map((club) => this.mapClub(club));
  }

  async findOne(id: number): Promise<any> {
    const club = await this.clubModel.findOne({ club_id: id }).exec();
    if (!club) {
      throw new NotFoundException(`Club with id ${id} not found`);
    }
    return this.mapClub(club);
  }

  async findPlayers(clubId: number): Promise<any[]> {
    const players = await this.playerModel
      .find({ current_club_id: clubId })
      .limit(30)
      .exec();

    return players.map((p) => ({
      id: p.player_id.toString(),
      name: p.name,
      position: p.position,
      sub_position: (p as any).sub_position,
      image_url: p.image_url,
      market_value_in_eur: p.market_value_in_eur,
      country_of_citizenship: p.country_of_citizenship,
    }));
  }

  async findGames(clubId: number, limit: number = 5): Promise<any[]> {
    const games = await this.gameModel
      .find({ $or: [{ home_club_id: clubId }, { away_club_id: clubId }] })
      .sort({ 'date.$date': -1 })
      .limit(limit)
      .exec();

    return games.map((game) => {
      const dateStr = game.date
        ? new Date(game.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'Fecha desconocida';

      return {
        id: game.game_id.toString(),
        homeTeam: game.home_club_name,
        awayTeam: game.away_club_name,
        homeScore: game.home_club_goals,
        awayScore: game.away_club_goals,
        status: 'Finalizado',
        date: dateStr,
        competition: game.competition_id,
        round: game.round,
        stadium: game.stadium,
      };
    });
  }

  private mapClub(club: ClubDocument): any {
    return {
      id: club.club_id.toString(),
      name: club.name,
      league: club.domestic_competition_id,
      stadium_name: club.stadium_name,
      stadium_seats: club.stadium_seats,
      squad_size: club.squad_size,
      average_age: club.average_age,
      national_team_players: club.national_team_players,
      net_transfer_record: club.net_transfer_record,
      foreigners_percentage: club.foreigners_percentage,
      foreigners_number: club.foreigners_number,
      last_season: club.last_season,
    };
  }
}
