/**
 * PROJECTS-DATA.JS — Source de vérité des projets
 * ─────────────────────────────────────────────────
 * Pour ajouter un projet :
 *  1. Ajoute un objet ici dans le tableau PROJECTS
 *  2. Crée sa page HTML (ex: mon-projet.html)
 *  3. C'est tout — index.html et projects.html se mettent à jour tout seuls
 *
 * Champs :
 *  id        — identifiant unique, doit correspondre au nom du fichier html (sans .html)
 *  title     — titre affiché
 *  subtitle  — sous-titre coloré (optionnel)
 *  desc      — description courte (carte)
 *  Status :
 *   done = terminé
 *   wip = en cours
 *   paused = suspendu (pause courte)
 *   sleeping = en veille (pause longue)
 *   stopped = arrêté (abandon)
 *  version   — ex: "1.1.3" | null (non renseigné) | "N/A"
 *  tags      — tableau de strings (utilisés pour les filtres)
 *  images    — tableau de chemins d'images (au moins 1 placeholder)
 *  github    — URL du repo | null
 */

const PROJECTS = [
  {
    id: "assistant-jarvis",
    title: "Assistant IA",
    subtitle: "style Jarvis",
    desc: "Assistant personnel avec personnalité propre, inspiré de Jarvis d'Iron Man. Répond, exécute des tâches, mémorise.",
    status: "done",
    version: "1.1.3",
    tags: ["Python", "IA", "Assistant", "Solo", "Terminé"],
    images: ["img/assistant-jarvis.jpg"],
    github: null
  },
  {
    id: "brainrot-arena",
    title: "Brainrot Physics Arena",
    subtitle: null,
    desc: "Jeu de physique multijoueur chaotique en Unity, optimisé pour le bas de gamme. Projet DeCorp.",
    status: "stopped",
    version: null,
    tags: ["Unity", "C#", "Multijoueur", "Jeu vidéo", "Équipe", "Arrêté"],
    images: ["img/brainrot-arena.jpg"],
    github: null
  },
  {
    id: "bot-discord",
    title: "Bot Discord",
    subtitle: null,
    desc: "Gestion de rôles automatique, commandes avancées et logs pour serveur Discord.",
    status: "stopped",
    version: null,
    tags: ["Python", "Discord", "Automatisation", "Bot", "Solo", "Arrêté"],
    images: ["img/bot-discord.jpg"],
    github: null
  },
  {
    id: "ui-cards",
    title: "UI Cards System",
    subtitle: null,
    desc: "Système d'interface de cartes pour un jeu original. Raretés, stats, animations.",
    status: "sleeping",
    version: "0.1.2",
    tags: ["UI Design", "Jeu vidéo", "Solo", "En veille"],
    images: ["img/ui-cards.jpg"],
    github: null
  },
  {
    id: "cmd-menu",
    title: "CMD-MENUv2",
    subtitle: null,
    desc: "Menu Windows batch inspiré de WinUtil. Outils système, mini-jeux, tweaks, installeur 30+ logiciels.",
    status: "done",
    version: "2.1.6.5 beta",
    tags: ["Batch", "Windows", "Automatisation", "Outil", "Solo", "Terminé"],
    images: ["img/CMV2,1.png","img/CMV2,2.png"],
    github: "https://github.com/DARIUSISTOC1/CMD-MENUv2"
  },
  {
    id: "tycoon-roblox",
    title: "Tycoon Roblox",
    subtitle: null,
    desc: "Jeu tycoon Roblox Studio. Système d'argent, upgrades et progression joueur.",
    status: "sleeping",
    version: null,
    tags: ["Roblox", "Lua", "Jeu vidéo", "Solo", "En veille"],
    images: ["img/tycoon-roblox.jpg"],
    github: null
  },
  {
    id: "neurotek-firmware",
    title: "Neurotek Firmware",
    subtitle: null,
    desc: "Firmware personnalisé pour Flipper Zero. Extensions et modules custom.",
    status: "stopped",
    version: null,
    tags: ["C", "Firmware", "Flipper Zero", "Embarqué", "Solo", "Arrêt"],
    images: ["img/neurotek-firmware.jpg"],
    github: null
  },
  {
    id: "2048-modifie",
    title: "2048 Modifié",
    subtitle: null,
    desc: "Remake du jeu 2048 avec des règles et un gameplay modifiés.",
    status: "stopped",
    version: null,
    tags: ["JavaScript", "HTML/CSS", "Jeu vidéo", "Solo", "Arrêté"],
    images: ["img/2048-modifie.jpg"],
    github: null
  },
  {
    id: "portfolio-site",
    title: "Portfolio",
    subtitle: "ce site",
    desc: "Mon site portfolio — celui que tu regardes en ce moment. Fait à la main en HTML/CSS/JS.",
    status: "wip",
    version: null,
    tags: ["HTML/CSS", "JavaScript", "UI Design", "Solo", "En cours"],
    images: ["img/portfolio-site.jpg"],
    github: null
  },
  {
    id: "dictionnaire-eleves",
    title: "Dictionnaire Élèves",
    subtitle: null,
    desc: "Base de données/annuaire des élèves de mon lycée. Lecture depuis un fichier JSON, recherche dynamique.",
    status: "paused",
    version: null,
    tags: ["HTML/CSS", "JavaScript", "JSON", "Outil", "Solo", "Suspendu"],
    images: ["img/dictionnaire-eleves.jpg"],
    github: null
  },
  {
    id: "maystudio",
    title: "MayStudio",
    subtitle: "site vitrine",
    desc: "Site vitrine réalisé pour l'entreprise d'un ami — MayStudio.",
    status: "paused",
    version: null,
    tags: ["HTML/CSS", "JavaScript", "UI Design", "Solo", "Suspendu"],
    images: ["img/maystudio.jpg"],
    github: null
  }
];
