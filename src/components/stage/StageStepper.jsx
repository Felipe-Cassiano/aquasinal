import { Fragment } from "react";
import { ETAPAS } from "../../constants/stages";

export default function StageStepper({ etapaAtual, onChange }) {
  return (
    <nav
      aria-label="Etapas do alagamento"
      className="mx-auto flex w-full max-w-2xl items-center gap-1 px-2 py-2 sm:gap-2"
    >
      {ETAPAS.map((etapa, indice) => {
        const ativa = etapa.id === etapaAtual;

        return (
          <Fragment key={etapa.id}>
            {indice > 0 && (
              <div className="mb-6 h-0.5 min-w-4 flex-1 bg-slate-300" />
            )}

            <button
              type="button"
              onClick={() => onChange(etapa.id)}
              aria-current={ativa ? "step" : undefined}
              className="cursor-pointer flex w-24 min-w-0 flex-col items-center gap-1 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500"
            >
              <span className="flex h-9 items-center sm:h-12">
                <span
                  className={`flex items-center justify-center rounded-full font-bold transition-all ${
                    ativa
                      ? "h-9 w-9 sm:h-12 sm:w-12"
                      : "h-8 w-8 border-2 border-slate-300 bg-white text-slate-500 sm:h-10 sm:w-10"
                  }`}
                  style={
                    ativa
                      ? {
                          backgroundColor: etapa.cores.ponto,
                          color: etapa.cores.textoPonto,
                        }
                      : undefined
                  }
                >
                  {etapa.numero}
                </span>
              </span>

              <span
                className={`truncate text-xs sm:text-sm ${ativa ? "font-bold" : "text-slate-500"}`}
                style={ativa ? { color: etapa.cores.texto } : undefined}
              >
                {etapa.rotulo}
              </span>
            </button>
          </Fragment>
        );
      })}
    </nav>
  );
}
