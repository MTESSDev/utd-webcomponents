# Intégrer UTD dans un framework

## Règles communes

- CSS et JS UTD vont dans le gabarit HTML racine (`index.html`, `app.html`, `_Layout.cshtml`), comme dans [installation.md](installation.md). Ne pas les importer dans le bundler (Vite, webpack) : le JS déduit le chemin du CSS et des images de son `<script src>`.
- Les balises `utd-*` sont des éléments personnalisés standards : les écrire telles quelles dans les gabarits. Ils se montent seuls, y compris quand le framework les ajoute plus tard.
- Valeurs d'attributs : toujours des chaînes (`"true"`, `"false"`, `"3"`). Une liaison dynamique doit produire une chaîne : `String(valeur)`.
- Événements UTD : camelCase, sans `bubbles`. Les écouter sur l'élément lui-même, données dans `event.detail`.
- Les champs natifs placés dans un composant (`<input>` dans `utd-champ-form`, `<select>` dans `utd-liste-deroulante`) restent dans le DOM de la page : `v-model`, `bind:value` et `asp-for` s'y appliquent normalement.
- Contenu injecté après le chargement : appeler `utd.tables.initialiserScrollTables(conteneur)` pour de nouveaux tableaux, `utd.ajusterAccessibiliteLiens(undefined, conteneur)` pour de nouveaux liens `target="_blank"`.

## HTML / JS natif

```html
<utd-accordeon id="accordeonAide" titre="Aide">
    <p>Contenu</p>
</utd-accordeon>
<script>
    document.getElementById('accordeonAide').addEventListener('changementEtat', (e) => {
        enregistrerEtat(e.detail.reduit);
    });
</script>
```

## Vue 3 (Vite)

`vite.config.js` : déclarer les balises `utd-*` comme éléments personnalisés.

```js
import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('utd-') } } })]
};
```

Vue transforme `@changementEtat` en écouteur de `changement-etat` : il ne reçoit jamais l'événement. Passer par une `ref` :

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const accordeon = ref(null);
const estReduit = ref(true);
const surChangementEtat = (e) => { estReduit.value = e.detail.reduit; };

onMounted(() => accordeon.value.addEventListener('changementEtat', surChangementEtat));
onUnmounted(() => accordeon.value?.removeEventListener('changementEtat', surChangementEtat));
</script>

<template>
    <utd-accordeon ref="accordeon" titre="Aide" :reduit="String(estReduit)">
        <p>Contenu</p>
    </utd-accordeon>
</template>
```

Les slots nommés s'écrivent avec l'attribut HTML natif `slot="nom"` (pas `v-slot` ni `<template #nom>`).

## Svelte

Aucune configuration. Svelte 5 : `on` + nom exact de l'événement, en respectant la casse.

```svelte
<utd-accordeon titre="Aide" onchangementEtat={(e) => (estReduit = e.detail.reduit)}>
    <p>Contenu</p>
</utd-accordeon>
```

Svelte 4 : `on:changementEtat={…}`.

## .NET (Razor, MVC, Blazor)

`_Layout.cshtml` : fichiers copiés dans `wwwroot/`, avec `asp-append-version` pour le cache.

```cshtml
<link rel="stylesheet" href="~/css/utd-webcomponents.min.css" asp-append-version="true" />
...
<script src="~/js/utd-webcomponents.min.js" asp-append-version="true"></script>
```

Razor omet un attribut dont la valeur est `false` et écrit `attr="attr"` pour `true` : convertir les booléens en chaînes.

```cshtml
<utd-accordeon titre="@Model.Titre" reduit="@(Model.EstReduit ? "true" : "false")">
    <p>@Model.Contenu</p>
</utd-accordeon>
```

Les champs liés au modèle (`asp-for`) se placent dans `utd-champ-form` comme un champ natif.
