interface HistoryListProps {
  history: string[];
}

function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-2">Histórico</h2>
      <ul className="bg-slate-800 rounded-xl p-4 flex flex-col gap-1 max-h-64 overflow-y-auto">
        {history.map((message, index) => (
          <li key={index} className="text-sm text-slate-300">
            {index + 1} - {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
