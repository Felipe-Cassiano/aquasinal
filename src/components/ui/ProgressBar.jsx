export default function ProgressBar({ feitas, total, porcentagem }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
        <span>
          {feitas} de {total} {feitas === 1 ? "feita" : "feitas"}
        </span>
        <span className="font-semibold">{porcentagem}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso do plano de ação"
        aria-valuenow={porcentagem}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-[var(--cor-destaque,#0f172a)] transition-all duration-300"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
}
