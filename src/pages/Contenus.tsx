import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useContenus } from "@/hooks/use-contenus";
import { TEXTES_PAR_GROUPE, type TexteSlot } from "@/lib/contenus";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ArrowLeft, Check, Images, Loader2, LogOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Ligne({
  slot,
  remplacement,
  valeur,
  enCours,
  onChange,
  onEnregistrer,
  onReinitialiser,
}: {
  slot: TexteSlot;
  /** La surcharge enregistrée, si elle existe. */
  remplacement?: string;
  /** Saisie en cours, tant qu'elle n'est pas enregistrée. */
  valeur: string;
  enCours: boolean;
  onChange: (valeur: string) => void;
  onEnregistrer: () => void;
  onReinitialiser: () => void;
}) {
  const modifie = remplacement !== undefined;

  return (
    <div className="border-b border-border py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="text-[14px] leading-snug text-ink">{slot.label}</p>
          <p className="tabular mt-1.5 text-[11px] tracking-[0.08em] text-muted-foreground">
            {slot.cle}
          </p>
        </div>
        <span
          className={cn(
            "text-[11px] tracking-[0.1em] uppercase",
            modifie ? "text-bronze" : "text-muted-foreground",
          )}
        >
          {modifie ? "Remplacé" : "Texte par défaut"}
        </span>
      </div>

      <div className="mt-4">
        {slot.format === "long" ? (
          <Textarea
            value={valeur}
            onChange={(event) => onChange(event.target.value)}
            rows={3}
            className="min-h-24 rounded-2xl border-border px-4 py-3 text-[13.5px] leading-6"
          />
        ) : (
          <Input
            value={valeur}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 rounded-full border-border px-4 text-[13px]"
          />
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Button
            onClick={onEnregistrer}
            disabled={enCours}
            className="h-9 rounded-full px-5 text-[13px] font-medium"
          >
            {enCours ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Check className="size-3.5" />
            )}
            Enregistrer
          </Button>
          <Button
            variant="outline"
            onClick={onReinitialiser}
            disabled={enCours || !modifie}
            className="h-9 rounded-full border-border px-5 text-[13px]"
          >
            <RotateCcw className="size-3.5" />
            Rétablir
          </Button>
          <span className="text-[12px] text-muted-foreground">
            Vider le champ enregistre aussi le retour au texte par défaut.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Contenus() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const surcharges = useContenus();
  const definirContenu = useMutation(api.contenus.definirContenu);
  const reinitialiserContenu = useMutation(api.contenus.reinitialiserContenu);

  const [brouillons, setBrouillons] = useState<Record<string, string>>({});
  const [enCours, setEnCours] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const estAdmin = user?.role === "admin";

  function oublierBrouillon(cle: string) {
    setBrouillons((precedent) => {
      const suivant = { ...precedent };
      delete suivant[cle];
      return suivant;
    });
  }

  async function enregistrer(cle: string, valeur: string) {
    setEnCours(cle);
    setErreur(null);
    try {
      await definirContenu({ cle, valeur });
      oublierBrouillon(cle);
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

  async function reinitialiser(cle: string) {
    setEnCours(cle);
    setErreur(null);
    try {
      await reinitialiserContenu({ cle });
      oublierBrouillon(cle);
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
              <Link to="/admin/visuels">
                <Images className="size-3.5" />
                Gérer les visuels
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
        <p className="eyebrow">CMS — Textes</p>
        <h1 className="display mt-5 text-[2.4rem] leading-tight sm:text-[3rem]">
          Les textes du site
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-ink-soft">
          Chaque texte du site porte une clé stable. La version enregistrée ici
          remplace celle du site et s'affiche immédiatement, sans redéploiement.
          Rétablissez un texte pour revenir à la rédaction d'origine.
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
              modifier les textes. Un administrateur peut attribuer ce rôle
              depuis le tableau de bord de la base (table des utilisateurs, champ
              « role » à la valeur « admin »).
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            {TEXTES_PAR_GROUPE.map((groupe) => (
              <section key={groupe.groupe}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                  <p className="eyebrow">{groupe.groupe}</p>
                  <span className="tabular text-[12px] text-muted-foreground">
                    {groupe.slots.length} texte
                    {groupe.slots.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-4 border-t border-ink/15">
                  {groupe.slots.map((slot) => (
                    <Ligne
                      key={slot.cle}
                      slot={slot}
                      remplacement={surcharges[slot.cle]}
                      valeur={
                        brouillons[slot.cle] ??
                        surcharges[slot.cle] ??
                        slot.defaut
                      }
                      enCours={enCours === slot.cle}
                      onChange={(valeur) =>
                        setBrouillons((precedent) => ({
                          ...precedent,
                          [slot.cle]: valeur,
                        }))
                      }
                      onEnregistrer={() =>
                        enregistrer(
                          slot.cle,
                          brouillons[slot.cle] ?? surcharges[slot.cle] ?? slot.defaut,
                        )
                      }
                      onReinitialiser={() => reinitialiser(slot.cle)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
