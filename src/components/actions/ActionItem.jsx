import { useState } from "react";
import Button from "../ui/Button";

export default function ActionItem({ acao, onAtualizar }) {
  const [editando, setEditando] = useState(false);
  const [textoEdicao, setTextoEdicao] = useState(acao.texto);
  const [salvando, setSalvando] = useState(false);

  async function alternarFeito() {
    setSalvando(true);
    await onAtualizar(acao.id, { feito: !acao.feito });
    setSalvando(false);
  }

  function iniciarEdicao() {
    setTextoEdicao(acao.texto);
    setEditando(true);
  }

  function cancelarEdicao() {
    setEditando(false);
  }

  async function salvarEdicao(evento) {
    evento.preventDefault();
    const limpo = textoEdicao.trim();
    if (!limpo) return;

    if (limpo === acao.texto) {
      setEditando(false);
      return;
    }

    setSalvando(true);
    const deuCerto = await onAtualizar(acao.id, { texto: limpo });
    setSalvando(false);

    if (deuCerto) setEditando(false);
  }

  return (
    <li className="flex items-center gap-3 border-b border-slate-100 py-2.5 text-[15px]">
      <button
        type="button"
        role="checkbox"
        aria-checked={acao.feito}
        aria-label={acao.texto}
        onClick={alternarFeito}
        disabled={salvando}
        className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border-2 text-xs text-white disabled:cursor-wait disabled:opacity-60 ${
          acao.feito ? "border-green-600 bg-green-600" : "border-slate-400"
        }`}
      >
        {acao.feito && "✓"}
      </button>

      {editando ? (
        <form
          onSubmit={salvarEdicao}
          className="flex min-w-0 flex-1 items-center gap-2"
        >
          <input
            type="text"
            value={textoEdicao}
            onChange={(evento) => setTextoEdicao(evento.target.value)}
            onKeyDown={(evento) => {
              if (evento.key === "Escape") cancelarEdicao();
            }}
            maxLength={120}
            autoFocus
            aria-label="Editar ação"
            disabled={salvando}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-slate-500 disabled:bg-slate-100"
          />
          <Button
            type="submit"
            tamanho="sm"
            disabled={salvando || !textoEdicao.trim()}
          >
            Salvar
          </Button>
          <Button
            variante="contorno"
            tamanho="sm"
            onClick={cancelarEdicao}
            disabled={salvando}
          >
            Cancelar
          </Button>
        </form>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 break-words ${
              acao.feito ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {acao.texto}
          </span>
          <Button
            variante="contorno"
            tamanho="sm"
            onClick={iniciarEdicao}
            aria-label={`Editar: ${acao.texto}`}
          >
            Editar
          </Button>
        </>
      )}
    </li>
  );
}
