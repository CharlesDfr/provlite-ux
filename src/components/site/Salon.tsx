import { Button } from "@/components/ui/button";
import { useTexte } from "@/hooks/use-contenus";
import { SALON, SITE, ENSEIGNES, MARQUES } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Marquee, MaskReveal } from "./motion";
import { Photo } from "./Photo";
import { Reveal, Section, SectionHead } from "./Section";

/** Emplacements photographiques de la galerie du salon, gérés depuis le CMS. */
const EMPLACEMENTS = ["salon.1", "salon.2", "salon.3"];

/** Bandeau défilant : les enseignes et marques qui accompagnent l'école. */
const MARQUE = [...ENSEIGNES, ...MARQUES].map((partenaire) => partenaire.nom);

export function Salon({ onDevenirModele }: { onDevenirModele: () => void }) {
  const texte = useTexte();

  const rendezVous = [
    { label: "Période", value: texte("salon.periode", SALON.periode) },
    { label: "Prise de rendez-vous", value: "Par téléphone uniquement" },
    {
      label: "Téléphone",
      value: texte("salon.coordonnees.telephone", SITE.salon.telephone),
    },
    {
      label: "Horaires d'appel",
      value: texte("salon.coordonnees.horairesAppel", SITE.salon.horairesAppel),
    },
    {
      label: "Adresse",
      value: texte("salon.coordonnees.adresse", SITE.salon.adresse),
    },
  ];

  return (
    <Section id="salon">
      <SectionHead
        eyebrow={texte("salon.titre", SALON.titre)}
        title={
          <MaskReveal>
            Un salon
            <br />
            qui forme.
          </MaskReveal>
        }
        lede={texte("salon.accroche", SALON.accroche)}
      />

      <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-3">
        {EMPLACEMENTS.map((visuel, index) => (
          <Photo
            key={visuel}
            visuel={visuel}
            w={800}
            h={1000}
            alt={`Salon d'application : ${SALON.prestations[index]?.label ?? "prestation"}`}
            zoom
            className={cn("aspect-[4/5] w-full", index === 1 && "lg:mt-10")}
          />
        ))}
      </div>

      <Marquee items={MARQUE} className="mt-14 border-y border-border py-5" />

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Prestations réalisées par les apprenants</p>
          <div className="mt-5 border-t border-ink/15">
            {SALON.prestations.map((prestation) => (
              <div
                key={prestation.label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-4"
              >
                <span className="text-[14px] text-ink">{prestation.label}</span>
                <span className="tabular text-[12.5px] text-muted-foreground">
                  {prestation.duree}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-5 text-muted-foreground">
            {texte("salon.tarifsNote", SALON.tarifsNote)}
          </p>

          <p className="eyebrow mt-14">Conditions d'accueil</p>
          <ul className="mt-5 space-y-3">
            {SALON.conditions.map((condition) => (
              <li
                key={condition}
                className="flex gap-3 text-[13.5px] leading-6 text-ink-soft"
              >
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-pale" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <Reveal>
            <div className="border-l-2 border-bronze bg-bronze-tint/70 px-7 py-6">
              <p className="eyebrow-accent">Touche d'essai</p>
              <p className="mt-3 text-[14px] leading-7 text-ink-soft">
                {texte("salon.toucheEssai", SALON.toucheEssai)}
              </p>
            </div>
          </Reveal>

          <div className="mt-9 border-t border-ink/15">
            {rendezVous.map((ligne) => (
              <div
                key={ligne.label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
              >
                <span className="text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
                  {ligne.label}
                </span>
                <span className="max-w-[62%] text-right text-[13px] leading-5 text-ink">
                  {ligne.value}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={onDevenirModele}
            className="mt-8 h-11 w-full rounded-full text-[14px] font-medium"
          >
            Devenir modèle
            <ArrowRight className="size-4" />
          </Button>
          <p className="mt-3 text-[12.5px] leading-5 text-muted-foreground">
            Le salon est fermé en dehors de la saison pédagogique.
          </p>
        </aside>
      </div>
    </Section>
  );
}
