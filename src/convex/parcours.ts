import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Parcours d'orientation du visiteur connecté.
 *
 * Seul le profil choisi et les étapes cochées sont stockés : le texte des
 * étapes vit dans le site, ce qui évite de dupliquer le contenu éditorial et
 * garde la fiche à jour lorsque l'établissement fait évoluer un parcours.
 */

/** Le parcours enregistré du visiteur connecté. `null` s'il n'y en a pas. */
export const monParcours = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db
      .query("parcours")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

/** Enregistre le profil choisi et renvoie l'identifiant du parcours. */
export const choisirProfil = mutation({
  args: { profilId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Connexion requise pour enregistrer un parcours.");
    }

    const existing = await ctx.db
      .query("parcours")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    const updatedAt = Date.now();

    if (existing) {
      // Changer de profil repart de zéro : les étapes diffèrent d'un parcours
      // à l'autre.
      await ctx.db.patch(existing._id, {
        profilId: args.profilId,
        completedSteps:
          existing.profilId === args.profilId ? existing.completedSteps : [],
        updatedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("parcours", {
      userId,
      profilId: args.profilId,
      completedSteps: [],
      updatedAt,
    });
  },
});

/** Coche ou décoche une étape du parcours enregistré. */
export const basculerEtape = mutation({
  args: { etape: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Connexion requise pour suivre un parcours.");
    }

    const existing = await ctx.db
      .query("parcours")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!existing) {
      throw new Error("Aucun parcours enregistré pour le moment.");
    }

    const done = existing.completedSteps.includes(args.etape);
    const completedSteps = done
      ? existing.completedSteps.filter((step) => step !== args.etape)
      : [...existing.completedSteps, args.etape];

    await ctx.db.patch(existing._id, { completedSteps, updatedAt: Date.now() });
    return completedSteps;
  },
});
