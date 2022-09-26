<script>
  import { Utils } from '../../librairie/components/utils.js'
  import { onMount } from "svelte";

  export let titre = ""
  export let lang = "fr"
  export let srLabelMenu = ""

  let afficher = false

  const idMenu = Utils.genererId()
  const srTexteLabelMenu = srLabelMenu  
    ? srLabelMenu
    : lang === "fr"
    ? "Menu secondaire"
    : "Secondary menu"


  onMount(() => {
    console.log('mount menu secondaire')
  })

  function toggleAfficher(){
    afficher = !afficher
  }

</script>
<div class="menu-secondaire" class:visible={afficher}>
  <button type="button" class="toggle" aria-haspopup="true" aria-controls="{idMenu}" on:click={toggleAfficher}>
    <span>{titre}</span>
    <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    <span class="utd-sr-only">
        Appuyez sur la touche Échappe pour sortir du menu.
    </span>
  </button>
  <nav id={idMenu} class="utd-menu-vertical" class:visible={afficher} aria-label="{srTexteLabelMenu}">
    <div role="menubar">
      <slot name="contenu" />
    </div>    
  </nav>  
</div>


<style>
</style>

