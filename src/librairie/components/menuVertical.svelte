<svelte:options tag="utd-menu-vertical" />
<script>
  import { Utils } from '../../librairie/components/utils.js'

  export let titre = Utils.obtenirLanguePage() === 'en' ? 'Secondary menu' : 'Menu secondaire'
  export let titreVisible = "true"

  let afficher = false

  const idMenu = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const srTexteSortirMenu = Utils.obtenirLanguePage() === "en" ?  "Press ESC key to exit menu." : "Appuyez sur la touche Échappe pour sortir du menu."


  //TODO implémnenter gestion langue (aller chercher dans balise html? lang=?)
  
  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-navigation, https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role et https://usability.yale.edu/web-accessibility/articles/focus-keyboard-operability

  function toggleAfficher(){
    afficher = !afficher
  }
  
</script>
<nav class="utd-menu-vertical" class:visible={afficher} aria-labelledby="{idTitreMenu}">
  <a role="button" href="#{idMenu}" class="toggle" aria-controls="{idMenu}" on:click|preventDefault={toggleAfficher}>
    <span>{titre}</span>
    <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    <span class="utd-sr-only">
        {srTexteSortirMenu}
    </span>
  </a>

  <span class="titre {titreVisible === 'true' ? '' : 'utd-sr-only'}" id="{idTitreMenu}">{titre}</span>
  <div id={idMenu} role="menu" class="menu" class:visible={afficher}>
    <slot></slot>
  </div>  
</nav>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

