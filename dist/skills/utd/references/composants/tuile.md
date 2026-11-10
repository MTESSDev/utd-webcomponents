# Tuile (`utd-tuile`, `utd-tuile-conteneur`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/tuiles · Bundle : `utd-webcomponents.min.js`

Liens de navigation mis en valeur, en grille.

Le conteneur ne contient que des tuiles ; le nombre de colonnes s'ajuste seul (`nb-colonnes-max` interdit sur un site public). Donner un `sr-titre` au conteneur, et `tag-titre` si le bloc n'est pas directement sous le `h1`. Icône : `icone-ms` (Material Symbols).

## `utd-tuile`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `icone-utd` |  | Legacy : utiliser plutôt `icone-ms`. Classe css correspondant à l'icône à afficher dans la tuile. Voir [iconographie (Legacy)](https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographieLegacy). |
| `icone-ms` |  | Nom de l'icône Material Symbols à afficher dans la tuile. Voir [iconographie](https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographie) pour plus de détails. Ignoré si `icone-utd` est spécifié. |
| `url-icone` |  | Url d'une image à afficher dans la tuile, si l'icône désirée n'existe pas dans la banque d'icônes UTD. Ignoré si `icone-utd` ou `icone-ms` est spécifié. |
| `titre` |  | Titre de la tuile. |
| `href` |  | Valeur de l'attribut "href" du lien dans la tuile. |
| `description` |  | Ligne de description 1. |
| `description2` |  | Ligne de description 2. |
| `description3` |  | Ligne de description 3. |
| `description4` |  | Ligne de description 4. |
| `description5` |  | Ligne de description 5. |

## `utd-tuile-conteneur`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `sr-titre` |  | Titre du bloc de tuiles pour le lecteur écran (non visible). Il est préférable d'en spécifier un pour l'accessibilité afin de contextualiser les tuiles (liens). |
| `tag-titre` | h2 | Balise html à utiliser pour le titre des tuiles. Défaut "h2". **Important!** N'oubliez pas de définir cet attribut si votre bloc de tuiles se trouve à un autre niveau que sous un h1. |
| `couleur-fond` | "bleu-pale" | Couleur de fond à appliquer au conteneur de tuiles. Valeurs possibles: "bleu-pale", "gris-pale", "transparent". Défaut: "bleu-pale". |
| `fond-pleine-largeur` | false | Indique si un fond utilisant la pleine largeur de l'écran doit être appliqué au conteneur de tuiles. Défaut: "false." |
| `nb-colonnes-max` |  | Nombre maximal de colonnes à afficher, peu importe l'espace disponible (1 à 4). Le nombre de colonnes peut tout de même être inférieur sur un écran étroit. **Important!** Dans un site public il faut laisser la valeur par défaut afin de respecter les règles du système de design gouvernemental du Québec. |

### Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que des composants `utd-tuile`. Dans une SPA, placer dans chaque `utd-tuile` le lien du routeur (ex. `<router-link to="/monChemin">Texte</router-link>` dans Vue) : au clic, la tuile déclenche ce lien plutôt que son `href`. |

## Exemples

### Bloc de tuiles

```html
<utd-tuile-conteneur sr-titre="Actions possibles">
    <utd-tuile titre="Renouveler un permis" href="/permis/renouveler" icone-ms="autorenew" description="Avant la date d'échéance."></utd-tuile>
    <utd-tuile titre="Paramètres" href="/parametres" icone-ms="settings"></utd-tuile>
</utd-tuile-conteneur>
```

### Image personnalisée et plusieurs lignes de description

`url-icone` sert quand aucune icône Material Symbols ne convient. `description2` à `description5` ajoutent des lignes.

```html
<utd-tuile-conteneur sr-titre="Rapports">
    <utd-tuile titre="Produire le bilan de fin d'année" href="/rapports/bilan" url-icone="/images/bilan.svg" description="Données au 31 mars." description2="Format PDF."></utd-tuile>
    <utd-tuile titre="Historique des bilans" href="/rapports/historique" icone-ms="history"></utd-tuile>
</utd-tuile-conteneur>
```

### Bloc sous un h2, fond gris pleine largeur

```html
<h2>Opérations</h2>
<utd-tuile-conteneur sr-titre="Opérations disponibles" tag-titre="h3" couleur-fond="gris-pale" fond-pleine-largeur="true">
    <utd-tuile titre="Supprimer les dossiers inutilisés" href="/dossiers/nettoyage" icone-ms="delete"></utd-tuile>
    <utd-tuile titre="Accéder aux services en ligne" href="/services" icone-ms="language"></utd-tuile>
</utd-tuile-conteneur>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/tuiles
