# Case à cocher

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/casecocher

Choix multiple ou confirmation : `checkbox` dans `utd-champ-form`.

Un `label` par case, contenant l'`input` puis un `span`. Pour plusieurs cases, le `libelle` du `utd-champ-form` sert de légende.

## Exemples

### Confirmation obligatoire

```html
<utd-champ-form id="champDirectives" obligatoire="true" message-erreur="Le champ « J'ai pris connaissance des directives » est obligatoire.">
    <label>
        <input type="checkbox" name="directives" value="lues">
        <span>J'ai pris connaissance des directives</span>
    </label>
</utd-champ-form>
```

```js
const champ = document.getElementById('champDirectives');
champ.querySelector('input').addEventListener('change', () => {
    champ.setAttribute('invalide', champ.querySelector('input:checked') ? 'false' : 'true');
});
```

### Choix multiples

```html
<utd-champ-form libelle="Moyens de transport utilisés" precision="Cochez tout ce qui s'applique.">
    <label>
        <input type="checkbox" name="transport" value="auto">
        <span>Automobile</span>
    </label>
    <label>
        <input type="checkbox" name="transport" value="bus">
        <span>Autobus</span>
    </label>
</utd-champ-form>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/casecocher
