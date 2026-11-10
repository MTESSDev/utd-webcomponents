# PIV entête (`utd-piv-entete`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/piventete · Bundle : `utd-webcomponents.min.js`

Entête gouvernemental obligatoire : signature, titre du site, recherche.

`titre-site1` est obligatoire. Le logo et le titre affichés viennent toujours des attributs. En SPA, les slots `lienLogo` et `lienTitreSite` portent le lien du routeur (son texte n'est pas affiché) ; garder `url-logo` et `url-titre-site` pour un `href` valide. Le slot `liens` remplace les liens de langue et « Nous joindre » générés par les attributs.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre-site1` |  | Texte ligne 1 pour le nom du site ou de service. |
| `titre-site2` |  | Texte ligne 2 pour le nom du site ou de service. |
| `url-titre-site` | / | Url vers laquelle rediriger lorsque l'utilisateur clique sur la zone de titre du site ou de service. Valeur par défaut "/". Pour certains sites il peut exceptionnellement arriver que le titre du site ne doit pas être un lien. Si c'est le cas il suffit de mettre une valeur vide dans le paramètre ex. `url-titre-site=""`. |
| `src-logo` | (calculé) | Source (attribut "src") du logo. Défaut logo du gouvernement du Québec "/images/utd-sprite.svg#QUEBEC_blanc" inclus avec les composants utd. |
| `alt-logo` | (calculé) | Texte alternatif du logo. Défaut : "Signature du gouvernement du Québec." / "Québec government signature". |
| `width-logo` | 200 | Largeur du logo en pixels. Défaut 200. |
| `height-logo` | 40 | Hauteur du logo en pixels. Défaut 40. |
| `url-logo` | / | Url vers laquelle rediriger lorsque l'utilisateur clique sur le logo. Défaut : "/". Pour un site public l'url spécifiée devrait être "Quebec.ca". |
| `logo-nouvel-onglet` | false | Indique si le lien du logo (`url-logo`) doit s'ouvrir dans un nouvel onglet ou non. Défaut : "false". Pour un site public normalement l'url devrait être celle de "Quebec.ca" et on devrait ouvrir dans un nouvel onglet. |
| `url-langue-alternative` |  | Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien de langue alternative. Si non spécifié, le lien n'est pas affiché. |
| `texte-langue-alternative` | (calculé) | Texte du lien de langue alternative. Défaut "English" (page en français) / "Français" (page en anglais). |
| `url-nous-joindre` |  | Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien "Nous joindre". Si non spécifié, le lien n'est pas affiché. |
| `texte-nous-joindre` | "Nous joindre" / "Contact us" | Texte du lien "Nous joindre". Défaut "Nous joindre" / "Contact us". |
| `passer-contenu` | true | Indique si le lien "Passer au contenu" est disponible. Défaut "true". |
| `url-passer-contenu` | #main | Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Devrait être une ancre de la page. Défaut "#main". |
| `texte-passer-contenu` | "Passer au contenu" / "Skip to content" | Texte du lien. Défaut "Passer au contenu" / "Skip to content". |
| `afficher-recherche` | false | Indique si le contrôle de recherche (Loupe + contrôle de saisie du texte recherché) est disponible. Défaut "false". |
| `placeholder-recherche` | (calculé) | Texte (placeholder) à afficher dans le contrôle de recherche tant qu'aucune saisie n'est effectuée. Défaut "Rechercher..." / "Search...". |
| `title-bouton-recherche` | (calculé) | Titre (infobulle) du bouton loupe qui affiche ou masque la zone de recherche. Défaut "Afficher ou masquer la zone de recherche" / "Display or hide the search box". |
| `type-recherche` | instantanee | Indique si les résultats s'affichent au fur et à mesure que l'utilisateur saisit dans le champ (`type-recherche="instantanee"`), ou bien si le texte saisi est renvoyé à une page de recherche/résultats de recherche (`type-recherche="simple"`). Défaut "instantanee". |
| `url-contenu-recherche` |  | Si `type-recherche="instantanee"`, url à laquelle un appel (fetch) sera effectué afin d'obtenir le contenu de recherche au format attendu en JSON. Alternative : fournir le contenu par l'événement `initialiserRecherche`. Voir le composant [Barre de recherche](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche) pour plus de détails. |
| `mode-recherche-simple` | redirection | Si `type-recherche="simple"`, il est possible de spécifier un mode de recherche (`redirection` ou `callback`). Défaut "redirection". Voir le composant [Barre de recherche simple](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherchesimple) pour plus de détails. |
| `url-redirection-recherche` | "?q=$(texteRecherche)" | Si `type-recherche="simple"` et `mode-recherche-simple="redirection"`, url de la page de recherche/résultats de recherche. Le texte saisi remplace `$(texteRecherche)`. Défaut "?q=$(texteRecherche)". Voir le composant [Barre de recherche simple](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherchesimple) pour plus de détails. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `rechercher` | `texteRecherche` |
| `initialiserRecherche` | `definirContenuRecherche` |
| `resultatRecherchePIV` | `terme`, `nbResultats` |
| `clickLien` | (aucune) |

## Slots

| Slot | Description |
|---|---|
| `lienLogo` | Doit contenir une balise `<a>` (directement ou dans un conteneur) définissant la navigation à effectuer lorsque l'utilisateur clique sur le logo. Le logo affiché et son texte alternatif proviennent toujours des attributs `src-logo` et `alt-logo` : le texte du lien placé dans le slot n'est jamais affiché. Conserver `url-logo` pour que le lien visible garde un href valide (clic droit, ouverture dans un nouvel onglet). |
| `lienTitreSite` | Doit contenir une balise `<a>` définissant la navigation à effectuer lorsque l'utilisateur clique sur le titre du site. Le titre affiché provient toujours de `titre-site1` et `titre-site2` : le texte du lien placé dans le slot n'est jamais affiché. Conserver `url-titre-site` pour que le lien visible garde un href valide. Si `url-titre-site=""`, le titre n'est pas un lien et le slot est ignoré. |
| `liens` | Doit contenir les hyperliens situés à l'extrémité droite du PIV d'entête (i.e. le lien de langue alternative et/ou le lien nous joindre). Les liens doivent être fournis dans une structure de liste html (<ul><li>). Contrairement aux deux autres slots, celui-ci **remplace** les liens générés par les attributs `url-langue-alternative`, `texte-langue-alternative`, `url-nous-joindre` et `texte-nous-joindre` : lorsqu'il est présent, ces attributs sont ignorés. |

## Autres références

### Recherche `instantanee` — initialiserRecherche

| Nom | Type | Description |
|---|---|---|
| `e.detail.definirContenuRecherche` | Fonction | Fonction (callback) ayant en paramètre un objet qui doit posséder une propriété "contenu", laquelle doit contenir le contenu de recherche qui respecte le [format requis](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche#formatAttendu). |

### Recherche `instantanee` — resultatRecherchePIV

| Nom | Type | Description |
|---|---|---|
| `e.detail.terme` | String | Texte recherché par l'utilisateur. |
| `e.detail.nbResultats` | Number | Nombre de résultats trouvés (0 pour une recherche infructueuse). |

### Recherche `simple` — rechercher

| Nom | Type | Description |
|---|---|---|
| `e.detail.texteRecherche` | String | Texte saisi par l'utilisateur. |

## Exemples

### PIV d'entête

```html
<header>
    <utd-piv-entete titre-site1="Mon dossier" url-langue-alternative="/en" url-nous-joindre="/nous-joindre"></utd-piv-entete>
</header>
```

### Entête de SPA avec liens du routeur

```html
<utd-piv-entete titre-site1="Mon dossier" titre-site2="Services en ligne" url-logo="https://www.quebec.ca" logo-nouvel-onglet="true" url-titre-site="/accueil">
    <span slot="lienTitreSite"><a href="/accueil">Texte non affiché, seul le href compte</a></span>
    <div slot="liens">
        <ul>
            <li><a href="/en">English</a></li>
            <li><a href="/nous-joindre">Nous joindre</a></li>
        </ul>
    </div>
</utd-piv-entete>
```

### Recherche instantanée alimentée par code

```html
<utd-piv-entete titre-site1="Mon dossier" afficher-recherche="true"></utd-piv-entete>
```

```js
const entete = document.querySelector('utd-piv-entete');
entete.addEventListener('initialiserRecherche', async (e) => {
    const pages = await obtenirPages(); // [{ r: 'Titre du lien', h: '/url', t: 'texte indexé', mc: 'synonymes' }]
    e.detail.definirContenuRecherche({ contenu: pages });
});
entete.addEventListener('resultatRecherchePIV', (e) => journaliser(e.detail.terme, e.detail.nbResultats));
```

### Recherche simple vers une page de résultats

```html
<utd-piv-entete titre-site1="Mon dossier" afficher-recherche="true" type-recherche="simple" url-redirection-recherche="/recherche?q=$(texteRecherche)"></utd-piv-entete>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/piventete
