export default function ActionItem({ acao }) {
  return (
    <li className="flex items-center gap-3 border-b border-slate-100 py-2.5 text-[15px]">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-xs text-white ${
          acao.feito ? "border-green-600 bg-green-600" : "border-slate-400"
        }`}
        aria-hidden="true"
      >
        {acao.feito && "✓"}
      </span>
      <span
        className={acao.feito ? "text-slate-400 line-through" : "text-slate-900"}
      >
        {acao.texto}
      </span>
      {acao.feito && <span className="sr-only">(concluída)</span>}
    </li>
  );
}
