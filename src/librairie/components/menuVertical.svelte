<svelte:options tag="utd-menu-vertical" />
<script>
  import { Utils } from '../../librairie/components/utils.js'

  export let titre = lang === 'fr' ? 'Menu secondaire' : 'Secondary menu'
  export let lang = "fr"
  export let titrevisible = "true"

  let afficher = false

  const idMenu = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const srTexteSortirMenu = lang === "fr" ? "Appuyez sur la touche Échappe pour sortir du menu." : "Press ESC key to exit menu."


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

  <span class="titre {titrevisible === 'true' ? '' : 'utd-sr-only'}" id="{idTitreMenu}">{titre}</span>
  <div id={idMenu} role="menu" class="menu" class:visible={afficher}>
    <slot></slot>
  </div>  
</nav>
<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

