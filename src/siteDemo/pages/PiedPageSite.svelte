<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let tableauSlots = [];

  onMount(() => {
      tableauSlots = obtenirTableauSlots();
  })

  function obtenirTableauSlots() {
      return [
        {nom: "contenu", description: `<p>Contenu html à insérer dans la zone pied de page de site. Devrait contenir des éléments "nav" contenant des listes de liens. Ne pas oublier les headers (visibles ou non) permettant d'identifier les groupes de liens et d'y accéder rapidement au clavier.</p>`}
      ]
  }
</script>

<h1>Pied de page de site</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Pied de page de site contenant des liens qui sont complémentaires à la navigation, par exemple des liens vers des sections de contenu importantes, ainsi que les liens vers les médias sociaux.</p>
<p>Il s'agit essentiellement d'un conteneur avec fond bleu positionné au bon endroit, avec les bons padding/marges. Les liens auront déjà le bon style, cependant puisqu'il n'y a pas de norme sur le contenu de cette zone, le reste vous appartient (ex. Affichage en ligne, ou en colonne, regroupements, etc.)</p>

<h3>Référence système de design Quebec.ca</h3>
<p><a href="https://xd.adobe.com/view/b098e26e-f500-4d59-b2cb-48ef475bbab3-e5cb/screen/130e1bf9-39c8-454f-bd97-f076a698361a/specs/" target="_blank">Voir les spécifications sur le XD de design Quebec.ca</a>.</p>

<h2>Attributs disponibles</h2>
Aucun.

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h2>Exemple</h2>
<p>L'exemple contient le pied de page de site intégré uniquement dans la page courante à titre d'exemple.</p>

<CodeSource idElementCodeSource="piedPageSite" outerhtml="true">
</CodeSource>

<style>
</style>