import { Document } from "mongoose";

export interface Countries extends Document{
    readonly id: string,
    readonly country_id: number,
    readonly country_name: string,
    readonly country_code: string,
    readonly confederation: string,
    readonly total_clubs: number,
    readonly total_players: number,
    readonly average_age: number,
    readonly url: string,
};