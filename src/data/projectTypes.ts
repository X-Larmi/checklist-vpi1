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
    id: "switching",
    name: "Switching",
    description: "Déploiement et configuration de switches réseau, VLANs et infrastructure LAN",
    icon: "Network",
    color: "from-blue-500/20 to-cyan-500/20",
    categories: [
      {
        name: "Checklist technique",
        items: [
          "Récupération de la configuration du/des switch existants",
          "Config port d'accès (les VLANs) / Config ports d'interco",
          "Convention de nommage des switch",
          "Alimentation ondulée ?",
          "Serveur NTP interne ? Sinon ouvrir accès serveur NTP web",
          "Supervision client (config du SNMP)",
          "Intervention sur l'infra ?",
          "Bouclage fibre/RJ/Radio existant ? Si oui, version de spanning-tree",
          "Y a-t-il de la place disponible dans la baie ?",
        ],
      },
    ],
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    description: "Déploiement de réseaux sans fil, bornes d'accès et couverture radio",
    icon: "Wifi",
    color: "from-violet-500/20 to-purple-500/20",
    categories: [
      {
        name: "Conception",
        items: [
          "Choisir le modèle de bornes",
          "Définir les SSIDs et profils",
          "Planifier le plan de canaux",
          "Prévoir l'alimentation PoE",
        ],
      },
      {
        name: "Installation",
        items: [
          "Installer les bornes Wi-Fi",
          "Configurer le contrôleur",
          "Paramétrer les SSIDs",
          "Configurer la sécurité (WPA3/802.1X)",
        ],
      },
      {
        name: "Recette",
        items: [
          "Valider la couverture radio",
          "Tester le roaming",
          "Mesurer les débits",
          "Rédiger le PV de recette",
        ],
      },
    ],
  },
  {
    id: "video-protection",
    name: "Vidéo-protection",
    description: "Installation de systèmes de vidéosurveillance, caméras IP et enregistrement",
    icon: "Camera",
    color: "from-red-500/20 to-rose-500/20",
    categories: [
      {
        name: "Étude",
        items: [
          "Identifier les zones à surveiller",
          "Définir les angles de vue",
          "Choisir le type de caméras",
          "Vérifier la conformité RGPD",
        ],
      },
      {
        name: "Infrastructure",
        items: [
          "Dimensionner le stockage",
          "Prévoir le réseau dédié",
          "Planifier l'alimentation PoE",
          "Choisir l'enregistreur (NVR)",
        ],
      },
      {
        name: "Installation",
        items: [
          "Installer les caméras",
          "Câbler le réseau vidéo",
          "Configurer le NVR",
          "Paramétrer la détection de mouvement",
        ],
      },
      {
        name: "Mise en service",
        items: [
          "Régler les champs de vision",
          "Tester l'enregistrement",
          "Configurer l'accès distant",
          "Former les utilisateurs",
        ],
      },
    ],
  },
  {
    id: "pare-feu",
    name: "Pare-feu",
    description: "Déploiement et configuration de firewalls, règles de filtrage et VPN",
    icon: "ShieldCheck",
    color: "from-emerald-500/20 to-green-500/20",
    categories: [
      {
        name: "Analyse",
        items: [
          "Auditer la politique de sécurité",
          "Cartographier les flux réseau",
          "Identifier les zones de confiance",
          "Définir la matrice de flux",
        ],
      },
      {
        name: "Configuration",
        items: [
          "Installer le pare-feu",
          "Configurer les interfaces et zones",
          "Créer les règles de filtrage",
          "Mettre en place le NAT",
        ],
      },
      {
        name: "Services",
        items: [
          "Configurer le VPN site-à-site",
          "Configurer le VPN client",
          "Activer l'IPS/IDS",
          "Paramétrer le filtrage URL",
        ],
      },
      {
        name: "Validation",
        items: [
          "Tester les règles de filtrage",
          "Vérifier les tunnels VPN",
          "Valider la haute disponibilité",
          "Documenter la politique",
        ],
      },
    ],
  },
  {
    id: "ucopia",
    name: "Ucopia",
    description: "Déploiement du portail captif Ucopia, gestion des accès et authentification",
    icon: "KeyRound",
    color: "from-amber-500/20 to-yellow-500/20",
    categories: [
      {
        name: "Préparation",
        items: [
          "Définir la politique d'accès",
          "Identifier les profils utilisateurs",
          "Préparer l'infrastructure réseau",
          "Dimensionner la solution",
        ],
      },
      {
        name: "Installation",
        items: [
          "Déployer le serveur Ucopia",
          "Configurer l'intégration réseau",
          "Paramétrer le portail captif",
          "Personnaliser la page d'accueil",
        ],
      },
      {
        name: "Configuration",
        items: [
          "Créer les profils d'accès",
          "Configurer l'authentification (LDAP/AD)",
          "Définir les quotas de bande passante",
          "Paramétrer les tickets d'accès",
        ],
      },
      {
        name: "Recette",
        items: [
          "Tester l'authentification",
          "Valider la redirection portail",
          "Vérifier les restrictions d'accès",
          "Former les administrateurs",
        ],
      },
    ],
  },
  {
    id: "pont-radio",
    name: "Pont-Radio",
    description: "Liaison radio point-à-point ou point-à-multipoint entre sites distants",
    icon: "Radio",
    color: "from-sky-500/20 to-indigo-500/20",
    categories: [
      {
        name: "Étude de faisabilité",
        items: [
          "Vérifier la ligne de vue",
          "Calculer le bilan de liaison",
          "Choisir la fréquence (5 GHz / 60 GHz)",
          "Vérifier les autorisations ANFR",
        ],
      },
      {
        name: "Conception",
        items: [
          "Sélectionner les équipements",
          "Dimensionner les antennes",
          "Planifier le support de fixation",
          "Prévoir l'alimentation électrique",
        ],
      },
      {
        name: "Installation",
        items: [
          "Installer les mâts/supports",
          "Fixer et orienter les antennes",
          "Câbler les équipements",
          "Aligner les antennes",
        ],
      },
      {
        name: "Mise en service",
        items: [
          "Configurer le lien radio",
          "Optimiser le signal",
          "Tester le débit et la latence",
          "Documenter l'installation",
        ],
      },
    ],
  },
  {
    id: "audit-wifi",
    name: "Audit Wi-Fi",
    description: "Analyse et diagnostic de la couverture, performances et sécurité du réseau Wi-Fi",
    icon: "SearchCheck",
    color: "from-orange-500/20 to-pink-500/20",
    categories: [
      {
        name: "Préparation",
        items: [
          "Collecter les plans des bâtiments",
          "Recueillir les plaintes utilisateurs",
          "Identifier les zones critiques",
          "Préparer les outils de mesure",
        ],
      },
      {
        name: "Mesures terrain",
        items: [
          "Réaliser le survey passif",
          "Réaliser le survey actif",
          "Mesurer les niveaux de signal",
          "Identifier les sources d'interférence",
        ],
      },
      {
        name: "Analyse",
        items: [
          "Analyser les heat maps",
          "Évaluer le SNR par zone",
          "Vérifier la couverture roaming",
          "Auditer la configuration sécurité",
        ],
      },
      {
        name: "Rapport",
        items: [
          "Rédiger le rapport d'audit",
          "Formuler les recommandations",
          "Proposer le plan d'amélioration",
          "Présenter les résultats au client",
        ],
      },
    ],
  },
];
