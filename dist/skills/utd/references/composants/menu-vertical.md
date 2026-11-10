# Menu vertical (`utd-menu-vertical`, `utd-menu-vertical-item`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuvertical · Bundle : `utd-webcomponents.min.js`

Navigation latérale, deux niveaux.

Un item sans `href` porte un sous-menu. En SPA, mettre le lien du routeur dans chaque item et lier `path-courant` à la route.

## `utd-menu-vertical`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` | Menu secondaire / Secondary menu | Titre affiché au dessus du menu (si titre-visible="true") ou au lecteur écran seulement sinon. Défaut : "Menu secondaire" / "Secondary menu". |
| `titre-visible` | true | Indique si le titre du menu est affiché ou non. Défaut : "true" (titre visible). |
| `path-courant` | "" | À utiliser dans un contexte SPA (ex. Vue, Angular, etc.) afin d'indiquer les éléments actifs du menu. Indique la route de la page actuelle puisque l'url ne change pas vraiment. C'est ce path qui est utilisé lors de la définition des éléments actifs via leur attribut "href". Défaut : "". |

### Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que des composants `utd-menu-vertical-item`, **sauf dans un contexte SPA** (ex. Vue). Dans un contexte SPA, afin de faire fonctionner le routing correctement, il faut généralement insérer la balise contenant le lien de l'élément de menu (ex. <router-link to="/monChemin/maPage">Texte du lien</router-link> dans Vue). |

## `utd-menu-vertical-item`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `libelle` |  | Texte du lien associé à l'item de menu. Optionnel si contexte SPA car le texte de l'hyperlien de la slot par défaut sera utilisé. |
| `href` |  | Valeur de l'attribut "href" du lien dans l'item de menu. Ne doit pas être spécifié lorsque l'élément est un sous-menu. Optionnel si contexte SPA car le href de l'hyperlien de la slot par défaut sera utilisé. |

### Slots

| Slot | Description |
|---|---|
| (défaut) |  |

## Exemples

### Menu avec sous-menu

```html
<utd-menu-vertical titre="Composants" titre-visible="false">
    <utd-menu-vertical-item libelle="Accueil" href="/"></utd-menu-vertical-item>
    <utd-menu-vertical-item libelle="Formulaires">
        <utd-menu-vertical-item libelle="Champs texte" href="/formulaires/champs"></utd-menu-vertical-item>
        <utd-menu-vertical-item libelle="Listes" href="/formulaires/listes"></utd-menu-vertical-item>
    </utd-menu-vertical-item>
</utd-menu-vertical>
```

### SPA (Vue)

```html
<utd-menu-vertical titre="Composants" titre-visible="false" :path-courant="pathCourant">
    <utd-menu-vertical-item libelle="Accueil" href="/">
        <router-link to="/">Accueil</router-link>
    </utd-menu-vertical-item>
</utd-menu-vertical>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuvertical
