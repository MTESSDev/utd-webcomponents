# Indicateur d'étapes (`utd-indicateur-etapes`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/indicateuretapes · Bundle : `utd-webcomponents.min.js`

Progression dans un processus en plusieurs étapes (« Étape 2 sur 5 »).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `etape-courante` | 1 | Numéro de l'étape courante, à partir de 1. Défaut 1. Une valeur hors limites est ramenée à la première ou à la dernière étape. Pour une sous-étape, utiliser le format `2.2`. |
| `navigation` | sans-retour | Mode de navigation entre les étapes. Valeurs possibles : • `sans-retour` (défaut) : informatif seulement, aucune étape n'est cliquable; • `retour` : les étapes déjà complétées sont cliquables; • `libre` : toutes les étapes sont cliquables (rarement recommandé). |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `changementEtape` | `indexe`, `libelle`, `indexeSousEtape` |

## Autres références

### utd-etape

| Nom | Type | Description |
|---|---|---|
| `libelle` | String (Obligatoire) | Libellé de l'étape. Il doit être cohérent avec le titre de la page correspondante. |
| `statut` | String (Optionnel) | Statut de l'étape. Valeurs possibles : • `terminee` : l'étape est terminée. Nécessaire en modes `retour` et `libre`; en mode `sans-retour`, les étapes avant l'étape courante sont terminées; • `erreur` : l'étape contient une erreur (sans effet sur l'étape courante, qui garde toujours son style); • absent : l'étape est à faire (ou terminée si elle précède l'étape courante en mode `sans-retour`). L'étape courante est déterminée par `etape-courante`. |
| `href` | String (Optionnel) | Adresse de la page de l'étape. Si absent, l'étape cliquable est un bouton qui émet l'événement `changementEtape` et la gestion de l'affichage vous revient. |

### changementEtape — Retour

| Nom | Type | Description |
|---|---|---|
| `indexe` | number | Indexe de l'étape choisie (débute à 0). |
| `libelle` | string | Libellé de l'étape choisie. |

## Accessibilité

- À chaque changement d'étape, mettez à jour le titre de la page (`<title>`) pour qu'il indique l'étape courante, ex. `Étape 2 de 5 – Coordonnées – Nom du service`.

- Le `<h1>` de la page décrit le contenu de l'étape (ex. « Coordonnées »). Il ne remplace pas le titre de la page.

- Dans une application monopage (SPA), la page ne se recharge pas : le lecteur d'écran n'annonce pas le changement. Après chaque changement d'étape, déplacez aussi le focus sur le `<h1>` de la nouvelle étape (`tabindex="-1"` puis `focus()`).

## Exemples

### Indicateur informatif (sans retour)

```html
<h1>Coordonnées</h1>
<utd-indicateur-etapes etape-courante="2">
    <utd-etape libelle="Identification" statut="terminee"></utd-etape>
    <utd-etape libelle="Coordonnées"></utd-etape>
    <utd-etape libelle="Documents"></utd-etape>
    <utd-etape libelle="Révision"></utd-etape>
</utd-indicateur-etapes>
```

### Retour aux étapes terminées, géré en JS

```html
<utd-indicateur-etapes id="etapes" etape-courante="3" navigation="retour">
    <utd-etape libelle="Identification" statut="terminee"></utd-etape>
    <utd-etape libelle="Coordonnées" statut="terminee"></utd-etape>
    <utd-etape libelle="Documents"></utd-etape>
</utd-indicateur-etapes>
```

```js
document.getElementById('etapes').addEventListener('changementEtape', (e) => {
    afficherEtape(e.detail.indexe);
});
```
