import { Document } from 'mongoose'

export interface ClubGames extends Document{
    readonly id: string,
    readonly game_id: number,
    readonly club_id: number,
    readonly own_goals: number,
    readonly own_manager_name: string,
    readonly opponent_id: number,
    readonly opponent_goals: number,
    readonly opponent_manager_name: string,
    readonly hosting: string,
    readonly is_win: number,
};