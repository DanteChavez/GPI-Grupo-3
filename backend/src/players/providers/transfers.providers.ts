import { Connection } from 'mongoose';
import { TransfersSchema } from 'src/schemas/transfers.schema';

export const transferProviders = [
    {
        provide: 'TRANSFER_MODEL',
        useFactory: (connection:Connection) => connection.model('Transfer', TransfersSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];