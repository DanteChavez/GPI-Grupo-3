import { Document } from "mongoose";

export interface GameEvents extends Document{
    readonly id: number,
    readonly game_event_id: number,
    readonly date: Date,
    readonly game_id: number,
    readonly minute: number, // Pasar a datetype en otro lado
    readonly type: string,
    readonly club_id: number,
    readonly club_name: string,
    readonly player_id: number,
    readonly description: string,
    readonly player_assist_id: number,
};