import { Connection } from 'mongoose';
import { ClubSchema } from 'src/schemas/clubs.schema';

export const clubsProviders = [
    {
        provide: 'CLUBS_MODELS',
        useFactory: (connection:Connection) => connection.model('Clubs', ClubSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];