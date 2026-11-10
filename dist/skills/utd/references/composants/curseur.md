# Curseur (`utd-curseur`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/curseur · Bundle : `utd-webcomponents.min.js`

Valeur numérique choisie par glissement (range).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `valeur` | 0 | Valeur du curseur. Elle peut être modifiée après le montage du composant. Défaut : 0. |
| `etiquette` | Un libellé | Libellé affiché au centre sous le curseur et utilisé comme `aria-label`. Défaut : Un libellé. |
| `min` | 0 | Valeur minimale. Défaut : 0. |
| `max` | 100 | Valeur maximale. Défaut : 100. |
| `pas` | 1 | Incrément entre chaque valeur sélectionnable. Défaut : 1. |
| `suffixe` | aucun suffixe | Suffixe affiché à la suite des bornes minimale et maximale (ex. `%`, `km`). Défaut : aucun suffixe. |
| `afficher-champ` | true | Indique si le champ numérique de saisie est affiché à droite du curseur. Défaut : true. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` | Description |
|---|---|---|
| `changement` | `valeur` | Déclenché lors d'un changement de valeur. La propriété `event.detail.valeur` contient la valeur numérique sélectionnée. |

## Exemples

### Curseur avec suffixe

```html
<utd-curseur id="curseurRayon" etiquette="Rayon de recherche" valeur="25" min="5" max="100" pas="5" suffixe="km"></utd-curseur>
```

```js
document.getElementById('curseurRayon').addEventListener('changement', (e) => filtrerParRayon(e.detail.valeur));
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/curseur
