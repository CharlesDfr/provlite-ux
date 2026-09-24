import { ARBORESCENCE, SITE } from "@/lib/provelite";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { PhaseTag } from "./Section";

const SUR_CETTE_PAGE = [
  { label: "Accueil", to: "#accueil" },
  { label: "Orientation par public", to: "#orientation" },
  { label: "Formations", to: "#formations" },
  { label: "Résultats et indicateurs", to: "#resultats" },
  { label: "Avis Google", to: "#avis" },
  { label: "Salon d'application", to: "#salon" },
  { label: "Professionnels & partenaires", to: "#partenaires" },
  { label: "Conseils & actualités", to: "#conseils" },
];

const CONTACTS = [
  {
    titre: "Accueil du CFA",
    lignes: [
      SITE.contact.adresse,
      SITE.contact.telephone,
      SITE.contact.email,
      SITE.contact.horaires,
    ],
  },
  {
    titre: "Salon d'application",
    lignes: [
      SITE.salon.adresse,
      SITE.salon.telephone,
      SITE.salon.horairesAppel,
      SITE.salon.periode,
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <a href="#accueil" className="flex items-baseline gap-2">
              <span className="display text-[1.4rem] text-ink">Provélite</span>
              <span className="eyebrow-accent">Académie</span>
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-6 text-ink-soft">
              {SITE.baseline} CFA de la coiffure depuis 2008, en alternance et
              en formation continue.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-bronze"
            >
              Mon parcours
              <ArrowUpRight className="size-3.5 text-bronze" />
            </Link>
            <p className="mt-8 max-w-xs text-[12px] leading-5 text-muted-foreground">
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
                    className="text-[13px] text-ink-soft transition-colors hover:text-ink"
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
                      className="text-[13px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
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
              {CONTACTS.map((bloc) => (
                <div key={bloc.titre}>
                  <p className="text-[13px] font-medium text-ink">
                    {bloc.titre}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {bloc.lignes.map((ligne) => (
                      <li
                        key={ligne}
                        className="text-[12.5px] leading-5 text-muted-foreground"
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

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted-foreground">
            © 2026 Provélite Académie — CFA de la coiffure
          </p>
          <p className="text-[12px] text-muted-foreground">
            Accessibilité : accueil et aménagements étudiés au cas par cas —{" "}
            {SITE.contact.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
