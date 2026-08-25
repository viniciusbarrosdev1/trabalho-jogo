interface GameStatusBannerProps {
  win: boolean;
  lose: boolean;
}

function GameStatusBanner({ win, lose }: GameStatusBannerProps) {
  if (!win && !lose) {
    return null;
  }

  if (win) {
    return (
      <p className="bg-green-700 rounded-xl p-4 text-center max-w-2xl w-full font-bold">
        Você venceu! Conseguiu reunir 50 recursos.
      </p>
    );
  }

  return (
    <p className="bg-red-700 rounded-xl p-4 text-center max-w-2xl w-full font-bold">
      Game Over! Você não conseguiu sobreviver.
    </p>
  );
}

export default GameStatusBanner;
