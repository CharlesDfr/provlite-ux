import { v } from "convex/values";
import { exigerAdmin } from "./admin";
import { mutation, query } from "./_generated/server";

/**
 * Textes du site, modifiables depuis le CMS.
 *
 * Le contenu éditorial par défaut vit dans le site (`src/lib/provelite.ts`) : la
 * table ne contient donc que les surcharges, une ligne par texte remplacé. Un
 * texte vidé ou réinitialisé disparaît simplement de la table, et le site
 * réaffiche son texte par défaut.
 */

/** Surcharges de textes enregistrées dans le CMS. */
export const tousLesContenus = query({
  args: {},
  handler: async (ctx) => {
    const lignes = await ctx.db.query("contenus").collect();
    return lignes.map((ligne) => ({ cle: ligne.cle, valeur: ligne.valeur }));
  },
});

/** Enregistre le texte d'un emplacement. Une valeur vide rétablit le défaut. */
export const definirContenu = mutation({
  args: { cle: v.string(), valeur: v.string() },
  handler: async (ctx, args) => {
    const userId = await exigerAdmin(ctx);

    const valeur = args.valeur.trim();
    const existant = await ctx.db
      .query("contenus")
      .withIndex("by_cle", (q) => q.eq("cle", args.cle))
      .unique();

    // Un champ vidé revient au texte par défaut du site : on supprime la
    // surcharge plutôt que d'enregistrer une chaîne vide.
    if (!valeur) {
      if (existant) await ctx.db.delete(existant._id);
      return null;
    }

    const champs = { valeur, updatedAt: Date.now(), updatedBy: userId };
    if (existant) {
      await ctx.db.patch(existant._id, champs);
      return existant._id;
    }
    return await ctx.db.insert("contenus", { cle: args.cle, ...champs });
  },
});

/** Rétablit le texte par défaut de l'emplacement. */
export const reinitialiserContenu = mutation({
  args: { cle: v.string() },
  handler: async (ctx, args) => {
    await exigerAdmin(ctx);
    const existant = await ctx.db
      .query("contenus")
      .withIndex("by_cle", (q) => q.eq("cle", args.cle))
      .unique();
    if (existant) await ctx.db.delete(existant._id);
    return null;
  },
});
