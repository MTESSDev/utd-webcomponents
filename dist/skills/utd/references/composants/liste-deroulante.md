# Liste déroulante (`utd-liste-deroulante`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulante · Bundle : `utd-webcomponents.min.js`

Habillage d'un `select` : choix unique, multiple ou avec recherche.

Un `select` dans `utd-liste-deroulante`, lui-même dans `utd-champ-form`. `multiple` sur le `select` pour la sélection multiple ; `recherchable="true"` pour une boîte combinée. L'erreur se gère sur le `utd-champ-form` (`obligatoire` n'affiche que l'astérisque).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `recherchable` | false | Indique s'il est possible d'effectuer une recherche dans les valeurs possibles de la liste. (Défaut : "false") |
| `recherche-floue` | true | Indique si la recherche doit être précise ou non, i.e. doit contenir exactement le terme recherché. Si la recherche est floue, un certain niveau d'erreur est permis (ex. une faute de frappe). (Défaut : "true") |
| `largeur` | md | Largeur de la liste. Valeurs possibles : `xs` (63px), `sm` (156px), `md` (249px), `lg` (528px), `xl` (825px). Si non spécifiée ou "md", la largeur est calculée automatiquement selon le contenu (minimum "md"). Toute autre valeur spécifiée est appliquée telle quelle, sans calcul. (Défaut : "md") |
| `refresh` | false | Permet de rafraichir les options sélectionnées lorsque la valeur du select original est modifiée via du code (ex. un modèle vueJs ou du javascript vanille). À utiliser à chaque moment où la valeur est modifiée via du code. N'est pas nécessaire lors d'un modification effectuée par l'utilisateur. (Défaut : "false") |
| `focus` | false | Permet de donner le focus au contrôle. (Défaut : "false") |
| `regex-separateur-recherche` | (calculé) | Regex des séparateurs de recherche. (Regex par défaut : "[\p&lbrace;Z&rbrace;]+" qui correspond à tous les espaces.) |
| `mots-exclus-recherche` |  | Mots à exclure de la recherche. Chaque mot séparé par une virgule. (Défaut : "") |
| `chargement-en-cours` | false | Indique que les options sont en cours de chargement. Utile pour le chargement asychrone des options dans les listes. (Défaut : "false") |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait être que le contrôle "select" original. |

## Exemples

### Sélection recherchable avec validation

```html
<utd-champ-form id="champMinistere" libelle="Ministère" obligatoire="true" message-erreur="Le champ « Ministère » est obligatoire.">
    <utd-liste-deroulante recherchable="true">
        <select id="ministere">
            <option value="MESS">Ministère de l'Emploi et de la Solidarité sociale</option>
            <option value="MSSS">Ministère de la Santé et des Services sociaux</option>
        </select>
    </utd-liste-deroulante>
</utd-champ-form>
```

```js
const ministere = document.getElementById('ministere');
const valider = () => document.getElementById('champMinistere').setAttribute('invalide', ministere.value === '' ? 'true' : 'false');
ministere.addEventListener('blur', valider);
ministere.addEventListener('change', valider);
```

### Valeur modifiée par code

```js
ministere.value = 'MSSS';
ministere.closest('utd-liste-deroulante').setAttribute('refresh', 'true');
```

### Options chargées de façon asynchrone

```html
<utd-champ-form libelle="Province">
    <utd-liste-deroulante id="listeProvince" chargement-en-cours="true">
        <select id="province"></select>
    </utd-liste-deroulante>
</utd-champ-form>
```

```js
const provinces = await obtenirProvinces(); // [{ code: 'QC', nom: 'Québec' }, …]
const select = document.getElementById('province');
provinces.forEach((p) => select.add(new Option(p.nom, p.code)));
document.getElementById('listeProvince').removeAttribute('chargement-en-cours');
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulante
