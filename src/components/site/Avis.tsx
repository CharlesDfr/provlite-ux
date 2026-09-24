import { Button } from "@/components/ui/button";
import { AVIS } from "@/lib/provelite";
import { ArrowUpRight, Star } from "lucide-react";
import { Reveal, Section, SectionHead } from "./Section";

export function Avis() {
  return (
    <Section id="avis" tone="muted">
      <SectionHead
        eyebrow="Avis Google"
        title={
          <>
            {AVIS.note} sur 5,
            <br />
            d'après {AVIS.total} avis.
          </>
        }
        lede="La note, le nombre d'avis et les extraits sont récupérés dynamiquement depuis Google dans la version finale. Les témoignages d'entreprises et de partenaires y sont associés."
      />

      <div className="mt-16 grid gap-px border-y border-border bg-border lg:grid-cols-3">
        {AVIS.extraits.map((avis, index) => (
          <Reveal
            key={avis.auteur}
            delay={index * 0.06}
            className="bg-secondary"
          >
            <figure className="flex h-full flex-col p-8">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-bronze text-bronze" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-[14px] leading-7 text-ink-soft">
                « {avis.texte} »
              </blockquote>
              <figcaption className="mt-7 border-t border-border pt-4">
                <span className="block text-[13.5px] text-ink">
                  {avis.auteur}
                </span>
                <span className="mt-1 block text-[12px] text-muted-foreground">
                  {avis.contexte}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-border px-6 text-[14px] font-medium"
        >
          <a href={AVIS.lien} target="_blank" rel="noopener noreferrer">
            Voir tous les avis Google
            <ArrowUpRight className="size-4 text-bronze" />
          </a>
        </Button>
        <p className="text-[12.5px] text-muted-foreground">
          Avis publiés sur la fiche Google de l'établissement.
        </p>
      </div>
    </Section>
  );
}
