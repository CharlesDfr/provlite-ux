import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHIFFRES, COHORTES } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal, Section, SectionHead } from "./Section";

const CODES: Record<string, string> = { cap: "CAP", bp: "BP", cs: "CS" };

export function Resultats() {
  const [cohorteId, setCohorteId] = useState(COHORTES[0].id);
  const cohorte =
    COHORTES.find((item) => item.id === cohorteId) ?? COHORTES[0];

  return (
    <Section id="resultats">
      <SectionHead
        eyebrow="Résultats et indicateurs"
        title={
          <>
            Ce que les chiffres
            <br />
            disent vraiment.
          </>
        }
        lede="Chaque donnée publiée précise l'année, la population concernée, le périmètre et la source. Les indicateurs sont historisés par promotion et réutilisés sur plusieurs pages du site."
      />

      <div className="mt-16 border-t border-ink/15">
        {CHIFFRES.map((chiffre, index) => (
          <Reveal key={chiffre.label} delay={index * 0.04}>
            <div className="grid gap-5 border-b border-border py-7 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-3">
                <span className="display tabular text-[2.5rem] leading-none text-ink">
                  {chiffre.value}
                </span>
              </div>
              <div className="sm:col-span-4">
                <p className="text-[15px] leading-6 text-ink">{chiffre.label}</p>
                <p className="mt-2 text-[12px] leading-5 text-muted-foreground">
                  {chiffre.population}
                </p>
              </div>
              <div className="sm:col-span-5">
                <p className="text-[12px] leading-5 text-muted-foreground">
                  <span className="text-ink">Année {chiffre.year}</span> ·{" "}
                  {chiffre.scope}
                </p>
                <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                  Source : {chiffre.source}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Par formation</p>
          <h3 className="display mt-4 text-[1.9rem] leading-tight">
            Les chiffres clés
            <br />
            de la formation
          </h3>
          <p className="mt-5 text-[13.5px] leading-7 text-ink-soft">
            Les indicateurs sont stockés dans une collection dédiée : formation,
            promotion, intitulé, valeur, numérateur, dénominateur, nombre de
            répondants, population interrogée, temporalité, méthode de calcul,
            source et date de mise à jour. Les données les plus récentes sont
            publiées automatiquement, les précédentes restent historisées.
          </p>

          <div className="mt-8 flex gap-7 border-b border-border">
            {COHORTES.map((item) => {
              const actif = item.id === cohorte.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCohorteId(item.id)}
                  aria-pressed={actif}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-[13.5px] transition-colors",
                    actif
                      ? "border-bronze text-ink"
                      : "border-transparent text-muted-foreground hover:text-ink",
                  )}
                >
                  {CODES[item.id] ?? item.formation}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-[12.5px] leading-6 text-muted-foreground">
            {cohorte.formation} — cohorte {cohorte.annee}, effectif de{" "}
            {cohorte.effectif} apprenants entrés en formation.
          </p>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cohorte.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {cohorte.principaux.map((indicateur) => (
                  <div key={indicateur.label} className="bg-background p-6">
                    <p className="eyebrow">{indicateur.label}</p>
                    <p className="display tabular mt-4 text-[2.6rem] leading-none text-ink">
                      {indicateur.value}
                    </p>
                    {indicateur.ratio ? (
                      <p className="mt-4 text-[12px] leading-5 text-muted-foreground">
                        {indicateur.ratio}
                      </p>
                    ) : null}
                    {indicateur.definition ? (
                      <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                        {indicateur.definition}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <Accordion type="single" collapsible className="mt-8">
                <AccordionItem value="tous" className="border-t border-ink/15">
                  <AccordionTrigger className="text-[13.5px] font-medium hover:no-underline">
                    Voir tous les indicateurs, l'effectif et la méthode de calcul
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    {cohorte.secondaires.map((indicateur) => (
                      <div
                        key={indicateur.label}
                        className="grid gap-2 border-b border-border py-5 sm:grid-cols-12 sm:gap-6"
                      >
                        <div className="sm:col-span-4">
                          <p className="text-[13.5px] text-ink">
                            {indicateur.label}
                          </p>
                          <p className="display tabular mt-1 text-[1.5rem] leading-none text-ink">
                            {indicateur.value}
                          </p>
                        </div>
                        <div className="sm:col-span-8">
                          {indicateur.ratio ? (
                            <p className="text-[12px] leading-5 text-muted-foreground">
                              {indicateur.ratio}
                            </p>
                          ) : null}
                          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                            {indicateur.methode}
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="pt-4 text-[12.5px] leading-6 text-muted-foreground">
                      Une rupture de contrat n'est pas comptabilisée comme un
                      abandon : la formation peut se poursuivre après la rupture
                      et un nouveau contrat peut être signé. Les situations sont
                      donc distinguées dans les données sources.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
