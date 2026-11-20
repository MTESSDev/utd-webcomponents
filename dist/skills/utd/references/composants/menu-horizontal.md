# Menu horizontal (`utd-menu-horizontal`, `utd-menu-horizontal-item`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuhorizontal · Bundle : `utd-webcomponents.min.js`

Navigation principale d'application sous l'entête, deux niveaux.

Deux niveaux au plus : un item sans `href` porte un sous-menu. En SPA, mettre le lien du routeur dans chaque item (et dans le menu pour l'accueil) et lier `path-courant` à la route.

## `utd-menu-horizontal`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `titre` | Menu principal de navigation / Main navigation menu | Titre lu au lecteur écran seulement. Défaut : "Menu principal de navigation" / "Main navigation menu". |
| `afficher-icone-accueil` | false | Indique si le lien "accueil/home" (icône "maison") doit être affiché ou non. Défaut : false. |
| `titre-accueil` | Accueil / Home | Title de l'icône "maison" associé au lien "accueil" si affiché. Défaut : Accueil / Home. |
| `url-accueil` | / | Url vers laquelle le lien "accueil" doit rediriger. Défaut : "/". |
| `path-courant` | "" | À utiliser dans un contexte SPA (ex. Vue) afin d'indiquer les éléments actifs du menu. Indique la route de la page actuelle puisque l'url ne change pas vraiment. C'est ce path qui est utilisé lors de la définition des éléments actifs via leur attribut "href". Défaut : "". |

### Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que des composants `utd-menu-horizontal-item`, **sauf dans un contexte SPA** (ex. Vue), ou lorsque votre menu horizontal n'affiche que l'icône "Accueil" sans autre élément de menu. Dans un contexte SPA, afin de faire fonctionner le routing correctement pour la page d'accueil, il faut généralement insérer la balise contenant le lien vers la page d'accueil (ex. <router-link to="/maPageAccueil">Texte du lien</router-link> dans Vue). |

## `utd-menu-horizontal-item`

### Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `libelle` |  | Texte du lien associé à l'item de menu. Il est possible d'ajouter "<br/>" afin de forcer un saut de ligne dans le texte. |
| `href` |  | Valeur de l'attribut "href" du lien dans l'item de menu. |

### Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Ne devrait contenir que des composants `utd-menu-horizontal-item`, **sauf dans un contexte SPA** (ex. Vue). Dans un contexte SPA, afin de faire fonctionner le routing correctement, il faut généralement insérer la balise contenant le lien de l'élément de menu (ex. <router-link to="/monChemin/maPage">Texte du lien</router-link> dans Vue). |

## Exemples

### Menu à deux niveaux

```html
<utd-menu-horizontal afficher-icone-accueil="true">
    <utd-menu-horizontal-item libelle="Services" href="/services"></utd-menu-horizontal-item>
    <utd-menu-horizontal-item libelle="Programmes">
        <utd-menu-horizontal-item libelle="Aide financière" href="/programmes/aide"></utd-menu-horizontal-item>
        <utd-menu-horizontal-item libelle="Formation" href="/programmes/formation"></utd-menu-horizontal-item>
    </utd-menu-horizontal-item>
</utd-menu-horizontal>
```

### SPA (Vue)

```html
<utd-menu-horizontal afficher-icone-accueil="true" :path-courant="pathCourant">
    <router-link to="/">Accueil</router-link>
    <utd-menu-horizontal-item libelle="Services" href="/services">
        <router-link to="/services">Services</router-link>
    </utd-menu-horizontal-item>
</utd-menu-horizontal>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuhorizontal
