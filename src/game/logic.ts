import type { GameState } from "./types";

export function checkGameOver(state: GameState): GameState {
  if (state.health <= 0 || state.energy <= 0) {
    return {
      ...state,
      health: Math.max(state.health, 0),
      energy: Math.max(state.energy, 0),
      lose: true,
    };
  }

  if (state.resources >= 50) {
    return {
      ...state,
      win: true,
    };
  }

  return state;
}

export function rest(state: GameState): GameState {
  return checkGameOver({
    ...state,
    energy: Math.min(state.energy + 30, 100),
    health: Math.min(state.health + 5, 100),
    history: [...state.history, "Você descansou e recuperou suas forças."],
    actionsExploration: [...state.actionsExploration, "Descansar"],
  });
}

export function eat(state: GameState): GameState {
  if (state.food < 1) {
    return state;
  }

  return checkGameOver({
    ...state,
    health: Math.min(state.health + 20, 100),
    food: state.food - 1,
    history: [...state.history, "Você comeu e recuperou parte da sua vida."],
    actionsExploration: [...state.actionsExploration, "Comer"],
  });
}

export function work(state: GameState): GameState {
  if (state.energy < 25) {
    return state;
  }

  return checkGameOver({
    ...state,
    resources: state.resources + 10,
    energy: state.energy - 25,
    history: [...state.history, "Você trabalhou e conseguiu obter novos recursos."],
    actionsExploration: [...state.actionsExploration, "Trabalhar"],
  });
}

export function explore(state: GameState): GameState {
  const roll = Math.floor(Math.random() * 5);

  switch (roll) {
    case 0:
      return checkGameOver({
        ...state,
        food: state.food + 2,
        history: [...state.history, "Você encontrou comida abandonada!"],
        actionsExploration: [],
      });

    case 1:
      return checkGameOver({
        ...state,
        resources: state.resources + 10,
        history: [...state.history, "Você encontrou madeira e outros materiais úteis."],
        actionsExploration: [],
      });

    case 2:
      return checkGameOver({
        ...state,
        health: state.health - 45,
        history: [...state.history, "Você sofreu um acidente durante a exploração."],
        actionsExploration: [],
      });

    case 3:
      return checkGameOver({
        ...state,
        energy: state.energy - 40,
        history: [...state.history, "Você ficou exausto durante a exploração."],
        actionsExploration: [],
      });

    default:
      return checkGameOver({
        ...state,
        history: [...state.history, "Você explorou a região, mas não encontrou nada."],
        actionsExploration: [],
      });
  }
}