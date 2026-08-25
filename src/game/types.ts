export interface GameState {
    health: number;
    energy: number;
    food: number;
    resources: number;
    history: string[];
    actionsExploration: string[];
    lose: boolean;
    win: boolean;
}

