import * as mongoose from 'mongoose';

export const GameLineupsSchema = new mongoose.Schema({
    id: String,
    game_lineups_id: String,
    date: Date,
    game_id: Number,
    player_id: Number,
    club_id: Number,
    player_name: String,
    type: String,
    position: String,
    number: String, //Por alguna razón el número es string????
    team_captain: Number, // Pero el capitán es number????
});