import { Connection } from 'mongoose';
import { NationalTeamsSchema } from 'src/schemas/national_teams.schema';

export const nationalTeamsProviders = [
    {
        provide: 'NATIONAL_TEAMS_MODEL',
        useFactory: (connection:Connection) => connection.model('NationalTeams', NationalTeamsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];