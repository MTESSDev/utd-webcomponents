# Traitement en cours

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/traitementencours

Spinner sur bouton, blocage de l'interface, annonce : `utd.traitementEnCours`.

Sur un bouton : `utd.traitementEnCours.debuter(bouton, avecOverlay = true)` puis `terminer(bouton)`. Sur toute la page : `debuterGlobal(textePrincipal, texteSecondaire)` puis `terminerGlobal(texteFin, restaurerFocus)`, qui renvoie une Promise. Seuls les boutons et la page sont pris en charge.

## Autres références

### utd.traitementEnCours.debuter — Paramètres

| Nom | Type | Description |
|---|---|---|
| `bouton` | Object | Objet (bouton) ayant initié le traitement en cours. |
| `avecOverlay` | Boolean (Optionnel) | Indique si l'interface doit être bloquée (overlay). Défaut true. |

### utd.traitementEnCours.debuterGlobal — Paramètres

| Nom | Type | Description |
|---|---|---|
| `textePrincipal` | String | Texte principal à afficher pour le traitement en cours global. Défaut "Chargement en cours..." / "Loading in progress...". |
| `texteSecondaire` | String (Optionnel) | Texte secondaire à afficher pour le traitement en cours global. |

### utd.traitementEnCours.majGlobal — Paramètres

| Nom | Type | Description |
|---|---|---|
| `textePrincipal` | String | Texte principal à modifier pour le traitement en cours global. Défaut "Chargement en cours..." / "Loading in progress...". |
| `texteSecondaire` | String (Optionnel) | Texte secondaire à modifier pour le traitement en cours global. |

### utd.traitementEnCours.terminer — Paramètres

| Nom | Type | Description |
|---|---|---|
| `bouton` | Object | Objet (bouton) ayant initié le traitement en cours. |
| `texteLecteurEcran` | String (Optionel) | Texte (lecteur écran seulement) lu à la fin du traitement. Défaut "Chargement terminé." / "Loading complete.". |
| `restaurerFocus` | Boolean (Optionel) | Indique s'il faut redonner le focus à l'élément initial à la fin de l'opération. Défaut true. |

### utd.traitementEnCours.terminerGlobal — Paramètres

| Nom | Type | Description |
|---|---|---|
| `texteLecteurEcran` | String (Optionel) | Texte (lecteur écran seulement) lu à la fin du traitement. Défaut "Chargement terminé." / "Loading complete.". |
| `restaurerFocus` | Boolean (Optionel) | Indique s'il faut redonner le focus à l'élément initial à la fin de l'opération. Défaut true. |

## Exemples

### Bouton

```js
bouton.addEventListener('click', async () => {
    utd.traitementEnCours.debuter(bouton);
    await enregistrer();
    utd.traitementEnCours.terminer(bouton);
});
```

### Page entière

```js
utd.traitementEnCours.debuterGlobal('Transmission en cours');
await transmettre();
utd.traitementEnCours.terminerGlobal('Transmission terminée.');
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/traitementencours
