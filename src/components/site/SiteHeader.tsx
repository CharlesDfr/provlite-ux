import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const NAV = [
  { label: "Parcours", href: "#orientation" },
  { label: "Formations", href: "#formations" },
  ...(SITE.momentsDecouverteActif
    ? [{ label: "Moments Découverte", href: "#moments" }]
    : []),
  { label: "Résultats", href: "#resultats" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Le salon", href: "#salon" },
  { label: "Conseils", href: "#conseils" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#accueil"
      onClick={onClick}
      className="flex items-baseline gap-2 leading-none"
    >
      <span className="display text-[1.4rem] tracking-tight text-ink">
        Provélite
      </span>
      <span className="eyebrow-accent">Académie</span>
    </a>
  );
}

/**
 * Bandeau promotionnel de campagne. Piloté par le CMS : un texte, un bouton,
 * une période d'affichage. Il disparaît en dehors de la fenêtre ou au clic.
 */
function CampaignBar() {
  const [visible, setVisible] = useState(true);
  const bandeau = SITE.bandeauCampagne;

  if (!visible || !bandeau.actif) return null;

  const today = new Date();
  const debut = new Date(`${bandeau.debut}T00:00:00`);
  const fin = new Date(`${bandeau.fin}T23:59:59`);
  if (Number.isNaN(debut.getTime()) || today < debut || today > fin) {
    return null;
  }

  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-2.5 sm:px-8">
        <p className="text-[12.5px] leading-5 text-white/80">{bandeau.texte}</p>
        <div className="flex shrink-0 items-center gap-4">
          <a
            href="#moments"
            className="hidden text-[12.5px] font-medium text-bronze underline decoration-bronze/40 underline-offset-4 transition-colors hover:decoration-bronze sm:inline"
          >
            {bandeau.bouton}
          </a>
          <button
            type="button"
            aria-label="Fermer le bandeau"
            onClick={() => setVisible(false)}
            className="text-white/50 transition-colors hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <CampaignBar />
      <div className="border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-8 px-6 sm:px-8">
          <Wordmark />

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13.5px] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden h-9 rounded-full border-border px-4 text-[13px] font-medium sm:inline-flex"
            >
              <Link to="/dashboard">
                Mon parcours
                <ArrowUpRight className="size-3.5 text-bronze" />
              </Link>
            </Button>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-secondary xl:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile — plein écran, très sobre */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-opacity duration-200 xl:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6 sm:px-8">
          <Wordmark onClick={() => setOpen(false)} />
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="flex size-9 items-center justify-center rounded-full border border-border text-ink"
          >
            <X className="size-4" />
          </button>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-y-auto px-6 pt-4 sm:px-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-b border-border py-5 text-[1.75rem] text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="display border-b border-border py-5 text-[1.75rem] text-bronze"
          >
            Mon parcours
          </Link>
          <p className="mt-8 mb-8 text-[13px] leading-6 text-muted-foreground">
            {SITE.contact.adresse}
            <br />
            {SITE.contact.telephone}
          </p>
        </nav>
      </div>
    </header>
  );
}
