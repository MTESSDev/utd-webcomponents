# Boutons

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/boutons

Classes `utd-btn` : primaire, secondaire, tertiaire, avertissement ; compact, icône.

- Type (un seul) : `utd-btn` + `primaire`, `secondaire`, `tertiaire` ou `avertissement`.
- Modificateurs : `compact`, `arrondi`, `comme-lien` (tertiaire seulement).
- Icône et texte : `avec-icone-gauche` ; icône seule : `avec-icone` avec un `title` (sites internes seulement).
- Navigation : `navigation` + `precedent`, `suivant` ou `retour`, avec un `span.utd-icone-svg`.
- Zone de boutons : conteneur `utd-zone-boutons` (boutons seulement) ; empilés en mobile, primaire en premier.
- Téléversement : classe `utd` sur `input type="file"`, avec un `label` ou un `aria-label`.

## Exemples

### Boutons

```html
<div class="utd-zone-boutons">
    <button type="button" class="utd-btn secondaire">Annuler</button>
    <button type="submit" class="utd-btn primaire">Envoyer</button>
</div>

<button type="button" class="utd-btn tertiaire avec-icone-gauche">
    <span class="utd-icone-ms" aria-hidden="true">print</span>
    <span>Imprimer</span>
</button>

<button type="button" class="utd-btn primaire navigation suivant">
    <span>Suivant</span>
    <span class="utd-icone-svg" aria-hidden="true"></span>
</button>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/boutons
