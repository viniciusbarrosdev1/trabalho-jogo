export interface GameState {
    vida: number;
    energia: number;
    comida: number;
    recursos: number;
    historico: string[];
    acoesDesdeExploracao: string[];
    gameOver: boolean;
    vitoria: boolean;
}

