export interface ProjectTypeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  categories: {
    name: string;
    items: string[];
  }[];
}

export const projectTypes: ProjectTypeData[] = [
  {
    id: "website",
    name: "Site Web",
    description: "Création ou refonte d'un site vitrine, e-commerce ou application web",
    icon: "Globe",
    color: "from-blue-500/20 to-cyan-500/20",
    categories: [
      {
        name: "Cadrage",
        items: [
          "Définir les objectifs du site",
          "Identifier la cible utilisateur",
          "Analyser la concurrence",
          "Rédiger le cahier des charges",
        ],
      },
      {
        name: "Design",
        items: [
          "Créer les maquettes (wireframes)",
          "Définir la charte graphique",
          "Valider le design responsive",
          "Préparer les assets visuels",
        ],
      },
      {
        name: "Développement",
        items: [
          "Configurer l'environnement",
          "Développer le front-end",
          "Intégrer le back-end",
          "Optimiser les performances",
        ],
      },
      {
        name: "Lancement",
        items: [
          "Tester sur tous les navigateurs",
          "Configurer le SEO",
          "Mettre en production",
          "Monitorer les performances",
        ],
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Application Mobile",
    description: "Développement d'une application iOS, Android ou cross-platform",
    icon: "Smartphone",
    color: "from-violet-500/20 to-purple-500/20",
    categories: [
      {
        name: "Recherche",
        items: [
          "Étude de marché",
          "Définir les user stories",
          "Choisir la stack technique",
          "Planifier les releases",
        ],
      },
      {
        name: "UX/UI",
        items: [
          "Créer les parcours utilisateur",
          "Designer les écrans clés",
          "Prototyper les interactions",
          "Tester l'ergonomie",
        ],
      },
      {
        name: "Développement",
        items: [
          "Configurer le projet",
          "Développer les fonctionnalités core",
          "Intégrer les APIs",
          "Gérer les notifications push",
        ],
      },
      {
        name: "Publication",
        items: [
          "Tests automatisés",
          "Beta testing",
          "Soumettre sur les stores",
          "Plan de communication lancement",
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Campagne Marketing",
    description: "Lancement d'une campagne digitale, social media ou événementielle",
    icon: "Megaphone",
    color: "from-orange-500/20 to-amber-500/20",
    categories: [
      {
        name: "Stratégie",
        items: [
          "Définir les objectifs SMART",
          "Identifier les personas",
          "Choisir les canaux",
          "Définir le budget",
        ],
      },
      {
        name: "Contenu",
        items: [
          "Rédiger le plan éditorial",
          "Créer les visuels",
          "Préparer les copies",
          "Valider le ton et le message",
        ],
      },
      {
        name: "Exécution",
        items: [
          "Planifier les publications",
          "Configurer les campagnes ads",
          "Lancer les emails",
          "Activer les partenariats",
        ],
      },
      {
        name: "Analyse",
        items: [
          "Suivre les KPIs",
          "Analyser les conversions",
          "Optimiser les campagnes",
          "Rédiger le bilan",
        ],
      },
    ],
  },
  {
    id: "event",
    name: "Événement",
    description: "Organisation d'un séminaire, conférence, workshop ou team building",
    icon: "CalendarDays",
    color: "from-emerald-500/20 to-green-500/20",
    categories: [
      {
        name: "Planification",
        items: [
          "Définir la date et le lieu",
          "Établir le budget prévisionnel",
          "Lister les intervenants",
          "Créer le programme",
        ],
      },
      {
        name: "Logistique",
        items: [
          "Réserver le lieu",
          "Organiser la restauration",
          "Prévoir l'équipement technique",
          "Gérer les inscriptions",
        ],
      },
      {
        name: "Communication",
        items: [
          "Créer les invitations",
          "Lancer la promotion",
          "Préparer les supports",
          "Relancer les inscrits",
        ],
      },
      {
        name: "Post-événement",
        items: [
          "Envoyer les remerciements",
          "Partager les photos/vidéos",
          "Collecter les feedbacks",
          "Rédiger le compte-rendu",
        ],
      },
    ],
  },
];
