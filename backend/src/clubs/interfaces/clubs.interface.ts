import { Document } from "mongoose";

export interface ClubSchema extends Document{
    readonly id: string,
    readonly club_id: number,
    readonly club_code: string,
    readonly name: string,
    readonly domestic_competition_id: string,
    readonly squad_size: number,
    readonly average_age: number,
    readonly foreigners_number: number,
    readonly foreigners_percentage: number,
    readonly national_team_players: number,
    readonly stadium_name: string,
    readonly stadium_seats: number,
    readonly net_transfer_record: string,
    readonly last_season: number,
    readonly url: string, //TODO- Investigar cómo transformar a URL
};