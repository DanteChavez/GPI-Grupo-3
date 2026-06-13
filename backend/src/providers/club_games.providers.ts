import { Connection } from 'mongoose';
import { ClubGamesSchema } from 'src/schemas/club_games.schema';

export const clubGamesProviders = [
    {
        provide: 'CLUB_GAMES_MODEL',
        useFactory: (connection:Connection) => connection.model('ClubGames', ClubGamesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];