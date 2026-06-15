import * as mongoose from 'mongoose';

export const ClubGamesSchema = new mongoose.Schema({
    id: String,
    game_id: Number,
    club_id: Number,
    own_goals: Number,
    own_manager_name: String,
    opponent_id: Number,
    opponent_goals: Number,
    opponent_manager_name: String,
    hosting: String,
    is_win: Number,
});