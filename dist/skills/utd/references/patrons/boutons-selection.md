# Boutons de sélection

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/boutonsselection

Radio ou case à cocher en tuile cliquable : 1, 2 ou 3 colonnes, ou horizontale.

`utd-champ-form` avec `class="utd-boutons-selection"` et `format="compact"`. Dans chaque `label` : l'`input` (radio ou checkbox), puis `span.option` contenant `span.libelle` et, au besoin, `span.description`.

## Autres références

### Classes disponibles

| Nom | Description |
|---|---|
| `utd-boutons-selection` | Affiche les options (boutons radio ou cases à cocher) en boutons de sélection. Utilisée seule, elle empile les boutons sur une colonne, à la largeur de la zone de contenu. |
| `utd-boutons-selection-colonnes-2` | S'utilise seule, à la place de `utd-boutons-selection`. Affiche les boutons sur 2 colonnes égales. Sur mobile, les boutons s'affichent sur une seule colonne. |
| `utd-boutons-selection-colonnes-3` | S'utilise seule, à la place de `utd-boutons-selection`. Affiche les boutons sur 3 colonnes égales. Sur mobile, les boutons s'affichent sur une seule colonne. |
| `utd-boutons-selection-horizontal` | S'utilise seule, à la place de `utd-boutons-selection`. Affiche les boutons côte à côte, à la largeur de leur contenu, avec retour à la ligne au besoin. Garder des libellés courts (ex. une échelle de 1 à 5) et éviter les descriptions. |
| `utd-boutons-selection-compact` | **Sites internes seulement.** S'ajoute à `utd-boutons-selection` ou à une classe de disposition pour réduire la hauteur des boutons à 40 px au lieu de 56 px. Éviter les descriptions. |
| `utd-zone-pleine-largeur` | **Sites internes seulement.** S'ajoute à `utd-champ-form` pour retirer la largeur maximale de 825 px des dispositions en colonnes et horizontale. L'effet n'est visible que si la zone de contenu est plus large que 825 px (voir l'[exemple dans un gabarit pleine largeur](https://lively-cliff-018a9540f.azurestaticapps.net/boutonsselectionpleinelargeur)). |

## Exemples

### Choix unique en tuiles

```html
<utd-champ-form class="utd-boutons-selection" format="compact" libelle="Mode de réception" obligatoire="true" message-erreur="Vous devez choisir un mode de réception.">
    <label>
        <input type="radio" name="reception" value="courriel">
        <span class="option">
            <span class="libelle">Par courriel</span>
            <span class="description">Vous recevez le document en quelques minutes.</span>
        </span>
    </label>
    <label>
        <input type="radio" name="reception" value="poste">
        <span class="option">
            <span class="libelle">Par la poste</span>
            <span class="description">Délai de 10 jours ouvrables.</span>
        </span>
    </label>
</utd-champ-form>
```

### Dispositions

Remplacer la classe `utd-boutons-selection` par `utd-boutons-selection-colonnes-2` ou `utd-boutons-selection-colonnes-3` (une colonne en mobile), ou `utd-boutons-selection-horizontal` (côte à côte, libellés courts, sans description). Ces dispositions sont plafonnées à 825 px ; `utd-zone-pleine-largeur` sur le `utd-champ-form` retire le plafond (sites internes seulement). Pour un choix multiple, même structure avec `input type="checkbox"`.

Format compact (sites internes seulement) : ajouter la classe `utd-boutons-selection-compact` à `utd-boutons-selection` ou à une classe de disposition pour réduire les boutons à 40 px de haut au lieu de 56 px. Éviter les descriptions.

```html
<utd-champ-form class="utd-boutons-selection-colonnes-2" format="compact" libelle="Mode de réception">
    <label>
        <input type="radio" name="reception2col" value="courriel">
        <span class="option">
            <span class="libelle">Par courriel</span>
            <span class="description">Vous recevez le document en quelques minutes.</span>
        </span>
    </label>
    <label>
        <input type="radio" name="reception2col" value="poste">
        <span class="option">
            <span class="libelle">Par la poste</span>
            <span class="description">Délai de 10 jours ouvrables.</span>
        </span>
    </label>
</utd-champ-form>
```
