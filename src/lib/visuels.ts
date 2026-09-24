/**
 * Bibliothèque visuelle.
 *
 * Chaque photo est référencée par une clé courte, jamais par une URL complète :
 * le jour où l'établissement fournit ses propres prises de vue, on remplace
 * l'identifiant ici et tout le site suit. Les URL sont vérifiées et les
 * composants retombent proprement sur un visuel de remplacement en cas
 * d'indisponibilité.
 */

const BASE = "https://images.unsplash.com/photo-";

export const PHOTOS = {
  /** Atelier : gestes professionnels au fauteuil. */
  atelier: "1549298916-b41d501d3772",
  /** Le salon : espace de travail et miroirs. */
  salon: "1521590832167-7bcbfaa6381f",
  /** Soins et couleurs. */
  soins: "1583121274602-3e2820c69888",
  /** Équipe, partenaires, temps collectifs. */
  equipe: "1556761175-4b46a572b786",
  /** Lumière, matières, détails d'ambiance. */
  lumiere: "1503264116251-35a269479413",
  /** Le geste technique : coupe, précision. */
  geste: "1458571037713-913d8b481dc6",
} as const;

export type PhotoKey = keyof typeof PHOTOS;

type PhotoOptions = {
  /** Largeur demandée. */
  w: number;
  /** Hauteur demandée (recadrage). */
  h?: number;
  /** `faces` privilégie les visages, `entropy` l'activité de l'image. */
  crop?: "entropy" | "faces" | "edges" | "top";
};

export function photo(key: PhotoKey, { w, h, crop = "entropy" }: PhotoOptions) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: "80",
    crop,
  });
  if (h) params.set("h", String(h));
  return `${BASE}${PHOTOS[key]}?${params.toString()}`;
}

/** Visuel de bandeau associé à chaque parcours d'orientation. */
export const VISUEL_PROFIL: Record<string, PhotoKey> = {
  formation: "geste",
  inscription: "equipe",
  salon: "atelier",
  decouverte: "salon",
  entreprise: "equipe",
  vae: "geste",
  modele: "soins",
  apprenant: "lumiere",
};

/** Visuel de fiche associé à chaque formation. */
export const VISUEL_FORMATION: Record<string, PhotoKey> = {
  cap: "atelier",
  cs: "soins",
  bp: "salon",
  cqp: "lumiere",
  vae: "geste",
};

/** Visuels d'illustration des articles, attribués en boucle. */
export const VISUEL_ARTICLE: PhotoKey[] = [
  "atelier",
  "equipe",
  "salon",
  "geste",
  "soins",
  "lumiere",
  "atelier",
  "salon",
];

/** Visuels de la galerie du salon d'application. */
export const VISUEL_SALON: PhotoKey[] = ["atelier", "salon", "soins"];

/** Portraits des témoignages (recadrage sur les visages). */
export const VISUEL_TEMOIGNAGE: PhotoKey[] = ["lumiere", "geste", "equipe"];
