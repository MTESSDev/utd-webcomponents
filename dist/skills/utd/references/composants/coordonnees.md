# Coordonnées (`utd-coordonnees`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/coordonnees · Bundle : `utd-webcomponents.min.js`

Téléphone, adresse, courriel et heures d'ouverture d'un service.

Chaque slot est facultatif ; seules les rubriques fournies sont affichées.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` | (calculé) | Titre affiché pour le bloc de coordonnées. |

## Slots

| Slot | Description |
|---|---|
| `ressource` | Texte ou html pour la ou les ressources. Ex. Nom de la personne contact. |
| `calendrier` | Texte ou html pour indiquer les jours de disponibilité. |
| `horaire` | Texte ou html pour indiquer les heures de disponibilité. |
| `telephone` | Texte ou html pour le ou les numéros de téléphone à utiliser. Ex. Téléphone, fax, etc. |
| `adresse` | Texte ou html pour l'adresse. Utiliser simplement un paragraphe par ligne. |
| `courriel` | Texte ou html pour la ou les adresses courriel. Normalement dans cette slot il faut mettre un ou plusieurs hyperliens de type ":mailto". |
| `siteWeb` | Texte ou html pour le site web. Normalement dans cette slot il faut mettre un hyperlien vers le site web. |

## Exemples

### Coordonnées d'un service

```html
<utd-coordonnees titre="Joindre le Service à la clientèle" tag-titre="h3">
    <span slot="calendrier"><p>Du lundi au vendredi</p></span>
    <span slot="horaire"><p>De 8 h 30 à 16 h 30</p></span>
    <span slot="telephone"><p>418 644-2251</p></span>
    <span slot="adresse"><p>800, boulevard Henri-Bourassa</p><p>Québec (Québec) G1C 4C7</p></span>
    <span slot="courriel"><a href="mailto:service@exemple.gouv.qc.ca">service@exemple.gouv.qc.ca</a></span>
</utd-coordonnees>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/coordonnees
