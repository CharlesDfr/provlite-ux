import { getAuthUserId } from "@convex-dev/auth/server";
import type { MutationCtx } from "./_generated/server";
import { ROLES } from "./schema";

/**
 * Contrôle d'accès du CMS.
 *
 * Toute modification du contenu du site — photographies comme textes — exige le
 * rôle administrateur. Ce rôle s'attribue à la main depuis le tableau de bord de
 * la base, sur la fiche de l'utilisateur (champ « role »).
 */
export async function exigerAdmin(ctx: MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Connexion requise pour modifier le contenu du site.");
  }
  const user = await ctx.db.get(userId);
  if (user?.role !== ROLES.ADMIN) {
    throw new Error(
      "Seul un administrateur peut modifier le contenu du site.",
    );
  }
  return userId;
}
