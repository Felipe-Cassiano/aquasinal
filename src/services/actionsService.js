import { request } from "./api";

export function getByStage(etapa) {
  return request(`/acoes?etapa=${encodeURIComponent(etapa)}`);
}

export function create({ etapa, texto }) {
  return request("/acoes", {
    metodo: "POST",
    corpo: { etapa, texto, feito: false },
  });
}

export function update(id, dados) {
  return request(`/acoes/${id}`, { metodo: "PUT", corpo: dados });
}

export function remove(id) {
  return request(`/acoes/${id}`, { metodo: "DELETE" });
}
