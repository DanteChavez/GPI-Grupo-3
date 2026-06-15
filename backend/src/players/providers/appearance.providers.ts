import { Connection } from 'mongoose';
import { AppearanceSchema } from 'src/schemas/appearances.schema';

export const appearanceProviders = [
    {
        provide: 'APPEARANCE_MODEL',
        useFactory: (connection:Connection) => connection.model('Appearance', AppearanceSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];