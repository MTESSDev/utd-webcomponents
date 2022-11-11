<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  onMount(() => {
  })

</script>

<h1>Menu d'ancres</h1>

<utd-menuancres id="exempleMenuAncres" selecteur="#main h2">
</utd-menuancres>

<h2>Description</h2>
<p>Menu d'ancres placé généralement au début d'une page. On le voit ici au début de la zone de contenu de la page "Dans cette page:". Il est généré à partir du selecteur css fourni.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h2>Exemple</h2>
<p>L'exemple contient le menu d'ancre contenu dans la présente page. Le sélecteur css obtient les balises <span class="utd-emphase-gris">h2</span> dans <span class="utd-emphase-gris">main</span>.</p>

<CodeSource idElementCodeSource="exempleMenuAncres" outerhtml="true">
</CodeSource>


<style>
</style>