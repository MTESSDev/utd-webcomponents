# Infobulle (`utd-infobulle`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/infobulle · Bundle : `utd-webcomponents.min.js`

Explication courte liée à un terme ou à un libellé.

Dans un champ, placer `utd-infobulle` directement dans le `utd-champ-form`, avant le contrôle. Contenu court : attribut `contenu` ; contenu riche ou avec liens : slot `contenu`. Mot lié dans un texte : slot `texte-lie`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` |  | Titre affiché dans la feuille associée à l'infobulle. |
| `sr-titre` | Aide concernant / Help concerning | Texte lecteur écran seulement en préfixe au titre affiché dans la feuille associée à l'infobulle. Si aucun titre n'est spécifié, il faut inscrire un titre complet dans cet attribut pour l'accessibilité. Défaut : "Aide concernant " et "Help about ". |
| `sr-prefixe-contenu` | Détails : / Details: | Texte lecteur écran seulement en préfixe au contenu affiché dans la feuille associée à l'infobulle. Il permet d'améliorer l'accessibilité du composant en évitant de lire tout le contenu de l'infobulle lors de son ouverture. Défaut : "Détails : " et "Details: ". |
| `sr-bouton-ouvrir` | Afficher l'aide contextuelle / Show help about | Texte lecteur écran seulement du bouton permettant d'ouvrir l'infobulle. |
| `sr-bouton-fermer` | Fermer / Close | Texte lecteur écran seulement du bouton permettant de fermer l'infobulle. |
| `contenu` |  | Texte à afficher dans la zone de contenu de l'infobulle. |
| `mode-affichage` | feuille | Mode d'affichage de l'infobulle ("feuille" ou "bulle"). Défaut "feuille". Note, même si le mode "bulle" est spécifié, en mobile (appareil mobile ou largeur d'écran inférieure à 576px), le mode "feuille" est forcé. |

## Slots

| Slot | Description |
|---|---|
| `texte-lie` | Texte lié à l'infobulle (affiché en bleu pâle juste avant l'infobulle. |

## Exemples

### Aide d'un champ

```html
<utd-champ-form libelle="Votre nom officiel">
    <utd-infobulle titre="Nom officiel" contenu="Ne pas indiquer de surnom."></utd-infobulle>
    <input type="text" autocomplete="name">
</utd-champ-form>
```

### Mot lié en bulle

```html
<p>Le
    <utd-infobulle mode-affichage="bulle" contenu="Revenu avant impôt et déductions.">
        <span slot="texte-lie">revenu brut</span>
    </utd-infobulle> est demandé.
</p>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/infobulle
