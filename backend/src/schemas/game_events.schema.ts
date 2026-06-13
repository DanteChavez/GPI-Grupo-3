import * as mongoose from 'mongoose';

export const GameEventsSchema = new mongoose.Schema({
    id: Number,
    game_event_id: Number,
    date: Date,
    game_id: Number,
    minute: Number, // Pasar a datetype en otro lado
    type: String,
    club_id: Number,
    club_name: String,
    player_id: Number,
    description: String,
    player_assist_id: Number,
});