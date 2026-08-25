import type { GameState } from "../game/types";
import ActionButton from "./ActionButton";

interface ActionButtonsProps {
  gameState: GameState;
  onRest: () => void;
  onEat: () => void;
  onWork: () => void;
  onExplore: () => void;
}

function ActionButtons({
  gameState,
  onRest,
  onEat,
  onWork,
  onExplore,
}: ActionButtonsProps) {
  const gameEnded = gameState.lose || gameState.win;
  const blockedBySequence = gameState.actionsExploration.length >= 2;

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <ActionButton
        onClick={onRest}
        disabled={gameEnded || blockedBySequence}
        color="bg-green-600"
      >
        Descansar
      </ActionButton>
      <ActionButton
        onClick={onEat}
        disabled={gameEnded || blockedBySequence || gameState.food < 1}
        color="bg-yellow-600"
      >
        Comer
      </ActionButton>
      <ActionButton
        onClick={onWork}
        disabled={gameEnded || blockedBySequence || gameState.energy < 25}
        color="bg-blue-600"
      >
        Trabalhar
      </ActionButton>
      <ActionButton onClick={onExplore} disabled={gameEnded} color="bg-purple-600">
        Explorar
      </ActionButton>
    </div>
  );
}

export default ActionButtons;
