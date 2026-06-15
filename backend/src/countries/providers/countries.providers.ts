import { Connection } from 'mongoose';
import { CountriesSchema } from 'src/schemas/countries.schema';

export const coutnriesProviders = [
    {
        provide: 'COUNTRIES_MODEL',
        useFactory: (connection:Connection) => connection.model('Countries', CountriesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];