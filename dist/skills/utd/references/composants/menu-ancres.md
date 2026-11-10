# Menu d'ancres (`utd-menu-ancres`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuancres · Bundle : `utd-webcomponents.min.js`

Menu « Dans cette page » généré à partir des titres.

`selecteur` désigne les titres à lister (défaut `.ancre`).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` | (calculé) | Titre du menu d'ancre. Défaut "Dans cette page :", "On this page:" |
| `tag-titre` | h2 | Balise html à utiliser pour le titre du menu. Valeurs possibles : `h1` à `h6`. Défaut "h2". |
| `selecteur` | .ancre | Sélecteur css à utiliser pour obtenir/definir les ancres. Défaut ".ancre". |

## Exemples

### Ancres des h2 de la page

```html
<utd-menu-ancres selecteur="#main h2"></utd-menu-ancres>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuancres
