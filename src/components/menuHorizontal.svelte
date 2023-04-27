<svelte:options tag="utd-menu-horizontal" />
<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal"  

  export let titre = Utils.obtenirLanguePage() === 'en' ? 'Main navigation menu' : 'Menu principal de navigation'

  let afficher = false

  const idMenu = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const srTexteSortirMenu = Utils.obtenirLanguePage() === "en" ?  "Press ESC key to exit menu." : "Appuyez sur la touche Échappe pour sortir du menu."
  const thisComponent = get_current_component()
 
  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/


  onMount(() => {      
    Utils.reafficherApresChargement(thisComponent)
  })


  function toggleAfficher(){
    afficher = !afficher
  }

  
</script>
<h2 id="{idTitreMenu}" class="utd-sr-only">{titre}</h2>

<nav class="utd-menu-horizontal" class:visible={afficher} aria-labelledby="{idTitreMenu}">
  <a role="button" href="#{idMenu}" class="toggle utd-d-none" aria-controls="{idMenu}" on:click|preventDefault={toggleAfficher}>
    <span aria-hidden="true" class="utd-icone-svg chevron-blanc"/>
    <span class="utd-sr-only">
        {srTexteSortirMenu}
    </span>
  </a>

  <div id={idMenu} role="list" class="menu" class:visible={afficher}>
    <slot></slot>
  </div>  
</nav>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

