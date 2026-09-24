/**
 * Provélite Académie — contenu éditorial de la version 1.
 *
 * Tout ce que le site affiche vient d'ici : les profils d'orientation, les
 * formations, les indicateurs, les avis, le salon et les articles. Le jour où
 * ces rubriques basculent dans le CMS, seule cette forme de données change —
 * les composants n'ont pas à bouger.
 */

/* ------------------------------------------------------------------ */
/* Réglages généraux                                                   */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Provélite Académie",
  baseline: "Apprendre le métier. Révéler votre talent.",
  since: 2008,
  contact: {
    adresse: "Provélite Académie — 12 rue des Métiers, 75012 Paris",
    telephone: "01 00 00 00 00",
    email: "contact@provelite-academie.fr",
    horaires: "Du lundi au vendredi, 9 h – 17 h",
  },
  salon: {
    telephone: "01 00 00 00 01",
    adresse: "Salon d'application — 12 rue des Métiers, 75012 Paris",
    periode: "Ouvert d'octobre à mai",
    horairesAppel: "Appels du mardi au jeudi, 10 h – 16 h",
  },
  /**
   * Interrupteur du CMS : la page Moments Découverte est activable et
   * désactivable. Quand elle est fermée, elle quitte le menu, les boutons de
   * la page d'accueil disparaissent et le bandeau n'est plus affiché.
   */
  momentsDecouverteActif: true,
  bandeauCampagne: {
    texte: "Les Moments Découverte sont ouverts — inscrivez-vous dès maintenant.",
    bouton: "Voir les dates",
    debut: "2026-01-12",
    fin: "2026-03-28",
    actif: true,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Orientation par public                                              */
/* ------------------------------------------------------------------ */

export type ProfilRessource = {
  label: string;
  /** Ancre disponible dans la version 1. */
  to?: string;
  /** Rubrique prévue mais hors périmètre de la version 1. */
  phase?: string;
};

export type Profil = {
  id: string;
  index: string;
  /** Ce que la personne dit d'elle-même. */
  label: string;
  /** Le public concerné, en une ligne. */
  forWho: string;
  summary: string;
  facts: { label: string; value: string }[];
  steps: { label: string; detail: string }[];
  ressources: ProfilRessource[];
  /** Affiché uniquement quand la page Moments Découverte est active. */
  conditionnel?: boolean;
};

export const PROFILS: Profil[] = [
  {
    id: "formation",
    index: "01",
    label: "Je cherche une formation",
    forWho: "Élève en fin de 3e, étudiant, personne en réorientation ou en reconversion.",
    summary:
      "Cinq voies existent, du CAP au CQP, ainsi qu'une validation des acquis de l'expérience. Chaque formation indique son niveau, sa durée, son rythme et les financements possibles avant tout engagement.",
    facts: [
      { label: "Voies", value: "CAP · CS · BP · CQP · VAE" },
      { label: "Niveaux", value: "3 et 4" },
      { label: "Rentrée", value: "Septembre" },
    ],
    steps: [
      {
        label: "Comparer les cinq voies",
        detail:
          "Niveau, durée, rythme et certification obtenue, présentés de la même façon pour chaque formation.",
      },
      {
        label: "Vérifier les conditions d'accès",
        detail:
          "Diplôme requis, positionnement éventuel, dispenses de matières générales et test de niveau.",
      },
      {
        label: "Choisir le mode de financement",
        detail:
          "Alternance ou financement personnel : le public, le coût, les pièces et le calendrier changent.",
      },
      {
        label: "Déposer une demande",
        detail:
          "Le dépôt du formulaire ne vaut pas admission définitive. L'équipe reprend contact pour la suite.",
      },
    ],
    ressources: [
      { label: "Les cinq formations", to: "#formations" },
      { label: "Résultats et indicateurs", to: "#resultats" },
      { label: "Inscriptions et formulaires", phase: "Phase 2" },
    ],
  },
  {
    id: "inscription",
    index: "02",
    label: "Je souhaite m'inscrire",
    forWho: "Candidat décidé, qui connaît sa formation et son mode de financement.",
    summary:
      "Les modalités d'inscription dépendent de la formation et du mode de financement choisi. En alternance, l'inscription est finalisée avec l'entreprise d'accueil. En financement personnel, la demande est effectuée directement auprès de Provélite Académie.",
    facts: [
      { label: "Employeur", value: "Requis en alternance" },
      { label: "Pièces", value: "Variables selon la formation" },
      { label: "Suite", value: "Reprise de contact par l'équipe" },
    ],
    steps: [
      {
        label: "Identifier votre formation",
        detail: "CAP, CS (option à préciser), BP, CQP ou accompagnement VAE.",
      },
      {
        label: "Vérifier si un employeur est nécessaire",
        detail:
          "En contrat d'apprentissage ou de professionnalisation, la recherche du salon est un préalable.",
      },
      {
        label: "Réunir les pièces demandées",
        detail:
          "Pièces d'identité, justificatifs de parcours, contrat ou financement selon la voie choisie.",
      },
      {
        label: "Déposer la demande puis échanger",
        detail:
          "Des informations complémentaires peuvent être demandées avant l'admission définitive.",
      },
    ],
    ressources: [
      { label: "Modalités par formation", to: "#formations" },
      { label: "Salons qui recrutent", phase: "Phase 2" },
      { label: "Formulaires d'inscription", phase: "Phase 2" },
    ],
  },
  {
    id: "salon",
    index: "03",
    label: "Je cherche un salon en alternance",
    forWho: "Candidat à un contrat d'apprentissage ou de professionnalisation.",
    summary:
      "L'alternance suppose un salon d'accueil. Les salons partenaires publient les formations pour lesquelles ils recrutent, la personne à contacter et un moyen de les joindre directement, sans intermédiaire.",
    facts: [
      { label: "Contrats", value: "Apprentissage · Professionnalisation" },
      { label: "Contact", value: "Direct avec le salon" },
      { label: "Formations", value: "CAP · CS · BP" },
    ],
    steps: [
      {
        label: "Choisir votre formation",
        detail: "La recherche d'un salon se fait pour une formation et une option précises.",
      },
      {
        label: "Filtrer les salons qui recrutent",
        detail: "Un même salon peut recruter simultanément pour le CAP, le CS et le BP.",
      },
      {
        label: "Contacter le salon",
        detail:
          "Téléphone et personne à contacter sont affichés sur chaque offre. La candidature se fait ensuite directement entre le candidat et le salon.",
      },
      {
        label: "Préparer l'entretien",
        detail:
          "Le salon évalue la motivation ; le CFA informe sur le rythme, les attendus et les dates de rentrée.",
      },
    ],
    ressources: [
      { label: "Formations concernées", to: "#formations" },
      { label: "Offres des salons partenaires", phase: "Phase 2" },
      { label: "Conseils pour trouver une entreprise", to: "#conseils" },
    ],
  },
  {
    id: "decouverte",
    index: "04",
    label: "Je souhaite découvrir le CFA",
    forWho: "Futur candidat, parent, personne encore hésitante.",
    summary:
      "Les Moments Découverte permettent de voir l'établissement avant de s'engager : rencontrer l'équipe, comprendre l'alternance, visiter les locaux et poser ses questions. L'inscription à une session se fait en quelques minutes.",
    facts: [
      { label: "Durée", value: "Environ 1 h 30" },
      { label: "Accompagnant", value: "Bienvenu" },
      { label: "Accès", value: "Métro et bus à proximité" },
    ],
    steps: [
      {
        label: "Choisir une date",
        detail: "Les sessions sont ouvertes par formation ou pour un public particulier.",
      },
      {
        label: "S'inscrire à la session",
        detail:
          "Le nombre de places est limité ; les statuts indiquent les disponibilités en temps réel.",
      },
      {
        label: "Préparer vos questions",
        detail: "Financement, rythme, salons, examens : l'équipe répond pendant la visite.",
      },
      {
        label: "Poursuivre en candidature",
        detail: "À l'issue de la visite, la demande d'inscription peut être déposée.",
      },
    ],
    ressources: [
      { label: "Dates des sessions", to: "#orientation" },
      { label: "Le CFA, nos engagements", phase: "Phase 2" },
      { label: "Les cinq formations", to: "#formations" },
    ],
    conditionnel: true,
  },
  {
    id: "entreprise",
    index: "05",
    label: "Je suis une entreprise ou un salon",
    forWho: "Salon, enseigne ou marque qui recrute un alternant ou cherche un partenaire.",
    summary:
      "Recruter un alternant engage le salon sur la durée du contrat. Provélite Académie accompagne l'employeur : rythme de formation, suivi de progression, livret d'apprentissage numérique et informations sur les aides disponibles.",
    facts: [
      { label: "Rythme", value: "1 à 2 jours au CFA par semaine" },
      { label: "Suivi", value: "myProvélite et livret numérique" },
      { label: "Financement", value: "Prise en charge selon le contrat" },
    ],
    steps: [
      {
        label: "Choisir le contrat adapté",
        detail: "Apprentissage ou professionnalisation, selon le profil et le diplôme visé.",
      },
      {
        label: "Vérifier les aides disponibles",
        detail:
          "Les dispositifs d'aide à l'embauche d'un alternant évoluent : l'équipe indique les mesures en vigueur.",
      },
      {
        label: "Renseigner le rythme et le calendrier",
        detail: "Les jours au CFA sont connus avant la signature du contrat.",
      },
      {
        label: "Suivre la progression",
        detail:
          "Évaluations, livret d'apprentissage numérique et échanges réguliers avec le formateur référent.",
      },
    ],
    ressources: [
      { label: "Enseignes et marques partenaires", to: "#partenaires" },
      { label: "Conseils aux entreprises", to: "#conseils" },
      { label: "Offres des salons recruteurs", phase: "Phase 2" },
    ],
  },
  {
    id: "vae",
    index: "06",
    label: "Je souhaite faire une VAE",
    forWho: "Professionnel en activité avec au moins un an d'expérience dans le métier.",
    summary:
      "La validation des acquis de l'expérience est une rubrique autonome : elle n'est ni un contrat, ni un financement du CAP ou du BP. Provélite Académie accompagne le candidat de l'étude du projet jusqu'à la préparation du jury, pour un CAP ou un BP.",
    facts: [
      { label: "Parcours", value: "VAE CAP · VAE BP" },
      { label: "Expérience", value: "1 an minimum dans le métier" },
      { label: "Accompagnement", value: "Étude, rédaction, jury" },
    ],
    steps: [
      {
        label: "Étudier le projet et le parcours",
        detail:
          "Vérification du diplôme visé et de l'adéquation entre l'expérience et le référentiel.",
      },
      {
        label: "Constituer la recevabilité",
        detail: "Aide à la constitution du dossier et au respect des délais du certificateur.",
      },
      {
        label: "Rédiger le dossier",
        detail:
          "Sélection des situations professionnelles, aide méthodologique et accompagnement à la rédaction.",
      },
      {
        label: "Préparer le jury",
        detail: "Entraînement à l'oral et mise au point de l'argumentation devant le jury.",
      },
    ],
    ressources: [
      { label: "Principes et étapes de la VAE", phase: "Phase 2" },
      { label: "Financements possibles", to: "#formations" },
      { label: "Nous contacter", to: "#contact" },
    ],
  },
  {
    id: "modele",
    index: "07",
    label: "Je souhaite devenir modèle",
    forWho: "Personne extérieure qui accepte de servir de modèle pédagogique.",
    summary:
      "Le salon d'application accueille des modèles pour les prestations réalisées par les apprenants, sous la supervision des formateurs. Le résultat dépend de la séance et du niveau de formation : c'est un cadre pédagogique assumé, expliqué avant le rendez-vous.",
    facts: [
      { label: "Ouverture", value: "Octobre à mai" },
      { label: "Durée", value: "1 h à 3 h selon la prestation" },
      { label: "Rendez-vous", value: "Par téléphone" },
    ],
    steps: [
      {
        label: "Consulter les prestations",
        detail: "Coupe, coiffage, couleur, mèches, services forme et soins selon les objectifs pédagogiques.",
      },
      {
        label: "Accepter la touche d'essai",
        detail:
          "Elle est obligatoire pour les prestations techniques. Elle détermine la faisabilité et la durée de la séance.",
      },
      {
        label: "Prendre rendez-vous",
        detail: "Par téléphone, aux horaires d'appel du salon, dans les limites de la saison pédagogique.",
      },
      {
        label: "Venir à la séance",
        detail: "Ponctualité demandée. La prestation est encadrée par un formateur à chaque étape.",
      },
    ],
    ressources: [
      { label: "Prestations et conditions", to: "#salon" },
      { label: "Le salon d'application", phase: "Phase 2" },
      { label: "Questions fréquentes des modèles", to: "#conseils" },
    ],
  },
  {
    id: "apprenant",
    index: "08",
    label: "Je suis déjà apprenant",
    forWho: "Apprenant inscrit, qui cherche une information pratique ou un document.",
    summary:
      "Les cours, les évaluations et le livret d'apprentissage se trouvent sur myProvélite. Ce site rassemble ce qui l'entoure : les conseils pratiques, le calendrier, les articles destinés aux apprenants et les contacts utiles.",
    facts: [
      { label: "Plateforme", value: "myProvélite" },
      { label: "Livret", value: "Numérique, partagé avec le salon" },
      { label: "Support", value: "Formateur référent" },
    ],
    steps: [
      {
        label: "Accéder aux cours et aux ressources",
        detail: "Sur ordinateur, tablette et mobile, avec le suivi de progression et le calendrier.",
      },
      {
        label: "Suivre les évaluations",
        detail: "Résultats, devoirs et évaluations progressives en alternance avec l'entreprise.",
      },
      {
        label: "Renseigner le livret d'apprentissage",
        detail: "Le livret numérique se remplit à deux : apprenant et tuteur en salon.",
      },
      {
        label: "Préparer la suite",
        detail: "Poursuite d'études, spécialisation ou insertion professionnelle.",
      },
    ],
    ressources: [
      { label: "Conseils aux apprenants", to: "#conseils" },
      { label: "myProvélite", phase: "Phase 2" },
      { label: "Nous contacter", to: "#contact" },
    ],
  },
];

/** Les profils réellement affichés, selon l'état du CMS. */
export function profilsActifs(): Profil[] {
  return PROFILS.filter((p) => !p.conditionnel || SITE.momentsDecouverteActif);
}

/* ------------------------------------------------------------------ */
/* Moments Découverte                                                  */
/* ------------------------------------------------------------------ */

export type Session = {
  jour: string;
  horaire: string;
  public: string;
  places: string;
  statut: "Places disponibles" | "Presque complet" | "Complet";
};

export const SESSIONS: Session[] = [
  {
    jour: "Samedi 14 février",
    horaire: "9 h 30 – 11 h",
    public: "CAP · BP — futurs apprenants et familles",
    places: "12 places restantes",
    statut: "Places disponibles",
  },
  {
    jour: "Mercredi 4 mars",
    horaire: "14 h – 15 h 30",
    public: "CS Coupe couleur femme et Coupe homme",
    places: "3 places restantes",
    statut: "Presque complet",
  },
  {
    jour: "Samedi 21 mars",
    horaire: "9 h 30 – 11 h",
    public: "Reconversion et alternance adulte",
    places: "Session complète",
    statut: "Complet",
  },
];

/* ------------------------------------------------------------------ */
/* Formations                                                          */
/* ------------------------------------------------------------------ */

export type Formation = {
  id: string;
  code: string;
  name: string;
  level: string;
  duration: string;
  rythme: string;
  certification: string;
  funding: string[];
  summary: string;
  /** Le contenu long, déplié dans la fiche. */
  contenus: string;
  blocks: string[];
  spots: string[];
  debouches: string[];
  options?: { id: string; label: string; contenus: string }[];
  autonome?: boolean;
};

export const FORMATIONS: Formation[] = [
  {
    id: "cap",
    code: "CAP",
    name: "CAP Métiers de la coiffure",
    level: "Niveau 3",
    duration: "24 mois",
    rythme: "Alternance — temps partagé entre le CFA et le salon",
    certification: "CAP Métiers de la coiffure",
    funding: ["Apprentissage", "Professionnalisation", "Financement personnel"],
    summary:
      "Le socle du métier. Coupe, couleur, coiffage et relation client se construisent en alternance, entre les journées au CFA et la pratique quotidienne en salon.",
    contenus:
      "La formation couvre les techniques professionnelles, la relation client et l'activité commerciale du salon, soutenues par la technologie, la biologie et les règles d'hygiène, de sécurité et d'environnement. Les matières générales sont incluses ; des dispenses existent selon le diplôme déjà obtenu, et un test de niveau est organisé lorsqu'elles doivent être suivies.",
    blocks: [
      "Techniques professionnelles",
      "Relation client",
      "Activité commerciale",
      "Technologie",
      "Biologie",
      "Hygiène, sécurité et environnement",
      "Matières générales",
    ],
    spots: [
      "Dispenses possibles selon le diplôme déjà obtenu",
      "Test de niveau si les matières générales doivent être suivies",
      "Poursuite possible vers un certificat de spécialisation ou un BP",
    ],
    debouches: [
      "Coiffeur ou coiffeuse en salon",
      "Coiffeur ou coiffeuse en enseigne",
      "Poursuite en certificat de spécialisation",
      "Poursuite en BP Coiffure",
    ],
  },
  {
    id: "cs",
    code: "CS",
    name: "Certificat de spécialisation",
    level: "Niveau 3",
    duration: "12 mois",
    rythme: "Une journée par semaine au CFA, théorie en e-learning",
    certification: "Certificat de spécialisation — option choisie",
    funding: ["Apprentissage", "Professionnalisation", "Financement personnel"],
    summary:
      "Une spécialisation nette, choisie entre coupe couleur femme et coupe homme. La pratique se concentre au CFA, la théorie se suit en e-learning, de septembre à juin.",
    contenus:
      "La formation se déroule sur une journée de pratique au CFA — le mercredi — complétée par la théorie en e-learning. Elle s'adresse à des professionnels déjà titulaires d'un CAP ou d'un BP coiffure qui veulent se spécialiser et se préparer aux épreuves spécifiques de l'option choisie.",
    blocks: [
      "Spécialisation progressive sur l'option choisie",
      "Diagnostic et personnalisation",
      "Recherche artistique et créativité",
      "Préparation aux épreuves spécifiques",
    ],
    spots: [
      "Accès après un CAP ou un BP coiffure",
      "Une seule journée au CFA : le reste en salon et en e-learning",
      "Deux options activables indépendamment dans le CMS",
    ],
    debouches: [
      "Coiffeur ou coiffeuse spécialisé",
      "Responsable de la technique couleur",
      "Poursuite en BP Coiffure",
    ],
    options: [
      {
        id: "femme",
        label: "Coupe couleur femme",
        contenus:
          "Coupe femme, techniques de couleur et effets de couleur, coiffage, diagnostic, personnalisation, créativité et recherche artistique, préparation aux épreuves spécifiques.",
      },
      {
        id: "homme",
        label: "Coupe homme",
        contenus:
          "Coupe masculine, dégradés, coiffage homme, précision des finitions, conseil, adaptation à la morphologie, travail de la barbe lorsque le programme le prévoit, préparation aux épreuves spécifiques.",
      },
    ],
  },
  {
    id: "bp",
    code: "BP",
    name: "BP Coiffure",
    level: "Niveau 4",
    duration: "24 mois",
    rythme: "Une journée par semaine au CFA, théorie sur myProvélite",
    certification: "Brevet professionnel Coiffure",
    funding: ["Apprentissage", "Professionnalisation"],
    summary:
      "Le diplôme du technicien et du futur responsable. Une organisation hybride : la pratique au CFA, la théorie et les matières d'expression et de management en e-learning, l'alternance en entreprise.",
    contenus:
      "Le BP Coiffure s'adresse à des professionnels titulaires d'un CAP coiffure. L'organisation est hybride : une journée par semaine au CFA pour la pratique, la théorie et les matières d'expression et de management sur myProvélite, et l'alternance en entreprise pour l'expérience du salon.",
    blocks: [
      "Création, couleur, coupe et coiffage",
      "Coupe masculine",
      "Coiffure événementielle",
      "Cheveux bouclés, frisés et crépus",
      "Coloration, éclaircissements et services forme",
      "Relation client",
      "Management",
      "Gestion",
      "Expression et connaissance du monde",
      "Préparation aux examens",
    ],
    spots: [
      "Accès après un CAP coiffure",
      "Une journée par semaine au CFA",
      "ECM et management en e-learning sur myProvélite",
    ],
    debouches: [
      "Coiffeur ou coiffeuse confirmé",
      "Responsable technique de salon",
      "Évolution vers le CQP Manager un salon de coiffure",
    ],
  },
  {
    id: "cqp",
    code: "CQP",
    name: "CQP Manager un salon de coiffure",
    level: "Certification professionnelle",
    duration: "10 mois",
    rythme: "100 % e-learning, rythme flexible",
    certification: "CQP Manager un salon de coiffure",
    funding: ["Contrat de professionnalisation", "Financement personnel"],
    summary:
      "Une formation entièrement à distance, pensée pour un professionnel en poste qui veut prendre la direction d'un salon sans quitter son activité.",
    contenus:
      "La formation est intégralement suivie depuis myProvélite : cours, ressources, évaluations à distance et suivi de progression individualisé. Le rythme est flexible, sur une durée de dix mois, pour un public professionnel déjà en activité.",
    blocks: [
      "Management d'équipe",
      "Relation client",
      "Développement commercial",
      "Pilotage de l'activité",
      "Recrutement",
      "Formation",
      "Communication",
      "Organisation",
      "Hygiène, sécurité et engagement environnemental",
    ],
    spots: [
      "100 % e-learning, accessible depuis myProvélite",
      "Rythme flexible sur 10 mois",
      "Évaluations et suivi de progression à distance",
    ],
    debouches: [
      "Manager de salon",
      "Responsable de secteur",
      "Création ou reprise d'un salon",
    ],
  },
  {
    id: "vae",
    code: "VAE",
    name: "Validation des acquis de l'expérience",
    level: "Selon le diplôme visé",
    duration: "Variable, selon le projet",
    rythme: "Accompagnement individuel, en présentiel et à distance",
    certification: "CAP Métiers de la coiffure ou BP Coiffure",
    funding: ["Financement personnel", "Dispositifs d'aide selon la situation"],
    summary:
      "Une rubrique autonome : la VAE n'est ni un contrat, ni un mode de financement du CAP ou du BP. Elle valide par un jury l'expérience déjà acquise dans le métier.",
    contenus:
      "Provélite Académie accompagne les candidats sur deux parcours distincts : la VAE CAP et la VAE BP. L'accompagnement couvre l'étude du projet, l'analyse du parcours, la vérification du diplôme visé, l'aide à la recevabilité, l'aide méthodologique, la rédaction, la sélection des situations professionnelles et la préparation au jury.",
    blocks: [
      "Principe et conditions générales",
      "Étapes du parcours VAE",
      "Accompagnement méthodologique",
      "Préparation au jury",
    ],
    spots: [
      "Deux parcours : VAE CAP et VAE BP",
      "La VAE reste une rubrique autonome, distincte des financements",
      "Étude individualisée du projet avant l'engagement",
    ],
    debouches: [
      "Diplôme obtenu par la voie de l'expérience",
      "Évolution vers l'encadrement",
      "Poursuite possible vers un niveau supérieur",
    ],
    autonome: true,
  },
];

/* ------------------------------------------------------------------ */
/* Chiffres clés généraux                                              */
/* ------------------------------------------------------------------ */

export type Chiffre = {
  value: string;
  label: string;
  year: string;
  population: string;
  scope: string;
  source: string;
};

export const CHIFFRES: Chiffre[] = [
  {
    value: "100 %",
    label: "de réussite au CAP",
    year: "2026",
    population: "33 candidats présentés, 33 admis",
    scope: "Cohorte CAP entrée en 2023, session 2026",
    source: "Résultats d'examen, session 2026",
  },
  {
    value: "96 %",
    label: "de mentions au CAP",
    year: "2026",
    population: "Candidats admis au CAP",
    scope: "Cohorte CAP entrée en 2023, session 2026",
    source: "Résultats d'examen, session 2026",
  },
  {
    value: "82 %",
    label: "de réussite au BP",
    year: "2026",
    population: "22 candidats présentés, 18 admis",
    scope: "Cohorte BP entrée en 2024, session 2026",
    source: "Résultats d'examen, session 2026",
  },
  {
    value: "4 000+",
    label: "apprenants accompagnés depuis 2008",
    year: "Depuis 2008",
    population: "Tous publics confondus",
    scope: "Ensemble des parcours Provélite Académie",
    source: "Suivi interne des promotions",
  },
  {
    value: "1er",
    label: "CFA HappyAtSchool® en 2024 et 2025",
    year: "2024 et 2025",
    population: "CFA évalués en France",
    scope: "Classement national HappyAtSchool®",
    source: "Label HappyAtSchool®",
  },
];

/* ------------------------------------------------------------------ */
/* Résultats et indicateurs par formation                              */
/* ------------------------------------------------------------------ */

export type Indicateur = {
  label: string;
  value: string;
  ratio?: string;
  methode: string;
  definition?: string;
};

export type Cohorte = {
  id: string;
  formation: string;
  annee: string;
  effectif: number;
  principaux: Indicateur[];
  secondaires: Indicateur[];
};

export const COHORTES: Cohorte[] = [
  {
    id: "cap",
    formation: "CAP Métiers de la coiffure",
    annee: "2025-2026",
    effectif: 35,
    principaux: [
      {
        label: "Taux de présentation",
        value: "94 %",
        ratio: "33 présentés sur 35 inscrits",
        methode: "Candidats présentés à l'examen rapportés aux candidats inscrits dans la cohorte.",
      },
      {
        label: "Taux de réussite",
        value: "100 %",
        ratio: "33 admis sur 33 présentés",
        methode: "Candidats admis rapportés aux candidats effectivement présentés.",
      },
      {
        label: "Taux de satisfaction",
        value: "94 %",
        ratio: "32 répondants sur 35 interrogés",
        methode:
          "Réponses des apprenants au questionnaire de fin de parcours. Taux de réponse : 91 %.",
        definition: "Enquête menée auprès de la cohorte 2025-2026.",
      },
      {
        label: "Taux d'employabilité",
        value: "86 %",
        ratio: "19 répondants en emploi sur 22",
        methode:
          "Répondants en emploi rapportés au total des répondants retenus dans le calcul.",
        definition:
          "Situations comptabilisées : CDI, CDD, intérim, alternance, travail indépendant, emploi dans le secteur.",
      },
    ],
    secondaires: [
      {
        label: "Taux de réponse au suivi",
        value: "79 %",
        ratio: "22 répondants sur 28 sollicités",
        methode: "Répondants à l'enquête d'insertion rapportés aux personnes sollicitées.",
      },
      {
        label: "Taux de poursuite d'études",
        value: "9 %",
        ratio: "2 répondants sur 22",
        methode: "Répondants ayant poursuivi une formation rapportés au total des répondants.",
      },
      {
        label: "Taux de recherche d'emploi",
        value: "5 %",
        ratio: "1 répondant sur 22",
        methode: "Répondants déclarant rechercher un emploi rapportés au total des répondants.",
      },
      {
        label: "Taux de rupture",
        value: "6 %",
        ratio: "2 contrats rompus sur 35 contrats suivis",
        methode:
          "Contrats rompus rapportés aux contrats suivis sur la période. Une rupture n'est pas comptabilisée comme un abandon : la formation peut se poursuivre après la signature d'un nouveau contrat.",
      },
      {
        label: "Taux d'abandon",
        value: "3 %",
        ratio: "1 apprenant sur 35 entrés en formation",
        methode:
          "Apprenants ayant quitté définitivement la formation rapportés aux apprenants entrés en formation.",
      },
      {
        label: "Effectif de la cohorte",
        value: "35",
        ratio: "Apprenants entrés en formation",
        methode: "Effectif de référence pour les taux de la cohorte 2025-2026.",
      },
    ],
  },
  {
    id: "bp",
    formation: "BP Coiffure",
    annee: "2025-2026",
    effectif: 24,
    principaux: [
      {
        label: "Taux de présentation",
        value: "92 %",
        ratio: "22 présentés sur 24 inscrits",
        methode: "Candidats présentés à l'examen rapportés aux candidats inscrits dans la cohorte.",
      },
      {
        label: "Taux de réussite",
        value: "82 %",
        ratio: "18 admis sur 22 présentés",
        methode: "Candidats admis rapportés aux candidats effectivement présentés.",
      },
      {
        label: "Taux de satisfaction",
        value: "91 %",
        ratio: "19 répondants sur 22 interrogés",
        methode:
          "Réponses des apprenants au questionnaire de fin de parcours. Taux de réponse : 86 %.",
        definition: "Enquête menée auprès de la cohorte 2025-2026.",
      },
      {
        label: "Taux d'employabilité",
        value: "86 %",
        ratio: "12 répondants en emploi sur 14",
        methode:
          "Répondants en emploi rapportés au total des répondants retenus dans le calcul.",
        definition:
          "Situations comptabilisées : CDI, CDD, intérim, alternance, travail indépendant, emploi dans le secteur.",
      },
    ],
    secondaires: [
      {
        label: "Taux de réponse au suivi",
        value: "78 %",
        ratio: "14 répondants sur 18 sollicités",
        methode: "Répondants à l'enquête d'insertion rapportés aux personnes sollicitées.",
      },
      {
        label: "Taux de poursuite d'études",
        value: "7 %",
        ratio: "1 répondant sur 14",
        methode: "Répondants ayant poursuivi une formation rapportés au total des répondants.",
      },
      {
        label: "Taux de recherche d'emploi",
        value: "7 %",
        ratio: "1 répondant sur 14",
        methode: "Répondants déclarant rechercher un emploi rapportés au total des répondants.",
      },
      {
        label: "Taux de rupture",
        value: "8 %",
        ratio: "2 contrats rompus sur 24 contrats suivis",
        methode:
          "Contrats rompus rapportés aux contrats suivis sur la période. La poursuite de la formation après rupture est comptabilisée séparément de l'abandon.",
      },
      {
        label: "Taux d'abandon",
        value: "4 %",
        ratio: "1 apprenant sur 24 entrés en formation",
        methode:
          "Apprenants ayant quitté définitivement la formation rapportés aux apprenants entrés en formation.",
      },
      {
        label: "Effectif de la cohorte",
        value: "24",
        ratio: "Apprenants entrés en formation",
        methode: "Effectif de référence pour les taux de la cohorte 2025-2026.",
      },
    ],
  },
  {
    id: "cs",
    formation: "Certificat de spécialisation",
    annee: "2025-2026",
    effectif: 14,
    principaux: [
      {
        label: "Taux de présentation",
        value: "93 %",
        ratio: "13 présentés sur 14 inscrits",
        methode: "Candidats présentés à l'examen rapportés aux candidats inscrits dans la cohorte.",
      },
      {
        label: "Taux de réussite",
        value: "100 %",
        ratio: "13 admis sur 13 présentés",
        methode: "Candidats admis rapportés aux candidats effectivement présentés.",
      },
      {
        label: "Taux de satisfaction",
        value: "96 %",
        ratio: "13 répondants sur 14 interrogés",
        methode:
          "Réponses des apprenants au questionnaire de fin de parcours. Taux de réponse : 93 %.",
        definition: "Enquête menée auprès des deux options, cohorte 2025-2026.",
      },
      {
        label: "Taux d'employabilité",
        value: "90 %",
        ratio: "9 répondants en emploi sur 10",
        methode:
          "Répondants en emploi rapportés au total des répondants retenus dans le calcul.",
        definition:
          "Situations comptabilisées : CDI, CDD, intérim, alternance, travail indépendant, emploi dans le secteur.",
      },
    ],
    secondaires: [
      {
        label: "Taux de réponse au suivi",
        value: "83 %",
        ratio: "10 répondants sur 12 sollicités",
        methode: "Répondants à l'enquête d'insertion rapportés aux personnes sollicitées.",
      },
      {
        label: "Taux de poursuite d'études",
        value: "10 %",
        ratio: "1 répondant sur 10",
        methode: "Répondants ayant poursuivi une formation rapportés au total des répondants.",
      },
      {
        label: "Taux de recherche d'emploi",
        value: "0 %",
        ratio: "0 répondant sur 10",
        methode: "Répondants déclarant rechercher un emploi rapportés au total des répondants.",
      },
      {
        label: "Taux de rupture",
        value: "0 %",
        ratio: "0 contrat rompu sur 14 contrats suivis",
        methode: "Contrats rompus rapportés aux contrats suivis sur la période.",
      },
      {
        label: "Taux d'abandon",
        value: "0 %",
        ratio: "0 apprenant sur 14 entrés en formation",
        methode:
          "Apprenants ayant quitté définitivement la formation rapportés aux apprenants entrés en formation.",
      },
      {
        label: "Effectif de la cohorte",
        value: "14",
        ratio: "Apprenants entrés en formation",
        methode: "Effectif retenu pour les taux de la cohorte 2025-2026.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Avis Google                                                         */
/* ------------------------------------------------------------------ */

export const AVIS = {
  note: "4,8",
  total: 412,
  lien: "https://www.google.com/maps/search/Provélite+Académie",
  extraits: [
    {
      auteur: "Camille R.",
      contexte: "Ancienne apprenante, CAP puis BP",
      texte:
        "On apprend le métier pour de vrai. Les formateurs prennent le temps de reprendre les gestes, et le salon d'application change tout : on progresse beaucoup plus vite.",
    },
    {
      auteur: "Sofiane B.",
      contexte: "Apprenant en BP Coiffure",
      texte:
        "Une journée au CFA par semaine et tout le reste à suivre sur myProvélite. On peut travailler et se former sans être perdu.",
    },
    {
      auteur: "Enseigne partenaire",
      contexte: "Recrute des alternants depuis 2019",
      texte:
        "Les alternants arrivent préparés et le suivi est réel. Le formateur référent appelle le salon, on n'est jamais seuls face aux questions du livret.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Salon d'application                                                 */
/* ------------------------------------------------------------------ */

export const SALON = {
  titre: "Le salon d'application",
  periode: "Ouvert d'octobre à mai",
  accroche:
    "Le salon d'application est un lieu de formation avant d'être un salon. Les prestations sont réalisées par les apprenants, sous la supervision constante des formateurs.",
  prestations: [
    { label: "Coupe", duree: "1 h à 1 h 30" },
    { label: "Coiffage", duree: "45 min à 1 h" },
    { label: "Couleur", duree: "1 h 30 à 2 h 30" },
    { label: "Mèches", duree: "2 h à 3 h" },
    { label: "Services forme", duree: "1 h à 2 h" },
    { label: "Soins", duree: "45 min" },
  ],
  conditions: [
    "Disponibilité nécessaire sur toute la durée de la prestation.",
    "La prestation dure généralement d'une heure à trois heures.",
    "Les horaires annoncés sont à respecter.",
    "Le cadre pédagogique est accepté à l'avance.",
    "Le résultat dépend de la séance et du niveau de formation.",
  ],
  toucheEssai:
    "Pour toute prestation technique, une touche d'essai est réalisée avant le rendez-vous. Elle est obligatoire : elle détermine la faisabilité, la durée et le déroulé de la séance.",
  tarifsNote:
    "La grille tarifaire est publiée depuis le CMS et mise à jour par l'établissement. Elle est communiquée au moment de la prise de rendez-vous.",
};

/* ------------------------------------------------------------------ */
/* Partenaires                                                         */
/* ------------------------------------------------------------------ */

export const ENSEIGNES = [
  {
    nom: "Franck Provost",
    description: "Enseigne partenaire pour l'accueil des alternants en CAP et en BP.",
  },
  {
    nom: "Saint Algue",
    description: "Réseau partenaire du CFA pour les contrats d'apprentissage.",
  },
  {
    nom: "Jean Louis David",
    description: "Salons partenaires et interventions professionnelles auprès des apprenants.",
  },
];

export const MARQUES = [
  {
    nom: "ghd",
    description: "Collaboration technique sur les outils de coiffage et les démonstrations.",
  },
  {
    nom: "Wella",
    description: "Formation couleur et mise à disposition des supports techniques.",
  },
  {
    nom: "L'Oréal Professionnel",
    description: "Interventions pédagogiques et veille sur les techniques de coloration.",
  },
];

/* ------------------------------------------------------------------ */
/* Conseils et actualités                                              */
/* ------------------------------------------------------------------ */

export type Public = "apprenant" | "entreprise" | "modele" | "cfa";

export const PUBLICS: { id: Public | "tous"; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "apprenant", label: "Apprenants" },
  { id: "entreprise", label: "Entreprises" },
  { id: "modele", label: "Modèles" },
  { id: "cfa", label: "Vie du CFA" },
];

export type Article = {
  titre: string;
  resume: string;
  publics: Public[];
  categorie: string;
  date: string;
  lecture: string;
};

export const ARTICLES: Article[] = [
  {
    titre: "Comment trouver une entreprise d'accueil ?",
    resume:
      "Où chercher, quoi dire au premier appel et comment préparer l'entretien quand on n'a jamais travaillé en salon.",
    publics: ["apprenant"],
    categorie: "Alternance",
    date: "12 février 2026",
    lecture: "6 min",
  },
  {
    titre: "Préparer sa rentrée : les pièces à réunir",
    resume:
      "Pièces d'identité, justificatifs de parcours, contrat ou accord de financement : la liste complète selon votre voie.",
    publics: ["apprenant"],
    categorie: "Inscription",
    date: "5 février 2026",
    lecture: "4 min",
  },
  {
    titre: "Après le CAP : CS ou BP ?",
    resume:
      "Deux projets différents. Une spécialisation nette d'un côté, un diplôme de technicien et de futur responsable de l'autre.",
    publics: ["apprenant"],
    categorie: "Orientation",
    date: "28 janvier 2026",
    lecture: "5 min",
  },
  {
    titre: "Inscrire un apprenti : le contrat en trois étapes",
    resume:
      "Du choix du contrat à la déclaration, en passant par les informations à transmettre au CFA.",
    publics: ["entreprise"],
    categorie: "Recrutement",
    date: "9 février 2026",
    lecture: "5 min",
  },
  {
    titre: "Quelles aides pour recruter un alternant ?",
    resume:
      "Les dispositifs évoluent chaque année. Le point sur les aides mobilisables par un salon et les démarches associées.",
    publics: ["entreprise"],
    categorie: "Financement",
    date: "31 janvier 2026",
    lecture: "4 min",
  },
  {
    titre: "La touche d'essai, obligatoire et expliquée",
    resume:
      "Pourquoi elle est demandée pour les prestations techniques, ce qu'elle permet de vérifier et comment elle se déroule.",
    publics: ["modele"],
    categorie: "Salon",
    date: "6 février 2026",
    lecture: "3 min",
  },
  {
    titre: "Prendre rendez-vous au salon d'application",
    resume:
      "Horaires d'appel, délai possible, saison pédagogique : tout ce qu'il faut savoir avant de réserver.",
    publics: ["modele"],
    categorie: "Salon",
    date: "22 janvier 2026",
    lecture: "3 min",
  },
  {
    titre: "HappyAtSchool® : ce que le label regarde vraiment",
    resume:
      "Deuxième année consécutive au premier rang. Retour sur les critères et sur ce qui a changé dans l'établissement.",
    publics: ["cfa"],
    categorie: "Vie du CFA",
    date: "15 janvier 2026",
    lecture: "4 min",
  },
];

/* ------------------------------------------------------------------ */
/* Arborescence                                                        */
/* ------------------------------------------------------------------ */

/** Les rubriques prévues au cahier des charges, avec leur périmètre. */
export const ARBORESCENCE: { label: string; to?: string; phase?: string }[] = [
  { label: "Accueil", to: "#accueil" },
  { label: "Formations", to: "#formations" },
  { label: "Trouver un salon", phase: "Phase 2" },
  { label: "Inscriptions", phase: "Phase 2" },
  {
    label: "Moments Découverte",
    to: SITE.momentsDecouverteActif ? "#orientation" : undefined,
    phase: SITE.momentsDecouverteActif ? undefined : "Désactivée",
  },
  { label: "Professionnels & partenaires", to: "#partenaires" },
  { label: "Le CFA", phase: "Phase 2" },
  { label: "Le Salon d'application", to: "#salon" },
  { label: "myProvélite", phase: "Phase 2" },
  { label: "Conseils & actualités", to: "#conseils" },
  { label: "Contact", to: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Clé d'étape utilisée pour l'enregistrement du parcours              */
/* ------------------------------------------------------------------ */

export function stepKey(profilId: string, index: number) {
  return `${profilId}#${index}`;
}
