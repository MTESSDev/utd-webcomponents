# Fil d'Ariane

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/filariane

Chemin hiérarchique de la page : `utd.filAriane.definir`.

`utd.filAriane.definir` remplit `nav.utd-fil-ariane` (créé dans le `header` s'il est absent). Le dernier élément, sans `href`, est la page courante.

## Autres références

### utd.filAriane.definir — Paramètres

| Nom | Type | Description |
|---|---|---|
| `libelle` | String | Texte du lien associé au lien. |
| `href` | String (Optionnel) | Valeur de l'attribut "href" du lien. (Obligatoire pour tous les éléments sauf le dernier) |

## Exemples

### Fil d'Ariane

```html
<header>
    <!-- PIV, menu horizontal -->
    <div class="utd-container">
        <nav class="utd-fil-ariane"></nav>
    </div>
</header>
```

```js
utd.filAriane.definir([
    { libelle: 'Accueil', href: '/' },
    { libelle: 'Permis', href: '/permis' },
    { libelle: 'Renouveler un permis' }
]);
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/filariane
