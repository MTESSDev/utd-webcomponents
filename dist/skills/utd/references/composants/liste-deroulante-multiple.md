# Liste déroulante multiple (`utd-liste-deroulante-multiple`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulantemultiple · Bundle : `utd-webcomponents.min.js`

Choix multiples affichés en étiquettes retirables, pour longues sélections.

Un `select multiple` dans `utd-liste-deroulante-multiple`, lui-même dans `utd-champ-form`. `recherchable` ajoute un champ de filtre.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `recherchable` | false | Indique s'il est possible d'effectuer une recherche dans les valeurs possibles de la liste. (Défaut : "false") |
| `recherche-floue` | true | Indique si la recherche doit être précise ou non, i.e. doit contenir exactement le terme recherché. Si la recherche est floue, un certain niveau d'erreur est permis (ex. une faute de frappe). (Défaut : "true") |
| `precision-recherche` | 0.2 | Précision de la recherche floue, entre 0 et 1. (Défaut : "0.2") |
| `largeur` | lg | Largeur de la liste. Valeurs possibles : `xs` (63px), `sm` (156px), `md` (249px), `lg` (528px), `xl` (825px). Si non spécifiée, la largeur "lg" est appliquée par défaut afin de laisser assez de place aux étiquettes de sélection. (Défaut : "lg") |
| `placeholder` | (calculé) | Texte affiché lorsqu'aucune option n'est sélectionnée. |
| `refresh` | false | Permet de rafraichir les options sélectionnées lorsque la valeur du select original est modifiée via du code (ex. un modèle vueJs ou du javascript vanille). À utiliser à chaque moment où la valeur est modifiée via du code. N'est pas nécessaire lors d'un modification effectuée par l'utilisateur. (Défaut : "false") |
| `focus` | false | Permet de donner le focus au contrôle. (Défaut : "false") |
| `regex-separateur-recherche` | (calculé) | Regex des séparateurs de recherche. (Regex par défaut : "[\p&lbrace;Z&rbrace;]+" qui correspond à tous les espaces.) |
| `mots-exclus-recherche` |  | Mots à exclure de la recherche. Chaque mot séparé par une virgule. (Défaut : "") |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait être que le contrôle "select" original, avec l'attribut "multiple". |

## Exemples

### Sélection multiple recherchable

```html
<utd-champ-form libelle="Régions">
    <utd-liste-deroulante-multiple recherchable="true">
        <select multiple>
            <option value="01">Bas-Saint-Laurent</option>
            <option value="03">Capitale-Nationale</option>
            <option value="06">Montréal</option>
        </select>
    </utd-liste-deroulante-multiple>
</utd-champ-form>
```

### Sélection par code et lecture des valeurs

```html
<utd-champ-form libelle="Provinces visitées">
    <utd-liste-deroulante-multiple id="listeProvinces" placeholder="Choisir une ou plusieurs provinces">
        <select id="provinces" multiple>
            <option value="AB">Alberta</option>
            <option value="QC">Québec</option>
            <option value="ON">Ontario</option>
        </select>
    </utd-liste-deroulante-multiple>
</utd-champ-form>
```

```js
const provinces = document.getElementById('provinces');
// Présélection par code : poser `selected`, puis `refresh`
['QC', 'ON'].forEach((code) => { provinces.querySelector(`option[value="${code}"]`).selected = true; });
document.getElementById('listeProvinces').setAttribute('refresh', 'true');

// Lecture des valeurs choisies par l'utilisateur
provinces.addEventListener('change', () => {
    const codes = [...provinces.selectedOptions].map((o) => o.value);
});
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulantemultiple
