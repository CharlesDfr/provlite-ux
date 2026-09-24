import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/provelite";
import { ArrowRight } from "lucide-react";

/** Les deux accès les plus demandés, en bandeau sous le hero. */
const ACCES_DIRECTS = [
  {
    eyebrow: "Entreprises et salons",
    profil: "entreprise",
    titre: "Vous recrutez un apprenti ou un stagiaire ?",
    detail:
      "Rythme, aides et suivi de progression : un conseiller accompagne le salon de la première prise de contact jusqu'au livret d'apprentissage.",
  },
  {
    eyebrow: "Salon d'application",
    profil: "modele",
    titre: "Vous souhaitez devenir modèle ?",
    detail:
      "Les prestations sont réalisées par les apprenants sous la supervision des formateurs, d'octobre à mai. La touche d'essai est obligatoire pour les prestations techniques.",
  },
];

const FICHE = [
  { label: "Établissement", value: "CFA privé en alternance, depuis 2008" },
  { label: "Formations", value: "CAP · CS · BP · CQP" },
  { label: "VAE", value: "Parcours CAP et BP, rubrique autonome" },
  { label: "Résultats", value: "100 % de réussite au CAP en 2026" },
  { label: "Label", value: "1er CFA HappyAtSchool® en 2024 et 2025" },
];

export function Hero({ onProfil }: { onProfil: (id: string) => void }) {
  return (
    <section id="accueil">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 pt-14 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="eyebrow">CFA de la coiffure — depuis 2008</p>

          <h1 className="display mt-6 text-[2.7rem] sm:text-6xl lg:text-[4.15rem]">
            Apprendre le métier.
            <br />
            <span className="display-italic">Révéler votre talent.</span>
          </h1>

          <p className="mt-8 max-w-xl text-[16px] leading-8 text-ink-soft">
            Provélite Académie forme aux métiers de la coiffure, du CAP au CQP,
            en alternance comme en formation continue. Un établissement où la
            pratique en salon, l'exigence pédagogique et l'accompagnement
            individuel avancent ensemble.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-11 rounded-full px-6 text-[14px] font-medium"
            >
              <a href="#orientation">
                Trouver mon parcours
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-border px-6 text-[14px] font-medium"
            >
              <a href="#formations">Découvrir nos formations</a>
            </Button>
            {SITE.momentsDecouverteActif ? (
              <button
                type="button"
                onClick={() => onProfil("decouverte")}
                className="h-11 rounded-full border border-bronze/45 px-6 text-[14px] font-medium text-bronze transition-colors hover:bg-bronze-tint"
              >
                Participer à un Moment Découverte
              </button>
            ) : null}
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pt-16">
          <div className="border-t border-ink/15">
            {FICHE.map((ligne) => (
              <div
                key={ligne.label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-4"
              >
                <span className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  {ligne.label}
                </span>
                <span className="max-w-[62%] text-right text-[13.5px] leading-6 text-ink">
                  {ligne.value}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[12px] leading-5 text-muted-foreground">
            Chaque donnée publiée précise l'année, la population concernée, le
            périmètre et la source.
          </p>
        </aside>
      </div>

      <div className="border-t border-border bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {ACCES_DIRECTS.map((acces) => (
              <button
                key={acces.profil}
                type="button"
                onClick={() => onProfil(acces.profil)}
                className="group flex h-full flex-col items-start bg-secondary p-7 text-left transition-colors hover:bg-background sm:p-8"
              >
                <span className="flex w-full items-center justify-between gap-4">
                  <span className="eyebrow">{acces.eyebrow}</span>
                  <ArrowRight className="size-4 shrink-0 text-bronze transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-4 block text-[16px] leading-snug text-ink">
                  {acces.titre}
                </span>
                <span className="mt-2 block max-w-md text-[13px] leading-6 text-muted-foreground">
                  {acces.detail}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
