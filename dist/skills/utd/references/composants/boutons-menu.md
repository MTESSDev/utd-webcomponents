# Boutons avec menu (`utd-btn-menu`, `utd-btn-menu-item`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/boutonsmenu · Bundle : `utd-webcomponents.min.js`

Bouton qui ouvre une liste d'actions.

Un seul niveau d'items. L'action se branche sur le `click` de chaque item.

## `utd-btn-menu`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `libelle` | "Bouton" | Libellé du bouton. Défaut : "Bouton". |
| `type` | secondaire | Type de bouton à afficher. Valeurs possibles `primaire`, `secondaire`, `avertissement`. Défaut : "secondaire". |
| `compact` | false | Indique si le bouton doit s'afficher en mode compact ou non. Défaut : "false". |
| `afficher` | false | Gère l'ouverture et la fermeture du menu. Le menu se ferme automatiquement lorsqu'un élément du menu est activé. |
| `disabled` | false | Indique si le bouton est actif ou non. Pour désactiver, simplement utiliser l'attribut `disabled` natif sur le composant `utd-btn-menu`. |

### Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que des composants `utd-btn-menu-item`. |

## `utd-btn-menu-item`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `libelle` |  | Libellé de l'élément du menu. |
| `sr-texte` |  | Texte à ajouter au lecteur écran après le libellé de l'élément de menu. |

## Exemples

### Menu d'actions

```html
<utd-btn-menu libelle="Actions" type="secondaire">
    <utd-btn-menu-item id="actionDupliquer" libelle="Dupliquer le dossier"></utd-btn-menu-item>
    <utd-btn-menu-item id="actionSupprimer" libelle="Supprimer le dossier"></utd-btn-menu-item>
</utd-btn-menu>
```

```js
document.getElementById('actionSupprimer').addEventListener('click', () => supprimerDossier());
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/boutonsmenu
