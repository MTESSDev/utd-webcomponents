# Bouton radio

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/boutonradio

Choix unique : `input radio` dans `utd-champ-form`.

Un `label` par option, contenant l'`input` puis un `span`. Le `libelle` du `utd-champ-form` sert de légende au groupe.

## Exemples

### Choix unique obligatoire

```html
<utd-champ-form id="champLangue" libelle="Langue de correspondance" obligatoire="true" message-erreur="Le champ « Langue de correspondance » est obligatoire.">
    <label>
        <input type="radio" name="langue" value="fr">
        <span>Français</span>
    </label>
    <label>
        <input type="radio" name="langue" value="en">
        <span>Anglais</span>
    </label>
</utd-champ-form>
```

```js
const champ = document.getElementById('champLangue');
champ.querySelectorAll('input').forEach((option) => option.addEventListener('change', () => {
    champ.setAttribute('invalide', champ.querySelector('input:checked') ? 'false' : 'true');
}));
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/boutonradio
