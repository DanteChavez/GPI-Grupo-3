import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { GameEvent, GameEventDocument } from './schemas/game-event.schema';
import { GameLineup, GameLineupDocument } from './schemas/game-lineup.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(GameEvent.name) private gameEventModel: Model<GameEventDocument>,
    @InjectModel(GameLineup.name) private gameLineupModel: Model<GameLineupDocument>,
  ) {}

  async findAll(options: { search?: string; competition?: string; season?: number; limit?: number } = {}): Promise<any[]> {
    const { search, competition, season, limit = 20 } = options;
    const filter: any = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { home_club_name: regex },
        { away_club_name: regex },
        { stadium: regex },
      ];
    }

    if (competition) {
      filter.competition_id = competition;
    }

    if (season) {
      filter.season = season;
    }

    const games = await this.gameModel
      .find(filter)
      .sort({ date: -1 })
      .limit(limit)
      .exec();

    return games.map((game) => this.mapGame(game));
  }

  async findOne(id: number): Promise<any> {
    const game = await this.gameModel.findOne({ game_id: id }).exec();
    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return this.mapGame(game);
  }

  async findEvents(gameId: number): Promise<any[]> {
    const events = await this.gameEventModel
      .find({ game_id: gameId })
      .sort({ minute: 1 })
      .exec();

    return events.map((e) => ({
      id: e.game_event_id,
      minute: e.minute,
      type: e.type,
      clubName: e.club_name,
      clubId: e.club_id,
      playerId: e.player_id,
      description: e.description,
      playerAssistId: e.player_assist_id,
    }));
  }

  async findLineups(gameId: number): Promise<any> {
    const lineups = await this.gameLineupModel
      .find({ game_id: gameId })
      .exec();

    const home: any[] = [];
    const away: any[] = [];
    const clubIds = new Set<number>();

    lineups.forEach((l) => clubIds.add(l.club_id));
    const clubIdArray = Array.from(clubIds);

    lineups.forEach((l) => {
      const entry = {
        playerId: l.player_id,
        playerName: l.player_name,
        type: l.type,
        position: l.position,
        number: l.number,
        teamCaptain: l.team_captain === 1,
      };
      if (l.club_id === clubIdArray[0]) {
        home.push(entry);
      } else {
        away.push(entry);
      }
    });

    return {
      home: home.sort((a, b) => (a.type === 'starting_lineup' ? -1 : 1)),
      away: away.sort((a, b) => (a.type === 'starting_lineup' ? -1 : 1)),
    };
  }

  private mapGame(game: GameDocument): any {
    const dateStr = game.date
      ? new Date(game.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Fecha desconocida';

    return {
      id: game.game_id.toString(),
      homeTeam: game.home_club_name,
      awayTeam: game.away_club_name,
      homeScore: game.home_club_goals,
      awayScore: game.away_club_goals,
      homeClubId: game.home_club_id,
      awayClubId: game.away_club_id,
      status: 'Finalizado',
      date: dateStr,
      competition: game.competition_id,
      competitionType: game.competition_type,
      season: game.season,
      round: game.round,
      stadium: game.stadium,
      attendance: game.attendance,
      referee: game.referee,
      aggregate: game.aggregate,
      home_club_manager_name: game.home_club_manager_name,
      away_club_manager_name: game.away_club_manager_name,
    };
  }
}
