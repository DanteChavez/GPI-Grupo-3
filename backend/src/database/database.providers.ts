import * as mongoose from 'mongoose';
import backendConfig from '../../backend.config.json';

export const databaseProviders = [
    {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(backendConfig.server.url),
},
];