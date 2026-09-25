import { api } from "@/convex/_generated/api";
import { sourceTexte } from "@/lib/contenus";
import { useQuery } from "convex/react";
import { useCallback, useMemo } from "react";

/**
 * Surcharges de textes enregistrées dans le CMS, indexées par clé
 * d'emplacement. Vide tant que rien n'a été remplacé : le site retombe alors
 * sur les textes par défaut.
 */
export function useContenus(): Record<string, string | undefined> {
  const lignes = useQuery(api.contenus.tousLesContenus);

  return useMemo(() => {
    const surcharges: Record<string, string | undefined> = {};
    for (const ligne of lignes ?? []) {
      surcharges[ligne.cle] = ligne.valeur;
    }
    return surcharges;
  }, [lignes]);
}

/**
 * Résolution d'un texte : `texte(cle, defaut)` renvoie la surcharge du CMS si
 * l'établissement l'a remplacée, sinon le texte par défaut du site.
 */
export function useTexte() {
  const contenus = useContenus();
  return useCallback(
    (cle: string, defaut: string) => sourceTexte(cle, defaut, contenus),
    [contenus],
  );
}
