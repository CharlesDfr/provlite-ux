import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { useVisuels } from "@/hooks/use-visuels";
import { VISUEL_DEFAUT, VISUELS_PAR_GROUPE, photo } from "@/lib/visuels";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  Check,
  Loader2,
  LogOut,
  RotateCcw,
  Type,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Ligne({
  cle,
  label,
  url,
  remplacement,
  valeur,
  enCours,
  onChange,
  onEnregistrer,
  onImporter,
  onReinitialiser,
}: {
  cle: string;
  label: string;
  /** Adresse actuellement affichée sur le site. */
  url: string;
  /** Le remplacement enregistré, s'il existe. */
  remplacement?: string;
  /** Saisie en cours, tant qu'elle n'est pas enregistrée. */
  valeur?: string;
  enCours: boolean;
  onChange: (valeur: string) => void;
  onEnregistrer: () => void;
  onImporter: (fichier: File) => void;
  onReinitialiser: () => void;
}) {
  const modifie = remplacement !== undefined;

  return (
    <div className="grid gap-5 border-b border-border py-6 lg:grid-cols-12 lg:gap-8">
      <div className="flex items-start gap-4 lg:col-span-4">
        <img
          src={url}
          alt=""
          loading="lazy"
          className="size-16 shrink-0 object-cover grayscale"
        />
        <div>
          <p className="text-[14px] leading-snug text-ink">{label}</p>
          <p className="tabular mt-1.5 text-[11px] tracking-[0.08em] text-muted-foreground">
            {cle}
          </p>
          <p
            className={cn(
              "mt-1.5 text-[11px] tracking-[0.1em] uppercase",
              modifie ? "text-bronze" : "text-muted-foreground",
            )}
          >
            {modifie ? "Remplacée" : "Visuel par défaut"}
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <label className="text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
          Adresse de la photographie
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <Input
            value={valeur ?? remplacement ?? ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://…"
            className="h-10 flex-1 rounded-full border-border px-4 text-[13px]"
          />
          <Button
            onClick={onEnregistrer}
            disabled={enCours}
            className="h-10 rounded-full px-5 text-[13px] font-medium"
          >
            {enCours ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Check className="size-3.5" />
            )}
            Enregistrer
          </Button>
          <label
            className={cn(
              "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border px-5 text-[13px] transition-colors hover:border-ink/30",
              enCours && "pointer-events-none opacity-50",
            )}
          >
            <Upload className="size-3.5" />
            Importer une photo
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={enCours}
              onChange={(event) => {
                const fichier = event.target.files?.[0];
                if (fichier) onImporter(fichier);
                event.target.value = "";
              }}
            />
          </label>
          <Button
            variant="outline"
            onClick={onReinitialiser}
            disabled={enCours || !modifie}
            className="h-10 rounded-full border-border px-5 text-[13px]"
          >
            <RotateCcw className="size-3.5" />
            Rétablir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Visuels() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const remplacements = useVisuels();
  const definirVisuel = useMutation(api.visuels.definirVisuel);
  const genererUrlUpload = useMutation(api.visuels.genererUrlUpload);
  const reinitialiserVisuel = useMutation(api.visuels.reinitialiserVisuel);

  const [brouillons, setBrouillons] = useState<Record<string, string>>({});
  const [enCours, setEnCours] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const estAdmin = user?.role === "admin";

  async function enregistrer(cle: string) {
    setEnCours(cle);
    setErreur(null);
    try {
      await definirVisuel({ cle, url: brouillons[cle] ?? "" });
    } catch (error) {
      setErreur(
        error instanceof Error
          ? error.message
          : "L'enregistrement n'a pas abouti. Réessayez dans un instant.",
      );
    } finally {
      setEnCours(null);
    }
  }

  async function importer(cle: string, fichier: File) {
    setEnCours(cle);
    setErreur(null);
    try {
      const uploadUrl = await genererUrlUpload({});
      const reponse = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": fichier.type },
        body: fichier,
      });
      if (!reponse.ok) {
        throw new Error("Le téléversement de la photographie a échoué.");
      }
      const { storageId } = (await reponse.json()) as { storageId: string };
      await definirVisuel({ cle, storageId: storageId as Id<"_storage"> });
    } catch (error) {
      setErreur(
        error instanceof Error
          ? error.message
          : "Le téléversement n'a pas abouti. Réessayez dans un instant.",
      );
    } finally {
      setEnCours(null);
    }
  }

  async function reinitialiser(cle: string) {
    setEnCours(cle);
    setErreur(null);
    try {
      await reinitialiserVisuel({ cle });
      setBrouillons((precedent) => {
        const suivant = { ...precedent };
        delete suivant[cle];
        return suivant;
      });
    } catch (error) {
      setErreur(
        error instanceof Error
          ? error.message
          : "La remise à zéro n'a pas abouti. Réessayez dans un instant.",
      );
    } finally {
      setEnCours(null);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-8 px-6 sm:px-8">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="display text-[1.3rem] text-ink">Provélite</span>
            <span className="eyebrow-accent">Académie</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="h-9 rounded-full px-4 text-[13px] text-ink-soft"
            >
              <Link to="/dashboard">
                <ArrowLeft className="size-3.5" />
                Mon parcours
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-9 rounded-full border-border px-4 text-[13px]"
            >
              <Link to="/admin/contenus">
                <Type className="size-3.5" />
                Gérer les textes
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-9 rounded-full border-border px-4 text-[13px]"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="size-3.5" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        <p className="eyebrow">CMS — Visuels</p>
        <h1 className="display mt-5 text-[2.4rem] leading-tight sm:text-[3rem]">
          Les photographies du site
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-ink-soft">
          Chaque emplacement du site porte une clé stable. Importez une
          photographie — elle est conservée dans le stockage de la base — ou
          renseignez son adresse pour remplacer le visuel par défaut : la
          modification est publiée immédiatement, sans redéploiement.
          Rétablissez pour revenir au visuel par défaut.
        </p>

        {erreur ? (
          <p className="mt-6 text-[13px] text-destructive">{erreur}</p>
        ) : null}

        {!estAdmin ? (
          <div className="mt-12 border border-border bg-secondary p-8">
            <p className="text-[15px] text-ink">
              Accès réservé aux administrateurs
            </p>
            <p className="mt-3 max-w-2xl text-[13.5px] leading-6 text-muted-foreground">
              Votre compte n'a pas le rôle administrateur, nécessaire pour
              modifier les photographies. Un administrateur peut attribuer ce
              rôle depuis le tableau de bord de la base (table des utilisateurs,
              champ « role » à la valeur « admin »).
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            {VISUELS_PAR_GROUPE.map((groupe) => (
              <section key={groupe.groupe}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                  <p className="eyebrow">{groupe.groupe}</p>
                  <span className="tabular text-[12px] text-muted-foreground">
                    {groupe.slots.length} emplacement
                    {groupe.slots.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-4 border-t border-ink/15">
                  {groupe.slots.map((slot) => {
                    const remplacement = remplacements[slot.cle];
                    const url =
                      remplacement ??
                      photo(VISUEL_DEFAUT[slot.cle] ?? "atelier", {
                        w: 400,
                        h: 300,
                      });
                    return (
                      <Ligne
                        key={slot.cle}
                        cle={slot.cle}
                        label={slot.label}
                        url={url}
                        remplacement={remplacement}
                        valeur={brouillons[slot.cle]}
                        enCours={enCours === slot.cle}
                        onChange={(valeur) =>
                          setBrouillons((precedent) => ({
                            ...precedent,
                            [slot.cle]: valeur,
                          }))
                        }
                        onEnregistrer={() => enregistrer(slot.cle)}
                        onImporter={(fichier) => importer(slot.cle, fichier)}
                        onReinitialiser={() => reinitialiser(slot.cle)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
