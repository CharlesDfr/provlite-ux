import { useTexte } from "@/hooks/use-contenus";
import { ARBORESCENCE, SITE } from "@/lib/provelite";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { PhaseTag } from "./Section";

/** Lettre du nom de l'école, révélée une à une au défilement. */
function Lettre({
  lettre,
  index,
  accent,
}: {
  lettre: string;
  index: number;
  accent?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn(
          "inline-block",
          accent ? "text-pale" : "text-white",
        )}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.045,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {lettre}
      </motion.span>
    </span>
  );
}

const SUR_CETTE_PAGE = [
  { label: "Accueil", to: "#accueil" },
  { label: "L'établissement", to: "#etablissement" },
  { label: "Parcours par profil", to: "#orientation" },
  { label: "Formations", to: "#formations" },
  ...(SITE.momentsDecouverteActif
    ? [{ label: "Moments Découverte", to: "#moments" }]
    : []),
  { label: "Résultats et indicateurs", to: "#resultats" },
  { label: "Avis et témoignages", to: "#avis" },
  { label: "Salon d'application", to: "#salon" },
  { label: "Professionnels & partenaires", to: "#partenaires" },
  { label: "Conseils & actualités", to: "#conseils" },
];

export function SiteFooter() {
  const texte = useTexte();

  const contacts = [
    {
      titre: "Accueil du CFA",
      lignes: [
        texte("contact.adresse", SITE.contact.adresse),
        texte("contact.telephone", SITE.contact.telephone),
        texte("contact.email", SITE.contact.email),
        texte("contact.horaires", SITE.contact.horaires),
      ],
    },
    {
      titre: "Salon d'application",
      lignes: [
        texte("salon.coordonnees.adresse", SITE.salon.adresse),
        texte("salon.coordonnees.telephone", SITE.salon.telephone),
        texte("salon.coordonnees.horairesAppel", SITE.salon.horairesAppel),
        texte("salon.periode", SITE.salon.periode),
      ],
    },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-border bg-ink text-white [&_.eyebrow]:text-white/45"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 sm:px-8">
        <a href="#accueil" aria-label="Retour en haut de page">
          <p className="display text-[13vw] leading-[0.95] sm:text-[11vw] lg:text-[9vw]">
            {"Provélite".split("").map((lettre, index) => (
              <Lettre key={`p-${index}`} lettre={lettre} index={index} />
            ))}
            <span className="inline-block w-[0.35em]" />
            {"Académie".split("").map((lettre, index) => (
              <Lettre
                key={`a-${index}`}
                lettre={lettre}
                index={index + "Provélite".length}
                accent
              />
            ))}
          </p>
        </a>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="mt-5 max-w-xs text-[13px] leading-6 text-white/70">
              {texte("site.baseline", SITE.baseline)} CFA de la coiffure depuis
              2008, en alternance et en formation continue.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex items-center gap-2 text-[13px] text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-bronze"
            >
              Mon parcours
              <ArrowUpRight className="size-3.5 text-bronze" />
            </Link>
            <p className="mt-8 max-w-xs text-[12px] leading-5 text-white/50">
              Version 1 — accueil et orientation par public. Les rubriques
              marquées « phase 2 » suivent le plan de lancement.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">Sur cette page</p>
            <ul className="mt-5 space-y-2.5">
              {SUR_CETTE_PAGE.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow">Rubriques</p>
            <ul className="mt-5 space-y-2.5">
              {ARBORESCENCE.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <a
                      href={item.to}
                      className="text-[13px] text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[13px] text-white/50">
                      {item.label}
                      <PhaseTag>{item.phase ?? "Phase 2"}</PhaseTag>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">Contacts</p>
            <div className="mt-5 space-y-7">
              {contacts.map((bloc) => (
                <div key={bloc.titre}>
                  <p className="text-[13px] font-medium text-white">
                    {bloc.titre}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {bloc.lignes.map((ligne) => (
                      <li
                        key={ligne}
                        className="text-[12.5px] leading-5 text-white/60"
                      >
                        {ligne}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/50">
            © 2026 Provélite Académie — CFA de la coiffure
          </p>
          <p className="text-[12px] text-white/50">
            Accessibilité : accueil et aménagements étudiés au cas par cas —{" "}
            {texte("contact.email", SITE.contact.email)}
          </p>
        </div>
      </div>
    </footer>
  );
}
