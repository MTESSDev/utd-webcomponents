# Dialogue modal (`utd-dialog`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/dialogue · Bundle : `utd-webcomponents.min.js`

Fenêtre modale (formulaire, confirmation), centrée ou latérale.

Ouvrir et fermer par `utd.dialogue.afficher(id)` et `utd.dialogue.masquer(id)` ; boutons d'action dans le slot `pied`. Le focus revient au bouton d'ouverture. Confirmation : `type="avertissement"` et un simple paragraphe. Panneau latéral : `affichage-lateral="true"`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `afficher` | false | Permet de spécifier si la fenêtre modale doit être affichée ou non. |
| `type` |  | Type de la fenêtre modale (icône). Valeurs possibles : `information`, `avertissement`, `succes`, `erreur`. |
| `titre` |  | Titre de la fenêtre modale. |
| `tag-titre` | h1 | Balise html à utiliser pour le titre de la fenêtre modale. Valeurs possibles : `h1` à `h6`. Défaut "h1". |
| `sr-bouton-fermer` | Fermer / Close | Texte lecteur écran seulement du bouton permettant de fermer la fenêtre modale. |
| `id-focus-ouverture` |  | Id du contrôle auquel on veut forcer le focus une fois la fenêtre modale affichée si le comportement pas défaut ne convient pas. |
| `id-focus-fermeture` |  | Id du contrôle auquel on veut forcer le focus à la fermeture de la fenêtre modale si le comportement par défaut ne convient pas. Par défaut le contrôle redonne le focus à l'élément qui à ouvert la fenêtre modale (ex. un bouton). |
| `boutons-texte-long` | false | Affiche les boutons à partir de 525px et moins sous forme de colonne (au lieu du 425px normal). |
| `forcer-boutons-inline` | false | Force l'affichage des boutons en mode inline (ne vont pas s'afficher en colonne à 425px et moins). |
| `affichage-lateral` | false | Indique si une animation d'ouverture latérale (droite vers la gauche) est utilisée pour l'affichage de la fenêtre modale. |
| `largeur-px` |  | Permet de spécifier une largeur maximale personnalisée (en pixels) pour la fenêtre modale, au lieu de la largeur par défaut (600px). Valeur arrondie au palier de 8px le plus proche, jusqu'à 1200px. **Réservé aux sites internes.** |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `fermeture` | `raisonFermeture` |
| `apresFermeture` | (aucune) |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de la fenêtre modale. |
| `pied` | Contenu html injecté dans le pied de la fenêtre modale (généralement des boutons). |

## Autres références

### utd.dialogue.afficher — Paramètres

| Nom | Type | Description |
|---|---|---|
| `idDialogue` | String | Id du contrôle de dialogue à afficher. |
| `idControleFocusFermeture` | String (Optionnel) | Id du contrôle auquel on veut forcer le focus à la fermeture de la fenêtre modale si le comportement par défaut ne convient pas. Par défaut le contrôle redonne le focus à l'élément qui à ouvert la fenêtre modale (ex. un bouton). |

### utd.dialogue.masquer — Paramètres

| Nom | Type | Description |
|---|---|---|
| `idDialogue` | String | Id du contrôle de dialogue à masquer. |
| `idControleFocusFermeture` | String (Optionnel) | Id du contrôle auquel on veut forcer le focus à la fermeture de la fenêtre modale si le comportement par défaut ne convient pas. Par défaut le contrôle redonne le focus à l'élément qui à ouvert la fenêtre modale (ex. un bouton). Utiliser la valeur 'null' afin de désactiver la restauration automatique du focus à la fermeture, ainsi que l'animation de fermeture. Le dialogue modal se ferme alors sans délai **et VOUS avez la responsabilité de gérer le focus**. |

## Accessibilité

Les [règles du W3C relatives aux dialogues](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) sont suivies à la lettre.

Il semble que l'implémentation dans NVDA provoque la lecture du titre de la modale au lecteur écran deux fois.

Il s'agit malgré tout de la meilleure solution possible, et il semble qu'il n'y a malheureusement rien à faire.

## Exemples

### Dialogue avec formulaire

```html
<button type="button" id="btnAjouterProbleme" class="utd-btn secondaire">Ajouter un problème</button>

<utd-dialog id="dialogueProbleme" titre="Ajout d'un problème">
    <utd-champ-form libelle="Description du problème" format="xl">
        <input type="text">
    </utd-champ-form>
    <div slot="pied">
        <button id="btnAnnulerProbleme" type="button" class="utd-btn secondaire compact">Annuler</button>
        <button id="btnEnregistrerProbleme" type="button" class="utd-btn primaire compact">Enregistrer</button>
    </div>
</utd-dialog>
```

```js
document.getElementById('btnAjouterProbleme').addEventListener('click', () => utd.dialogue.afficher('dialogueProbleme'));
document.getElementById('btnAnnulerProbleme').addEventListener('click', () => utd.dialogue.masquer('dialogueProbleme'));
document.getElementById('btnEnregistrerProbleme').addEventListener('click', () => {
    enregistrerProbleme();
    utd.dialogue.masquer('dialogueProbleme');
});
document.getElementById('dialogueProbleme').addEventListener('fermeture', (e) => traiterFermeture(e.detail.raisonFermeture));
```

### Confirmation avant suppression

```html
<button type="button" id="btnSupprimer" class="utd-btn secondaire">Supprimer</button>

<utd-dialog id="dialogueSuppression" type="avertissement" titre="Supprimer ce dossier?" tag-titre="h2">
    <p>Cette action est irréversible.</p>
    <div slot="pied">
        <button id="btnAnnulerSuppression" type="button" class="utd-btn secondaire compact">Annuler</button>
        <button id="btnConfirmerSuppression" type="button" class="utd-btn primaire compact">Supprimer</button>
    </div>
</utd-dialog>
```

```js
document.getElementById('btnSupprimer').addEventListener('click', () => utd.dialogue.afficher('dialogueSuppression'));
document.getElementById('btnAnnulerSuppression').addEventListener('click', () => utd.dialogue.masquer('dialogueSuppression'));
document.getElementById('btnConfirmerSuppression').addEventListener('click', () => {
    supprimerDossier();
    utd.dialogue.masquer('dialogueSuppression');
});
```

### Panneau latéral avec focus initial

```html
<utd-dialog id="dialogueAvis" titre="Votre avis" affichage-lateral="true" forcer-boutons-inline="true" id-focus-ouverture="texteAvis">
    <utd-champ-form libelle="Votre avis" obligatoire="true">
        <textarea id="texteAvis" rows="3"></textarea>
    </utd-champ-form>
    <div slot="pied">
        <button id="btnEnvoyerAvis" type="button" class="utd-btn primaire compact">Envoyer</button>
    </div>
</utd-dialog>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/dialogue
