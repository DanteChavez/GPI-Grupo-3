import { Document } from "mongoose";

export interface Transfers extends Document{
    readonly id: string,
    readonly player_id: number,
    readonly transfer_date: Date,
    readonly transfer_season: string, // por alguna razón est de tipo '27/28'? lo pondré como string por ahora
    readonly from_club_id: number,
    readonly to_club_id: number,
    readonly from_club: string,
    readonly to_club_name: string,
    readonly transfer_fee: number,
    readonly market_value_in_eur: number,
    readonly player_name: string,
};