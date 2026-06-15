import { Document } from "mongoose";

export interface Players extends Document{
    readonly id: string,
    readonly player_id: number,
    readonly first_name: string,
    readonly last_name: string,
    readonly name: string,
    readonly last_season: number, // Considerar pasar a año en otro lado (datetype)
    readonly current_club_id: number,
    readonly player_code: string,
    readonly country_of_birth: string,
    readonly city_of_birth: string,
    readonly country_of_citizenship: string,
    readonly date_of_birth: Date,
    readonly sub_position: string,
    readonly position: string,
    readonly foot: string,
    readonly height_in_cm: number,
    readonly agent_name: string,
    readonly image_url: string,
    readonly url: string,
    readonly current_club_domestic_competition_id: string,
    readonly current_club_name: string,
    readonly market_value_in_eur: number,
    readonly highest_market_value_in_eur: number,
};