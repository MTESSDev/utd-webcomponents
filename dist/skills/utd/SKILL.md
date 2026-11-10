---
name: utd
description: Système de design UTD (utd-webcomponents, MESS, basé sur Québec.ca). À utiliser pour écrire ou modifier une page, un gabarit, un formulaire ou un composant d'interface qui utilise les balises utd-* (utd-champ-form, utd-liste-deroulante, utd-dialog, utd-piv-entete…), les classes UTD (utd-btn, utd-table, utd-row, utd-col-*, utd-icone-ms…) ou l'API JS window.utd (message, dialogue, notification, traitementEnCours, filAriane), en HTML, Vue, Svelte ou .NET/Razor. Aussi pour relire ou auditer une page qui les utilise. Prime sur toute skill CSS ou UI générique (Bootstrap, Tailwind, bibliothèques de composants) dès que la page est destinée au gouvernement du Québec. Ne couvre ni le backend, ni le routage, ni les essais automatisés, ni les conventions de code d'une équipe.
metadata:
  version: 5.0.0
---

# UTD — composants web du MESS (version 5.0.0)

Composants web accessibles (WCAG 2.1 AA) et classes CSS conformes au système de design Québec.ca. Aucune dépendance. Démo : https://lively-cliff-018a9540f.azurestaticapps.net

## Règles d'or

1. **Ne rien inventer.** Avant d'écrire une balise, un attribut, un slot, un événement ou une classe, lire la fiche correspondante (index ci-dessous). Ce qui n'y est pas n'existe pas.
2. **Attributs en chaînes, en kebab-case** : `reduit="false"`, `tag-titre="h3"`. Pas de booléen nu, pas d'objet : les valeurs complexes passent par JS (voir la fiche).
3. **Événements** : noms en camelCase (`changementEtat`), émis sur l'élément **sans `bubbles`**. Écouter avec `addEventListener` sur le composant lui-même, lire `event.detail`. Exception : le `change` natif des listes déroulantes remonte.
4. **Chargement** : CSS UTD dans `<head>` **avant** le CSS du site ; **un seul** JS (`utd-webcomponents.min.js`, ou `-complet` si on veut `utd-carte` sans chargement différé) par `<script src>` synchrone en fin de `<body>`. Jamais par `import` dans un bundler : le JS déduit l'URL du CSS, des images et de la carte de son propre `src`. Détails : [installation.md](references/installation.md).
5. **Frameworks** (Vue, Svelte, Razor) : lire [frameworks.md](references/frameworks.md) avant d'écrire du code d'intégration.
6. **Formulaires** : chaque champ dans un `<utd-champ-form libelle="…">` (ou les patrons de la fiche correspondante). Jamais d'`<input>`, `<select>` ou `<textarea>` nu hors composant.
7. **Icônes** : `<span class="utd-icone-ms" aria-hidden="true">nom_icone</span>` (Material Symbols, voir [iconographie.md](references/patrons/iconographie.md)). Il n'existe pas de balise `utd-icone`.
8. **Mise en page** : grille `utd-container` / `utd-row` / `utd-col-*` et classes d'espacement UTD. Ne pas ajouter Bootstrap ni un autre framework CSS.
9. **Accessibilité** : `lang` sur `<html>` (la langue FR/EN des composants en dépend), hiérarchie de titres continue (attribut `tag-titre` des composants), texte masqué avec `utd-sr-only`, abréviations développées (`<abbr title>`). Après l'ajout de liens externes : `utd.ajusterAccessibiliteLiens()`.
10. **API JS** : tout passe par l'objet global `window.utd` (`utd.message`, `utd.dialogue`, `utd.notification`, `utd.traitementEnCours`, `utd.filAriane`, `utd.tables`). Signatures dans les fiches patrons.

## Démarche

1. Choisir le gabarit de page (1 colonne, 2 colonnes, pleine largeur, menu horizontal) dans [installation.md](references/installation.md) et partir du démarrage rapide ci-dessous.
2. Pour chaque composant ou patron à utiliser, lire sa fiche (index ci-dessous) avant d'écrire une ligne.
3. Dans un framework, lire [frameworks.md](references/frameworks.md) et appliquer ses règles de liaison et d'événements.
4. Terminer par la vérification ci-dessous.

## Vérification avant de livrer

- `lang` sur `<html>`, `<title>` renseigné, un seul `<h1>`, hiérarchie de titres continue (ajuster `tag-titre`).
- Un seul `<link>` CSS UTD, dans `<head>`, avant le CSS du site ; un seul `<script src>` UTD, en fin de `<body>`, aucun `import`.
- Toute balise, attribut, slot, événement et classe `utd-*` employés figurent dans une fiche.
- Attributs en chaînes, écouteurs posés sur l'élément lui-même, champs tous dans `utd-champ-form`.
- Aucun framework CSS ajouté ; icônes avec `aria-hidden="true"` ; liens externes passés par `utd.ajusterAccessibiliteLiens()`.
- Compatibilité : Chrome et Edge 94+, Safari et iOS 15+. Aucune syntaxe CSS ou JS plus récente dans le code qui accompagne UTD (détails dans [installation.md](references/installation.md)).

## Démarrage rapide (page complète)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Titre de la page - Nom du site</title>
    <link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/open-sans-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/roboto-variable-latin.woff2" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" as="font" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/fonts/utd-material-symbols-rounded-composants.woff2" type="font/woff2" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/css/utd-webcomponents.min.css">
    <!-- CSS du site ici, après celui d'UTD -->
</head>
<body>
    <div class="utd-conteneur-principal">
        <header>
            <utd-piv-entete titre-site1="Nom du site" alt-logo="Signature du gouvernement du Québec. Accédez à Nom du site."></utd-piv-entete>
        </header>
        <div class="utd-container">
            <main id="main">
                <h1>Titre de la page</h1>
            </main>
        </div>
    </div>
    <utd-hautpage></utd-hautpage>
    <footer class="utd">
        <utd-piv-pied-page></utd-piv-pied-page>
    </footer>
    <script src="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@5.0.0/dist/js/utd-webcomponents.min.js"></script>
</body>
</html>
```

Gabarits 2 colonnes, pleine largeur, menu horizontal et copie locale : [installation.md](references/installation.md).

## Composants

| Balises | Fiche | Usage |
|---|---|---|
| `utd-accordeon` | [accordeon.md](references/composants/accordeon.md) | Section repliable sous un titre ; en série pour une FAQ. |
| `utd-afficher-masquer` | [afficher-masquer.md](references/composants/afficher-masquer.md) | Lien « Afficher plus » qui dévoile un détail sous le texte. |
| `utd-alerte-generale` | [alerte-generale.md](references/composants/alerte-generale.md) | Bandeau d'urgence pleine largeur sous l'entête, pour toute la population. |
| `utd-avis` | [avis.md](references/composants/avis.md) | Encadré de message dans le contenu : information, avertissement, succès, erreur. |
| `utd-barre-recherche-simple` | [barre-recherche-simple.md](references/composants/barre-recherche-simple.md) | Champ de recherche qui redirige vers une page de résultats ou appelle un callback. |
| `utd-barre-recherche` | [barre-recherche.md](references/composants/barre-recherche.md) | Recherche dans un contenu fourni (fetch ou callback), résultats en liste. |
| `utd-bloc-liens`, `utd-bloc-liens-conteneur` | [bloc-liens.md](references/composants/bloc-liens.md) | Sujet (titre, description) avec liens rapides et « Voir plus », en grille. |
| `utd-btn-menu`, `utd-btn-menu-item` | [boutons-menu.md](references/composants/boutons-menu.md) | Bouton qui ouvre une liste d'actions. |
| `utd-carte` | [carte.md](references/composants/carte.md) | Carte interactive OpenLayers : dessin, couches, recherche, import/export. |
| `utd-champ-form` | [champs-texte.md](references/composants/champs-texte.md) | Enveloppe de tout champ : libellé, précision, obligatoire, erreur, ARIA. |
| `utd-consulter-aussi` | [consulter-aussi.md](references/composants/consulter-aussi.md) | Liens complémentaires en bas de page, avant le pied de page. |
| `utd-coordonnees` | [coordonnees.md](references/composants/coordonnees.md) | Téléphone, adresse, courriel et heures d'ouverture d'un service. |
| `utd-curseur` | [curseur.md](references/composants/curseur.md) | Valeur numérique choisie par glissement (range). |
| `utd-dialog` | [dialogue.md](references/composants/dialogue.md) | Fenêtre modale (formulaire, confirmation), centrée ou latérale. |
| `utd-hautpage` | [haut-page.md](references/composants/haut-page.md) | Bouton flottant de retour en haut de page. |
| `utd-indicateur-etapes` | [indicateur-etapes.md](references/composants/indicateur-etapes.md) | Progression dans un processus en plusieurs étapes (« Étape 2 sur 5 »). |
| `utd-infobulle` | [infobulle.md](references/composants/infobulle.md) | Explication courte liée à un terme ou à un libellé. |
| `utd-liste-deroulante-multiple` | [liste-deroulante-multiple.md](references/composants/liste-deroulante-multiple.md) | Choix multiples affichés en étiquettes retirables, pour longues sélections. |
| `utd-liste-deroulante` | [liste-deroulante.md](references/composants/liste-deroulante.md) | Habillage d'un `select` : choix unique, multiple ou avec recherche. |
| `utd-menu-ancres` | [menu-ancres.md](references/composants/menu-ancres.md) | Menu « Dans cette page » généré à partir des titres. |
| `utd-menu-horizontal`, `utd-menu-horizontal-item` | [menu-horizontal.md](references/composants/menu-horizontal.md) | Navigation principale d'application sous l'entête, deux niveaux. |
| `utd-menu-vertical`, `utd-menu-vertical-item` | [menu-vertical.md](references/composants/menu-vertical.md) | Navigation latérale, deux niveaux. |
| `utd-onglets`, `utd-onglet` | [onglets.md](references/composants/onglets.md) | Contenus connexes affichés tour à tour au même endroit. |
| `utd-pagination` | [pagination.md](references/composants/pagination.md) | Navigation entre pages de résultats ou d'éléments. |
| `utd-pied-page-site` | [pied-page-site.md](references/composants/pied-page-site.md) | Liens propres au site (sections, réseaux sociaux) en pied de page. |
| `utd-piv-entete` | [piv-entete.md](references/composants/piv-entete.md) | Entête gouvernemental obligatoire : signature, titre du site, recherche. |
| `utd-piv-pied-page` | [piv-pied-page.md](references/composants/piv-pied-page.md) | Pied de page gouvernemental obligatoire (Accessibilité, Politiques). |
| `utd-points-suspension` | [points-suspension.md](references/composants/points-suspension.md) | Texte long tronqué, suite affichée au clic. |
| `utd-section-filtres-recherche` | [section-filtres-recherche.md](references/composants/section-filtres-recherche.md) | Zone repliable qui regroupe les filtres d'une recherche. |
| `utd-section` | [section.md](references/composants/section.md) | Bloc de contenu titré, repliable ou non, avec ou sans bordure. |
| `utd-tuile-statique` | [tuile-statique.md](references/composants/tuile-statique.md) | Tuile d'information non cliquable, dans `utd-tuile-conteneur`. |
| `utd-tuile`, `utd-tuile-conteneur` | [tuile.md](references/composants/tuile.md) | Liens de navigation mis en valeur, en grille. |

## Patrons CSS et API JS

| Sujet | Fiche | Usage |
|---|---|---|
| Animations | [animations.md](references/patrons/animations.md) | Zone en cours de chargement : `utd-fond-element-chargement`. |
| Bouton radio | [bouton-radio.md](references/patrons/bouton-radio.md) | Choix unique : `input radio` dans `utd-champ-form`. |
| Boutons | [boutons.md](references/patrons/boutons.md) | Classes `utd-btn` : primaire, secondaire, tertiaire, avertissement ; compact, icône. |
| Boutons de sélection | [boutons-selection.md](references/patrons/boutons-selection.md) | Radio ou case à cocher présentée en tuile cliquable pleine largeur. |
| Case à cocher | [case-cocher.md](references/patrons/case-cocher.md) | Choix multiple ou confirmation : `checkbox` dans `utd-champ-form`. |
| Champs avec bouton | [champs-avec-bouton.md](references/patrons/champs-avec-bouton.md) | Bouton accolé à droite d'un champ (valider, rechercher). |
| Champs combinés | [champs-combines.md](references/patrons/champs-combines.md) | Champs côte à côte avec un message d'erreur commun (ex. période). |
| Commutateur | [commutateur.md](references/patrons/commutateur.md) | Interrupteur activé/désactivé : `format="commutateur"` sur `utd-champ-form`. |
| Couleurs | [couleurs.md](references/patrons/couleurs.md) | Palette gouvernementale obligatoire. |
| Espacements | [espacements.md](references/patrons/espacements.md) | Classes normées de marge et de padding. |
| Étiquettes | [etiquettes.md](references/patrons/etiquettes.md) | Filtres actifs ou liens mis en évidence : `utd-conteneur-etiquettes`. |
| Fil d'Ariane | [fil-ariane.md](references/patrons/fil-ariane.md) | Chemin hiérarchique de la page : `utd.filAriane.definir`. |
| Gestion des erreurs | [gestion-erreurs.md](references/patrons/gestion-erreurs.md) | Validation au blur sans annuler le clic du bouton qui suit. |
| Système de grille | [grille-systeme.md](references/patrons/grille-systeme.md) | Grille Bootstrap 5 préfixée : `utd-row`, `utd-col-*`, `utd-row-cols-*`. |
| Groupe de champs | [groupe-champs.md](references/patrons/groupe-champs.md) | Champs d'un même sujet sous un titre commun : `utd-groupe-champs`. |
| Iconographie | [iconographie.md](references/patrons/iconographie.md) | Icônes Material Symbols : `utd-icone-ms`, toujours décoratives. |
| Liens | [liens.md](references/patrons/liens.md) | Liens de contenu : internes, externes, documents. |
| Liens de navigation | [liens-navigation.md](references/patrons/liens-navigation.md) | Lien de retour et lien « Voir plus ». |
| Liste de liens-blocs | [liste-liens-blocs.md](references/patrons/liste-liens-blocs.md) | Série de liens en gros blocs, faciles à toucher. |
| Message | [message.md](references/patrons/message.md) | Alerte modale qui exige une action : `utd.message.afficher`. |
| Messages d'erreur | [messages-erreur.md](references/patrons/messages-erreur.md) | Erreurs de formulaire affichées par `utd-champ-form`. |
| Notifications | [notifications.md](references/patrons/notifications.md) | Message temporaire après une action : `utd.notification.emettre`. |
| Page avec contenu textuel | [page-contenu-textuel.md](references/patrons/page-contenu-textuel.md) | Typographie et largeur de lecture d'un texte : `utd-page-texte`. |
| Pastilles | [pastilles.md](references/patrons/pastilles.md) | Indicateur d'état coloré non cliquable : `utd-pastille`. |
| Séparateur | [separateur.md](references/patrons/separateur.md) | Ligne `<hr>` qui structure le contenu, jamais décorative. |
| Tableaux | [tableaux.md](references/patrons/tableaux.md) | Classes `utd-table` : responsive, survol des lignes, largeurs de colonnes. |
| Traitement en cours | [traitement-en-cours.md](references/patrons/traitement-en-cours.md) | Spinner sur bouton, blocage de l'interface, annonce : `utd.traitementEnCours`. |
| Utilitaires | [utilitaires.md](references/patrons/utilitaires.md) | Classes d'affichage : `utd-d-*`, `utd-hidden`, `utd-no-wrap`. |
