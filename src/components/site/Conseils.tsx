import { ARTICLES, PUBLICS, type Public } from "@/lib/provelite";
import { VISUEL_ARTICLE, photo } from "@/lib/visuels";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Photo } from "./Photo";
import { PhaseTag, Section, SectionHead } from "./Section";

export function Conseils() {
  const [filtre, setFiltre] = useState<Public | "tous">("tous");

  const articles = useMemo(
    () =>
      filtre === "tous"
        ? ARTICLES
        : ARTICLES.filter((article) => article.publics.includes(filtre)),
    [filtre],
  );

  return (
    <Section id="conseils" tone="muted">
      <SectionHead
        eyebrow="Conseils & actualités"
        title={
          <>
            Retrouvez rapidement
            <br />
            les informations
            <br />
            qui vous concernent.
          </>
        }
        lede="Les articles remplacent la FAQ générale. Choisissez votre profil : le flux se trie instantanément, sans changer de page."
      />

      <div className="mt-14 flex flex-wrap items-center gap-2">
        {PUBLICS.map((item) => {
          const actif = item.id === filtre;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(item.id)}
              className={cn(
                "h-9 rounded-full border px-4 text-[12.5px] transition-colors",
                actif
                  ? "border-ink bg-ink text-white"
                  : "border-border text-ink-soft hover:border-ink/30 hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
        <span className="ml-auto tabular text-[12px] text-muted-foreground">
          {String(articles.length).padStart(2, "0")} article
          {articles.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {articles.map((article, index) => (
            <motion.article
              key={article.titre}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-full flex-col border border-border bg-background"
            >
              <Photo
                src={photo(
                  VISUEL_ARTICLE[index % VISUEL_ARTICLE.length] ?? "atelier",
                  { w: 800, h: 450 },
                )}
                alt={article.titre}
                zoom
                className="aspect-[16/9] w-full"
              />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] tracking-[0.14em] text-bronze uppercase">
                    {article.categorie}
                  </span>
                  <span className="tabular text-[11px] text-muted-foreground">
                    {article.lecture}
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] leading-snug font-medium text-ink">
                  {article.titre}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-6 text-ink-soft">
                  {article.resume}
                </p>
                <p className="mt-7 border-t border-border pt-4 text-[12px] text-muted-foreground">
                  {article.date}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-[12.5px] text-muted-foreground">
          Les fiches articles, les catégories et les mots-clés se publient depuis
          le CMS.
        </p>
        <PhaseTag />
      </div>
    </Section>
  );
}
