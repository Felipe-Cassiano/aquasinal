import { Fragment } from "react";
import { ETAPAS } from "../../constants/stages";

export default function StageStepper({ etapaAtual, onChange }) {
  return (
    <nav
      aria-label="Etapas do alagamento"
      className="mx-auto flex max-w-2xl items-center px-2 py-2"
    >
      {ETAPAS.map((etapa, indice) => {
        const ativa = etapa.id === etapaAtual;

        return (
          <Fragment key={etapa.id}>
            {indice > 0 && <div className="mb-6 h-0.5 flex-1 bg-slate-300" />}

            <button
              type="button"
              onClick={() => onChange(etapa.id)}
              aria-current={ativa ? "step" : undefined}
              className="cursor-pointer flex w-24 flex-col items-center gap-1 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500"
            >
              <span className="flex h-12 items-center">
                <span
                  className={`flex items-center justify-center rounded-full font-bold transition-all ${
                    ativa
                      ? "h-12 w-12"
                      : "h-10 w-10 border-2 border-slate-300 bg-white text-slate-500"
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
                className={`text-sm ${ativa ? "font-bold" : "text-slate-500"}`}
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
