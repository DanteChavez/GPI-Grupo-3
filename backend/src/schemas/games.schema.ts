import * as mongoose from 'mongoose';

export const GamesSchema = new mongoose.Schema({
    id: String,
    game_id: Number,
    competition_id: String,
    season: Number,
    round: String,
    date: Date,
    home_club_id: Number,
    away_club_id: Number,
    home_club_goals: Number,
    away_club_goals: Number,
    home_club_manager_name: String,
    away_club_manager_name: String,
    stadium: String,
    attendance: Number,
    referee: String,
    url: String,
    home_club_name: String,
    away_club_name: String,
    aggregate: String,
    competition_type: String,
});