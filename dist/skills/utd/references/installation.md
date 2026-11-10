# Installation et gabarits UTD 5.0.0

## Fichiers

| Fichier | Rôle |
|---|---|
| `css/utd-webcomponents.min.css` | Styles globaux et des composants. Dans `<head>`, avant le CSS du site. |
| `js/utd-webcomponents.min.js` | Tous les composants ; `utd-carte` est chargée à la demande. À utiliser par défaut. |
| `js/utd-webcomponents-complet.min.js` | Tous les composants, carte comprise, en un seul fichier plus lourd. **À la place** du précédent, jamais les deux. |
| `fonts/*.woff2` | Polices. Précharger Open Sans, Roboto et `utd-material-symbols-rounded-composants`. |
| `images/` | Logos, sprites, favicons. |

Le JS calcule l'adresse du CSS, des images et du module carte à partir de son propre `src` : garder la structure `css/ fonts/ images/ js/` de `dist/` côte à côte, et charger le JS par un `<script src>` classique en fin de `<body>` (pas `type="module"`, pas d'`import` dans un bundler). Le paquet npm n'a ni `main` ni `exports`.

## Par CDN

```html
<link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/open-sans-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/roboto-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/utd-material-symbols-rounded-composants.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/css/utd-webcomponents.min.css">
<!-- … fin du body : -->
<script src="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/js/utd-webcomponents.min.js"></script>
```

Le CDN exige un accès Internet pour les utilisateurs. Sinon, copier les fichiers.

## Copie locale

Copier le contenu de `dist/` (release GitHub `MTESSDev/utd-webcomponents` ou paquet npm `utd-webcomponents`, dossier `node_modules/utd-webcomponents/dist/`) dans les fichiers statiques du site, puis :

```html
<link rel="preload" as="font" href="/fonts/open-sans-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/roboto-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/utd-material-symbols-rounded-composants.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="stylesheet" href="/css/utd-webcomponents.min.css?v=5.0.0">
<script src="/js/utd-webcomponents.min.js?v=5.0.0"></script>
```

Versionner les URL du CSS et du JS (`?v=`) à chaque mise à jour d'UTD. Les images internes portent déjà `?v=<version>`.

## Gabarits de page

Structure commune : `<div class="utd-conteneur-principal">` (garde le pied de page en bas), `<header>` avec `utd-piv-entete`, contenu dans `<div class="utd-container"><main id="main">`, puis `<utd-hautpage>` et `<footer class="utd">` avec `utd-pied-page-site` (optionnel) et `utd-piv-pied-page`.

Bandeau avec menu horizontal (sous `utd-piv-entete`) :

```html
<div class="utd-bandeau-principal">
    <div class="utd-container">
        <utd-menu-horizontal afficher-icone-accueil="true">
            <utd-menu-horizontal-item libelle="Accueil" href="/"></utd-menu-horizontal-item>
        </utd-menu-horizontal>
        <div class="utd-zone-raccourcis-connexion">
            <div class="utd-zone-connexion">
                <button type="button" class="utd-btn secondaire option-1 compact">Déconnexion</button>
            </div>
        </div>
    </div>
</div>
```

Deux colonnes (menu vertical à gauche) :

```html
<div class="utd-container">
    <div id="conteneur2Colonnes" class="utd contenu-principal-droite">
        <div id="colonneGauche" class="utd">
            <utd-menu-vertical titre="Menu principal">
                <utd-menu-vertical-item libelle="Page 1" href="/page1"></utd-menu-vertical-item>
            </utd-menu-vertical>
        </div>
        <div id="colonneDroite" class="utd">
            <main id="main">
                <h1>Titre</h1>
            </main>
        </div>
    </div>
</div>
```

Pleine largeur (cas rares) : ajouter `class="utd-pleine-largeur"` sur `<body>`.

Gabarits complets : https://lively-cliff-018a9540f.azurestaticapps.net/gabarit1colonneCdn.html, https://lively-cliff-018a9540f.azurestaticapps.net/gabarit2colonnesCdn.html, https://lively-cliff-018a9540f.azurestaticapps.net/gabaritpleinelargeur.html.

## Langue

`<html lang="fr">` ou `lang="en"` : les composants choisissent leurs textes par défaut (français ou anglais) selon cet attribut.

## Fureteurs supportés

Chrome et Edge 94+, Safari et iOS 15+ (versions d'octobre 2021 environ). Firefox récent devrait fonctionner, sans garantie. Internet Explorer n'est pas supporté. Ne pas utiliser, dans le code qui accompagne UTD, de syntaxe CSS ou JS plus récente que ces versions.

## Installer ce skill

Copier le dossier `dist/skills/utd/` de la version utilisée :

| Portée | Claude Code | GitHub Copilot |
|---|---|---|
| Un projet (versionné avec l'équipe) | `.claude/skills/utd/` | `.github/skills/utd/` |
| Tous vos projets | `~/.claude/skills/utd/` | `~/.copilot/skills/utd/` |

Depuis le paquet npm : copier `node_modules/utd-webcomponents/dist/skills/utd/`. Sans npm :

```sh
npx degit MTESSDev/utd-webcomponents/dist/skills/utd#5.0.0 .claude/skills/utd
```

Remplacer le dossier à chaque mise à jour d'UTD.
