export function calcularProgresso(acoes) {
  const total = acoes.length;
  const feitas = acoes.filter((acao) => acao.feito).length;
  const porcentagem = total === 0 ? 0 : Math.round((feitas / total) * 100);

  return { total, feitas, porcentagem };
}
