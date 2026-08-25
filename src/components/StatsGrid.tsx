import type { GameState } from "../game/types";
import StatCard from "./StatCard";

interface StatsGridProps {
  gameState: GameState;
}

function StatsGrid({ gameState }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
      <StatCard label="Vida" value={gameState.health} />
      <StatCard label="Energia" value={gameState.energy} />
      <StatCard label="Comida" value={gameState.food} />
      <StatCard label="Recursos" value={gameState.resources} />
    </div>
  );
}

export default StatsGrid;
