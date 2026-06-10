# Skept Agency - Documentation pour Claude Code

## 📋 Vue d'ensemble

Site vitrine pour une agence web construit avec **Astro**. Architecture modulaire avec composants responsables d'une seule logique, assets séparés (CSS/SCSS et JS dans des fichiers dédiés), et blog basé sur des fichiers Markdown.

## 🚀 Commandes de développement

```bash
npm run dev        # Lancer le serveur de développement (localhost:3000 par défaut)
npm run build      # Construire le site pour la production
npm run preview    # Aperçu du build de production localement
npm run astro add  # Ajouter une intégration Astro
npm run astro info # Afficher les infos du projet Astro
```

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables (logique unique par composant)
│   ├── Hero.astro
│   ├── Navigation.astro
│   └── ...
├── layouts/            # Layouts (pour pages et blog)
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/              # Pages principales
│   ├── index.astro
│   └── [...slug].astro # Route dynamique
├── content/            
│   └── blog/           # Articles blog en Markdown
│       ├── post-1.md
│       └── post-2.md
├── styles/             # Fichiers CSS/SCSS globaux
│   ├── global.css
│   └── variables.scss
└── scripts/            # Fichiers JavaScript séparés
    └── utils.js

public/                 # Assets statiques (images, fonts, etc.)
astro.config.mjs        # Configuration Astro
```

## 🏗️ Principes architecturaux

### 1. **Un composant = une responsabilité**
- Chaque composant Astro gère **une seule logique métier**
- Éviter les composants "fourre-tout"
- Exemple : `Hero` = bannière hero ; `CardProduct` = une seule carte produit

### 2. **Séparation des préoccupations**
- **CSS/SCSS** : Dans des fichiers dédiés (importés dans les composants)
- **JavaScript** : Dans des fichiers séparés (`src/scripts/`)
- **Contenu** : Markdown pour le blog (`src/content/blog/`)

### 3. **Relire le code existant**
- Avant de créer ou modifier du code, **examiner les fichiers existants** pour :
  - Comprendre les patterns utilisés
  - Éviter les doublons
  - Respecter la cohérence du projet

## 🎨 Convention de nommage

- **Composants** : `PascalCase` (ex: `HeroSection.astro`)
- **Fichiers CSS** : `kebab-case` (ex: `hero-section.scss`)
- **Fichiers JS utilitaires** : `camelCase` (ex: `formatDate.js`)
- **Articles blog** : `kebab-case` (ex: `notre-premier-article.md`)

## 📝 Fichiers Markdown du blog

Les articles blog sont stockés dans `src/content/blog/` avec frontmatter YAML :

```markdown
---
title: "Titre de l'article"
description: "Courte description"
date: 2026-01-15
author: "Nom"
image: "/images/cover.jpg"
---

Contenu de l'article en Markdown...
```

## ⚙️ Avant de commencer

- [ ] Lire le code existant dans `src/components/` et `src/pages/`
- [ ] Consulter `astro.config.mjs` pour les intégrations actives
- [ ] Vérifier le système de routage Astro utilisé
- [ ] Respecter les patterns CSS/SCSS en place

## 🔧 Stack technique

- **Framework** : Astro
- **Styling** : CSS/SCSS
- **JavaScript** : Vanilla JS (sans framework frontend par défaut)
- **Contenu** : Markdown + Frontmatter YAML
- **Email** : Resend

## 🚀 Déploiement sur Vercel

Le projet est configuré pour Vercel avec l'adaptateur `@astrojs/vercel`.

### Variables d'environnement requises

- `RESEND_API_KEY` : Clé API Resend pour l'envoi d'emails

### Configuration

1. Créez un fichier `.env.local` localement (ignoré par Git)
2. Ajoutez vos variables d'environnement sur Vercel via le dashboard
3. Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour les instructions détaillées

### Routes dynamiques

- La route API `/api/contact` est rendue à la demande (pas pré-rendue)
- Marquée avec `export const prerender = false;` pour éviter les erreurs de build

