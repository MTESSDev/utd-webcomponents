# Gestion des erreurs

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/gestionerreurs

Validation au blur sans annuler le clic du bouton qui suit.

Valider au `blur` en basculant `invalide` sur le `utd-champ-form`. `data-delai-affichage-erreurs` sur un parent (défaut 100 ms) retarde le message : le clic sur le bouton qui suit n'est pas perdu quand le message le déplace.

## Exemples

### Validation au blur

```html
<form data-delai-affichage-erreurs>
    <utd-champ-form id="champFruit" libelle="Votre fruit préféré" obligatoire="true" message-erreur="Vous devez spécifier votre fruit préféré.">
        <input type="text">
    </utd-champ-form>
    <button type="button" class="utd-btn primaire">Continuer</button>
</form>
```

```js
const champ = document.getElementById('champFruit');
champ.querySelector('input').addEventListener('blur', (e) => {
    champ.setAttribute('invalide', e.target.value === '' ? 'true' : 'false');
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/gestionerreurs
