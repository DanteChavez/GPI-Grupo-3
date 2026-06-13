import { Connection } from 'mongoose';
import { PlayerValuationsSchema } from 'src/schemas/player_valuations.schema';

export const playerValuationsProviders = [
    {
        provide: 'PLAYER_VALUATION_MODEL',
        useFactory: (connection:Connection) => connection.model('PlayerValuation', PlayerValuationsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];