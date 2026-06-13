import * as mongoose from 'mongoose';

export const ClubSchema = new mongoose.Schema({
    id: String,
    club_id: Number,
    club_code: String,
    name: String,
    domestic_competition_id: String,
    squad_size: Number,
    average_age: Number,
    foreigners_number: Number,
    foreigners_percentage: Number,
    national_team_players: Number,
    stadium_name: String,
    stadium_seats: Number,
    net_transfer_record: String,
    last_season: Number,
    url: String, //TODO- Investigar cómo transformar a URL
});