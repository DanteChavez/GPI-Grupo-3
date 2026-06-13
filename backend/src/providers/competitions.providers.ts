import { Connection } from 'mongoose';
import { CompetitionSchema } from 'src/schemas/competitions.schema';

export const competitionProviders = [
    {
        provide: 'COMPETITION_MODEL',
        useFactory: (connection:Connection) => connection.model('Competition', CompetitionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];