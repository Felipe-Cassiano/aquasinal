import GuidanceCard from "./GuidanceCard";
import { getEtapa } from "../../constants/stages";
import { ORIENTACOES } from "../../constants/guidance";

export default function StagePanel({ etapaId, children, direita }) {
  const etapa = getEtapa(etapaId);
  const orientacoes = ORIENTACOES[etapaId];

  return (
    <section
      aria-labelledby="titulo-etapa"
      className="rounded-3xl border-2 p-5 sm:p-8"
      style={{
        backgroundColor: etapa.cores.fundo,
        borderColor: etapa.cores.borda,
        color: etapa.cores.texto,
        "--cor-destaque": etapa.cores.destaque,
        "--cor-texto-destaque": etapa.cores.textoDestaque,
      }}
    >
      <div className={`grid gap-6 ${direita ? "lg:grid-cols-[5fr_4fr]" : ""}`}>
        <div className="flex min-w-0 flex-col gap-4">
          <header>
            <h2
              id="titulo-etapa"
              className="text-6xl font-bold leading-none tracking-tight sm:text-[84px]"
            >
              {etapa.rotulo}
            </h2>
            <p className="mt-2 text-lg font-medium sm:text-xl">
              {etapa.subtitulo}
            </p>
          </header>

          <ul className="flex flex-col gap-2">
            {orientacoes.map((orientacao) => (
              <GuidanceCard key={orientacao.titulo} {...orientacao} />
            ))}
          </ul>

          {children}
        </div>

        {direita}
      </div>
    </section>
  );
}
