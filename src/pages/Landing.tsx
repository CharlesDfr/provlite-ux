import { Avis } from "@/components/site/Avis";
import { Conseils } from "@/components/site/Conseils";
import { Etablissement } from "@/components/site/Etablissement";
import { Formations } from "@/components/site/Formations";
import { Hero } from "@/components/site/Hero";
import { Moments } from "@/components/site/Moments";
import { Orientation } from "@/components/site/Orientation";
import { Partenaires } from "@/components/site/Partenaires";
import { Resultats } from "@/components/site/Resultats";
import { Salon } from "@/components/site/Salon";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { profilsActifs } from "@/lib/provelite";
import { MotionConfig } from "framer-motion";
import { useCallback, useState } from "react";

/**
 * Version 1 : la page d'accueil porte une seule idée — orienter chaque public
 * vers le bon parcours. Le profil choisi est partagé par toutes les sections,
 * de sorte qu'un bouton « Devenir modèle » ouvre déjà le parcours des modèles.
 */
export default function Landing() {
  const [profilId, setProfilId] = useState<string>(
    () => profilsActifs()[0]?.id ?? "formation",
  );

  /** Sélectionne un parcours et amène le visiteur jusqu'à l'expérience. */
  const choisirProfil = useCallback((id: string) => {
    setProfilId(id);
    requestAnimationFrame(() => {
      document
        .getElementById("orientation")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>
          <Hero onProfil={choisirProfil} />
          <Etablissement />
          <Orientation selectedId={profilId} onSelect={setProfilId} />
          <Formations onOrienter={choisirProfil} />
          <Moments />
          <Resultats />
          <Avis />
          <Salon onDevenirModele={() => choisirProfil("modele")} />
          <Partenaires />
          <Conseils />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
