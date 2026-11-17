const API_URL = import.meta.env.VITE_API_URL;

export async function request(caminho, { metodo = "GET", corpo } = {}) {
  if (!API_URL) {
    throw new Error("VITE_API_URL não está definida no .env");
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    method: metodo,
    headers: corpo ? { "Content-Type": "application/json" } : undefined,
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao acessar a API`);
  }

  return resposta.json();
}
