import { Document } from 'mongoose';

export interface Appearance extends Document {
    readonly id: string,
    readonly appearance_id: string,
    readonly game_id: number,
    readonly player_club_id: number,
    readonly player_current_club_id: number,
    readonly date: Date,
    readonly player_name: string,
    readonly competition_id: string,
    readonly yellow_cards: number,
    readonly red_cards: number,
    readonly goals: number,
    readonly assists: number,
    readonly minutes_played: number, // Pasar a dateType en otro lado
};