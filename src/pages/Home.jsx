import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StageStepper from "../components/stage/StageStepper";
import StagePanel from "../components/stage/StagePanel";
import ActionList from "../components/actions/ActionList";
import useActions from "../hooks/useActions";
import { ETAPA_INICIAL } from "../constants/stages";

export default function Home() {
  const [etapaId, setEtapaId] = useState(ETAPA_INICIAL);
  const { acoes, loading, erro, recarregar } = useActions(etapaId);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 sm:p-6">
      <Header />
      <StageStepper etapaAtual={etapaId} onChange={setEtapaId} />
      <main className="flex-1">
        <StagePanel etapaId={etapaId}>
          <ActionList
            acoes={acoes}
            loading={loading}
            erro={erro}
            onTentarNovamente={recarregar}
          />
        </StagePanel>
      </main>
      <Footer />
    </div>
  );
}
