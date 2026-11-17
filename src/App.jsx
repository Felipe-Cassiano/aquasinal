import { useEffect } from "react";
import * as actionsService from "./services/actionsService";

export default function App() {
  useEffect(() => {
    async function testar() {
      const lista = await actionsService.getByStage("durante");
      console.log("READ:", lista.length, "itens", lista[0]);

      const novo = await actionsService.create({
        etapa: "antes",
        texto: "Item de teste",
      });
      console.log("CREATE:", novo);

      const editado = await actionsService.update(novo.id, { feito: true });
      console.log("UPDATE:", editado);

      const apagado = await actionsService.remove(novo.id);
      console.log("DELETE:", apagado);
    }

    testar().catch((erro) => console.error("FALHOU:", erro.message));
  }, []);

  return <h1 className="p-4 text-2xl font-semibold">AquaSinal</h1>;
}
