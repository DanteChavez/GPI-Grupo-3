import { Document } from "mongoose";

export interface NationalTeams extends Document{
    readonly id: string,
    readonly national_team_id: number,
    readonly name: string,
    readonly team_code: string,
    readonly country_id: number,
    readonly country_name: string,
    readonly country_code: string,
    readonly confederation: string,
    readonly team_image_url: string,
    readonly squad_size: number,
    readonly average_size: number,
    readonly foreigners_number: number,
    readonly foreigners_percentage: number,
    readonly total_market_value: number,
    readonly fifa_ranking: number,
    readonly last_season: number, // Es el año, posiblemente lo puedo pasar a datetime?
    readonly url: string,
};