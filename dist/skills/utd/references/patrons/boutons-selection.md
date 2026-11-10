# Boutons de sélection

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/boutonsselection

Radio ou case à cocher présentée en tuile cliquable pleine largeur.

`utd-champ-form` avec `class="utd-boutons-selection"` et `format="compact"`. Dans chaque `label` : l'`input` (radio ou checkbox), puis `span.option` contenant `span.libelle` et, au besoin, `span.description`.

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

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/boutonsselection
