import { Connection } from 'mongoose';
import { PlayersSchema } from '../schemas/players.schema';

export const playersProviders = [
    {
        provide: 'PLAYERS_MODEL',
        useFactory: (connection:Connection) => connection.model('Players', PlayersSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];