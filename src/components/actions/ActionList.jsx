import ActionItem from "./ActionItem";
import ActionForm from "./ActionForm";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function ActionList({
  acoes,
  loading,
  erro,
  erroAcao,
  usandoCopia,
  somenteLeitura,
  onCriar,
  onAtualizar,
  onRemover,
  onTentarNovamente,
}) {
  const vazio = !loading && !erro && acoes.length === 0;
  const temLista = !loading && !erro && acoes.length > 0;

  return (
    <section
      aria-labelledby="titulo-plano"
      className="flex flex-col rounded-2xl border border-black/10 bg-white p-4 text-slate-900"
    >
      <h3 id="titulo-plano" className="mb-3 text-lg font-semibold">
        Meu plano de ação
      </h3>

      <ActionForm
        onCriar={onCriar}
        desabilitado={loading || Boolean(erro) || somenteLeitura}
      />

      {usandoCopia && (
        <div className="mb-3">
          <ErrorMessage
            tipo="aviso"
            mensagem="Mostrando a última lista salva neste navegador. Alterações ficam bloqueadas até a conexão voltar."
          />
        </div>
      )}

      {erroAcao && (
        <div className="mb-3">
          <ErrorMessage mensagem={erroAcao} />
        </div>
      )}

      <div className="h-80 overflow-y-scroll border-t border-slate-100 pr-2 [scrollbar-color:var(--cor-destaque,#94a3b8)_#e2e8f0]">
        {loading && <Loading />}
        {erro && (
          <ErrorMessage mensagem={erro} onTentarNovamente={onTentarNovamente} />
        )}
        {vazio && (
          <p className="py-6 text-sm text-slate-500">
            Nenhuma ação ainda. Adicione a primeira.
          </p>
        )}
        {temLista && (
          <ul>
            {acoes.map((acao) => (
              <ActionItem
                key={acao.id}
                acao={acao}
                bloqueado={somenteLeitura}
                onAtualizar={onAtualizar}
                onRemover={onRemover}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
