import type { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  color: string;
  children: ReactNode;
}

function ActionButton({ onClick, disabled, color, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color} disabled:bg-slate-700 disabled:text-slate-400 p-4 rounded-xl`}
    >
      {children}
    </button>
  );
}

export default ActionButton;
