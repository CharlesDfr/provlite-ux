import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMemo } from "react";

/**
 * Remplacements de photographies enregistrés dans le CMS, indexés par clé
 * d'emplacement. Vide tant que rien n'a été remplacé : le site retombe alors
 * sur les visuels par défaut.
 */
export function useVisuels(): Record<string, string | undefined> {
  const lignes = useQuery(api.visuels.tousLesVisuels);

  return useMemo(() => {
    const remplacements: Record<string, string | undefined> = {};
    for (const ligne of lignes ?? []) {
      if (ligne.url) remplacements[ligne.cle] = ligne.url;
    }
    return remplacements;
  }, [lignes]);
}
