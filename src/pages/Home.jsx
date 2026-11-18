import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StageStepper from "../components/stage/StageStepper";
import StagePanel from "../components/stage/StagePanel";
import ActionList from "../components/actions/ActionList";
import ErrorMessage from "../components/ui/ErrorMessage";
import useActions from "../hooks/useActions";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { ETAPA_INICIAL } from "../constants/stages";

export default function Home() {
  const [etapaId, setEtapaId] = useState(ETAPA_INICIAL);
  const online = useOnlineStatus();
  const {
    acoes,
    loading,
    erro,
    erroAcao,
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
          mensagem="Você está sem conexão. Algumas ações podem não funcionar até a internet voltar."
        />
      )}
      <StageStepper etapaAtual={etapaId} onChange={setEtapaId} />
      <main className="flex-1">
        <StagePanel etapaId={etapaId}>
          <ActionList
            acoes={acoes}
            loading={loading}
            erro={erro}
            erroAcao={erroAcao}
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
