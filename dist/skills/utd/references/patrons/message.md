# Message

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/message

Alerte modale qui exige une action : `utd.message.afficher`.

`utd.message.afficher(params)` renvoie une Promise résolue avec `primaire`, `secondaire`, `boutonFermer` ou `escape`. Sans `texteBoutonSecondaire`, un seul bouton. `corps` est injecté en HTML : échapper toute donnée saisie par l'utilisateur.

## Autres références

### utd.message.afficher — Paramètres

| Nom | Type | Description |
|---|---|---|
| `type` | String (Optionnel) | Valeurs possibles : `information`, `avertissement`, `succes`, `erreur`. |
| `titre` | String | Titre du message. |
| `corps` | String | Corps du message. |
| `texteBoutonPrimaire` | String | Texte du bouton primaire. Si non spécifié, le bouton primaire n'est pas affiché. |
| `texteBoutonSecondaire` | String (Optionnel) | Texte du bouton secondaire. Si non spécifié, le bouton secondaire n'est pas affiché. |
| `texteBoutonFermer` | String (Optionnel) | Texte du bouton de fermeture du message. Défaut "Fermer" ou "Close" en anglais. |
| `estBoutonsTexteLong` | Boolean (Optionnel) | Indique si le texte des boutons est long. Si c'est le cas, les boutons sont affichés verticalement en pleine largeur si la largeur d'écran est inférieure ou égale à 525px. (Au lieu de 425px normalement) |
| `idControleFocusFermeture` | String (Optionnel) | Id du contrôle auquel on redonne le focus à la fermeture de la fenêtre de message. Si non spécifié, focus redonné à l'élément actif avant l'affichage du message. |

## Accessibilité

Les [règles du W3C relatives aux dialogues de type "messages"](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog) sont suivies à la lettre.

Il semble que l'implémentation dans NVDA provoque la lecture du titre de la modale au lecteur écran deux fois (une au début et une à la fin). Le libellé du bouton qui reçoit le focus est également lu deux fois.

Il serait possible de donner le focus au texte du message, mais dans ce cas c'est un bout du texte du message qui serait lu deux fois. Dans tous les cas le titre de la modale est lu deux fois.

On préfère donc donner le focus au bouton même si son libellé est lu deux fois. Il s'agit malgré tout de la meilleure solution possible, et il semble qu'il n'y a malheureusement rien à faire.

## Exemples

### Confirmation

```js
utd.message.afficher({
    type: 'avertissement',
    titre: 'Supprimer le dossier?',
    corps: '<p>Cette action est irréversible.</p>',
    texteBoutonPrimaire: 'Supprimer',
    texteBoutonSecondaire: 'Annuler'
}).then((retour) => {
    if (retour === 'primaire') supprimerDossier();
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/message
