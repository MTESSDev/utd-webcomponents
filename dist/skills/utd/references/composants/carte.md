# Carte (`utd-carte`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/carte · Bundle : `utd-webcomponents.min.js` (chargé à la demande) ou `utd-webcomponents-complet.min.js`

Carte interactive OpenLayers : dessin, couches, recherche, import/export.

Module lourd : appeler `initialiser` seulement après `customElements.whenDefined('utd-carte')`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre-carte` |  | Titre affiché dans le bandeau supérieur de la carte. |
| `tag-titre` | h2 | Balise html à utiliser pour le titre du bandeau. Valeurs possibles : `h1` à `h6`. Défaut "h2". |
| `libelle` |  | Libellé visible associé au contrôle de carte. Génère un `<label>` lié à la carte pour l'accessibilité. Si absent, l'intégrateur fournit son propre libellé. |
| `aria-labelledby` |  | ID de l'élément extérieur servant de libellé. À utiliser quand `libelle` n'est pas fourni et que le libellé est défini ailleurs dans la page. |
| `lecture-seule` | false | Indique si la carte est en lecture seule. Masque la barre d'outils et affiche directement la vue carte. Les dessins passés via `initialiser({ dessinsInitiaux })` restent visibles. Défaut : false. |
| `focus` | false | Lorsque la valeur est "true" permet de donner le focus à la carte. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` | Description |
|---|---|---|
| `dessinsModifies` | (voir description) | Émis à chaque ajout, modification ou suppression d'un dessin. `event.detail` contient l'objet `{ geoJSON }` courant (voir `obtenirGeoJSON()`). |

## Autres références

### Configuration

| Nom | Type | Description |
|---|---|---|
| `centre` | Array (Optionnel) | Coordonnées du centre `[longitude, latitude]`. Ex : [-71.208, 46.813]. |
| `zoom` | Number (Optionnel) | Niveau de zoom initial. Défaut : 7. |
| `idFondDefaut` | String (Optionnel) | ID du fond de carte affiché par défaut. Doit correspondre à un ID du catalogue système (`gouvQc`, `gouvQcSat`, `osm`) ou à un ID défini dans `fondsPersonnalises` ou `fondsAdditionnels`. Défaut : `gouvQc`. |
| `fondsPersonnalises` | Object (Optionnel) | Remplace complètement les fonds système. Chaque clé est un ID unique. Mutuellement exclusif avec `fondsAdditionnels`. Types supportés : `tilewms`, `wmts`, `xyz`, `osm`. Voir Structure d'un objet fond de carte. |
| `fondsAdditionnels` | Object (Optionnel) | Fonds supplémentaires ajoutés aux fonds système. Chaque clé est un ID unique. Ignoré si `fondsPersonnalises` est défini. Types supportés : `tilewms`, `wmts`, `geojson`, `xyz`, `osm`. Voir Structure d'un objet fond de carte. |
| `couchesPersonnalisees` | Object (Optionnel) | Remplace complètement le catalogue de couches superposées système. Chaque clé est un ID unique. Mutuellement exclusif avec `couchesAdditionnelles`. Types supportés : `tilewms`, `wmts`, `geojson`, `xyz`, `osm`. Voir Structure d'un objet couche superposée. |
| `couchesAdditionnelles` | Object (Optionnel) | Couches superposées ajoutées au catalogue système. Ignoré si `couchesPersonnalisees` est défini. Voir Structure d'un objet couche superposée. |
| `couchesVisibles` | Array (Optionnel) | IDs des couches superposées visibles au démarrage. Accepte les IDs du catalogue système et des `couchesAdditionnelles`. Défaut : aucune couche visible. |
| `outils` | Object (Optionnel) | Définit les paramètres des outils de la carte. Voir la section *Propriétés de l'objet outils* ci-dessous pour les sous-clés disponibles. |
| `dessinsInitiaux` | Object (Optionnel) | Objet contenant la propriété `geoJSON` (GeoJSON FeatureCollection) à afficher au chargement, ex. `{ geoJSON: { type, features } }`. Accepte directement le format retourné par `obtenirGeoJSON()`. |
| `exemplesFormatsRecherche` | Array \| Object (Optionnel) | Liste d'exemples affichés dans l'infobulle du champ de recherche. Chaque élément devient un exemple dans la liste d'exemples. Accepte un `string[]` ou un objet bilingue `{ fr: string[], en: string[] }`. Défaut : liste d'exemples pour la recherche par défaut. |

### Fonds de carte système

| Nom | Description |
|---|---|
| `gouvQc` | Plan — Fond cartographique du gouvernement du Québec. |
| `gouvQcSat` | Satellite — Orthophotos aériennes du gouvernement du Québec. |
| `osm` | OpenStreetMap — Fond de carte communautaire mondial. |

### Couches superposées système

| Nom | Description |
|---|---|
| `routes-qc` | Routes du Québec — Réseau routier supérieur actif (MTQ). Non visible par défaut. |

### Propriétés de l'objet `outils`

| Nom | Type | Description |
|---|---|---|
| `dessin.actif` | Boolean (Optionnel) | Indique si l'outil de dessin est disponible. Défaut : true. |
| `dessin.types` | Array (Optionnel) | Types de dessin disponibles. Valeurs possibles : `Point`, `Ligne`, `Polygone`, `Cercle`. Défaut : tous. |
| `recherche.actif` | Boolean (Optionnel) | Indique si l'outil de recherche est disponible. Défaut : true. |
| `recherche.urlService` | String (Optionnel) | URL de base du service de géocodage. Défaut : service iCherche du gouvernement du Québec. Un service personnalisé peut être utilisé, mais il doit respecter la structure de réponse de l'[API icherche](https://geoegl.msp.gouv.qc.ca/apis/icherche/docs). |
| `recherche.params` | Object (Optionnel) | Paramètres transmis au service de géocodage. Consulter la [documentation de l'API icherche](https://geoegl.msp.gouv.qc.ca/apis/icherche/docs) pour la liste complète. Valeurs par défaut : limit: 6, type: adresses,lieux,municipalites,mrc,regadmin. |
| `couches.actif` | Boolean (Optionnel) | Indique si l'outil de gestion des couches est disponible. Défaut : true. |
| `importExport.actif` | Boolean (Optionnel) | Indique si l'outil d'import/export est disponible. Défaut : true. |
| `geolocalisation.actif` | Boolean (Optionnel) | Indique si le bouton de géolocalisation (Ma position) est disponible. Défaut : true. |

### Structure d'un objet fond de carte

| Nom | Type | Description |
|---|---|---|
| `type` | String | Type de source. Valeurs : `tilewms`, `wmts`, `xyz`, `osm`. |
| `name` | String | Libellé affiché dans le sélecteur de fonds. |
| `url` | String | URL du service cartographique. |
| `params` | Object (Optionnel) | Paramètres du service. Pour TileWMS : `{ LAYERS, VERSION, FORMAT }`. |
| `attributions` | String (Optionnel) | Texte d'attribution affiché en bas de la carte. |

### Structure d'un objet couche superposée

| Nom | Type | Description |
|---|---|---|
| `type` | String | Type de source. Valeurs : `tilewms`, `wmts`, `geojson`, `xyz`, `osm`. |
| `name` | String | Libellé affiché dans le panneau Couches. |
| `url` | String | URL du service cartographique. |
| `params` | Object (Optionnel) | Paramètres du service. Pour TileWMS : `{ LAYERS, VERSION }`. |
| `transparence` | Number (Optionnel) | Opacité initiale. 0 = pleinement visible, 100 = invisible. |

### Méthodes disponibles

| Nom | Type | Description |
|---|---|---|
| `initialiser(config)` | Promise | Initialise la carte avec la configuration fournie. Doit être appelée après le montage du composant (après `customElements.whenDefined`). Retourne une Promise résolue lorsque l'initialisation est complète. |
| `obtenirGeoJSON()` | Object | Retourne un objet `{ geoJSON }`, où `geoJSON` est un GeoJSON FeatureCollection (avec `timestamp`, `count` et `bbox` en propriétés additionnelles) contenant toutes les entités dessinées et les localisations sélectionnées. |
| `effacerDessins()` | — | Efface tous les dessins et les localisations sélectionnées de la carte. |

## Exemples

### Carte centrée sur le Québec

```html
<utd-carte id="maCarte" libelle="Carte des points de service"></utd-carte>

<script type="module">
    await customElements.whenDefined('utd-carte');
    await document.getElementById('maCarte').initialiser({
        centre: [-71.208, 46.814],
        zoom: 7
    });
</script>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/carte
