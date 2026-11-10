# Afficher/Masquer (`utd-afficher-masquer`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/afficherMasquer · Bundle : `utd-webcomponents.min.js`

Lien « Afficher plus » qui dévoile un détail sous le texte.

Placer le composant juste après le texte qu'il complète.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `texte-affichage` | Afficher plus / Show more | Texte affiché quand le composant est fermé. Défaut "Afficher plus" (français) / "Show more" (anglais). Quand plusieurs composants sont présents sur la page, fournir un texte contextuel (ex. « Afficher plus de détails sur les modalités »). |
| `texte-masquage` | Afficher moins / Show less | Texte affiché dans le composant est ouvert. Défaut "Afficher moins" (français) / "Show less" (anglais). |
| `espacement-vertical` | 16 | Espacement (en pixels) au-dessus et en dessous du déclencheur. Valeur par défaut `16`. Doit être entre `4` et `48`, par incréments de `4` — une valeur hors de ces incréments est ramenée à l'incrément valide le plus proche en dessous. |
| `gras` | false | Indique si le texte du déclencheur est affiché en gras. Défaut `false`. |
| `taille` | normal | Taille du texte du déclencheur. Valeurs possibles : `normal` (16px) ou `petite` (14px). Défaut `normal`. |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu du composant. |

## Exemples

### Détail affiché sur demande

```html
<p>Fournissez une pièce d'identité avec photo.</p>
<utd-afficher-masquer texte-affichage="Afficher les pièces acceptées" texte-masquage="Masquer les pièces acceptées">
    <p>Passeport, permis de conduire ou carte d'assurance maladie.</p>
</utd-afficher-masquer>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/afficherMasquer
