# À consulter aussi (`utd-consulter-aussi`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/consulteraussi · Bundle : `utd-webcomponents.min.js`

Liens complémentaires en bas de page, avant le pied de page.

Juste avant le pied de page.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `tag-titre` | h2 | Balise html à utiliser pour le titre. Valeurs possibles : `h1` à `h6`. Défaut "h2". |

## Slots

| Slot | Description |
|---|---|
| `liens` | Html pour la liste des liens. Les liens doivent être fournis dans une structure de liste non ordonnée(ul/li). |
| `documents` | Html pour la liste des documents. Les documents doivent être fournis dans une structure de liste non ordonnée(ul/li). |

## Exemples

### Liens et documents

```html
<utd-consulter-aussi>
    <div slot="liens">
        <ul>
            <li><a href="/permis/renouveler">Renouveler un permis</a></li>
            <li><a href="/permis/remplacer">Remplacer un permis perdu</a></li>
        </ul>
    </div>
    <div slot="documents">
        <ul>
            <li><a href="/documents/guide-permis.pdf">Guide du demandeur (PDF, 1,2 Mo)</a></li>
        </ul>
    </div>
</utd-consulter-aussi>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/consulteraussi
