import { useState } from "react";
import StageStepper from "./components/stage/StageStepper";
import { ETAPA_INICIAL, getEtapa } from "./constants/stages";

export default function App() {
  const [etapaId, setEtapaId] = useState(ETAPA_INICIAL);
  const etapa = getEtapa(etapaId);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <StageStepper etapaAtual={etapaId} onChange={setEtapaId} />

      <div
        className="mt-6 rounded-3xl border-2 p-8"
        style={{
          backgroundColor: etapa.cores.fundo,
          borderColor: etapa.cores.borda,
          color: etapa.cores.texto,
        }}
      >
        <h2 className="text-6xl font-bold">{etapa.rotulo}</h2>
        <p className="mt-2 text-xl font-medium">{etapa.subtitulo}</p>
      </div>
    </div>
  );
}
