# Bloc de liens (`utd-bloc-liens`, `utd-bloc-liens-conteneur`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/blocliens · Bundle : `utd-webcomponents.min.js`

Sujet (titre, description) avec liens rapides et « Voir plus », en grille.

## `utd-bloc-liens`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` |  | Titre du bloc. Il est présenté sous forme de lien. |
| `description` |  | Texte de description du bloc. |
| `href` |  | URL de destination du titre. |
| `type` | interne | Type de lien du titre. Valeurs possibles : `interne` et `externe`. Un lien externe s'ouvre dans une nouvelle fenêtre. Défaut "interne". |
| `tag-titre` | h2 | Balise html à utiliser pour le titre. Valeurs possibles : `h1` à `h6`. Défaut "h2". |

### Slots

| Slot | Description |
|---|---|
| `liens` | Liste non ordonnée (ul/li) de liens rapides (5 maximum). Des liens (a) fournis directement sont aussi acceptés. |
| `voir-plus` | Html pour le lien « Voir plus » (a). |
| (défaut) | Lien (a) à utiliser pour la navigation du titre dans une SPA. Il est masqué et son clic est déclenché au clic sur le titre. |

## `utd-bloc-liens-conteneur`

Même composant que `utd-tuile-conteneur`, sous un autre nom : attributs dans [tuile.md](tuile.md).

## Accessibilité

- Choisir `tag-titre` selon la hiérarchie des titres de la page.

- Donner un `sr-titre` au conteneur s'il n'est pas précédé d'un titre visible.

- Fournir les liens rapides dans une liste `ul/li`.

- Compléter chaque « Voir plus » par le titre du bloc en texte masqué (`utd-sr-only`).

## Exemples

### Blocs de liens dans un conteneur

```html
<utd-bloc-liens-conteneur sr-titre="Sujets populaires">
    <utd-bloc-liens titre="Obligations périodiques" description="Produire vos déclarations et vos paiements selon votre calendrier." href="/obligations">
        <ul slot="liens">
            <li><a href="/obligations/declarations">Déclarations</a></li>
            <li><a href="/obligations/paiements">Paiements</a></li>
        </ul>
        <a slot="voir-plus" href="/obligations">Voir plus<span class="utd-sr-only">. Obligations périodiques</span></a>
    </utd-bloc-liens>
    <utd-bloc-liens titre="Embaucher un employé" description="Connaître vos obligations comme employeur." href="https://www.quebec.ca/emploi" type="externe">
    </utd-bloc-liens>
</utd-bloc-liens-conteneur>
```

### Dans une SPA (Vue) : lien de routing du titre dans le slot par défaut, sans `href`

```vue
<utd-bloc-liens-conteneur sr-titre="Sujets populaires">
    <utd-bloc-liens titre="Obligations périodiques" description="Produire vos déclarations et vos paiements.">
        <router-link to="/obligations">Obligations périodiques</router-link>
        <ul slot="liens">
            <li><router-link to="/obligations/declarations">Déclarations</router-link></li>
            <li><router-link to="/obligations/paiements">Paiements</router-link></li>
        </ul>
        <router-link slot="voir-plus" to="/obligations">Voir plus<span class="utd-sr-only">. Obligations périodiques</span></router-link>
    </utd-bloc-liens>
</utd-bloc-liens-conteneur>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/blocliens
