import { AVIS, ETABLISSEMENT, MOMENTS, SALON, SITE } from "@/lib/provelite";

/**
 * Bibliothèque des textes modifiables.
 *
 * Chaque texte du site occupe un emplacement nommé, identifié par une clé
 * stable (« etablissement.titre », « contact.telephone »…). Les valeurs par
 * défaut restent dans `provelite.ts` : cette bibliothèque ne fait que les
 * exposer au CMS. L'établissement peut remplacer n'importe quel emplacement
 * depuis `/admin/contenus` ; le remplacement est enregistré dans Convex et le
 * site l'affiche sans redéploiement.
 */

export type TexteSlot = {
  /** Clé stable, partagée entre le site et le CMS. */
  cle: string;
  /** Intitulé affiché dans le CMS. */
  label: string;
  /** Texte par défaut, dans la bibliothèque éditoriale. */
  defaut: string;
  /** Rubrique du site, pour regrouper les emplacements dans le CMS. */
  groupe: string;
  /** `long` = paragraphe (zone de texte), `court` = champ sur une ligne. */
  format: "court" | "long";
};

function groupe(g: string, slots: Omit<TexteSlot, "groupe">[]): TexteSlot[] {
  return slots.map((slot) => ({ ...slot, groupe: g }));
}

export const TEXTES: TexteSlot[] = [
  ...groupe("Identité & contacts", [
    {
      cle: "site.baseline",
      label: "Phrase d'accroche",
      defaut: SITE.baseline,
      format: "court",
    },
    {
      cle: "contact.adresse",
      label: "Adresse du CFA",
      defaut: SITE.contact.adresse,
      format: "court",
    },
    {
      cle: "contact.telephone",
      label: "Téléphone du CFA",
      defaut: SITE.contact.telephone,
      format: "court",
    },
    {
      cle: "contact.email",
      label: "Adresse e-mail du CFA",
      defaut: SITE.contact.email,
      format: "court",
    },
    {
      cle: "contact.horaires",
      label: "Horaires d'accueil",
      defaut: SITE.contact.horaires,
      format: "court",
    },
    {
      cle: "salon.coordonnees.adresse",
      label: "Adresse du salon",
      defaut: SITE.salon.adresse,
      format: "court",
    },
    {
      cle: "salon.coordonnees.telephone",
      label: "Téléphone du salon",
      defaut: SITE.salon.telephone,
      format: "court",
    },
    {
      cle: "salon.coordonnees.horairesAppel",
      label: "Horaires d'appel du salon",
      defaut: SITE.salon.horairesAppel,
      format: "court",
    },
    {
      cle: "salon.periode",
      label: "Période d'ouverture du salon",
      defaut: SALON.periode,
      format: "court",
    },
  ]),
  ...groupe("Bandeau de campagne", [
    {
      cle: "bandeau.texte",
      label: "Texte du bandeau",
      defaut: SITE.bandeauCampagne.texte,
      format: "court",
    },
    {
      cle: "bandeau.bouton",
      label: "Libellé du bouton",
      defaut: SITE.bandeauCampagne.bouton,
      format: "court",
    },
  ]),
  ...groupe("L'école", [
    {
      cle: "etablissement.eyebrow",
      label: "Sur-titre",
      defaut: ETABLISSEMENT.eyebrow,
      format: "court",
    },
    {
      cle: "etablissement.titre",
      label: "Titre",
      defaut: ETABLISSEMENT.titre,
      format: "long",
    },
    {
      cle: "etablissement.paragraphe.1",
      label: "Premier paragraphe",
      defaut: ETABLISSEMENT.paragraphes[0] ?? "",
      format: "long",
    },
    {
      cle: "etablissement.paragraphe.2",
      label: "Second paragraphe",
      defaut: ETABLISSEMENT.paragraphes[1] ?? "",
      format: "long",
    },
    {
      cle: "etablissement.cta",
      label: "Libellé du lien",
      defaut: ETABLISSEMENT.cta.label,
      format: "court",
    },
  ]),
  ...groupe("Moments Découverte", [
    {
      cle: "moments.eyebrow",
      label: "Sur-titre",
      defaut: MOMENTS.eyebrow,
      format: "court",
    },
    {
      cle: "moments.titre",
      label: "Titre",
      defaut: MOMENTS.titre,
      format: "long",
    },
    { cle: "moments.lede", label: "Chapô", defaut: MOMENTS.lede, format: "long" },
  ]),
  ...groupe("Salon d'application", [
    { cle: "salon.titre", label: "Titre", defaut: SALON.titre, format: "court" },
    {
      cle: "salon.accroche",
      label: "Chapô",
      defaut: SALON.accroche,
      format: "long",
    },
    {
      cle: "salon.toucheEssai",
      label: "Touche d'essai",
      defaut: SALON.toucheEssai,
      format: "long",
    },
    {
      cle: "salon.tarifsNote",
      label: "Note sur les tarifs",
      defaut: SALON.tarifsNote,
      format: "long",
    },
  ]),
  ...groupe("Avis", [
    { cle: "avis.note", label: "Note moyenne", defaut: AVIS.note, format: "court" },
    {
      cle: "avis.total",
      label: "Nombre d'avis",
      defaut: String(AVIS.total),
      format: "court",
    },
  ]),
];

/** Texte par défaut, par clé d'emplacement. */
export const TEXTE_DEFAUT: Record<string, string> = Object.fromEntries(
  TEXTES.map((slot) => [slot.cle, slot.defaut]),
);

/** Emplacements regroupés par rubrique, pour le CMS. */
export const TEXTES_PAR_GROUPE: { groupe: string; slots: TexteSlot[] }[] =
  TEXTES.reduce<{ groupe: string; slots: TexteSlot[] }[]>((acc, slot) => {
    const courant = acc[acc.length - 1];
    if (courant && courant.groupe === slot.groupe) {
      courant.slots.push(slot);
    } else {
      acc.push({ groupe: slot.groupe, slots: [slot] });
    }
    return acc;
  }, []);

/**
 * Texte affiché pour un emplacement : la surcharge enregistrée dans le CMS si
 * elle existe, sinon le texte par défaut passé par le composant.
 */
export function sourceTexte(
  cle: string,
  defaut: string,
  surcharges?: Record<string, string | undefined> | null,
) {
  return surcharges?.[cle] ?? defaut;
}
