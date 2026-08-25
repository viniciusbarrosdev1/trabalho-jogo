import type { GameState } from "./types";

export const INITIAL_DATA: GameState = {
    health: 100,
    energy: 100,
    food: 5,
    resources: 0,
    history: [],
    actionsExploration: [],
    lose: false,
    win: false
}

export const LOCALSTORAGE_KEY = "survival-game" 