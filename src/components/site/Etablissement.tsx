import { CHIFFRES, ETABLISSEMENT } from "@/lib/provelite";
import { ArrowRight } from "lucide-react";
import { Photo } from "./Photo";
import { Reveal, Section } from "./Section";

export function Etablissement() {
  return (
    <Section id="etablissement">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <Photo
              visuel="etablissement.1"
              w={700}
              h={880}
              alt="Un apprenant au fauteuil, encadré par un formateur"
              zoom
              className="aspect-[4/5] w-full"
            />
            <Photo
              visuel="etablissement.2"
              w={700}
              h={880}
              alt="Travaux pratiques de couleur au CFA"
              zoom
              className="mt-10 aspect-[4/5] w-full sm:mt-14"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-2">
          <p className="eyebrow">{ETABLISSEMENT.eyebrow}</p>
          <h2 className="display mt-5 text-[2.05rem] leading-[1.08] sm:text-[2.6rem] lg:text-[2.9rem]">
            {ETABLISSEMENT.titre}
          </h2>
          {ETABLISSEMENT.paragraphes.map((paragraphe, index) => (
            <p
              key={paragraphe.slice(0, 24)}
              className={
                index === 0
                  ? "mt-7 text-[15px] leading-8 text-ink-soft"
                  : "mt-5 text-[15px] leading-8 text-ink-soft"
              }
            >
              {paragraphe}
            </p>
          ))}
          <a
            href={ETABLISSEMENT.cta.to}
            className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-bronze"
          >
            {ETABLISSEMENT.cta.label}
            <ArrowRight className="size-4 text-bronze" />
          </a>
        </div>
      </div>

      <div className="mt-20 border-t border-ink/15 pt-12">
        <p className="eyebrow">Chiffres clés généraux</p>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {CHIFFRES.map((chiffre, index) => (
            <Reveal key={chiffre.label} delay={index * 0.05}>
              <p className="display tabular text-[2.6rem] leading-none text-ink">
                {chiffre.value}
              </p>
              <p className="mt-4 text-[13.5px] leading-6 text-ink">
                {chiffre.label}
              </p>
              <ul className="mt-4 space-y-1 text-[11px] leading-4 text-muted-foreground">
                <li>Année {chiffre.year}</li>
                <li>{chiffre.population}</li>
                <li>{chiffre.scope}</li>
                <li>Source : {chiffre.source}</li>
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
