# Alerte générale (`utd-alerte-generale`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/alertegenerale · Bundle : `utd-webcomponents.min.js`

Bandeau d'urgence pleine largeur sous l'entête, pour toute la population.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `type` | information | Type de l'alerte (icône/couleur). Valeurs possibles : `information` ou `avertissement`. Défaut "information". |
| `masquable` | false | Indique si l'alerte peut être masquée ou non. |
| `identifiant` |  | Identifiant de l'alerte générale. Sera utilisé pour déterminer l'état d'affichage de l'alerte générale si cette dernière est masquable. |
| `reinit` |  | Permet de réinitialiser l'état d'affichage de l'alerte. Utile notamment lors de tests. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `masquer` | (aucune) |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'alerte générale. |

## Exemples

### Alerte masquable

```html
<utd-alerte-generale masquable="true" identifiant="alerte-maintenance-2026">
    <p>Le service sera interrompu le 12 mai de 18 h à 22 h. Consultez <a href="/versions">l'historique des versions</a>.</p>
</utd-alerte-generale>
```

### Alerte permanente de type avertissement

```html
<utd-alerte-generale type="avertissement">
    <p>Le délai de traitement des demandes est actuellement de 20 jours ouvrables.</p>
</utd-alerte-generale>
```
