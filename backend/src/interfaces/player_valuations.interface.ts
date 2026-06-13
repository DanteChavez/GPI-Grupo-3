import { Document } from "mongoose";

export interface PlayerValuations extends Document{
    readonly id: string,
    readonly player_id: number,
    readonly date: Date,
    readonly market_value_in_eur: number,
    readonly current_club_name: string,
    readonly current_club_id: number,
    readonly player_club_domestic_competition_id: string,
};