import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { PROFILS, stepKey } from "@/lib/provelite";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, Check, Images, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Etape({
  index,
  label,
  detail,
  done,
  pending,
  onToggle,
}: {
  index: number;
  label: string;
  detail: string;
  done: boolean;
  pending: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      className="group flex w-full items-start gap-5 border-b border-border py-5 text-left last:border-b-0"
    >
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          done
            ? "border-bronze bg-bronze text-white"
            : "border-border text-transparent group-hover:border-ink/40",
        )}
      >
        {pending ? (
          <Loader2 className="size-3 animate-spin text-muted-foreground" />
        ) : (
          <Check className="size-3" />
        )}
      </span>
      <span className="flex-1">
        <span className="flex items-baseline gap-3">
          <span className="tabular w-6 shrink-0 text-[11px] tracking-[0.18em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-[15px] leading-snug transition-colors",
              done ? "text-muted-foreground line-through" : "text-ink",
            )}
          >
            {label}
          </span>
        </span>
        <span className="mt-2 block pl-9 text-[13px] leading-6 text-muted-foreground">
          {detail}
        </span>
      </span>
    </button>
  );
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const parcours = useQuery(api.parcours.monParcours);
  const basculerEtape = useMutation(api.parcours.basculerEtape);
  const [pending, setPending] = useState<string | null>(null);

  const profil = PROFILS.find((item) => item.id === parcours?.profilId);

  async function handleToggle(etape: string) {
    setPending(etape);
    try {
      await basculerEtape({ etape });
    } finally {
      setPending(null);
    }
  }

  const etapes = profil?.steps ?? [];
  const faites = etapes.filter((_, index) =>
    parcours?.completedSteps.includes(stepKey(profil?.id ?? "", index)),
  ).length;
  const progression = etapes.length ? (faites / etapes.length) * 100 : 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-8 px-6 sm:px-8">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="display text-[1.3rem] text-ink">Provélite</span>
            <span className="eyebrow-accent">Académie</span>
          </Link>
          <div className="flex items-center gap-2">
            {user?.role === "admin" ? (
              <Button
                asChild
                variant="outline"
                className="h-9 rounded-full border-border px-4 text-[13px]"
              >
                <Link to="/admin/visuels">
                  <Images className="size-3.5" />
                  Gérer les visuels
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              variant="ghost"
              className="h-9 rounded-full px-4 text-[13px] text-ink-soft"
            >
              <Link to="/">
                <ArrowLeft className="size-3.5" />
                Retour au site
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-9 rounded-full border-border px-4 text-[13px]"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="size-3.5" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        {parcours === undefined ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-[13.5px]">Chargement de votre parcours…</span>
          </div>
        ) : (
          <>
            <p className="eyebrow">Mon parcours</p>
            <h1 className="display mt-5 text-[2.4rem] leading-tight sm:text-[3rem]">
              {profil ? profil.label : "Votre espace personnel"}
            </h1>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-ink-soft">
              {profil
                ? profil.summary
                : "Vous n'avez pas encore enregistré de parcours. Choisissez votre situation sur la page d'accueil pour obtenir les étapes qui vous concernent."}
              {user?.name ? ` — ${user.name}` : ""}
            </p>

            {profil && parcours ? (
              <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <div className="flex items-baseline justify-between gap-6">
                    <p className="eyebrow">Vos étapes</p>
                    <span className="tabular text-[12px] text-muted-foreground">
                      {faites} / {etapes.length} étapes franchies
                    </span>
                  </div>
                  <div className="mt-4 h-px w-full bg-border">
                    <div
                      className="h-px bg-bronze transition-all duration-500"
                      style={{ width: `${progression}%` }}
                    />
                  </div>

                  <div className="mt-8 border-t border-ink/15">
                    {etapes.map((etape, index) => {
                      const cle = stepKey(profil.id, index);
                      return (
                        <Etape
                          key={cle}
                          index={index}
                          label={etape.label}
                          detail={etape.detail}
                          done={parcours.completedSteps.includes(cle)}
                          pending={pending === cle}
                          onToggle={() => handleToggle(cle)}
                        />
                      );
                    })}
                  </div>
                </div>

                <aside className="lg:col-span-5">
                  <p className="eyebrow">Repères</p>
                  <div className="mt-4 border-t border-ink/15">
                    {profil.facts.map((fait) => (
                      <div
                        key={fait.label}
                        className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
                      >
                        <span className="text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
                          {fait.label}
                        </span>
                        <span className="max-w-[62%] text-right text-[13px] text-ink">
                          {fait.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="eyebrow mt-10">Ressources</p>
                  <ul className="mt-4 space-y-3">
                    {profil.ressources.map((ressource) => (
                      <li key={ressource.label} className="text-[13px]">
                        {ressource.to ? (
                          <a
                            href={`/${ressource.to}`}
                            className="text-ink underline decoration-border underline-offset-4 hover:decoration-bronze"
                          >
                            {ressource.label}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">
                            {ressource.label}
                            {ressource.phase ? ` — ${ressource.phase}` : ""}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="mt-8 h-10 w-full rounded-full border-border text-[13.5px]"
                  >
                    <a href="/#orientation">Changer de parcours</a>
                  </Button>
                </aside>
              </div>
            ) : (
              <Button
                asChild
                className="mt-10 h-11 rounded-full px-6 text-[14px] font-medium"
              >
                <a href="/#orientation">Choisir mon parcours</a>
              </Button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
