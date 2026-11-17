import Button from "./components/ui/Button";
import Loading from "./components/ui/Loading";
import ErrorMessage from "./components/ui/ErrorMessage";

export default function App() {
  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Teste dos componentes de UI</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => console.log("clicou")}>Primário</Button>
        <Button variante="contorno">Contorno</Button>
        <Button variante="contorno" tamanho="sm">Pequeno</Button>
        <Button disabled>Desabilitado</Button>
      </div>

      <div className="flex gap-3" style={{ "--cor-destaque": "#d62828" }}>
        <Button>Vermelho (Durante)</Button>
      </div>
      <div className="flex gap-3" style={{ "--cor-destaque": "#2e9e5b" }}>
        <Button>Verde (Depois)</Button>
      </div>

      <Loading />

      <ErrorMessage mensagem="Não foi possível carregar as ações." />
      <ErrorMessage
        mensagem="Algo falhou. Tente de novo."
        onTentarNovamente={() => console.log("tentar novamente")}
      />
      <ErrorMessage tipo="aviso" mensagem="Você está sem conexão." />
    </div>
  );
}
