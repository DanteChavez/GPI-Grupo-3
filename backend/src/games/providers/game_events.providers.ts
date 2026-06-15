import { Connection } from 'mongoose';
import { GameEventsSchema } from 'src/schemas/game_events.schema';

export const gameEventsProviders = [
    {
        provide: 'GAME_EVENTS_MODEL',
        useFactory: (connection:Connection) => connection.model('GameEvents', GameEventsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];