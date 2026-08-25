interface ResetButtonProps {
  onReset: () => void;
}

function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className="bg-slate-100 text-slate-900 font-bold p-4 rounded-xl"
    >
      Iniciar Nova Partida
    </button>
  );
}

export default ResetButton;
