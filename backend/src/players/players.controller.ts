import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('position') position?: string,
    @Query('club') club?: string,
    @Query('limit') limit?: string,
  ) {
    return this.playersService.findAll({
      search,
      position,
      club,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(Number(id));
  }

  @Get(':id/appearances')
  async findAppearances(@Param('id') id: string) {
    return this.playersService.findAppearances(Number(id));
  }
}
