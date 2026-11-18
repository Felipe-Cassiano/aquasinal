import { useState, useEffect } from "react";
import * as actionsService from "../services/actionsService";

export default function useActions(etapa) {
  const [acoes, setAcoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    setLoading(true);
    setErro(null);

    actionsService
      .getByStage(etapa)
      .then((dados) => {
        if (!cancelado) setAcoes(dados);
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

  return { acoes, loading, erro, recarregar };
}
