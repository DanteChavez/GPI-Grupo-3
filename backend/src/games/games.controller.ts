import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('competition') competition?: string,
    @Query('season') season?: string,
    @Query('limit') limit?: string,
  ) {
    return this.gamesService.findAll({
      search,
      competition,
      season: season ? Number(season) : undefined,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gamesService.findOne(Number(id));
  }

  @Get(':id/events')
  async findEvents(@Param('id') id: string) {
    return this.gamesService.findEvents(Number(id));
  }

  @Get(':id/lineups')
  async findLineups(@Param('id') id: string) {
    return this.gamesService.findLineups(Number(id));
  }
}
