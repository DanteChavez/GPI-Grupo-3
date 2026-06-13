import * as mongoose from 'mongoose';

export const PlayersSchema = new mongoose.Schema({
    id: String,
    player_id: Number,
    first_name: String,
    last_name: String,
    name: String,
    last_season: Number, // Considerar pasar a año en otro lado (datetype)
    current_club_id: Number,
    player_code: String,
    country_of_birth: String,
    city_of_birth: String,
    country_of_citizenship: String,
    date_of_birth: Date,
    sub_position: String,
    position: String,
    foot: String,
    height_in_cm: Number,
    agent_name: String,
    image_url: String,
    url: String,
    current_club_domestic_competition_id: String,
    current_club_name: String,
    market_value_in_eur: Number,
    highest_market_value_in_eur: Number,
});