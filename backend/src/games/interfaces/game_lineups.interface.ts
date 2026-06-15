import { Document } from "mongoose";

export interface GameLineups extends Document{
    readonly id: string,
    readonly game_lineups_id: string,
    readonly date: Date,
    readonly game_id: number,
    readonly player_id: number,
    readonly club_id: number,
    readonly player_name: string,
    readonly type: string,
    readonly position: string,
    readonly number: string, //Por alguna razón el número es string????
    readonly team_captain: number, // Pero el capitán es number????
};