import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class StatsService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getCounts(): Promise<{ players: number; clubs: number; games: number; competitions: number }> {
    const [players, clubs, games, competitions] = await Promise.all([
      this.connection.collection('players').countDocuments(),
      this.connection.collection('clubs').countDocuments(),
      this.connection.collection('games').countDocuments(),
      this.connection.collection('competitions').countDocuments(),
    ]);
    return { players, clubs, games, competitions };
  }
}
