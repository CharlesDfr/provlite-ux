import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { SALON, SITE, profilsActifs } from "@/lib/provelite";
import { VISUEL_PROFIL, photo } from "@/lib/visuels";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Photo } from "./Photo";
import { PhaseTag, Section, SectionHead } from "./Section";

export function Orientation({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const profils = profilsActifs();
  const actif = profils.find((profil) => profil.id === selectedId) ?? profils[0];

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const choisirProfil = useMutation(api.parcours.choisirProfil);
  const monParcours = useQuery(api.parcours.monParcours);

  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const dejaEnregistre = monParcours?.profilId === actif.id;

  /** Sur mobile, la grille de profils est longue : on ramène le panneau. */
  function handleSelect(id: string) {
    onSelect(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => {
        document
          .getElementById("parcours-panel")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  async function handleEnregistrer() {
    if (!isAuthenticated) {
      navigate(`/auth?returnTo=${encodeURIComponent("/dashboard")}`);
      return;
    }
    if (dejaEnregistre) {
      navigate("/dashboard");
      return;
    }
    setEnregistrement(true);
    setErreur(null);
    try {
      await choisirProfil({ profilId: actif.id });
      navigate("/dashboard");
    } catch (error) {
      setErreur(
        error instanceof Error
          ? error.message
          : "L'enregistrement n'a pas abouti. Réessayez dans un instant.",
      );
    } finally {
      setEnregistrement(false);
    }
  }

  return (
    <Section id="orientation">
      <SectionHead
        eyebrow="Orientation"
        title={
          <>
            Nous sommes à vos côtés pour faire avancer votre projet, quel que
            soit votre profil.
          </>
        }
        lede="Choisissez votre situation : les étapes, les conditions, les interlocuteurs et les ressources s'affichent ici, sans avoir à parcourir tout le site."
      />

      <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {profils.map((profil) => {
          const isActive = profil.id === actif.id;
          return (
            <button
              key={profil.id}
              type="button"
              onClick={() => handleSelect(profil.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative flex h-full flex-col items-start bg-background p-6 text-left transition-colors",
                isActive ? "bg-secondary" : "hover:bg-secondary/60",
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 transition-colors",
                  isActive ? "bg-bronze" : "bg-transparent",
                )}
              />
              <span className="flex w-full items-center justify-between gap-4">
                <span
                  className={cn(
                    "tabular text-[11px] tracking-[0.18em]",
                    isActive ? "text-bronze" : "text-muted-foreground",
                  )}
                >
                  {profil.index}
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 shrink-0 transition-all duration-300",
                    isActive
                      ? "text-bronze opacity-100"
                      : "-translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                  )}
                />
              </span>
              <span className="mt-5 block text-[15.5px] leading-snug text-ink">
                {profil.label}
              </span>
              <span className="mt-2 block text-[12.5px] leading-5 text-muted-foreground">
                {profil.forWho}
              </span>
            </button>
          );
        })}
      </div>

      <div id="parcours-panel" className="mt-10 border border-border">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={actif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Photo
              src={photo(VISUEL_PROFIL[actif.id] ?? "salon", {
                w: 1500,
                h: 450,
              })}
              alt={`Parcours : ${actif.label}`}
              className="aspect-[16/6] w-full border-b border-border lg:aspect-[21/6]"
            />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-7 py-5 sm:px-9">
              <p className="eyebrow">
                Parcours {actif.index} / {String(profils.length).padStart(2, "0")}
              </p>
              {dejaEnregistre ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] text-bronze uppercase">
                  <Check className="size-3.5" />
                  Enregistré
                </span>
              ) : null}
            </div>

            <div className="px-7 pt-8 pb-6 sm:px-9">
              <h3 className="display text-[1.9rem] leading-[1.1] sm:text-[2.3rem]">
                {actif.label}
              </h3>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-ink-soft">
                {actif.summary}
              </p>
            </div>

            <div className="grid border-t border-border lg:grid-cols-12">
              <div className="px-7 py-8 sm:px-9 lg:col-span-7">
                <p className="eyebrow">Les étapes</p>
                <ol className="mt-5">
                  {actif.steps.map((etape, index) => (
                    <li
                      key={etape.label}
                      className="flex gap-5 border-b border-border py-5 last:border-b-0"
                    >
                      <span className="tabular w-6 shrink-0 pt-0.5 text-[11px] tracking-[0.18em] text-bronze">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-ink">
                          {etape.label}
                        </span>
                        <span className="mt-1.5 block text-[13.5px] leading-6 text-muted-foreground">
                          {etape.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                {actif.id === "decouverte" && SITE.momentsDecouverteActif ? (
                  <a
                    href="#moments"
                    className="mt-6 flex items-center justify-between gap-6 border-t border-border pt-6 text-[13.5px] text-ink"
                  >
                    Voir les dates des prochaines sessions
                    <ArrowRight className="size-4 shrink-0 text-bronze" />
                  </a>
                ) : null}

                {actif.id === "modele" ? (
                  <div className="mt-8 border-l-2 border-bronze bg-bronze-tint/70 px-6 py-5">
                    <p className="eyebrow-accent">Avant le rendez-vous</p>
                    <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">
                      {SALON.toucheEssai}
                    </p>
                  </div>
                ) : null}

                {actif.id === "vae" ? (
                  <div className="mt-8 border-l-2 border-bronze bg-bronze-tint/70 px-6 py-5">
                    <p className="eyebrow-accent">Rubrique autonome</p>
                    <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">
                      La VAE n'est ni un contrat ni un mode de financement du CAP
                      ou du BP. Elle suit son propre parcours, avec son propre
                      accompagnement et son propre jury.
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-border px-7 py-8 sm:px-9 lg:col-span-5 lg:border-t-0 lg:border-l">
                <p className="eyebrow">Repères</p>
                <div className="mt-5 border-t border-ink/15">
                  {actif.facts.map((fait) => (
                    <div
                      key={fait.label}
                      className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
                    >
                      <span className="text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
                        {fait.label}
                      </span>
                      <span className="max-w-[62%] text-right text-[13px] leading-5 text-ink">
                        {fait.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="eyebrow mt-9">Ressources</p>
                <ul className="mt-4 space-y-2.5">
                  {actif.ressources.map((ressource) => (
                    <li key={ressource.label}>
                      {ressource.to ? (
                        <a
                          href={ressource.to}
                          className="text-[13px] text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-bronze"
                        >
                          {ressource.label}
                        </a>
                      ) : (
                        <span className="inline-flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
                          {ressource.label}
                          <PhaseTag>{ressource.phase ?? "Phase 2"}</PhaseTag>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={handleEnregistrer}
                  disabled={enregistrement}
                  className="mt-9 h-11 w-full rounded-full text-[14px] font-medium"
                >
                  {enregistrement ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : dejaEnregistre ? (
                    <Check className="size-4" />
                  ) : null}
                  {dejaEnregistre
                    ? "Ouvrir mon parcours"
                    : "Enregistrer mon parcours"}
                </Button>
                <p className="mt-3 text-[12.5px] leading-5 text-muted-foreground">
                  Votre parcours est conservé avec les étapes à cocher.
                  Connexion par e-mail, sans mot de passe.
                </p>
                {erreur ? (
                  <p className="mt-3 text-[12.5px] text-destructive">{erreur}</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
