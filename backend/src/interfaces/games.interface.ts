import { Document } from "mongoose";

export interface GamesSchema extends Document{
    readonly id: string,
    readonly game_id: number,
    readonly competition_id: string,
    readonly season: number,
    readonly round: string,
    readonly date: Date,
    readonly home_club_id: number,
    readonly away_club_id: number,
    readonly home_club_goals: number,
    readonly away_club_goals: number,
    readonly home_club_manager_name: string,
    readonly away_club_manager_name: string,
    readonly stadium: string,
    readonly attendance: number,
    readonly referee: string,
    readonly url: string,
    readonly home_club_name: string,
    readonly away_club_name: string,
    readonly aggregate: string,
    readonly competition_type: string,
};