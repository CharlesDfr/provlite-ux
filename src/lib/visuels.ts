import { ARTICLES, FORMATIONS, PROFILS } from "@/lib/provelite";

/**
 * Bibliothèque visuelle.
 *
 * Chaque photographie du site occupe un emplacement nommé, identifié par une clé
 * stable (« hero », « profil.vae », « formation.cap »…). Les visuels par défaut
 * vivent dans cette petite bibliothèque, mais l'établissement peut remplacer
 * n'importe quel emplacement depuis le CMS : les remplacements sont enregistrés
 * dans Convex (table `visuels`) et le site les affiche sans redéploiement.
 * À défaut de remplacement, le visuel par défaut prend le relais.
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

export type PhotoOptions = {
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

/* ------------------------------------------------------------------ */
/* Visuels par défaut                                                  */
/* ------------------------------------------------------------------ */

const DEFAUT_PROFIL: Record<string, PhotoKey> = {
  formation: "geste",
  inscription: "equipe",
  salon: "atelier",
  decouverte: "salon",
  entreprise: "equipe",
  vae: "geste",
  modele: "soins",
  apprenant: "lumiere",
};

const DEFAUT_FORMATION: Record<string, PhotoKey> = {
  cap: "atelier",
  cs: "soins",
  bp: "salon",
  cqp: "lumiere",
  vae: "geste",
};

const DEFAUT_ARTICLE: PhotoKey[] = [
  "atelier",
  "equipe",
  "salon",
  "geste",
  "soins",
  "lumiere",
  "atelier",
  "salon",
];

const DEFAUT_SALON: PhotoKey[] = ["atelier", "salon", "soins"];

const DEFAUT_TEMOIGNAGE: PhotoKey[] = ["lumiere", "geste", "equipe"];

/* ------------------------------------------------------------------ */
/* Catalogue des emplacements                                          */
/* ------------------------------------------------------------------ */

export type VisuelSlot = {
  /** Clé stable, partagée entre le site et le CMS. */
  cle: string;
  /** Intitulé affiché dans le CMS. */
  label: string;
  /** Visuel par défaut, dans la bibliothèque locale. */
  defaut: PhotoKey;
  /** Rubrique du site, pour regrouper les emplacements dans le CMS. */
  groupe: string;
};

function groupe(g: string, slots: Omit<VisuelSlot, "groupe">[]): VisuelSlot[] {
  return slots.map((slot) => ({ ...slot, groupe: g }));
}

export const VISUELS: VisuelSlot[] = [
  ...groupe("Accueil", [
    { cle: "hero", label: "Visuel principal", defaut: "salon" },
    {
      cle: "acces.entreprise",
      label: "Accès direct — entreprises et salons",
      defaut: "equipe",
    },
    {
      cle: "acces.modele",
      label: "Accès direct — devenir modèle",
      defaut: "soins",
    },
  ]),
  ...groupe("L'école", [
    { cle: "etablissement.1", label: "Photographie de gauche", defaut: "atelier" },
    { cle: "etablissement.2", label: "Photographie de droite", defaut: "soins" },
  ]),
  ...groupe(
    "Orientation par public",
    PROFILS.map((profil) => ({
      cle: `profil.${profil.id}`,
      label: profil.label,
      defaut: DEFAUT_PROFIL[profil.id] ?? "salon",
    })),
  ),
  ...groupe(
    "Formations",
    FORMATIONS.map((formation) => ({
      cle: `formation.${formation.id}`,
      label: `${formation.code} — ${formation.name}`,
      defaut: DEFAUT_FORMATION[formation.id] ?? "atelier",
    })),
  ),
  ...groupe("Moments Découverte", [
    { cle: "moments", label: "Bandeau de la section", defaut: "lumiere" },
  ]),
  ...groupe(
    "Témoignages",
    DEFAUT_TEMOIGNAGE.map((defaut, index) => ({
      cle: `avis.${index + 1}`,
      label: `Portrait ${index + 1}`,
      defaut,
    })),
  ),
  ...groupe(
    "Salon d'application",
    DEFAUT_SALON.map((defaut, index) => ({
      cle: `salon.${index + 1}`,
      label: `Photographie ${index + 1}`,
      defaut,
    })),
  ),
  ...groupe("Partenaires", [
    { cle: "partenaires", label: "Bandeau de la section", defaut: "equipe" },
  ]),
  ...groupe(
    "Conseils & actualités",
    ARTICLES.map((article, index) => ({
      cle: `article.${index + 1}`,
      label: article.titre,
      defaut: DEFAUT_ARTICLE[index % DEFAUT_ARTICLE.length] ?? "atelier",
    })),
  ),
];

/** Visuel par défaut, par clé d'emplacement. */
export const VISUEL_DEFAUT: Record<string, PhotoKey> = Object.fromEntries(
  VISUELS.map((slot) => [slot.cle, slot.defaut]),
);

/** Emplacements regroupés par rubrique, pour le CMS. */
export const VISUELS_PAR_GROUPE: { groupe: string; slots: VisuelSlot[] }[] =
  VISUELS.reduce<{ groupe: string; slots: VisuelSlot[] }[]>((acc, slot) => {
    const courant = acc[acc.length - 1];
    if (courant && courant.groupe === slot.groupe) {
      courant.slots.push(slot);
    } else {
      acc.push({ groupe: slot.groupe, slots: [slot] });
    }
    return acc;
  }, []);

/* ------------------------------------------------------------------ */
/* Résolution                                                          */
/* ------------------------------------------------------------------ */

/**
 * Adresse affichée pour un emplacement : le remplacement enregistré dans le
 * CMS s'il existe, sinon le visuel par défaut recadré à la demande.
 */
export function sourceVisuel(
  cle: string,
  options: PhotoOptions,
  remplacements?: Record<string, string | undefined> | null,
) {
  const remplacement = remplacements?.[cle];
  if (remplacement) return remplacement;
  return photo(VISUEL_DEFAUT[cle] ?? "atelier", options);
}
