import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Visuel du site.
 *
 * Les photographies sont volontairement désaturées : elles s'accordent au bleu
 * nuit et au bronze sans jamais lutter avec la typographie. Tant que l'image
 * n'est pas arrivée — ou si elle est indisponible — un cadre de remplacement
 * garde la composition intacte, sans icône cassée ni saut de mise en page.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  zoom = false,
}: {
  src: string;
  alt: string;
  /** Classes du cadre : ratio, hauteur, arrondis. */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  zoom?: boolean;
}) {
  const [etat, setEtat] = useState<"chargement" | "pret" | "erreur">(
    "chargement",
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink",
        zoom && "group",
        className,
      )}
    >
      {/* Cadre de remplacement : bleu nuit traversé de filets fins */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          etat === "pret" ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-bronze/45" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_63px,rgba(255,255,255,0.7)_63px,rgba(255,255,255,0.7)_64px)]" />
      </div>

      {etat !== "erreur" ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setEtat("pret")}
          onError={() => setEtat("erreur")}
          className={cn(
            "absolute inset-0 size-full object-cover grayscale transition-all duration-700",
            etat === "pret" ? "opacity-100" : "opacity-0",
            zoom &&
              "group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-95",
            imgClassName,
          )}
        />
      ) : (
        <span className="absolute inset-x-0 bottom-0 p-5 text-[10px] leading-4 tracking-[0.18em] text-white/55 uppercase">
          {alt}
        </span>
      )}
    </div>
  );
}
