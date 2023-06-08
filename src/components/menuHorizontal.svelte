<svelte:options tag="utd-menu-horizontal" />
<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal"  

  const languePage = Utils.obtenirLanguePage()

  export let titre = languePage === 'en' ? 'Main navigation menu' : 'Menu principal de navigation'
  export let largeurViewportMenuBurger = 475
  export let afficherIconeAccueil = 'false'
  export let titreAccueil = languePage === 'en' ? 'Home' : 'Accueil'
  export let urlAccueil = '/'

  /* Paramètre non diffusé pour le moment. À voir si on veut aller vers là */
  export let gererElementsActifs = 'true' // 


  let afficher = false

  const idMenu = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const texteMenuPlus = languePage === "en" ?  "More" : "Plus"
  const texteSrMenuPlus = languePage === "en" ?  ". Show remaining menu items." : ". Afficher les éléments de menu restants."
  const texteMenuBurger = languePage === "en" ?  "Menu" : "Menu"
  const thisComponent = get_current_component()
  let controleMenu
  let largeurConteneur = 0
  let largeurMenu = 0
  let largeurViewport = 0
  let largeurMinimaleSousMenu = 200
  let menuOriginal = []
  let dernierIndexeVisible = 0
  let estTestBackstopJsEnCours = false

  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

  //TODO éventuellement ajouter un event pour forcer la redéfinition des éléments actifs

  //ajouterElementsMenuAuMenuOriginal(menuOriginal, thisComponent)


  onMount(() => {      

    estTestBackstopJsEnCours = window.location.hash.indexOf('bs-test') >= 0

    // Événement nécessaire pour IOS... Car pour lui l'événement blur de l'élément de menu n'est pas exécuté. Permet de s'assurer que lorsque le menu perd le focus, tous les menus sont fermés.
    // À noter que sur un click d'un élément de menu on stop la propagation du click (notre événement ici n'est donc pas exécuté)
    document.body.addEventListener('click', () => {
      fermerTousMenus()      
    })

    controleMenu = thisComponent.shadowRoot.getElementById(idMenu)
        
    if(afficherIconeAccueil === 'true') {
      ajouterElementMenuAccueil()
    }

    if(gererElementsActifs === 'true') {
      definirElementsActifs()
    }
  
    ajusterAffichageControle()

    window.addEventListener("resize", ecranRedimensionneDebounced)
    window.addEventListener("resize", () => {indiquerAjustementEnCours()})    

    //Particularité lors des essais avec BackstopJs. On doit forcer un réajustement de l'affichage.
    if(estTestBackstopJsEnCours) {
      setTimeout(() => {
        ajusterAffichageControle()
      }, 500);
    }
  })

  // Ajout du traitement au resize de l'interface s'il n'y a pas d'essais backstopJs en cours (sinon le screenshot se prend pendant le resize et on n'a pas le menu dans l'affichage)    
  const ecranRedimensionneDebounced = Utils.debounce(() => {ajusterAffichageControle()}, 200)


  function fermerTousMenus() {
    document.querySelectorAll('utd-menu-horizontal-item[afficher="true"]').forEach((elementMenu) => {
      elementMenu.setAttribute('afficher', 'false')
    })
  }

  function estLargeurConteneurModifiee() {
    return estTestBackstopJsEnCours || largeurViewport !== document.body.offsetWidth
  }

  function indiquerAjustementEnCours() {
    // Si un test backstopJs ou si la largeur du conteneur n'a pas changé on ne fait rien (ex. dans IOS, un resize est lancé au scroll... on veut éviter ça.)
    // et si un test backstopJs est en cours, on ne fait rien car il semble y avoir un resize et le screenshot se prend pendant le resize et on n'a pas le menu dans l'affichage
    if(!estTestBackstopJsEnCours && estLargeurConteneurModifiee()){
      thisComponent.classList.add('ajustement-en-cours')
    }
  }

  function ajusterAffichageControle() {

    // Si la largeur du conteneur n'a pas changé on ne fait rien (ex. dans IOS, un resize est lancé au scroll... on veut éviter ça.)
    if(!estLargeurConteneurModifiee()){
      return
    }

    largeurViewport = document.body.offsetWidth
    thisComponent.classList.add('ajustement-en-cours')

    supprimerMenuPlus()
    afficherTousMenusNiveau1()

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
      } 
      else {
        if(contientMenusNonVisibles()) {        
          ajouterMenuPlusTemporaire()
          
          setTimeout(() => {
            //On enlève 1, car notre menuPlus temporaire ne doit pas compter
            dernierIndexeVisible = obtenirDernierIndexeVisible() - 1          
            
            //Retrait du menu Plus temporaire
            thisComponent.children[0].remove()

            masquerMenusExcedentaires()

            setTimeout(() => {
              determinerOuvertureGaucheDernierMenuNiveau1()
              thisComponent.classList.remove('ajustement-en-cours')
              Utils.reafficherApresChargement(thisComponent)              
            }, 100)
          }, 100)
        } else {
            // Le menu fit, rien à faire!
            determinerOuvertureGaucheDernierMenuNiveau1()

            thisComponent.classList.remove('ajustement-en-cours')
            Utils.reafficherApresChargement(thisComponent)
        }
      } 
    })
  }

  function determinerOuvertureGaucheDernierMenuNiveau1() {
    // Vérifier si sous menu dernier élément sera pleinement visible (gauche + largeurMinimaleSousMenu), sinon lui ajouter une classe pour qu'il ouvre à gauche...
    const dernierMenuNiveau1 = thisComponent.querySelector(':scope > utd-menu-horizontal-item:last-child')
    if(dernierMenuNiveau1) {
      const positionDroite = dernierMenuNiveau1.getBoundingClientRect().left + largeurMinimaleSousMenu

      if(positionDroite > largeurViewport) {
        dernierMenuNiveau1.setAttribute('est-ouverture-gauche', 'true')
      } else {
        reinitialiserOuvertureGaucheMenu(dernierMenuNiveau1)
      }
    }    
  }

  function reinitialiserOuvertureGaucheMenu(element) {
    element.removeAttribute('est-ouverture-gauche')
  }

  
  function definirElementsActifs() {
    
    const itemsMenu = document.querySelectorAll('utd-menu-horizontal-item')
    let elementActif

    for (let i = 0; i < itemsMenu.length; i++) {
      const itemMenu = itemsMenu[i]
      const href = itemMenu.getAttribute('href')
      
      if(href) {    
        if(window.location.pathname === href) {
          elementActif = itemMenu
          break
        } else if(window.location.pathname.startsWith(href)) { 
          elementActif = itemMenu
        }
      }    
    }  

    if(elementActif) {
      const parents = Utils.obtenirParents(elementActif)
      
      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        if(parent.tagName === 'UTD-MENU-HORIZONTAL-ITEM') {
          parent.setAttribute('actif', 'true')
        } else if (parent.tagName === 'UTD-MENU-HORIZONTAL') {
          break
        }      
      }
    } 
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

    if(estMenuBurger) {
      menuPlus.setAttribute('est-menu-burger', 'true')
    }

    let contientElementActif = false

    for (let i = dernierIndexeVisible + 1; i < thisComponent.children.length; i++) {

      const cln = thisComponent.children[i].cloneNode(true);
      cln.setAttribute('est-menu-plus', 'true')

      if(estMenuBurger) {
        cln.setAttribute('est-menu-burger', 'true')
      }

      if(gererElementsActifs === 'true' && cln.getAttribute('actif') === 'true') {
        contientElementActif = true
      }

      if(i === thisComponent.children.length - 1) {
        cln.setAttribute('est-dernier','true')

        //On retire la classe indiquant une ouverture à gauche (impossible dans la situation présente car le dernier menu est nécéssairement "masqué" et inclu dans le PLUS ou le menu burger )
        reinitialiserOuvertureGaucheMenu(thisComponent.children[i])
        reinitialiserOuvertureGaucheMenu(cln)
      }

      menuPlus.appendChild(cln)            
      thisComponent.children[i].classList.add('utd-d-none')      
    }

    if (contientElementActif) {
      menuPlus.setAttribute('actif', 'true')
    }

    thisComponent.appendChild(menuPlus)    
  }

  function ajouterElementMenuAccueil() {
    const menuAccueil = document.createElement('utd-menu-horizontal-item')
    menuAccueil.setAttribute('libelle', titreAccueil)
    menuAccueil.setAttribute('href', urlAccueil)  
    menuAccueil.setAttribute('est-menu-accueil', 'true')

    thisComponent.prepend(menuAccueil)
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

  function contientMenusNonVisibles() {

    largeurConteneur = thisComponent.getBoundingClientRect().right
//    largeurMenu = thisComponent.children[thisComponent.children.length - 1].getBoundingClientRect().right - 0.5
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

    while (menuVisible && i <= thisComponent.children.length - 1) {
      const item = thisComponent.children[i]
      if(item.getBoundingClientRect().right <= largeurConteneur) {
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
    menuPlusTemp.setAttribute('est-menu-plus', 'true')

    const elementTemp = document.createElement('utd-menu-horizontal-item')
    elementTemp.setAttribute('libelle', 'Temporaire')
    menuPlusTemp.appendChild(elementTemp)

    thisComponent.prepend(menuPlusTemp)
  }

</script>
<h2 id="{idTitreMenu}" class="utd-sr-only">{titre}</h2>

<nav class="utd-menu-horizontal" class:visible={afficher} aria-labelledby="{idTitreMenu}">
  <div id={idMenu} role="list" class="menu" class:visible={afficher}>
    <slot></slot>
  </div>  
</nav>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

