import { useState } from "react";
import StageStepper from "./components/stage/StageStepper";
import StagePanel from "./components/stage/StagePanel";
import Button from "./components/ui/Button";
import { ETAPA_INICIAL } from "./constants/stages";

export default function App() {
  const [etapaId, setEtapaId] = useState(ETAPA_INICIAL);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <StageStepper etapaAtual={etapaId} onChange={setEtapaId} />

      <div className="mt-6">
        <StagePanel
          etapaId={etapaId}
          direita={
            <div className="rounded-2xl bg-white p-6 text-slate-700">
              Área do mapa (Etapa 13)
            </div>
          }
        >
          <div className="rounded-2xl bg-white p-4 text-slate-900">
            <p className="mb-3 font-semibold">Área do plano de ação (Etapa 7)</p>
            <Button>+ Adicionar</Button>
          </div>
        </StagePanel>
      </div>
    </div>
  );
}
