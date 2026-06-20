import { Controller, Get, Query } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    return this.competitionsService.findAll(type);
  }
}
