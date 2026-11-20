# Pagination (`utd-pagination`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/pagination · Bundle : `utd-webcomponents.min.js`

Navigation entre pages de résultats ou d'éléments.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `nb-par-page` | aucun | Nombre d'éléments affichés par page. Lorsqu'il est présent, la pagination affiche elle-même le contenu placé à l'intérieur du composant : le nombre de pages est calculé, et les éléments hors de la page active sont masqués. Les attributs `nb-pages` et `modele-url` sont alors ignorés. Défaut : aucun. |
| `selecteur-elements` | les enfants directs du composant | Avec `nb-par-page`, sélecteur CSS des éléments à paginer dans le contenu (ex. `selecteur-elements="li"` pour une liste, `selecteur-elements="tbody tr"` pour un tableau). Défaut : les enfants directs du composant. |
| `nb-pages` | 1 | Nombre total de pages. La pagination n'est pas affichée s'il n'y a qu'une page. Défaut : 1. |
| `page-courante` | 1 | Page active. Elle peut être modifiée après le montage du composant. Défaut : 1. |
| `format` | court | Nombre maximal de pages affichées. Valeurs possibles : `court` (1 page de chaque côté de la page active) ou `long` (2 pages de chaque côté). Si l'espace manque, moins de pages sont affichées. Défaut : court. |
| `libelle` | Pagination | Nom accessible de la navigation. À préciser lorsque la page contient plus d'une pagination. Défaut : Pagination. |
| `modele-url` | aucun | Modèle d'URL des pages, où `{page}` est remplacé par le numéro de page (ex. `modele-url="/resultats?page={page}"`). Lorsqu'il est présent, les contrôles sont des liens plutôt que des boutons. Défaut : aucun. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` | Description |
|---|---|---|
| `changementPage` | `page` | Déclenché lors d'un changement de page, sauf avec `modele-url`. La propriété `event.detail.page` contient le numéro de la nouvelle page. |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Utilisé seulement avec `nb-par-page` : contenu à paginer (ex. une liste ou un tableau). Avec `modele-url` ou l'événement `changementPage`, placer le contenu à côté du composant. |

## Accessibilité

Avec l'événement `changementPage`, le composant ne connaît pas le contenu : l'application doit annoncer le changement elle-même, par exemple avec un sommaire portant `role="status"`, masqué avec la classe `utd-sr-only` ou visible (voir l'exemple ci-dessous). Si l'application déplace le focus dans son écouteur, le composant ne le reprend pas.

## Exemples

### Contenu dans le composant

```html
<utd-pagination nb-par-page="5" selecteur-elements="li">
    <ul class="utd">
        <li>Élément 1</li>
        <li>Élément 2</li>
        <!-- Ici tous les autres <li> -->
    </ul>
</utd-pagination>
```

### Liens (pages générées par le serveur)

```html
<ul class="utd">
    <li>Élément 1</li>
    <li>Élément 2</li>
    <li>Élément 3</li>
</ul>
<utd-pagination nb-pages="20" page-courante="3" modele-url="?page={page}"></utd-pagination>
```

### Événement (l'application charge les données de la page demandée)

```html
<utd-pagination nb-pages="20" format="long" libelle="Pagination des résultats"></utd-pagination>
<script>
    document.querySelector('utd-pagination').addEventListener('changementPage', (e) => afficherPage(e.detail.page));
</script>
```
