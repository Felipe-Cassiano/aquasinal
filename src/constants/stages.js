export const ETAPAS = [
  {
    id: "antes",
    numero: 1,
    rotulo: "Antes",
    subtitulo: "Prevenção: prepare-se antes da chuva chegar",
    cores: {
      fundo: "#fff7d9",
      borda: "#efd36a",
      texto: "#7a5600",
      destaque: "#e0a800",
      textoDestaque: "#3b2a00",
      ponto: "#f2c230",
      textoPonto: "#3b2a00",
    },
  },
  {
    id: "durante",
    numero: 2,
    rotulo: "Durante",
    subtitulo: "Segurança: proteja-se agora",
    cores: {
      fundo: "#fdecec",
      borda: "#f3a6a6",
      texto: "#9b1c1c",
      destaque: "#d62828",
      textoDestaque: "#ffffff",
      ponto: "#d62828",
      textoPonto: "#ffffff",
    },
  },
  {
    id: "depois",
    numero: 3,
    rotulo: "Depois",
    subtitulo: "Recuperação: cuide da saúde e da limpeza",
    cores: {
      fundo: "#e6f6ec",
      borda: "#9bd5b0",
      texto: "#1d6b3a",
      destaque: "#2e9e5b",
      textoDestaque: "#ffffff",
      ponto: "#2e9e5b",
      textoPonto: "#ffffff",
    },
  },
];

export const ETAPA_INICIAL = "antes";

export function getEtapa(id) {
  return ETAPAS.find((etapa) => etapa.id === id);
}
