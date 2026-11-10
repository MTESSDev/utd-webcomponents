# Champs texte et autres (`utd-champ-form`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/champstexte · Bundle : `utd-webcomponents.min.js`

Enveloppe de tout champ : libellé, précision, obligatoire, erreur, ARIA.

Envelopper chaque champ dans `utd-champ-form` : le composant pose `for`, `aria-required`, `aria-describedby` et `aria-invalid`. La validation reste à l'application : basculer `invalide`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `format` | xl | Taille du champ. Valeurs possibles : `sm`, `md`, `lg`, `xl`, `xxl`. Défaut `xl`. Pour les cases à cocher et boutons radios, la variante de format possible est : `compact`. Pour les commutateurs, la variante de format a utiliser est : `commutateur`. |
| `obligatoire` | false | Indique si le champ est obligatoire ou non. |
| `libelle` |  | Libellé du champ. S'il est défini, il remplace le texte du `label` fourni dans le composant ; tout autre balisage de ce label est perdu. Pour un label riche, ne pas définir `libelle`. |
| `precision` |  | Précision du champ. |
| `invalide` | false | Indique si la valeur du champ est invalide ou non. Si invalide le message d'erreur est affiché et le visuel d'erreur est appliqué. |
| `message-erreur` |  | Le message d'erreur à afficher (visible uniquement si invalide="true"). |
| `bloquer-coller` | false | Empêche le collage dans le champ (utile pour un champ de confirmation de courriel). À ne pas utiliser sur un mot de passe ni sur un code reçu : le collage doit rester permis (gestionnaires de mots de passe, WCAG 3.3.8). L’attribut natif `autocomplete` du champ est respecté. |
| `max-caracteres` | 0 | Ajoute un compteur de caractères au champ. La limite correspondra au nombre spécifié. Pour des raisons d'accessibilité on ne bloque jamais la saisie. Il s'agit en fait d'un texte informatif indiquant le nombre de caractères maximum/restant/en trop afin d'aider l'utilisateur. C'est le rôle des validations de signaler une erreur sur le champ et d'empêcher la soumission des données le cas échéant. Le compteur se met à jour automatiquement lorsque la valeur est modifiée par code via la propriété `value` de l'élément. Utiliser la valeur `refresh` uniquement dans les cas non couverts par cette détection automatique (ex. champ simplement réaffiché après avoir été caché, sans changement de valeur). Applicable uniquement au type de champ "textarea". |
| `hauteur-automatique` | false | Indique si la hauteur du champ est définie automatiquement selon son contenu. La hauteur se recalcule automatiquement lorsque la valeur est modifiée par code via la propriété `value` de l'élément. Utiliser la valeur `refresh` uniquement dans les cas non couverts par cette détection automatique (ex. champ simplement réaffiché après avoir été caché, sans changement de valeur). Applicable uniquement au type de champ "textarea". |
| `reinitialisable` |  | Indique si un bouton « X » permettant de vider le champ est disponible. Le bouton n'est pas affiché par défaut. Utiliser `true` pour l'activer. Le bouton n'est visible que lorsque le champ contient une valeur. Applicable uniquement aux champs de type input "url" pour le moment. |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que le contrôle original (ex. un <input> et optionnellement si vous voulez gérer manuellement vos erreurs, un élément html contenant le message d'erreur (généralement un <span>). |

## Exemples

### Champ obligatoire validé au blur

```html
<utd-champ-form id="champTelephone" libelle="Téléphone" format="md" obligatoire="true" invalide="false" precision="Exemple : 418 555-1234" message-erreur="Le champ « Téléphone » est obligatoire.">
    <input type="tel" autocomplete="tel">
</utd-champ-form>
```

```js
const champ = document.getElementById('champTelephone');
champ.querySelector('input').addEventListener('blur', (e) => {
    champ.setAttribute('invalide', e.target.value === '' ? 'true' : 'false');
});
```

### Zone de texte limitée

```html
<utd-champ-form libelle="Commentaire" max-caracteres="500" hauteur-automatique="true">
    <textarea rows="3"></textarea>
</utd-champ-form>
```

### Erreur posée après validation serveur

```html
<utd-champ-form id="champNas" libelle="Numéro d'assurance sociale" format="sm" obligatoire="true">
    <input type="text" inputmode="numeric" autocomplete="off">
</utd-champ-form>
```

```js
const champNas = document.getElementById('champNas');
async function soumettre() {
    const erreurs = await validerAuServeur();
    champNas.setAttribute('message-erreur', erreurs.nas ?? '');
    champNas.setAttribute('invalide', erreurs.nas ? 'true' : 'false');
}
```

### Confirmation de courriel sans collage et URL réinitialisable

```html
<utd-champ-form libelle="Courriel" format="md">
    <input type="email" autocomplete="email">
</utd-champ-form>
<utd-champ-form libelle="Confirmation du courriel" format="md" bloquer-coller="true">
    <input type="email" autocomplete="off">
</utd-champ-form>
<utd-champ-form libelle="Site Web" reinitialisable="true">
    <input type="url">
</utd-champ-form>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/champstexte
