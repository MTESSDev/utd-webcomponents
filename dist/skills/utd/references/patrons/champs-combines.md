# Champs combinés

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/champscombines

Champs côte à côte avec un message d'erreur commun (ex. période).

## Exemples

### Période (deux dates côte à côte)

```html
<div class="utd-row utd-groupe-champs-combines">
    <div class="utd-col">
        <utd-champ-form libelle="Date de début" obligatoire="true" message-erreur="Date de début est obligatoire.">
            <input type="date">
        </utd-champ-form>
        <utd-champ-form libelle="Date de fin" obligatoire="true" message-erreur="Date de fin est obligatoire.">
            <input type="date">
        </utd-champ-form>
    </div>
</div>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/champscombines
