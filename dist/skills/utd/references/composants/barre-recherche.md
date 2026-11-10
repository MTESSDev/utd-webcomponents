# Barre de recherche (`utd-barre-recherche`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche · Bundle : `utd-webcomponents.min.js`

Recherche dans un contenu fourni (fetch ou callback), résultats en liste.

Contenu de recherche : tableau JSON d'objets `{ r, h, t, mc, no, c, sc }`.

- `r` : texte du lien de résultat ; `h` : url ; `t` : texte indexé (obligatoires).
- `mc` : mots-clés ; `no` : `true` pour ouvrir dans un nouvel onglet (facultatifs).
- `c` : catégorie (résultats sur 2 niveaux) ; `c` + `sc` : sous-catégorie (3 niveaux).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `placeholder` | Rechercher... / Search... | Texte (placeholder) à afficher dans le contrôle tant qu'aucune saisie n'est effectuée. Défaut "Rechercher..." et "Search...". |
| `url-contenu-recherche` |  | Si spécifié, url à laquelle un appel (fetch) sera effectué afin d'obtenir le contenu de recherche au [format attendu en JSON](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche#formatAttendu). |
| `nb-max-resultats` | 10 | Nombre de résultats de recherche maximal à afficher. Défaut : 10. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `initialiser` | `definirContenuRecherche` |
| `resultatRecherche` | `terme`, `nbResultats` |

## Autres références

### initialiser — Retour

| Nom | Type | Description |
|---|---|---|
| `definirContenuRecherche` | Fonction | Fonction (callback) ayant en paramètre un objet qui doit posséder une propriété "contenu", laquelle doit contenir le contenu de recherche qui respecte le [format requis](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche#formatAttendu). |

## Exemples

### Contenu chargé par url

```html
<utd-barre-recherche url-contenu-recherche="/recherche.json"></utd-barre-recherche>
```

```json
[
    { "r": "Renouveler un permis", "h": "/permis/renouveler", "t": "Renouvellement du permis de conduire", "mc": "permis renouvellement", "c": "Permis" }
]
```

### Contenu fourni en JS

```js
document.querySelector('utd-barre-recherche').addEventListener('initialiser', (e) => {
    e.detail.definirContenuRecherche({ contenu: monContenuRecherche });
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherche
