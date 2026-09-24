import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/provelite";
import { ArrowRight } from "lucide-react";
import { Photo } from "./Photo";

const FICHE = [
  { label: "Établissement", value: "CFA privé en alternance" },
  { label: "Formations", value: "Du CAP au CQP" },
  { label: "VAE", value: "Parcours CAP et BP" },
  { label: "Résultats", value: "100 % au CAP en 2026" },
  { label: "Label", value: "1er CFA HappyAtSchool® 2024-2025" },
];

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

export function Hero({ onProfil }: { onProfil: (id: string) => void }) {
  return (
    <section id="accueil">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pt-14 pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-6">
          <p className="eyebrow">CFA de la coiffure — depuis 2008</p>

          <h1 className="display mt-6 text-[2.7rem] sm:text-6xl lg:text-[3.9rem]">
            Apprendre le métier.
            <br />
            <span className="display-italic">Révéler votre talent.</span>
          </h1>

          <p className="mt-7 max-w-lg text-[16px] leading-8 text-ink-soft">
            Provélite Académie forme aux métiers de la coiffure, du CAP au CQP,
            en alternance comme en formation continue. Un établissement où la
            pratique en salon, l'exigence pédagogique et l'accompagnement
            individuel avancent ensemble.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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

        <div className="lg:col-span-6">
          <Photo
            visuel="hero"
            w={1100}
            h={1320}
            alt="Le salon d'application de Provélite Académie"
            priority
            className="aspect-[5/6] w-full lg:aspect-[4/5]"
          />
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <p className="text-[12px] tracking-[0.14em] text-muted-foreground uppercase">
              Le salon d'application
            </p>
            <p className="text-[12px] text-muted-foreground">
              Prestations d'octobre à mai
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-6 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
          {FICHE.map((ligne) => (
            <div key={ligne.label}>
              <p className="eyebrow">{ligne.label}</p>
              <p className="mt-2.5 text-[13.5px] leading-6 text-ink">
                {ligne.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {ACCES_DIRECTS.map((acces) => (
              <button
                key={acces.profil}
                type="button"
                onClick={() => onProfil(acces.profil)}
                className="group flex h-full flex-col items-start bg-secondary text-left transition-colors hover:bg-background"
              >
                <Photo
                  visuel={`acces.${acces.profil}`}
                  w={900}
                  h={420}
                  alt={acces.titre}
                  zoom
                  className="aspect-[16/7] w-full"
                />
                <span className="flex w-full flex-col p-7 sm:p-8">
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
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
