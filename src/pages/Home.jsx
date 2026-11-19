import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StageStepper from "../components/stage/StageStepper";
import StagePanel from "../components/stage/StagePanel";
import RouteMap from "../components/stage/RouteMap";
import ActionList from "../components/actions/ActionList";
import ErrorMessage from "../components/ui/ErrorMessage";
import useActions from "../hooks/useActions";
import { ETAPA_INICIAL } from "../constants/stages";

export default function Home() {
  const [etapaId, setEtapaId] = useState(ETAPA_INICIAL);
  const {
    acoes,
    loading,
    erro,
    erroAcao,
    online,
    usandoCopia,
    somenteLeitura,
    recarregar,
    criar,
    atualizar,
    remover,
  } = useActions(etapaId);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 sm:p-6">
      <Header />
      {!online && (
        <ErrorMessage
          tipo="aviso"
          mensagem="Você está sem conexão. Criar, editar e apagar ficam bloqueados até a internet voltar."
        />
      )}
      <StageStepper etapaAtual={etapaId} onChange={setEtapaId} />
      <main className="flex-1">
        <StagePanel etapaId={etapaId} direita={<RouteMap etapaId={etapaId} />}>
          <ActionList
            acoes={acoes}
            loading={loading}
            erro={erro}
            erroAcao={erroAcao}
            usandoCopia={usandoCopia}
            somenteLeitura={somenteLeitura}
            onCriar={criar}
            onAtualizar={atualizar}
            onRemover={remover}
            onTentarNovamente={recarregar}
          />
        </StagePanel>
      </main>
      <Footer />
    </div>
  );
}
