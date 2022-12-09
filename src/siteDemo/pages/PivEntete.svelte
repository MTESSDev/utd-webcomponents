<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let tableauParametres = [];
  let tableauSlots = [];

  onMount(() => {
      tableauParametres = obtenirTableauParametres()
      tableauSlots = obtenirTableauSlots()
  })

  function obtenirTableauParametres() {
      return [
        {nom: "titre-site1", type: "String (Obligatoire)", description: `Texte ligne 1 pour le nom du site ou de service.`},
        {nom: "titre-site2", type: "String (Optionnel)", description: `Texte ligne 2 pour le nom du site ou de service.`},
        {nom: "url-titre-site", type: "String (Obligatoire)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur la zone de titre du site ou de service.`},
        {nom: "src-logo", type: "String (Optionnel)", description: `Source (attribut "src") du logo. Défaut logo du gouvernement du québec "/images/utd-sprite.svg#QUEBEC_blanc" inclu avec les composants utd.`},
        {nom: "url-logo", type: "String (Optionnel)", description: `Url du logo. Défaut : "/".`},
        {nom: "alt-logo", type: "String (Optionnel)", description: `Texte alternatif du logo. Défaut : "Signature du gouvernement du Québec." / "Québec government signature".`},
        {nom: "url-langue-alternative", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Si non spécifié, le lien n'est pas affiché.`},     
        {nom: "texte-langue-alternative", type: "String (Optionnel)", description: `Texte du lien de langue alternative. Défaut "Français" / "English".`},     
        {nom: "url-nous-joindre", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Si non spécifié, le lien n'est pas affiché.`},     
        {nom: "texte-nous-joindre", type: "String (Optionnel)", description: `Texte du lien "Nous joindre". Défaut "Nous joindre" / "Contact us".`},     
        {nom: "passer-contenu", type: "Boolean (Optionnel)", description: `Indique si le lien "Passer au contenu" est intégré ou non. Défaut "true".`},     
        {nom: "url-passer-contenu", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Devrait être une ancre de la page. Défaut "#main".`},     
        {nom: "texte-passer-contenu", type: "String (Optionnel)", description: `Texte du lien. Défaut "Passer au contenu" / "Skip to content".`}        
      ]
  }

  function obtenirTableauSlots() {
      return [
        {nom: "boutonRecherche", description: `<p>Contenu html à insérer dans la zone prévue pour le bouton de recherche. Normalement un lien ou un bouton avec une loupe.</p>`},
        {nom: "boutonRechercheMobile", description: `<p>Contenu html à insérer dans la zone prévue pour le bouton de recherche en mode mobile. Normalement un lien ou un bouton avec une loupe.</p>`},
        {nom: "zoneRecherche", description: `<p>Contenu html à insérer dans la zone prévue pour la zone de recherche. Normalement une boîte de texte avec autocomplétion ou un bouton qui lance la recherche. Peut aussi contenir un contrôle permettant d'afficher les résultats de recherche.</p>`}            
      ]
  }
</script>

<h1>PIV entête</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>PIV d'entête gouvernemental. Il inclu le lien "Passer au contenu" (possible de ne pas le générer au besoin).</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible. <a href="https://xd.adobe.com/view/b098e26e-f500-4d59-b2cb-48ef475bbab3-e5cb/screen/130e1bf9-39c8-454f-bd97-f076a698361a/specs/" target="_blank">Voir les spécifications sur le XD de design Quebec.ca</a>.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Nous avons 2 lignes potentielles pour le titre du site ou du service. La font de ces 2 lignes est "Roboto-Medium" au lieu de "Roboto-Regular". La spécification Québec.ca ne nous semble pas assez visible.</p>
<p>Notre espacement les liens "Nous joindre" et "langue alternative" est plus grand. La spécification Québec.ca nous semble trop rapprochée.</p>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h2>Exemple</h2>
<p>L'exemple contient le piv d'entête du présent site de démonstration.</p>

<CodeSource idElementCodeSource="pivEntete" outerhtml="true">
</CodeSource>


<style>
</style>