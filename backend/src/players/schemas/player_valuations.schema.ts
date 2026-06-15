import * as mongoose from 'mongoose';

export const PlayerValuationsSchema = new mongoose.Schema({
    id: String,
    player_id: Number,
    date: Date,
    market_value_in_eur: Number,
    current_club_name: String,
    current_club_id: Number,
    player_club_domestic_competition_id: String,
});