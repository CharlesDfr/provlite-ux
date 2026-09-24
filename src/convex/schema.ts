import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // add other tables here

    // Parcours d'orientation enregistré par un visiteur identifié.
    // Le contenu des étapes vit dans le site : on ne stocke ici que le profil
    // choisi et les étapes cochées, pour que la fiche reste à jour si
    // l'établissement fait évoluer un parcours.
    parcours: defineTable({
      userId: v.id("users"),
      profilId: v.string(),
      completedSteps: v.array(v.string()),
      updatedAt: v.number(),
    }).index("by_user", ["userId"]),

    // Photographies du site, remplaçables depuis le CMS.
    // Chaque enregistrement remplace l'emplacement d'une clé (« hero »,
    // « profil.vae »…). Une photographie importée est stockée dans le stockage
    // de fichiers de Convex (`storageId`) ; une photographie externe est
    // référencée par son adresse (`url`). Sans enregistrement, le visuel par
    // défaut du site s'affiche : la table ne contient que les remplacements.
    visuels: defineTable({
      cle: v.string(),
      storageId: v.optional(v.id("_storage")),
      url: v.optional(v.string()),
      updatedAt: v.number(),
      updatedBy: v.optional(v.id("users")),
    }).index("by_cle", ["cle"]),

    // tableName: defineTable({
    //   ...
    //   // table fields
    // }).index("by_field", ["field"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
