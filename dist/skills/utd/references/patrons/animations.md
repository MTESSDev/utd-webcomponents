# Animations

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/animations

Zone en cours de chargement : `utd-fond-element-chargement`.

Ajouter la classe `utd-fond-element-chargement` à la zone pendant le chargement, la retirer à la fin.

## Exemples

### Zone en chargement

```html
<div id="zoneResultats" class="utd-fond-element-chargement"></div>
```

```js
await chargerResultats();
document.getElementById('zoneResultats').classList.remove('utd-fond-element-chargement');
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/animations
