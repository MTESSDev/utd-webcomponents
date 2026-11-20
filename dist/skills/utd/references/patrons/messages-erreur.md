# Messages d'erreur

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/messageserreur

Erreurs de formulaire affichées par `utd-champ-form`.

Le message d'erreur d'un champ est affiché par `utd-champ-form` (`message-erreur`, `invalide`). À la soumission, récapituler les erreurs dans un `utd-avis type="erreur" focus="true"` placé avant les champs, sous la légende « * Champ obligatoire ».

## Exemples

### Récapitulatif à la soumission

```html
<form id="formulaire" novalidate>
    <p>* Champ obligatoire</p>
    <div id="zoneRecapitulatif"></div>
    <utd-champ-form obligatoire="true" libelle="Nom" format="xl" message-erreur="Le champ Nom est obligatoire.">
        <input type="text" autocomplete="family-name">
    </utd-champ-form>
    <button type="submit" class="utd-btn primaire">Envoyer</button>
</form>
```

```js
const formulaire = document.getElementById('formulaire');
const zoneRecapitulatif = document.getElementById('zoneRecapitulatif');
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const champs = [...formulaire.querySelectorAll('utd-champ-form')];
    const invalides = champs.filter((champ) => !champ.querySelector('input').value.trim());
    champs.forEach((champ) => champ.setAttribute('invalide', invalides.includes(champ) ? 'true' : 'false'));
    zoneRecapitulatif.replaceChildren();
    if (!invalides.length) return;
    const avis = document.createElement('utd-avis');
    avis.setAttribute('type', 'erreur');
    avis.setAttribute('titre', 'Le formulaire contient des erreurs');
    avis.setAttribute('focus', 'true');
    const liste = document.createElement('ul');
    invalides.forEach((champ) => {
        const item = document.createElement('li');
        item.textContent = champ.getAttribute('message-erreur');
        liste.append(item);
    });
    avis.append(liste);
    zoneRecapitulatif.append(avis);
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/messageserreur
