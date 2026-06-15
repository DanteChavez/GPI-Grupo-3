import * as mongoose from 'mongoose';

export const NationalTeamsSchema = new mongoose.Schema({
    id: String,
    national_team_id: Number,
    name: String,
    team_code: String,
    country_id: Number,
    country_name: String,
    country_code: String,
    confederation: String,
    team_image_url: String,
    squad_size: Number,
    average_size: Number,
    foreigners_number: Number,
    foreigners_percentage: Number,
    total_market_value: Number,
    fifa_ranking: Number,
    last_season: Number, // Es el año, posiblemente lo puedo pasar a datetime?
    url: String,
});