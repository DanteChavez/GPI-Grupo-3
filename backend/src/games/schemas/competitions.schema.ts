import * as mongoose from 'mongoose';

export const CompetitionSchema = new mongoose.Schema({
    id: String,
    competition_id: String,
    competition_code: String,
    name: String,
    sub_type: String,
    type: String,
    country_id: Number,
    country_name: String,
    domestic_league_code: String,
    confederation: String,
    total_clubs: Number,
    url: String, 
});