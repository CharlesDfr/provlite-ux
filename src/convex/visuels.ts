import { v } from "convex/values";
import { exigerAdmin } from "./admin";
import { mutation, query } from "./_generated/server";

/**
 * Photographies du site, remplaçables depuis le CMS.
 *
 * Chaque photographie du site occupe un emplacement nommé. L'établissement peut
 * y importer une image — stockée dans le stockage de fichiers de Convex — ou
 * référencer une adresse externe. Le site affiche un visuel par défaut tant
 * qu'aucun remplacement n'est enregistré ici : la table ne contient donc que les
 * remplacements, et la remise à zéro consiste simplement à supprimer la ligne.
 */

/** Remplacements enregistrés, adresses résolues pour le site. */
export const tousLesVisuels = query({
  args: {},
  handler: async (ctx) => {
    const lignes = await ctx.db.query("visuels").collect();
    return await Promise.all(
      lignes.map(async (ligne) => ({
        cle: ligne.cle,
        url: ligne.storageId
          ? await ctx.storage.getUrl(ligne.storageId)
          : (ligne.url ?? null),
      })),
    );
  },
});

/** Adresse de téléversement, valable une fois, pour importer une photographie. */
export const genererUrlUpload = mutation({
  args: {},
  handler: async (ctx) => {
    await exigerAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Enregistre la photographie d'un emplacement : fichier importé ou adresse. */
export const definirVisuel = mutation({
  args: {
    cle: v.string(),
    storageId: v.optional(v.id("_storage")),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await exigerAdmin(ctx);

    const url = args.url?.trim();
    if (!args.storageId && !url) {
      throw new Error(
        "Importez une photographie ou renseignez son adresse avant d'enregistrer.",
      );
    }

    const existant = await ctx.db
      .query("visuels")
      .withIndex("by_cle", (q) => q.eq("cle", args.cle))
      .unique();

    // Le fichier précédemment importé est supprimé du stockage s'il est
    // remplacé, pour ne pas accumuler d'images inutilisées.
    if (existant?.storageId && existant.storageId !== args.storageId) {
      await ctx.storage.delete(existant.storageId);
    }

    const champs = {
      url: args.storageId ? undefined : url,
      storageId: args.storageId,
      updatedAt: Date.now(),
      updatedBy: userId,
    };

    if (existant) {
      await ctx.db.patch(existant._id, champs);
      return existant._id;
    }
    return await ctx.db.insert("visuels", { cle: args.cle, ...champs });
  },
});

/** Revient au visuel par défaut de l'emplacement. */
export const reinitialiserVisuel = mutation({
  args: { cle: v.string() },
  handler: async (ctx, args) => {
    await exigerAdmin(ctx);
    const existant = await ctx.db
      .query("visuels")
      .withIndex("by_cle", (q) => q.eq("cle", args.cle))
      .unique();
    if (existant) {
      if (existant.storageId) {
        await ctx.storage.delete(existant.storageId);
      }
      await ctx.db.delete(existant._id);
    }
    return null;
  },
});
