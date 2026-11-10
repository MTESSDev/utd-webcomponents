# Étiquettes

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/etiquettes

Filtres actifs ou liens mis en évidence : `utd-conteneur-etiquettes`.

Liste `ul.utd-conteneur-etiquettes` : `li > button` pour un filtre retirable, `li > a` pour un lien.

## Exemples

### Filtres retirables

Après le retrait, déplacer le focus sur l'étiquette voisine.

```html
<ul class="utd-conteneur-etiquettes" id="filtresActifs">
    <li><button type="button">Montréal</button></li>
    <li><button type="button">Dossiers actifs</button></li>
</ul>
```

```js
document.getElementById('filtresActifs').addEventListener('click', (e) => {
    const bouton = e.target.closest('button');
    if (!bouton) return;
    const element = bouton.parentElement;
    const voisin = element.nextElementSibling ?? element.previousElementSibling;
    element.remove();
    voisin?.querySelector('button').focus();
    retirerFiltre(bouton.textContent);
});
```

### Liens mis en évidence

```html
<ul class="utd-conteneur-etiquettes">
    <li><a href="/emploi">Emploi</a></li>
    <li><a href="/solidarite-sociale">Solidarité sociale</a></li>
</ul>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/etiquettes
