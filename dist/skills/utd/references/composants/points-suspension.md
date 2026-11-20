# Points de suspension (`utd-points-suspension`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/pointssuspension · Bundle : `utd-webcomponents.min.js`

Texte long tronqué, suite affichée au clic.

Tronque le texte à `nb-lignes` (défaut 1). `afficher-texte-lien` ajoute un lien pour afficher le texte complet.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `nb-lignes` | 1 | Nombre de ligne à afficher initialement. Défaut "1". |
| `afficher-texte-lien` | false | Ajoute le texte "Voir plus/Show more" dans le lien permettant l'affichage complet du texte. Ex. ... [Voir plus]. Défaut "false". |
| `texte-lien` | (calculé) | Remplace le texte "Voir plus/Show more" affiché avec afficher-texte-lien="true". |
| `affichage-initial` | true | Attribut réactif permettant de forcer la réinitialisation de l'affichage si valeur = 'true' |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu du composant. |

## Exemples

### Texte tronqué sur 3 lignes

```html
<utd-points-suspension nb-lignes="3" afficher-texte-lien="true" texte-lien="Lire la suite">
    Long texte de description…
</utd-points-suspension>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/pointssuspension
