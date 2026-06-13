import * as mongoose from 'mongoose';

export const TransfersSchema = new mongoose.Schema({
    id: String,
    player_id: Number,
    transfer_date: Date,
    transfer_season: String, // por alguna razón est de tipo '27/28'? lo pondré como string por ahora
    from_club_id: Number,
    to_club_id: Number,
    from_club: String,
    to_club_name: String,
    transfer_fee: Number,
    market_value_in_eur: Number,
    player_name: String,
});