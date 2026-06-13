import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(''), //Aquí el link a la DB de Mongo
},
];