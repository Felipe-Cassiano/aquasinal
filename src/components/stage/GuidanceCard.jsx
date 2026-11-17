const prioridades = {
  alta: {
    rotulo: "Alta",
    ponto: "bg-red-600",
    selo: "bg-red-100 text-red-800",
  },
  media: {
    rotulo: "Média",
    ponto: "bg-amber-500",
    selo: "bg-amber-100 text-amber-800",
  },
  normal: {
    rotulo: "Normal",
    ponto: "bg-blue-600",
    selo: "bg-blue-100 text-blue-800",
  },
};

export default function GuidanceCard({ titulo, descricao, prioridade }) {
  const estilo = prioridades[prioridade];

  return (
    <li className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/75 px-3 py-2">
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${estilo.ponto}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-3">
        <p className="font-semibold text-slate-900">{titulo}</p>
        <p className="text-sm text-slate-500">{descricao}</p>
      </div>
      <span
        className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${estilo.selo}`}
      >
        {estilo.rotulo}
      </span>
    </li>
  );
}
