import { getEtapa } from "../../constants/stages";
import { getMapa, NOTA_MAPA } from "../../constants/routes";

export default function SafeRouteCard({ etapaId }) {
  const { cores } = getEtapa(etapaId);
  const mapa = getMapa(etapaId);

  return (
    <section
      aria-labelledby="titulo-legenda"
      className="rounded-2xl border border-black/10 bg-white p-4 text-slate-900"
    >
      <h3 id="titulo-legenda" className="mb-3 text-lg font-semibold">
        {mapa.titulo}
      </h3>

      <ul>
        {mapa.itens.map((item) => (
          <li
            key={item.numero}
            className="flex items-center gap-3 border-b border-slate-100 py-2.5 last:border-b-0"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: cores.ponto, color: cores.textoPonto }}
            >
              {item.numero}
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold">{item.nome}</p>
              <p className="text-sm text-slate-600">{item.detalhe}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-slate-500">{NOTA_MAPA}</p>
    </section>
  );
}
