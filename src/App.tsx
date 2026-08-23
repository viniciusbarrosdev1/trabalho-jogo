import { useState, useCallback, useEffect } from "react";
import type { GameState } from "./types";

const ESTADO_INICIAL: GameState = {
  vida: 100,
  energia: 100,
  comida: 5,
  recursos: 0,
  historico: [],
  acoesDesdeExploracao: [],
  gameOver: false,
  vitoria: false,
};

const CHAVE_LOCALSTORAGE = "jogo-sobrevivencia";

// Roda 1 vez, antes do primeiro render, pra já iniciar o estado com o save
// existente (se houver). Evita o efeito separado de "carregar", que corria
// numa condição de corrida com o efeito de "salvar" no StrictMode do dev.
function carregarEstadoSalvo(): GameState {
  const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);

  if (!dadosSalvos) {
    return ESTADO_INICIAL;
  }

  try {
    return JSON.parse(dadosSalvos);
  } catch {
    return ESTADO_INICIAL;
  }
}

// Função pura, fora do componente: recebe o estado já calculado por uma ação
// e decide se o jogo deve terminar (derrota ou vitória).
function verificarFimDeJogo(estado: GameState): GameState {
  if (estado.vida <= 0 || estado.energia <= 0) {
    return {
      ...estado,
      vida: Math.max(estado.vida, 0),
      energia: Math.max(estado.energia, 0),
      gameOver: true,
    };
  }

  if (estado.recursos >= 50) {
    return {
      ...estado,
      vitoria: true,
    };
  }

  return estado;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(carregarEstadoSalvo);

  // Roda toda vez que gameState mudar: salva o estado atual.
  useEffect(() => {
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(gameState));
  }, [gameState]);

  const resetarDados = useCallback(() => {
    setGameState(ESTADO_INICIAL);
  }, []);

  const descansar = useCallback(() => {
    setGameState((estadoAnterior) =>
      verificarFimDeJogo({
        ...estadoAnterior,
        energia: Math.min(estadoAnterior.energia + 30, 100),
        vida: Math.min(estadoAnterior.vida + 5, 100),
        historico: [
          ...estadoAnterior.historico,
          "Você descansou e recuperou suas forças.",
        ],
        acoesDesdeExploracao: [
          ...estadoAnterior.acoesDesdeExploracao,
          "Descansar",
        ],
      }),
    );
  }, []);

  const comer = useCallback(() => {
    setGameState((estadoAnterior) => {
      if (estadoAnterior.comida < 1) {
        return estadoAnterior;
      }

      return verificarFimDeJogo({
        ...estadoAnterior,
        vida: Math.min(estadoAnterior.vida + 20, 100),
        comida: estadoAnterior.comida - 1,
        historico: [
          ...estadoAnterior.historico,
          "Você comeu e recuperou parte da sua vida.",
        ],
        acoesDesdeExploracao: [...estadoAnterior.acoesDesdeExploracao, "Comer"],
      });
    });
  }, []);

  const trabalhar = useCallback(() => {
    setGameState((estadoAnterior) => {
      if (estadoAnterior.energia < 25) {
        return estadoAnterior;
      }

      return verificarFimDeJogo({
        ...estadoAnterior,
        recursos: estadoAnterior.recursos + 10,
        energia: estadoAnterior.energia - 25,
        historico: [
          ...estadoAnterior.historico,
          "Você trabalhou e conseguiu obter novos recursos.",
        ],
        acoesDesdeExploracao: [
          ...estadoAnterior.acoesDesdeExploracao,
          "Trabalhar",
        ],
      });
    });
  }, []);

  const explorar = useCallback(() => {
    setGameState((estadoAnterior) => {
      const indiceSorteado = Math.floor(Math.random() * 5);

      switch (indiceSorteado) {
        case 0: // Encontrar comida
          return verificarFimDeJogo({
            ...estadoAnterior,
            comida: estadoAnterior.comida + 2,
            historico: [
              ...estadoAnterior.historico,
              "Você encontrou comida abandonada!",
            ],
            acoesDesdeExploracao: [],
          });

        case 1: // Encontrar recursos
          return verificarFimDeJogo({
            ...estadoAnterior,
            recursos: estadoAnterior.recursos + 10,
            historico: [
              ...estadoAnterior.historico,
              "Você encontrou madeira e outros materiais úteis.",
            ],
            acoesDesdeExploracao: [],
          });

        case 2: // Perder vida
          return verificarFimDeJogo({
            ...estadoAnterior,
            vida: estadoAnterior.vida - 45,
            historico: [
              ...estadoAnterior.historico,
              "Você sofreu um acidente durante a exploração.",
            ],
            acoesDesdeExploracao: [],
          });

        case 3: // Perder energia
          return verificarFimDeJogo({
            ...estadoAnterior,
            energia: estadoAnterior.energia - 40,
            historico: [
              ...estadoAnterior.historico,
              "Você ficou exausto durante a exploração.",
            ],
            acoesDesdeExploracao: [],
          });

        default: // Nada acontece (índice 4)
          return verificarFimDeJogo({
            ...estadoAnterior,
            historico: [
              ...estadoAnterior.historico,
              "Você explorou a região, mas não encontrou nada.",
            ],
            acoesDesdeExploracao: [],
          });
      }
    });
  }, []);

  const jogoEncerrado = gameState.gameOver || gameState.vitoria;
  const bloqueadoPelaSequencia = gameState.acoesDesdeExploracao.length >= 2;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Desafio de Sobrevivência</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-400">Vida</p>
          <p className="text-2xl font-bold">{gameState.vida}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-400">Energia</p>
          <p className="text-2xl font-bold">{gameState.energia}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-400">Comida</p>
          <p className="text-2xl font-bold">{gameState.comida}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-400">Recursos</p>
          <p className="text-2xl font-bold">{gameState.recursos}</p>
        </div>
      </div>

      {gameState.vitoria && (
        <p className="bg-green-700 rounded-xl p-4 text-center max-w-2xl w-full font-bold">
          Você venceu! Conseguiu reunir 50 recursos.
        </p>
      )}

      {gameState.gameOver && (
        <p className="bg-red-700 rounded-xl p-4 text-center max-w-2xl w-full font-bold">
          Game Over! Você não conseguiu sobreviver.
        </p>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={descansar}
          disabled={jogoEncerrado || bloqueadoPelaSequencia}
          className="bg-green-600 disabled:bg-slate-700 disabled:text-slate-400 p-4 rounded-xl"
        >
          Descansar
        </button>
        <button
          onClick={comer}
          disabled={jogoEncerrado || bloqueadoPelaSequencia || gameState.comida < 1}
          className="bg-yellow-600 disabled:bg-slate-700 disabled:text-slate-400 p-4 rounded-xl"
        >
          Comer
        </button>
        <button
          onClick={trabalhar}
          disabled={
            jogoEncerrado || bloqueadoPelaSequencia || gameState.energia < 25
          }
          className="bg-blue-600 disabled:bg-slate-700 disabled:text-slate-400 p-4 rounded-xl"
        >
          Trabalhar
        </button>
        <button
          onClick={explorar}
          disabled={jogoEncerrado}
          className="bg-purple-600 disabled:bg-slate-700 disabled:text-slate-400 p-4 rounded-xl"
        >
          Explorar
        </button>
      </div>

      {jogoEncerrado && (
        <button
          onClick={resetarDados}
          className="bg-slate-100 text-slate-900 font-bold p-4 rounded-xl"
        >
          Iniciar Nova Partida
        </button>
      )}

      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Histórico</h2>
        <ul className="bg-slate-800 rounded-xl p-4 flex flex-col gap-1 max-h-64 overflow-y-auto">
          {gameState.historico.map((mensagem, indice) => (
            <li key={indice} className="text-sm text-slate-300">
              {indice + 1} - {mensagem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
