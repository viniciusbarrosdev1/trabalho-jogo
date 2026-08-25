import { useState, useCallback, useEffect } from "react";
import type { GameState } from "../game/types";
import { INITIAL_DATA } from "../game/constants";
import { loadSavedStorage, saveState } from "../game/storage";
import {
  rest as restLogic,
  eat as eatLogic,
  work as workLogic,
  explore as exploreLogic,
} from "../game/logic";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(loadSavedStorage);

  useEffect(() => {
    saveState(gameState);
  }, [gameState]);

  const rest = useCallback(() => setGameState(restLogic), []);
  const eat = useCallback(() => setGameState(eatLogic), []);
  const work = useCallback(() => setGameState(workLogic), []);
  const explore = useCallback(() => setGameState(exploreLogic), []);

  const reset = useCallback(() => {
    setGameState(INITIAL_DATA);
  }, []);

  return { gameState, rest, eat, work, explore, reset };
}