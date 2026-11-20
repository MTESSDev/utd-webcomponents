# Onglets (`utd-onglets`, `utd-onglet`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/onglets · Bundle : `utd-webcomponents.min.js`

Contenus connexes affichés tour à tour au même endroit.

`titre` est obligatoire sur `utd-onglets` (nom accessible) et sur chaque `utd-onglet`. Donner un `id` à chaque onglet pour `id-onglet-actif` et l'événement `affichageOnglet` (`e.detail` : `indexe`, `id`, `titre`).

## `utd-onglets`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` |  | Titre affiché en entête des onglets. Le titre est obligatoire (pour accessibilité afin d'identifier le bloc d'onglets). Par contre il est possible de ne ne pas l'afficher à l'écran, mais seulement au lecteur écran avec le paramètre "titre-visible". |
| `titre-visible` | false | Indique si le titre est visible ou non. Si non visible, est perceptible au lecteur écran seulement. |
| `tag-titre` | h3 | Balise html à utiliser pour le titre de l'entête. Défaut "h2". |
| `id-onglet-actif` |  | Id de l'onglet actif. Utilisez cet attribut afin d'obtenir l'id de l'onglet actif ou définir un onglet à afficher par programmation. IMPORTANT, vous devez avoir spécifié un id unique pour chaque onglet (utd-onglet) afin que ça fonctionne. |
| `conserver-etat-affichage` | aucun | Indique si l'état d'affichage (onglet actif) du bloc d'onglets doit être conservé pendant la session (tant que le fureteur est ouvert), ou en permanence (persistant d'une session à l'autre). Valeurs possibles: "aucun" (défaut), "session", "persistant". IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-onglets doit avoir un id, et idéalement un id qui est unique dans votre site. |

### Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `affichageOnglet` | `indexe`, `id`, `titre` |

### Slots

| Slot | Description |
|---|---|
| (défaut) |  |

## `utd-onglet`

### Slots

| Slot | Description |
|---|---|
| (défaut) |  |

## Autres références

### affichageOnglet — Retour

| Nom | Type | Description |
|---|---|---|
| `indexe` | number | Indexe de l'onglet affiché (débute à 0). |
| `id` | string | Id de l'onglet affiché. |
| `titre` | string | Titre de l'onglet affiché. |

## Exemples

### Onglets

```html
<utd-onglets titre="Dossier" titre-visible="false">
    <utd-onglet id="ongletInfos" titre="Informations">
        <p>Contenu.</p>
    </utd-onglet>
    <utd-onglet id="ongletDocuments" titre="Documents">
        <p>Contenu.</p>
    </utd-onglet>
</utd-onglets>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/onglets
