# Groupe de champs

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/groupechamps

Champs d'un même sujet sous un titre commun : `utd-groupe-champs`.

## Exemples

### Groupe titré

```html
<div class="utd-row-cols-1 utd-row-cols-lg-2 utd-groupe-champs" role="group" aria-labelledby="titreParent">
    <h4 id="titreParent">Parent</h4>
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

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/groupechamps
