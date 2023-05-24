<svelte:options tag="utd-menu-horizontal" />
<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal"  

  export let titre = Utils.obtenirLanguePage() === 'en' ? 'Main navigation menu' : 'Menu principal de navigation'
  export let largeurViewportMenuBurger = 475
  export let afficherIconeAccueil = 'false'
  export let urlAccueil = '/'

  let afficher = false

  const idMenu = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const srTexteSortirMenu = Utils.obtenirLanguePage() === "en" ?  "Press ESC key to exit menu." : "Appuyez sur la touche Échappe pour sortir du menu."
  const texteMenuPlus = Utils.obtenirLanguePage() === "en" ?  "More" : "Plus"
  const texteSrMenuPlus = Utils.obtenirLanguePage() === "en" ?  ". Show remaining menu items." : ". Afficher les éléments de menu restants."
  const texteMenuBurger = Utils.obtenirLanguePage() === "en" ?  "Menu" : "Menu"
  const thisComponent = get_current_component()
  let controleMenu
  let controleMenuItemPlus 
  let largeurConteneur = 0
  let largeurMenu = 0
  let largeurViewport = 0
  let menuOriginal = []
  let dernierIndexeVisible = 0
  let accueilActif = false

  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/


  ajouterElementsMenuAuMenuOriginal(menuOriginal, thisComponent)

  largeurViewport = window.innerWidth

  onMount(() => {      
    controleMenu = thisComponent.shadowRoot.getElementById(idMenu)
    ajusterAffichageControle()
    window.addEventListener("resize", ecranRedimensionneDebounced)
    window.addEventListener("resize", () => {thisComponent.classList.add('ajustement-en-cours')})
  })

  const ecranRedimensionneDebounced = Utils.debounce(() => ajusterAffichageControle(), 100)

  function ajusterAffichageControle() {
    largeurViewport = window.innerWidth
    thisComponent.classList.add('ajustement-en-cours')
    console.log('ajusterAffichageControle')
    supprimerMenuPlus()
    afficherTousMenusNiveau1()

    //TODO fermer tous les menus
    //TODO css du plus (active)
    //TODO navigation au clavier comme w3c
    
    setTimeout(() => {

      if(estAffichageMenuBurger()) {
        setTimeout(() => {
          dernierIndexeVisible = -1          
          masquerMenusExcedentaires()

          setTimeout(() => {
            thisComponent.classList.remove('ajustement-en-cours')
            Utils.reafficherApresChargement(thisComponent)                 
          }, 100)
        })
      } else {
        if(contientMenusNonVisibles()) {        
          ajouterMenuPlusTemporaire()
          setTimeout(() => {
            //On enlève 1, car notre menuPlus temporaire ne doit pas compter
            dernierIndexeVisible = obtenirDernierIndexeVisible() - 1          
            thisComponent.children[0].remove()
            masquerMenusExcedentaires()

  //            console.log('dernier indexe visible -> ' + dernierIndexeVisible)          
            setTimeout(() => {
              thisComponent.classList.remove('ajustement-en-cours')
              Utils.reafficherApresChargement(thisComponent)                 
            }, 100)
          })
        } else {
//        console.log('Le menu fit, rien à faire!')
        thisComponent.classList.remove('ajustement-en-cours')
        Utils.reafficherApresChargement(thisComponent)
        }

      } 
//      console.log(menuOriginal)
    })
  }
  function supprimerMenuPlus() {
      const menuPlus = thisComponent.querySelector('utd-menu-horizontal-item[est-menu-plus]')
      if(menuPlus) {
        menuPlus.remove()
      }
  }

  function afficherTousMenusNiveau1() {
    const menus = thisComponent.querySelectorAll('utd-menu-horizontal-item.utd-d-none')
    menus.forEach((menu) => {
      menu.classList.remove('utd-d-none')
    })
  }

  function masquerMenusExcedentaires() {
    const estMenuBurger = estAffichageMenuBurger()    

    const menuPlus = document.createElement('utd-menu-horizontal-item')
    menuPlus.setAttribute('libelle', estMenuBurger ? texteMenuBurger : texteMenuPlus)
    menuPlus.setAttribute('sr-libelle', texteSrMenuPlus)
    menuPlus.setAttribute('est-menu-plus', 'true')

    if(estMenuBurger){
      menuPlus.setAttribute('est-menu-burger', 'true')
    }

    for (let i = dernierIndexeVisible + 1; i < thisComponent.children.length; i++) {
      const cln = thisComponent.children[i].cloneNode(true);
      cln.setAttribute('est-menu-plus', 'true')

      if(estMenuBurger){
        cln.setAttribute('est-menu-burger', 'true')
      }


      if(i === thisComponent.children.length - 1) {
        cln.setAttribute('est-dernier','true')
      }

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
      return largeurMenu > largeurConteneur
  }

  function estAffichageMenuBurger() {
    return largeurViewport <= largeurViewportMenuBurger
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
    menuPlusTemp.setAttribute('libelle', texteMenuPlus)

    const elementTemp = document.createElement('utd-menu-horizontal-item')
    elementTemp.setAttribute('libelle', 'Temporaire')
    menuPlusTemp.appendChild(elementTemp)

    thisComponent.prepend(menuPlusTemp)
    controleMenuItemPlus = menuPlusTemp
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
    <div class="utd-menu-horizontal-item niv1 accueil {accueilActif ? ' active' : ''}" role="listitem">
      {#if afficherIconeAccueil === 'true'}    
        <a href="{urlAccueil}">
          <span aria-hidden="true" class="utd-icone-svg maison"/>
        </a>
        <span class="bordure-bas"></span>
      {/if}
    </div>
    <slot></slot>
  </div>  
</nav>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

