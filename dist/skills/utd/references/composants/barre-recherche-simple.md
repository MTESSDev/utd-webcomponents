# Barre de recherche simple (`utd-barre-recherche-simple`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherchesimple · Bundle : `utd-webcomponents.min.js`

Champ de recherche qui redirige vers une page de résultats ou appelle un callback.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `placeholder` | Rechercher... / Search... | Texte (placeholder) à afficher dans le contrôle tant qu'aucune saisie n'est effectuée. Défaut "Rechercher..." et "Search...". |
| `url-redirection` | ?q=$(texteRecherche) | Url à laquelle rediriger lors de la recherche. Une url relative ou complète peut être spécifiée. Le jeton "$(texteRecherche)" sera remplacé par le texte recherché. Valeur par défaut "?q=$(texteRecherche)". |
| `mode` | redirection | Mode de recherche. Valeurs possibles : `redirection` (url à laquelle rediriger lors de la recherche), `callback` (traitement javascript à effectuer lors de la recherche). Valeur par défaut "redirection". |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `rechercher` | `texteRecherche` |

## Exemples

### Redirection vers la page de résultats

```html
<utd-barre-recherche-simple url-redirection="/resultats?q=$(texteRecherche)"></utd-barre-recherche-simple>
```

### Traitement en JS

```html
<utd-barre-recherche-simple id="rechercheDossiers" mode="callback" placeholder="Rechercher un dossier"></utd-barre-recherche-simple>
```

```js
document.getElementById('rechercheDossiers').addEventListener('rechercher', (e) => {
    rechercherDossiers(e.detail.texteRecherche);
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/barrerecherchesimple
