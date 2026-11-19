import { useState, useEffect } from "react";
import * as actionsService from "../services/actionsService";
import useOnlineStatus from "./useOnlineStatus";
import useLocalStorage from "./useLocalStorage";

const MENSAGEM_BLOQUEIO = "Sem conexão. Tente novamente quando a internet voltar.";

export default function useActions(etapa) {
  const online = useOnlineStatus();
  const [cache, setCache] = useLocalStorage("aquasinal:acoes", {});
  const [acoes, setAcoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [falhou, setFalhou] = useState(false);
  const [erroAcao, setErroAcao] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  const copia = cache[etapa];
  const usandoCopia = falhou && Boolean(copia);
  const somenteLeitura = !online || usandoCopia;
  const erro =
    falhou && !copia
      ? "Não foi possível carregar as ações. Verifique sua conexão."
      : null;
  const lista = usandoCopia ? copia : acoes;

  useEffect(() => {
    let cancelado = false;

    setLoading(true);
    setFalhou(false);
    setErroAcao(null);

    if (!online) {
      setFalhou(true);
      setLoading(false);
      return undefined;
    }

    actionsService
      .getByStage(etapa)
      .then((dados) => {
        if (cancelado) return;
        const recebidas = [...dados].reverse();
        setAcoes(recebidas);
        setCache((atual) => ({ ...atual, [etapa]: recebidas }));
      })
      .catch((e) => {
        console.error(e);
        if (!cancelado) setFalhou(true);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [etapa, tentativa, online, setCache]);

  function recarregar() {
    setTentativa((valor) => valor + 1);
  }

  function atualizarCopia(transformar) {
    setCache((atual) => ({
      ...atual,
      [etapa]: transformar(atual[etapa] ?? []),
    }));
  }

  async function criar(texto) {
    if (somenteLeitura) {
      setErroAcao(MENSAGEM_BLOQUEIO);
      return false;
    }
    setErroAcao(null);
    try {
      const nova = await actionsService.create({ etapa, texto });
      setAcoes((atual) => [nova, ...atual]);
      atualizarCopia((itens) => [nova, ...itens]);
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível adicionar a ação. Tente novamente.");
      return false;
    }
  }

  async function atualizar(id, dados) {
    if (somenteLeitura) {
      setErroAcao(MENSAGEM_BLOQUEIO);
      return false;
    }
    setErroAcao(null);
    try {
      const atual = acoes.find((acao) => acao.id === id);
      const atualizada = await actionsService.update(id, { ...atual, ...dados });
      setAcoes((itens) =>
        itens.map((acao) => (acao.id === id ? atualizada : acao)),
      );
      atualizarCopia((itens) =>
        itens.map((acao) => (acao.id === id ? atualizada : acao)),
      );
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível atualizar a ação. Tente novamente.");
      return false;
    }
  }

  async function remover(id) {
    if (somenteLeitura) {
      setErroAcao(MENSAGEM_BLOQUEIO);
      return false;
    }
    setErroAcao(null);
    try {
      await actionsService.remove(id);
      setAcoes((itens) => itens.filter((acao) => acao.id !== id));
      atualizarCopia((itens) => itens.filter((acao) => acao.id !== id));
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível apagar a ação. Tente novamente.");
      return false;
    }
  }

  return {
    acoes: lista,
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
  };
}
