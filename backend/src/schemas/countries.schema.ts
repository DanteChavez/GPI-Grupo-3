import * as mongoose from 'mongoose';

export const CountriesSchema = new mongoose.Schema({
    id: String,
    country_id: Number,
    country_name: String,
    country_code: String,
    confederation: String,
    total_clubs: Number,
    total_players: Number,
    average_age: Number,
    url: String,
});