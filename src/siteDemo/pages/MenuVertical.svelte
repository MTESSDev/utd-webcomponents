<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  onMount(() => {
  })

</script>

<h1>Menu vertical</h1>

<utd-menuancres selecteurancres="#main h2">
</utd-menuancres>

<h2>Description</h2>
<p>Menu vertical à deux niveaux. Il est généré à partir de deux composants, soit <span class="utd-emphase-gris">utd-menu-vertical</span> et <span class="utd-emphase-gris">utd-menu-vertical-item</span>.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-vertical</span> contient l'ensemble du menu.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-vertical-item</span> correspond à un élément du menu et peut contenir d'autres composants <span class="utd-emphase-gris">utd-menu-vertical-item</span> (menu/sous-menu).</p>
<p>Pour le moment seuls deux niveaux sont supportés.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h2>Exemple</h2>
<p>L'exemple contient le menu vertical du présent site de démonstration.</p>

<CodeSource idElementCodeSource="menuVertical" outerhtml="true">
</CodeSource>


<style>
</style>