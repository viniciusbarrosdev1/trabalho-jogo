import { useGameState } from "../hooks/useGameState";
import StatsGrid from "../components/StatsGrid";
import GameStatusBanner from "../components/GameStatusBanner";
import ActionButtons from "../components/ActionButtons";
import ResetButton from "../components/ResetButton";
import HistoryList from "../components/HistoryList";

function Jogo() {
  const { gameState, rest, eat, work, explore, reset } = useGameState();
  const gameEnded = gameState.lose || gameState.win;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Desafio de Sobrevivência</h1>

      <StatsGrid gameState={gameState} />

      <GameStatusBanner win={gameState.win} lose={gameState.lose} />

      <ActionButtons
        gameState={gameState}
        onRest={rest}
        onEat={eat}
        onWork={work}
        onExplore={explore}
      />

      {gameEnded && <ResetButton onReset={reset} />}

      <HistoryList history={gameState.history} />
    </div>
  );
}

export default Jogo;
