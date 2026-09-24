import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { SALON, SESSIONS, SITE, profilsActifs } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
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

  /**
   * Sur mobile, la liste des profils est longue : après un choix, le panneau
   * de parcours est ramené sous les yeux du visiteur.
   */
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
            Par où
            <br />
            commencer ?
          </>
        }
        lede="Chaque visiteur arrive avec une situation différente. Choisissez la vôtre : les étapes, les conditions, les interlocuteurs et les ressources s'affichent ici, sans avoir à parcourir tout le site."
      />

      <div className="mt-16 grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="border-t border-ink/15">
            {profils.map((profil) => {
              const isActive = profil.id === actif.id;
              return (
                <button
                  key={profil.id}
                  type="button"
                  onClick={() => handleSelect(profil.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex w-full items-start gap-5 border-b py-5 text-left transition-colors",
                    isActive ? "border-bronze" : "border-border",
                  )}
                >
                  <span
                    className={cn(
                      "tabular w-6 shrink-0 pt-1 text-[11px] tracking-[0.18em]",
                      isActive ? "text-bronze" : "text-muted-foreground",
                    )}
                  >
                    {profil.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block text-[16.5px] leading-snug transition-colors",
                        isActive
                          ? "text-ink"
                          : "text-ink-soft group-hover:text-ink",
                      )}
                    >
                      {profil.label}
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 block text-[12.5px] leading-5",
                        isActive ? "text-ink-soft" : "text-muted-foreground",
                      )}
                    >
                      {profil.forWho}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "mt-1.5 size-4 shrink-0 transition-all duration-300",
                      isActive
                        ? "text-bronze opacity-100"
                        : "-translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div id="parcours-panel" className="mt-12 lg:col-span-7 lg:mt-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={actif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-6">
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

              <h3 className="display mt-4 text-[1.9rem] leading-[1.1] sm:text-[2.35rem]">
                {actif.label}
              </h3>

              <p className="mt-5 text-[15px] leading-7 text-ink-soft">
                {actif.summary}
              </p>

              <dl className="mt-9 grid gap-px border-y border-border bg-border sm:grid-cols-3">
                {actif.facts.map((fait) => (
                  <div
                    key={fait.label}
                    className="bg-background py-4 sm:px-4 sm:first:pl-0"
                  >
                    <dt className="eyebrow">{fait.label}</dt>
                    <dd className="mt-2 text-[14px] text-ink">{fait.value}</dd>
                  </div>
                ))}
              </dl>

              <ol className="mt-10">
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
                <div className="mt-10 border border-border">
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <p className="eyebrow">Prochaines sessions</p>
                    <span className="text-[11px] tracking-[0.12em] text-bronze uppercase">
                      Inscriptions ouvertes
                    </span>
                  </div>
                  {SESSIONS.map((session) => (
                    <div
                      key={session.jour}
                      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-border px-5 py-4 last:border-b-0"
                    >
                      <div>
                        <p className="text-[14px] text-ink">
                          {session.jour} · {session.horaire}
                        </p>
                        <p className="mt-1 text-[12.5px] text-muted-foreground">
                          {session.public}
                        </p>
                      </div>
                      <p
                        className={cn(
                          "text-[12px]",
                          session.statut === "Complet"
                            ? "text-muted-foreground"
                            : "text-bronze",
                        )}
                      >
                        {session.statut} — {session.places}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {actif.id === "modele" ? (
                <div className="mt-10 border-l-2 border-bronze bg-bronze-tint/70 px-6 py-5">
                  <p className="eyebrow-accent">Avant le rendez-vous</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">
                    {SALON.toucheEssai}
                  </p>
                </div>
              ) : null}

              {actif.id === "vae" ? (
                <div className="mt-10 border-l-2 border-bronze bg-bronze-tint/70 px-6 py-5">
                  <p className="eyebrow-accent">Rubrique autonome</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">
                    La VAE n'est ni un contrat ni un mode de financement du CAP
                    ou du BP. Elle suit son propre parcours, avec son propre
                    accompagnement et son propre jury.
                  </p>
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
                <span className="eyebrow">Ressources</span>
                {actif.ressources.map((ressource) =>
                  ressource.to ? (
                    <a
                      key={ressource.label}
                      href={ressource.to}
                      className="text-[13px] text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-bronze"
                    >
                      {ressource.label}
                    </a>
                  ) : (
                    <span
                      key={ressource.label}
                      className="inline-flex items-center gap-2 text-[13px] text-muted-foreground"
                    >
                      {ressource.label}
                      <PhaseTag>{ressource.phase ?? "Phase 2"}</PhaseTag>
                    </span>
                  ),
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  onClick={handleEnregistrer}
                  disabled={enregistrement}
                  className="h-11 rounded-full px-6 text-[14px] font-medium"
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
                <span className="max-w-xs text-[12.5px] leading-5 text-muted-foreground">
                  Votre parcours est conservé avec les étapes à cocher.
                  Connexion par e-mail, sans mot de passe.
                </span>
              </div>

              {erreur ? (
                <p className="mt-3 text-[12.5px] text-destructive">{erreur}</p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
