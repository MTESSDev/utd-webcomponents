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
  let controleMenu 
  let largeurConteneur = 0
  let largeurMenu = 0
  let menuOriginal = []
  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

//  test()
//  menuOriginal = thisComponent.cloneNode(true)

  ajouterElementsMenuAuMenuOriginal(menuOriginal, thisComponent)

/*  Array.from(thisComponent.children).forEach((child) => {
    const elementMenu = {
      libelle: child.getAttribute('libelle'),
      href: child.getAttribute('href')
    }

    menuOriginal.push(elementMenu)
  })*/
  

  onMount(() => {      
    controleMenu = thisComponent.shadowRoot.getElementById(idMenu)
    //test()

    setTimeout(() => {
      test()
      contientMenusNonVisibles()      
      console.log(menuOriginal)
    }, 1000)

    Utils.reafficherApresChargement(thisComponent)
  })

  function ajouterElementsMenuAuMenuOriginal(elementMenuItem, parent) {
    Array.from(parent.children).forEach((child) => {
      const elementMenu = {
        libelle: child.getAttribute('libelle'),
        href: child.getAttribute('href'),
        children : []
      }

      elementMenuItem.push(elementMenu)

      //
      if(child.childNodes.length) {
        ajouterElementsMenuAuMenuOriginal(elementMenu.children, child)
      }
    })
  }

  function toggleAfficher(){
    afficher = !afficher
  }

  function contientMenusNonVisibles(){
    largeurConteneur = thisComponent.getBoundingClientRect().width


    console.log('Largeur conteneur -> ' + largeurConteneur)
    console.log('Largeur menu -> ' + largeurMenu)

  }

  function test(){
    let menuVisible = true
    let i = 0
    let dernierIndexeVisible = 0

    largeurConteneur = thisComponent.getBoundingClientRect().right
    largeurMenu = thisComponent.children[thisComponent.children.length - 1].getBoundingClientRect().right

    console.log(largeurMenu)
    if(largeurMenu <= largeurConteneur) {
      console.log('Le menu fit, rien à faire!')
    }

    while (menuVisible && i <= thisComponent.children.length - 1) {
      const item = thisComponent.children[i]

//      largeurMenu += item.getBoundingClientRect().right
      console.log('indexe = ' + i + '    right = ' + item.getBoundingClientRect().right)
      if(item.getBoundingClientRect().right <= largeurConteneur){
        dernierIndexeVisible = i
        i++        
      } else {
        menuVisible = false
      }      
    }
//      return indexeDernierMenuVisible
    console.log(dernierIndexeVisible)
  }

  function test9(){
    const menuPlus = document.createElement('utd-menu-horizontal-item')
    menuPlus.setAttribute('libelle', 'Plus')
      
    thisComponent.childNodes.forEach(function(item){
      const cln = item.cloneNode(true);
//      menuPlus.appendChild(cln);
    })

//    thisComponent.appendChild(menuPlus)
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

