# Avis (`utd-avis`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/avis · Bundle : `utd-webcomponents.min.js`

Encadré de message dans le contenu : information, avertissement, succès, erreur.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `type` | information | Type de l'avis (icône/couleur). Valeurs possibles : `information`, `avertissement`, `succes`, `erreur`, ou `complementaire`. Défaut "information". |
| `titre` |  | Titre affiché dans l'avis. |
| `contenu` |  | Texte à afficher dans l'avis. |
| `tag-titre` | h2 | Balise html à utiliser pour le titre de l'avis. Valeurs possibles : `h1` à `h6`. Défaut "h2". |
| `icone-ms` |  | Nom d'une icône Material Symbols (ex. `lightbulb`) pour un avis de type `complementaire`. A priorité sur l'icône du sous-type. Ignoré pour les autres types. |
| `focus` | false | Lorsque la valeur est "true" permet de donner le focus à l'avis. |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'avis. |

## Exemples

### Avis avec contenu HTML

```html
<utd-avis type="avertissement" titre="Documents manquants" tag-titre="h3">
    <p>Votre demande sera traitée à la réception de votre <a href="/documents">preuve de résidence</a>.</p>
</utd-avis>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/avis
