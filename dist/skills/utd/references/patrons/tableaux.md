# Tableaux

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/tableaux

Classes `utd-table` : responsive, survol des lignes, largeurs de colonnes.

Classes sur `table`, toujours avec `utd-table` :
- tous les sites : `gris` (incompatible avec `rayee`), `rayee`, `hover-lignes`, `responsive` (défilement horizontal géré ; sauf DataTables), `sans-retour-ligne` ;
- sites internes seulement : `accent-premiere-colonne`, `bordures-lignes`, `bordures-cellules`, `condense`, `compact`, `ultra-compact`.

Largeur et alignement des colonnes sur `th` : `utd-w-*`, `utd-minw-*`, `utd-align-left|center|right`. Toujours un `caption` (masqué au besoin par `utd-sr-only`). Après insertion dynamique d'un tableau `responsive`, appeler `utd.tables.initialiserScrollTables()`.

## Accessibilité

Toujours inclure un élément `<caption>` dans chaque tableau pour décrire son contenu (requis WCAG 1.3.1). Ce titre peut être affiché visuellement ou, s'il n'est pas nécessaire à l'écran, masqué avec la classe `utd-sr-only` — il reste alors lu par les lecteurs d'écran sans apparaître visuellement :

## Exemples

### Tableau de base

```html
<table class="utd-table rayee responsive">
    <caption>Liste des employés</caption>
    <thead>
        <tr><th>Nom</th><th class="utd-align-right">Salaire</th></tr>
    </thead>
    <tbody>
        <tr><td>Tremblay</td><td class="utd-align-right">52 000 $</td></tr>
    </tbody>
</table>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/tableaux
