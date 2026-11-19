import SafeRouteCard from "./SafeRouteCard";
import { getMapa } from "../../constants/routes";

export default function RouteMap({ etapaId }) {
  const mapa = getMapa(etapaId);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <img
          src={mapa.imagem}
          alt={mapa.alt}
          className="block aspect-[4/3] w-full object-cover"
        />
      </div>
      <SafeRouteCard etapaId={etapaId} />
    </div>
  );
}
