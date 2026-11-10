# Système de grille

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/bases/grillesysteme

Grille Bootstrap 5 préfixée : `utd-row`, `utd-col-*`, `utd-row-cols-*`.

Grille Bootstrap 5 préfixée `utd-` (ne pas ajouter Bootstrap). `utd-row-cols-*` pour des colonnes égales, `utd-row` + `utd-col-*` pour des largeurs différentes.

## Exemples

### Champs en colonnes réactives

```html
<div class="utd-row-cols-1 utd-row-cols-md-2">
    <div class="utd-col">
        <utd-champ-form libelle="Nom" format="xl">
            <input type="text" autocomplete="family-name">
        </utd-champ-form>
    </div>
    <div class="utd-col">
        <utd-champ-form libelle="Prénom" format="xl">
            <input type="text" autocomplete="given-name">
        </utd-champ-form>
    </div>
</div>
```

### Largeurs différentes

```html
<div class="utd-row">
    <div class="utd-col-12 utd-col-md-8">Contenu principal</div>
    <div class="utd-col-12 utd-col-md-4">Contenu secondaire</div>
</div>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/bases/grillesysteme
