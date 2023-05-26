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
  let controleMenuItemPlus 
  let largeurConteneur = 0
  let largeurMenu = 0
  let menuOriginal = []
  let dernierIndexeVisible = 0
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

    setTimeout(() => {

      if(contientMenusNonVisibles()) {        
        ajouterMenuPlusTemporaire()
          setTimeout(() => {
            //On enlève 1, car notre menuPlus temporaire ne doit pas compter
            dernierIndexeVisible = obtenirDernierIndexeVisible() - 1          
            thisComponent.children[0].remove()
//            ajouterMenuPlus()

            masquerMenusExcedentaires()
//            console.log('dernier indexe visible -> ' + dernierIndexeVisible)          
            setTimeout(() => {
              Utils.reafficherApresChargement(thisComponent)              
            }, 200)
          },100)
      } else {
//        console.log('Le menu fit, rien à faire!')
//        ajouterMenuPlus()
        Utils.reafficherApresChargement(thisComponent)
      }

//      console.log(menuOriginal)
    })
  })

  function masquerMenusExcedentaires() {
    const menuPlus = document.createElement('utd-menu-horizontal-item')
    menuPlus.setAttribute('libelle', 'Plus')

    for (let i = dernierIndexeVisible + 1; i < thisComponent.children.length; i++) {
      const cln = thisComponent.children[i].cloneNode(true);
      menuPlus.appendChild(cln)            
      thisComponent.children[i].classList.add('utd-d-none')      
    }

    thisComponent.appendChild(menuPlus)    
  }

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

  function contientMenusNonVisibles() {

    largeurConteneur = thisComponent.getBoundingClientRect().right
    largeurMenu = thisComponent.children[thisComponent.children.length - 1].getBoundingClientRect().right

    //console.log(largeurMenu)
    return largeurMenu > largeurConteneur
  }

  function obtenirDernierIndexeVisible(){
    let menuVisible = true
    let i = 0
    let indexeDernierElementVisible = 0

    const menuPlus = thisComponent.children[thisComponent.children.length - 1]
    const largeurMenuPlus = menuPlus.getBoundingClientRect().right - menuPlus.getBoundingClientRect().left
//    console.log('Largeur menu plus -> ' + largeurMenuPlus)
    while (menuVisible && i <= thisComponent.children.length - 1) {
      const item = thisComponent.children[i]

      if((item.getBoundingClientRect().right + largeurMenuPlus) <= largeurConteneur){
        indexeDernierElementVisible = i
        i++        
      } else {
        menuVisible = false
      }      
    }

    return indexeDernierElementVisible   
  }

  function ajouterMenuPlusTemporaire(){
    const menuPlusTemp = document.createElement('utd-menu-horizontal-item')
    menuPlusTemp.setAttribute('libelle', 'Plus')

    const elementTemp = document.createElement('utd-menu-horizontal-item')
    elementTemp.setAttribute('libelle', 'Temporaire')
    menuPlusTemp.appendChild(elementTemp)

    thisComponent.prepend(menuPlusTemp)
    controleMenuItemPlus = menuPlusTemp
  }

  function ajouterMenuPlus(){
    const menuPlus = document.createElement('utd-menu-horizontal-item')
    menuPlus.setAttribute('libelle', 'Plus')
      
    thisComponent.childNodes.forEach(function(item){
      const cln = item.cloneNode(true);
      menuPlus.appendChild(cln);
    })

    thisComponent.appendChild(menuPlus)
    controleMenuItemPlus = menuPlus
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

