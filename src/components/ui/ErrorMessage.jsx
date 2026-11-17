import Button from "./Button";

const tipos = {
  erro: "border-red-200 bg-red-50 text-red-800",
  aviso: "border-amber-200 bg-amber-50 text-amber-800",
};

export default function ErrorMessage({
  mensagem,
  tipo = "erro",
  onTentarNovamente,
}) {
  return (
    <div
      role="alert"
      className={`rounded-lg border p-3 text-sm ${tipos[tipo]}`}
    >
      <p>{mensagem}</p>
      {onTentarNovamente && (
        <Button
          variante="contorno"
          tamanho="sm"
          className="mt-2"
          onClick={onTentarNovamente}
        >
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
