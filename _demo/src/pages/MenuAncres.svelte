<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 

  let tableauParametres = [];

  onMount(() => {
      tableauParametres = obtenirTableauParametres();
  })

  function obtenirTableauParametres() {
      return [
          {nom: "titre", type: "String (Optionnel)", description: `Titre du menu d'ancre. Défaut "Dans cette page :", "On this page:"`},
          {nom: "selecteur", type: "String (Optionnel)", description: `Sélecteur css à utiliser pour obtenir/definir les ancres. Défaut ".ancre".`},
      ];
  }



</script>

<h1>Menu d'ancres</h1>

<utd-menu-ancres id="exempleMenuAncres" selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Menu d'ancres placé généralement au début d'une page. On le voit ici au début de la zone de contenu de la page "Dans cette page:". Il est généré à partir du selecteur css fourni.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2 id="exemple">Exemple</h2>
<p>L'exemple contient le menu d'ancre contenu dans la présente page. Le sélecteur css obtient les balises <span class="utd-emphase-gris">h2</span> dans <span class="utd-emphase-gris">main</span>.</p>

<CodeSource idElementCodeSource="exempleMenuAncres" outerhtml="true">
</CodeSource>


<style>
</style>