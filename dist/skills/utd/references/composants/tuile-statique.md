# Tuile statique (`utd-tuile-statique`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/tuilestatique · Bundle : `utd-webcomponents.min.js`

Tuile d'information non cliquable, dans `utd-tuile-conteneur`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `icone-utd` |  | Legacy : utiliser plutôt `icone-ms`. Classe css correspondant à l'icône à afficher dans la tuile. Voir [iconographie (Legacy)](https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographieLegacy). |
| `icone-ms` |  | Nom de l'icône Material Symbols à afficher dans la tuile. Voir [iconographie](https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographie) pour plus de détails. Ignoré si `icone-utd` est spécifié. |
| `url-icone` |  | Url d'une image à afficher dans la tuile, si l'icône désirée n'existe pas dans la banque d'icônes UTD. Ignoré si `icone-utd` ou `icone-ms` est spécifié. |
| `titre` |  | Titre de la tuile. |

## Slots

| Slot | Description |
|---|---|
| `contenu` | Contenu libre de la tuile. |
| `boutons-pied` | Zone destinée à recevoir un conteneur (ex. `div`) contenant **uniquement des boutons** (`utd-btn`) — le positionnement des boutons est géré par le composant. |

## Exemples

### Tuiles statiques dans un conteneur

```html
<utd-tuile-conteneur>
    <utd-tuile-statique icone-ms="payments" titre="Votre prochain versement">
        <div slot="contenu">
            <p>Vous recevrez ce prochain versement au plus tard le 2 septembre.</p>
        </div>
        <div slot="boutons-pied">
            <button type="button" class="utd-btn secondaire compact">Consulter mes prestations</button>
        </div>
    </utd-tuile-statique>
    <utd-tuile-statique icone-ms="calendar_clock" titre="Planification de vos semaines">
        <div slot="contenu">
            <p>Vous pouvez ajouter ou retirer des semaines à votre planification.</p>
        </div>
    </utd-tuile-statique>
</utd-tuile-conteneur>
```
