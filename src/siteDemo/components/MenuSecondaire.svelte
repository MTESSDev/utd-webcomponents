<script>
  import { Utils } from '../../librairie/components/utils.js'
  
  export let titre = ""
  export let lang = "fr"
  export let srLabelMenu = ""

  let afficher = false

  const idMenu = Utils.genererId()
  const srTexteLabelMenu = srLabelMenu  
    ? srLabelMenu
    : lang === "fr"
    ? "Menu principal"
    : "Secondary menu"

  function toggleAfficher(){
    afficher = !afficher
  }

</script>
<div class="menu-secondaire" class:visible={afficher}>
  <button class="toggle" aria-haspopup="true" aria-expanded="{afficher}" aria-controls="{idMenu}" on:click={toggleAfficher}>
    <span>{titre}</span>
    <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    <span class="utd-sr-only">
        Appuyez sur la touche Échappe pour sortir du menu.
    </span>
  </button>
  <nav id={idMenu} class="menu" class:visible={afficher}  aria-label="{srTexteLabelMenu}">
    <slot name="contenu" />
  </nav>  
</div>


<style>
</style>

