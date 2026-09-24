import { Button } from "@/components/ui/button";
import { ENSEIGNES, MARQUES } from "@/lib/provelite";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "./Section";

type Item = { nom: string; description: string };

function Groupe({
  titre,
  note,
  items,
}: {
  titre: string;
  note: string;
  items: Item[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <p className="eyebrow">{titre}</p>
        <span className="text-[12px] text-muted-foreground">{note}</span>
      </div>
      <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.nom} className="bg-background p-7">
            <p className="display text-[1.5rem] leading-none text-ink">
              {item.nom}
            </p>
            <p className="mt-4 text-[12.5px] leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partenaires() {
  return (
    <Section id="partenaires">
      <SectionHead
        eyebrow="Professionnels & partenaires"
        title={
          <>
            Ils forment
            <br />
            avec nous.
          </>
        }
        lede="Le lien avec le monde professionnel n'est pas décoratif : les enseignes accueillent les alternants, les marques interviennent sur les techniques, et le réseau fait circuler les offres comme les savoir-faire."
      />

      <div className="mt-16 space-y-14">
        <Groupe
          titre="Enseignes partenaires"
          note="Accueil des alternants et interventions pédagogiques"
          items={ENSEIGNES}
        />
        <Groupe
          titre="Marques professionnelles"
          note="Techniques, produits et supports de formation"
          items={MARQUES}
        />
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-ink/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="display text-[1.6rem] leading-tight">
            Vous souhaitez devenir partenaire ?
          </p>
          <p className="mt-2 max-w-xl text-[13px] leading-6 text-ink-soft">
            Accueil d'alternants, intervention technique ou partenariat de
            marque : le formulaire de contact partenaire arrive avec la phase 2.
            En attendant, l'équipe répond directement.
          </p>
        </div>
        <Button
          asChild
          className="h-11 shrink-0 rounded-full px-6 text-[14px] font-medium"
        >
          <a href="#contact">
            Devenir partenaire
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
