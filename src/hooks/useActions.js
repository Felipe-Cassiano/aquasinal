import { useState, useEffect } from "react";
import * as actionsService from "../services/actionsService";

export default function useActions(etapa) {
  const [acoes, setAcoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroAcao, setErroAcao] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    setLoading(true);
    setErro(null);
    setErroAcao(null);

    actionsService
      .getByStage(etapa)
      .then((dados) => {
        if (!cancelado) setAcoes([...dados].reverse());
      })
      .catch((e) => {
        console.error(e);
        if (!cancelado) {
          setErro("Não foi possível carregar as ações. Verifique sua conexão.");
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [etapa, tentativa]);

  function recarregar() {
    setTentativa((valor) => valor + 1);
  }

  async function criar(texto) {
    setErroAcao(null);
    try {
      const nova = await actionsService.create({ etapa, texto });
      setAcoes((atual) => [nova, ...atual]);
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível adicionar a ação. Tente novamente.");
      return false;
    }
  }

  async function atualizar(id, dados) {
    setErroAcao(null);
    try {
      const atual = acoes.find((acao) => acao.id === id);
      const atualizada = await actionsService.update(id, { ...atual, ...dados });
      setAcoes((lista) =>
        lista.map((acao) => (acao.id === id ? atualizada : acao)),
      );
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível atualizar a ação. Tente novamente.");
      return false;
    }
  }

  async function remover(id) {
    setErroAcao(null);
    try {
      await actionsService.remove(id);
      setAcoes((lista) => lista.filter((acao) => acao.id !== id));
      return true;
    } catch (e) {
      console.error(e);
      setErroAcao("Não foi possível apagar a ação. Tente novamente.");
      return false;
    }
  }

  return {
    acoes,
    loading,
    erro,
    erroAcao,
    recarregar,
    criar,
    atualizar,
    remover,
  };
}
