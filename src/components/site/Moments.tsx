import { Button } from "@/components/ui/button";
import { MOMENTS, SESSIONS, SITE } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Photo } from "./Photo";
import { Reveal, Section, SectionHead } from "./Section";

/**
 * Section entièrement conditionnelle : pilotée par l'interrupteur du CMS, elle
 * disparaît du site (menu, accueil et accès direct) hors campagne.
 */
export function Moments() {
  if (!SITE.momentsDecouverteActif) return null;

  return (
    <Section id="moments" tone="muted">
      <SectionHead
        eyebrow={MOMENTS.eyebrow}
        title={MOMENTS.titre}
        lede={MOMENTS.lede}
      />

      <Photo
        visuel="moments"
        w={1700}
        h={540}
        alt="Les Moments Découverte à Provélite Académie"
        className="mt-14 aspect-[16/6] w-full lg:aspect-[21/6]"
      />

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow">Dates disponibles</p>
            <span className="text-[11px] tracking-[0.12em] text-bronze uppercase">
              Inscriptions ouvertes
            </span>
          </div>

          <div className="mt-5 border-t border-ink/15">
            {SESSIONS.map((session, index) => (
              <Reveal key={session.jour} delay={index * 0.06}>
                <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-3 border-b border-border py-6">
                  <div>
                    <p className="text-[15px] text-ink">{session.jour}</p>
                    <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">
                      {session.horaire} · {session.public}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-[12px] tracking-[0.1em] uppercase",
                        session.statut === "Complet"
                          ? "text-muted-foreground"
                          : "text-bronze",
                      )}
                    >
                      {session.statut}
                    </p>
                    <p className="mt-1.5 text-[12px] text-muted-foreground">
                      {session.places}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Button
            asChild
            className="mt-9 h-11 rounded-full px-6 text-[14px] font-medium"
          >
            <a href="#contact">
              Je m'inscris à un Moment Découverte
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <p className="mt-3 max-w-md text-[12.5px] leading-5 text-muted-foreground">
            L'inscription se fait par formulaire dédié, associé à chaque session
            et modifiable depuis le CMS. En attendant la mise en ligne du
            formulaire, l'accueil du CFA prend les inscriptions par téléphone.
          </p>
        </div>

        <aside className="lg:col-span-5">
          <p className="eyebrow">Informations pratiques</p>
          <div className="mt-5 border-t border-ink/15">
            {MOMENTS.infos.map((info) => (
              <div
                key={info.label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
              >
                <span className="text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
                  {info.label}
                </span>
                <span className="max-w-[62%] text-right text-[13px] leading-5 text-ink">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
