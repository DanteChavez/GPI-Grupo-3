import * as mongoose from 'mongoose';

export const AppearanceSchema = new mongoose.Schema({
    id: String,
    appearance_id: String,
    game_id: Number,
    player_club_id: Number,
    player_current_club_id: Number,
    date: Date,
    player_name: String,
    competition_id: String,
    yellow_cards: Number,
    red_cards: Number,
    goals: Number,
    assists: Number,
    minutes_played: Number, // Pasar a dateType en otro lado
});