const estilos = {
  primario:
    "bg-[var(--cor-destaque,#0f172a)] text-[color:var(--cor-texto-destaque,#ffffff)] hover:brightness-95",
  contorno: "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
};

const tamanhos = {
  md: "px-4 py-2.5 text-sm font-semibold",
  sm: "px-3 py-1.5 text-xs sm:px-2 sm:py-1",
};

export default function Button({
  children,
  variante = "primario",
  tamanho = "md",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variante]} ${tamanhos[tamanho]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
