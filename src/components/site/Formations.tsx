import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FORMATIONS, type Formation } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Photo } from "./Photo";
import { Reveal, Section, SectionHead } from "./Section";

/** Vers quel parcours d'orientation renvoyer après la lecture d'une fiche. */
const PROFIL_CIBLE: Record<string, string> = {
  cap: "inscription",
  cs: "inscription",
  bp: "inscription",
  cqp: "inscription",
  vae: "vae",
};

function Ligne({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-1.5 text-[12.5px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[62%] text-right text-ink">{value}</span>
    </div>
  );
}

function Bloc({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <p className="eyebrow">{titre}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Formations({
  onOrienter,
}: {
  onOrienter: (profilId: string) => void;
}) {
  const [selection, setSelection] = useState<Formation | null>(null);

  return (
    <Section id="formations">
      <SectionHead
        eyebrow="Formations"
        title={
          <>
            Cinq voies,
            <br />
            une même exigence.
          </>
        }
        lede="Cette page oriente plus qu'elle ne détaille. Pour chaque voie : le niveau, la durée, le rythme, les modalités et les financements possibles — puis la fiche complète."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FORMATIONS.map((formation, index) => {
          const large = Boolean(formation.autonome);
          return (
            <Reveal
              key={formation.id}
              delay={index * 0.05}
              className={cn(large && "sm:col-span-2 lg:col-span-3")}
            >
              <button
                type="button"
                onClick={() => setSelection(formation)}
                className="group flex h-full w-full flex-col border border-border bg-background text-left transition-colors hover:border-ink/25"
              >
                <Photo
                  visuel={`formation.${formation.id}`}
                  w={large ? 1500 : 800}
                  h={large ? 450 : 500}
                  alt={formation.name}
                  zoom
                  className={cn(
                    "w-full",
                    large
                      ? "aspect-[16/6] lg:aspect-[21/6]"
                      : "aspect-[16/10]",
                  )}
                />

                <div
                  className={cn(
                    "flex flex-1 flex-col p-8",
                    large && "lg:flex-row lg:items-start lg:gap-16 lg:p-10",
                  )}
                >
                  <div className={cn(large && "lg:flex-1")}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="display text-[2.1rem] leading-none text-ink">
                        {formation.code}
                      </span>
                      <span className="eyebrow">{formation.level}</span>
                    </div>

                    <h3 className="mt-6 text-[17px] leading-snug font-medium text-ink">
                      {formation.name}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-6 text-ink-soft">
                      {formation.summary}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "mt-8",
                      large && "lg:mt-0 lg:w-72 lg:shrink-0",
                    )}
                  >
                    <div className="border-t border-ink/15">
                      <Ligne label="Durée" value={formation.duration} />
                      <Ligne label="Rythme" value={formation.rythme} />
                      <Ligne
                        label="Certification"
                        value={formation.certification}
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {formation.funding.map((financement) => (
                        <span
                          key={financement}
                          className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {financement}
                        </span>
                      ))}
                    </div>

                    <span className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-medium text-ink">
                      Découvrir la formation
                      <ArrowRight className="size-4 text-bronze transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <Dialog
        open={selection !== null}
        onOpenChange={(open) => {
          if (!open) setSelection(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-h-[86vh] gap-0 overflow-y-auto border-border p-0 sm:max-w-2xl"
        >
          {selection ? (
            <>
              <DialogClose className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/90 text-ink backdrop-blur-sm transition-colors hover:bg-background">
                <X className="size-4" />
                <span className="sr-only">Fermer</span>
              </DialogClose>
              <Photo
                visuel={`formation.${selection.id}`}
                w={1400}
                h={500}
                alt={selection.name}
                className="aspect-[16/6] w-full"
              />
              <div className="p-8">
                <div className="flex items-baseline gap-4">
                  <span className="display text-[2.4rem] leading-none text-ink">
                    {selection.code}
                  </span>
                  <span className="eyebrow">{selection.level}</span>
                </div>
                <DialogTitle className="display mt-3 text-[1.75rem] leading-tight">
                  {selection.name}
                </DialogTitle>
                <DialogDescription className="text-[13px] text-muted-foreground">
                  {selection.rythme}
                </DialogDescription>

                <div className="mt-6 border-t border-ink/15">
                  <Ligne label="Niveau" value={selection.level} />
                  <Ligne label="Durée" value={selection.duration} />
                  <Ligne label="Certification" value={selection.certification} />
                  <Ligne
                    label="Financements"
                    value={selection.funding.join(" · ")}
                  />
                </div>

                <Bloc titre="Présentation">
                  <p className="text-[13.5px] leading-7 text-ink-soft">
                    {selection.contenus}
                  </p>
                </Bloc>

                <Bloc titre="Principaux contenus">
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {selection.blocks.map((bloc) => (
                      <li
                        key={bloc}
                        className="border-b border-border py-2 text-[13px] text-ink"
                      >
                        {bloc}
                      </li>
                    ))}
                  </ul>
                </Bloc>

                {selection.options ? (
                  <Bloc titre="Options">
                    <div className="space-y-5">
                      {selection.options.map((option) => (
                        <div
                          key={option.id}
                          className="border-l-2 border-bronze pl-5"
                        >
                          <p className="text-[14px] font-medium text-ink">
                            {option.label}
                          </p>
                          <p className="mt-2 text-[13px] leading-6 text-ink-soft">
                            {option.contenus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Bloc>
                ) : null}

                <Bloc titre="Spécificités">
                  <ul className="space-y-2">
                    {selection.spots.map((spot) => (
                      <li
                        key={spot}
                        className="flex gap-3 text-[13px] leading-6 text-ink-soft"
                      >
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-bronze" />
                        {spot}
                      </li>
                    ))}
                  </ul>
                </Bloc>

                <Bloc titre="Débouchés">
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {selection.debouches.map((debouche) => (
                      <li
                        key={debouche}
                        className="border-b border-border py-2 text-[13px] text-ink"
                      >
                        {debouche}
                      </li>
                    ))}
                  </ul>
                </Bloc>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-[13px] leading-6 text-ink-soft">
                    En situation de handicap ? L'accueil est étudié au cas par
                    cas et les aménagements sont possibles. Le référent
                    accessibilité est joignable depuis la page Contact.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button
                      className="h-10 rounded-full px-5 text-[13.5px]"
                      onClick={() => {
                        const cible =
                          PROFIL_CIBLE[selection.id] ?? "inscription";
                        setSelection(null);
                        onOrienter(cible);
                      }}
                    >
                      {selection.autonome
                        ? "Voir le parcours VAE"
                        : "Voir les étapes d'inscription"}
                      <ArrowRight className="size-4" />
                    </Button>
                    <a
                      href="#salon"
                      className="text-[13px] text-ink underline decoration-border underline-offset-4 hover:decoration-bronze"
                    >
                      Salon d'application
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
