# Notifications

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/notifications

Message temporaire après une action : `utd.notification.emettre`.

`type` : `positif`, `negatif`, `neutre` ou `avertissement`. Fermeture automatique après 5 s pour `positif` et `neutre` (`delaiFermeture` pour changer) ; `negatif` et `avertissement` restent jusqu'à leur fermeture.

## Autres références

### utd.notification.emettre — Paramètres

| Nom | Type | Description |
|---|---|---|
| `type` | String (Optionnel) | Type de notification. Valeurs possibles : `positif` (Défaut), `negatif`, `neutre`, `avertissement`. |
| `titre` | String (Optionnel) | Titre de la notification. |
| `message` | String | Texte de la notification. |
| `delaiFermeture` | Number (Optionnel) | Délai de fermeture de la notification (en millisecondes). Défaut 5000 pour `positif` et `neutre`, `0` pour `negatif` et `avertissement` (les erreurs ne disparaissent pas d'elles-mêmes). Avec `0`, la notification est persistante : seul le bouton de fermeture la retire. Le délai est suspendu tant que la souris survole la notification ou que le focus s'y trouve. Si le message d'une notification `positif` ou `neutre` est important, augmenter le délai ou utiliser `0`. |
| `texteBoutonFermer` | String (Optionnel) | Texte du bouton de fermeture de la notification. Défaut "Fermer" ou "Close" en anglais. |

## Exemples

### Confirmation d'enregistrement

```js
utd.notification.emettre({
    type: 'positif',
    titre: 'Enregistré',
    message: 'Vos modifications ont été enregistrées.'
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/notifications
