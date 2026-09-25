import { cn } from "@/lib/utils";
import { Photo } from "./Photo";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * Vocabulaire d'animation du site.
 *
 * Une seule idée : rien n'apparaît d'un coup. Les filets se tracent, les titres
 * montent depuis sous leur masque, les chiffres comptent, les photographies
 * dérivent lentement. Tout est déclenché à l'entrée dans l'écran, joué une
 * seule fois, et rendu statique pour les visiteurs qui demandent moins
 * d'animations (`prefers-reduced-motion`).
 */

/** Courbe maison : arrivée nette, finie en douceur — la signature du site. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Filet qui se trace de gauche à droite lorsqu'il entre à l'écran. */
export function LineDraw({
  className,
  delay = 0,
  duration = 1.1,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}

/** Bloc révélé par masque : il monte depuis sous son propre cadre. */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: "108%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** « 100 % », « 4 000+ », « 1er » → partie numérique et suffixe. */
function lireNombre(valeur: string) {
  const m = /^([\d\u00a0\u202f ]+)(.*)$/.exec(valeur.trim());
  if (!m) return { nombre: null as number | null, fin: valeur };
  const nombre = Number(m[1].replace(/[\s\u00a0\u202f]/g, ""));
  return Number.isFinite(nombre)
    ? { nombre, fin: m[2] }
    : { nombre: null, fin: valeur };
}

/** Nombre qui compte lorsqu'il entre à l'écran, formaté à la française. */
export function AnimatedNumber({
  value,
  duree = 1.6,
  delai = 0,
}: {
  value: string;
  duree?: number;
  delai?: number;
}) {
  const { nombre, fin } = useMemo(() => lireNombre(value), [value]);
  // En dessous de 10, compter n'apporte rien (« 1er » s'affiche tel quel).
  const anime = nombre !== null && nombre >= 10;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const enVue = useInView(ref, { once: true, margin: "-60px" });
  const [affiche, setAffiche] = useState(() =>
    anime && !reduce ? `0${fin}` : value,
  );

  useEffect(() => {
    if (!anime || reduce || !enVue || nombre === null) return;
    const controls = animate(0, nombre, {
      duration: duree,
      delay: delai,
      ease: EASE,
      onUpdate: (v) =>
        setAffiche(`${Math.round(v).toLocaleString("fr-FR")}${fin}`),
    });
    return () => controls.stop();
  }, [anime, reduce, enVue, nombre, fin, duree, delai]);

  return <span ref={ref}>{affiche}</span>;
}

/**
 * Photographie en parallaxe léger : l'image dérive de quelques pixels pendant
 * que la page défile, dans un cadre fixe. Le recadrage est prévu large pour
 * qu'aucun bord ne se découvre.
 */
export function ParallaxPhoto({
  visuel,
  alt,
  w,
  h,
  className,
  amplitude = 22,
}: {
  visuel: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  amplitude?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amplitude, amplitude]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0 -top-[8%] h-[116%]"
        style={reduce ? undefined : { y }}
      >
        <Photo visuel={visuel} alt={alt} w={w} h={h} className="size-full" />
      </motion.div>
    </div>
  );
}

/** Barre de progression de lecture, à la toute limite du haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[45] h-0.5 origin-left bg-bronze"
      style={{ scaleX }}
    />
  );
}

/**
 * Bandeau défilant, en boucle continue — pauses au survol, statique sans
 * animation. Le contenu est doublé pour une boucle sans couture.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const liste = [...items, ...items];
  return (
    <div aria-hidden="true" className={cn("marquee-hover overflow-hidden", className)}>
      <div className="animate-marquee flex w-max items-center">
        {liste.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="display text-[1.45rem] whitespace-nowrap text-ink/70">
              {item}
            </span>
            <span className="mx-10 size-1 shrink-0 rounded-full bg-bronze/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
