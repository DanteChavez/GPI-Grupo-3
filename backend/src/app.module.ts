import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ClubsModule } from './clubs/clubs.module';
import { PlayersModule } from './players/players.module';
import { StatsModule } from './stats/stats.module';
import { CompetitionsModule } from './competitions/competitions.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin'),
    GamesModule,
    ClubsModule,
    PlayersModule,
    StatsModule,
    CompetitionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
