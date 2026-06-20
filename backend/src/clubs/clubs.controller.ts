import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('competition') competition?: string,
    @Query('limit') limit?: string,
  ) {
    return this.clubsService.findAll({
      search,
      competition,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clubsService.findOne(Number(id));
  }

  @Get(':id/players')
  async findPlayers(@Param('id') id: string) {
    return this.clubsService.findPlayers(Number(id));
  }

  @Get(':id/games')
  async findGames(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.clubsService.findGames(Number(id), limit ? Number(limit) : 5);
  }
}
