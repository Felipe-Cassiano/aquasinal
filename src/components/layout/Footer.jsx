import { INTEGRANTES } from "../../constants/config";

export default function Footer() {
  return (
    <footer className="pt-4 text-center text-xs text-slate-500">
      <p className="font-medium">AquaSinal · Global Solution 2026.2 · FIAP</p>
      <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRANTES.map((integrante) => (
          <li key={integrante.rm}>
            {integrante.nome} · RM {integrante.rm}
          </li>
        ))}
      </ul>
    </footer>
  );
}
