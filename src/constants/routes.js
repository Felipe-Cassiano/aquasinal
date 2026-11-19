import mapaAntes from "../assets/mapa-antes.png";
import mapaDurante from "../assets/mapa-durante.png";
import mapaDepois from "../assets/mapa-depois.png";

export const MAPAS = {
  antes: {
    imagem: mapaAntes,
    alt: "Diagrama com três áreas de risco ligadas ao ponto onde você está",
    titulo: "Áreas de risco na região",
    itens: [
      { numero: 1, nome: "Área de risco 1", detalhe: "Margem de córrego. Alaga primeiro." },
      { numero: 2, nome: "Área de risco 2", detalhe: "Baixada sem escoamento." },
      { numero: 3, nome: "Área de risco 3", detalhe: "Rua em declive, com água acumulada." },
    ],
  },
  durante: {
    imagem: mapaDurante,
    alt: "Diagrama com três rotas seguras saindo do ponto onde você está e duas zonas alagadas a evitar",
    titulo: "Rotas seguras",
    itens: [
      { numero: 1, nome: "Você → Abrigo Central", detalhe: "Rota principal, em terreno alto." },
      { numero: 2, nome: "Você → Ponto Alto Sul", detalhe: "Rota alternativa." },
      { numero: 3, nome: "Você → Escola Municipal", detalhe: "Rota alternativa, mais curta." },
    ],
  },
  depois: {
    imagem: mapaDepois,
    alt: "Diagrama com três pontos de apoio ligados ao ponto onde você está",
    titulo: "Pontos de apoio",
    itens: [
      { numero: 1, nome: "Posto de saúde", detalhe: "Atendimento e vacinação." },
      { numero: 2, nome: "Abrigo temporário", detalhe: "Água, comida e doações." },
      { numero: 3, nome: "Defesa Civil", detalhe: "Cadastro e vistoria da casa." },
    ],
  },
};

export const NOTA_MAPA = "Diagrama ilustrativo, dados fictícios.";

export function getMapa(id) {
  return MAPAS[id];
}
