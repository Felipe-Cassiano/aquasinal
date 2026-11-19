import { useState, useEffect } from "react";

function ler(chave, valorInicial) {
  try {
    const salvo = localStorage.getItem(chave);
    return salvo === null ? valorInicial : JSON.parse(salvo);
  } catch {
    return valorInicial;
  }
}

export default function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => ler(chave, valorInicial));

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.error(e);
    }
  }, [chave, valor]);

  return [valor, setValor];
}
