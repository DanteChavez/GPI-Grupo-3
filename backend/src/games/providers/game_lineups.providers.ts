import { Connection } from 'mongoose';
import { GameLineupsSchema } from '../schemas/game_lineups.schema';

export const gameLineupsProviders = [
    {
        provide: 'GAME_LINEUP_MODEL',
        useFactory: (connection:Connection) => connection.model('GameLineup', GameLineupsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];