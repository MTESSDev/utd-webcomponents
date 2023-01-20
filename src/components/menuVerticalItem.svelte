<svelte:options tag="utd-menu-vertical-item" />
<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { slide } from "svelte/transition"
  import { get_current_component } from "svelte/internal"  

  /* Propriétés "publiques" */
  export let libelle = ''
  export let href = ''

  /* Propriétés "internes" */
  export let afficher = 'false'
  export let indextab = '0'
  export let animer = 'true'
  export let focus = 'false'
  export let actif = 'false'

  let possedeEnfants = false
  let niveau = 1
  
  const thisComponent = get_current_component()
  const idSousMenu = Utils.genererId()
 
  onMount(() => {
    actif = estElementActif()
    niveau = obtenirNiveau()
    possedeEnfants = !!thisComponent.querySelector('utd-menu-vertical-item')
  })

  // Watch sur la prop focus
  $: toggleFocus(focus) 

  function toggleFocus(){
    if(focus === 'true'){
      thisComponent.shadowRoot.querySelector('a').focus()
      focus = 'false'
    }
  }

  function toggleAfficher(){
    afficher = afficher === 'true' ? 'false' : 'true'
  }

  function estElementActif(){
    if(href){
      return (window.location.pathname === href).toString()
    }    
  }

  function obtenirNiveau(){
    let niveau = 1
    let elementParent = thisComponent.parentElement
    
    while (elementParent.tagName.toLowerCase() === 'utd-menu-vertical-item') {
        ++niveau

        if(actif === 'true'){
          elementParent.setAttribute('actif', 'true')
          elementParent.setAttribute('animer', 'false')
          elementParent.setAttribute('afficher', 'true')
          elementParent.setAttribute('animer', 'true')
        }
        elementParent = elementParent.parentElement
    }

    return niveau
  }

  function obtenirMenuVertical(){
    let elementParent = thisComponent.parentElement
    
    while (elementParent.tagName.toLowerCase() !== 'utd-menu-vertical') {
        elementParent = elementParent.parentElement
    }

    return elementParent
  }

  function onKeyDown(e) {
    const parent = thisComponent.parentElement

    switch(e.key) {
      case "Escape":
        if(estMenuItem(parent)){
          parent.setAttribute('afficher', 'false')
          parent.setAttribute('focus', 'true')
        }
        e.preventDefault()
        break;
      case "Enter":
      case " ":
        if(possedeEnfants){
          if(afficher === 'false'){
            afficher = 'true'                            
            thisComponent.querySelector('utd-menu-vertical-item').setAttribute('focus', 'true')
          }          
          e.preventDefault()
        }
        break;
      case "ArrowLeft":
        accederMenuPrecedent()
        e.preventDefault()
        break;
      case "ArrowUp":
        accederMenuPrecedent(true)
        e.preventDefault()
        break;
      case "ArrowRight":
        if(possedeEnfants){
          if(afficher === 'false'){
            afficher = 'true'                            
            thisComponent.querySelector('utd-menu-vertical-item').setAttribute('focus', 'true')
          } else {
            accederMenuSuivant()
          }
        } else {
          accederMenuSuivant()
        }
        e.preventDefault()
        break;
      case "ArrowDown":
        accederMenuSuivant(true)
        e.preventDefault()        
        break;        
		 }
	}
  
  function accederMenuSuivant(doitBoucler){
    const parent = thisComponent.parentElement
    let prochainMenu

    afficher = 'false'

    if(!doitBoucler && estMenuItem(parent)){
        parent.setAttribute('afficher', 'false')
        prochainMenu = parent.nextElementSibling
    } else {
      prochainMenu = thisComponent.nextElementSibling
    }

    if(estMenuItem(prochainMenu)){            
      prochainMenu.setAttribute('focus', 'true')
    } else {
      if(doitBoucler){
        parent.querySelector('utd-menu-vertical-item').setAttribute('focus', 'true')
      } else {
        parent.parentElement.querySelector('utd-menu-vertical-item').setAttribute('focus', 'true')
      }      
    }
  }

  function accederMenuPrecedent(doitBoucler){
    const parent = thisComponent.parentElement
    let menuPrecedent

    afficher = 'false'

    if(!doitBoucler && estMenuItem(parent)){
        parent.setAttribute('afficher', 'false')
        parent.setAttribute('focus', 'true')
    } else {
      menuPrecedent = thisComponent.previousElementSibling
    }

    if(estMenuItem(menuPrecedent)){            
      menuPrecedent.setAttribute('focus', 'true')
    } else {
      const elements = parent.children
      elements[elements.length - 1].setAttribute('focus', 'true')
    }
  }


  function estMenuItem(element){
    return element && element.tagName.toLowerCase() === 'utd-menu-vertical-item'
  }

  function onFocus(){
    // Tab roving!!! On gère le tabindex des éléments du menu afin que seul l'élément actif puisse être focusable (via tab) de sorte qu'on gère le focus via les flèches du clavier et 
    // un TAB provoque la sortie du menu.
    retirerPossibiliteFocusElementsMenu()
    thisComponent.setAttribute('indextab', '0')
  }

  function retirerPossibiliteFocusElementsMenu(){
    const menuVertical = obtenirMenuVertical()
    const elements = menuVertical.querySelectorAll('utd-menu-vertical-item')
    elements.forEach(element => {
      element.setAttribute('indextab', '-1')
    });
  }


</script>
<div class="utd-menu-vertical-item niv{niveau} {afficher === 'true' ? 'visible' : ''} {actif === 'true' ? 'active' : ''}">
  {#if possedeEnfants}    
    <a role="menuitem" href="{href}" aria-expanded="{afficher}" aria-haspopup="menu" aria-controls="{idSousMenu}" tabindex="{indextab}" on:click|preventDefault={toggleAfficher} on:keydown={onKeyDown} on:focus={onFocus}>
      <span>{libelle}</span>
      <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    </a>
    {#if afficher === 'true'}
      <div id="{idSousMenu}" role="menu" class="sous-menu" transition:slide="{{duration: animer ==='true' ? 250: 0}}">
        <slot></slot>
      </div>
    {/if}
  {:else}
    <a href="{href}" role="menuitem" aria-current="{actif === 'true' ? 'page' : null}" tabindex="{indextab}" on:keydown={onKeyDown} on:focus={onFocus}>
      <span>{libelle}</span>
    </a>    
  {/if}            
</div>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

