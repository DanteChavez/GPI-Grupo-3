import { Connection } from 'mongoose';
import { GamesSchema } from 'src/schemas/games.schema';

export const gamesProviders = [
    {
        provide: 'GAMES_MODEL',
        useFactory: (connection:Connection) => connection.model('Games', GamesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];