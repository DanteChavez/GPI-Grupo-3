import { Document } from "mongoose";

export interface Competition extends Document{
    readonly id: string,
    readonly competition_id: string,
    readonly competition_code: string,
    readonly name: string,
    readonly sub_type: string,
    readonly type: string,
    readonly country_id: number,
    readonly country_name: string,
    readonly domestic_league_code: string,
    readonly confederation: string,
    readonly total_clubs: number,
    readonly url: string, 
};