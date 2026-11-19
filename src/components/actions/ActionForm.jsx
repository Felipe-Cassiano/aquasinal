import { useState } from "react";
import Button from "../ui/Button";

export default function ActionForm({ onCriar, desabilitado }) {
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function aoEnviar(evento) {
    evento.preventDefault();
    const limpo = texto.trim();
    if (!limpo) return;

    setEnviando(true);
    const deuCerto = await onCriar(limpo);
    setEnviando(false);

    if (deuCerto) setTexto("");
  }

  return (
    <form onSubmit={aoEnviar} className="mb-3 flex gap-2">
      <input
        type="text"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Adicionar uma nova ação…"
        maxLength={120}
        aria-label="Nova ação"
        disabled={desabilitado || enviando}
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-slate-500 disabled:bg-slate-100"
      />
      <Button
        type="submit"
        className="shrink-0"
        disabled={desabilitado || enviando || !texto.trim()}
      >
        {enviando ? "Adicionando..." : "+ Adicionar"}
      </Button>
    </form>
  );
}
