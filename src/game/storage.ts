import type { GameState } from "./types";
import { LOCALSTORAGE_KEY, INITIAL_DATA } from "./constants";

export function loadSavedStorage(): GameState {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY)
    
    if(!savedData) {
        return INITIAL_DATA
    }

    try {
        return JSON.parse(savedData)
    } catch {
        return INITIAL_DATA
    }
}

export function saveState(state: GameState): void {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state))
} 