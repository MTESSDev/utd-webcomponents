<svelte:options tag="utd-menu-horizontal-item" />

<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { slide } from "svelte/transition"
  import { current_component, get_current_component } from "svelte/internal"  

  /* Propriétés "publiques" */
  export let libelle = ''
  export let href = ''

  /* Propriétés "internes" */
  export let afficher = 'false'
  export let animer = 'true'
  export let focus = 'false'
  export let actif = 'false'
  export let estMenuPlus = 'false'

  let possedeEnfants = false
  let niveau = 1
  
  const thisComponent = get_current_component()  
  const idSousMenu = Utils.genererId()
 
  onMount(() => {
    actif = estElementActif()
    niveau = obtenirNiveau()
    possedeEnfants = !!thisComponent.querySelector('utd-menu-horizontal-item')

    Utils.reafficherApresChargement(thisComponent)
  })

  // Watch sur la prop focus
  $: toggleFocus(focus) 

  function toggleFocus(){
    if(focus === 'true'){
      const premierLien = thisComponent.shadowRoot.querySelector('a')
      if(premierLien){
        premierLien.focus()
      }
      focus = 'false'
    }
  }

  function toggleAfficher(){    
    
    // Lorsqu'on doit afficher un sous menu, on doit tous les fermer d'abord.
    if(afficher === 'false'){
      fermerMenusNiveauCourant()
    }

    afficher = afficher === 'true' ? 'false' : 'true'
  }

  function fermerMenusNiveauCourant() {
      const menus = obtenirElementsNiveauCourant()

      menus.forEach((menu) => {
        menu.setAttribute('afficher', 'false')
      })
  }

  function fermerMenuParent() {
      thisComponent.parentElement.setAttribute('afficher', 'false')
  }

  function obtenirElementsNiveauCourant() {
    if(thisComponent){
            
      return Array.from(thisComponent.parentElement.children).filter((enfant) => {
        return enfant.matches('utd-menu-horizontal-item')
      })
    }          
    return null      
  }

  function obtenirElementsNiveauSuivant() {
    if(thisComponent){
            
      return Array.from(thisComponent.children).filter((enfant) => {
        return enfant.matches('utd-menu-horizontal-item')
      })
    }          
    return null      
  }


  function estElementActif(){
    if(href){
      return (window.location.pathname.startsWith(href)).toString()
      // return (window.location.pathname === href).toString()
    }    
  }

  function obtenirNiveau(){
    let niveau = 1
    let elementParent = thisComponent.parentElement
    
    while (elementParent.tagName.toLowerCase() === 'utd-menu-horizontal-item') {
        ++niveau
        elementParent = elementParent.parentElement
    }

    return niveau
  }

  function obtenirMenuHorizontal(){
    let elementParent = thisComponent.parentElement
    
    while (elementParent.tagName.toLowerCase() !== 'utd-menu-horizontal') {
        elementParent = elementParent.parentElement
    }

    return elementParent
  }

  function fermerMenus() {
    if(possedeEnfants && afficher === 'true'){
      fermerMenusNiveauCourant()      
    } else {
      fermerMenuParent()
      thisComponent.parentElement.setAttribute('focus', 'true')
    }
  }
  function onKeyDown(e) {
    const parent = thisComponent.parentElement

    switch(e.key) {
      case "Escape":
        fermerMenus()
        e.preventDefault()
        break;
      case "Enter":
      case " ":
        if(possedeEnfants){
          toggleAfficher()
          e.preventDefault()
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":              
        donnerFocusElementPrecedent(obtenirElementsNiveauCourant())  
        e.preventDefault()
        break;
      case "ArrowDown":        
      case "ArrowRight":
        if(possedeEnfants){
          if(e.key === "ArrowDown" && afficher === 'true'){
            donnerFocusElementSuivant(obtenirElementsNiveauSuivant())           
          } else {
            donnerFocusElementSuivant(obtenirElementsNiveauCourant())
          }
        } else {
          donnerFocusElementSuivant(obtenirElementsNiveauCourant())
        }

        e.preventDefault()        
        break;        
		 }
	}

  function donnerFocusElementSuivant(elements) {
    if(!elements.length){
      return
    }

    const indexeCourant = elements.indexOf(document.activeElement)
        
    if(indexeCourant >= 0){
      const prochainIndexe = Math.min(elements.length - 1, indexeCourant + 1)
      elements[prochainIndexe].setAttribute('focus', 'true')
    } else {
      elements[0].setAttribute('focus', 'true')
    }
  }

  function donnerFocusElementPrecedent(elements) {
    
    if(!elements.length){
      return
    }

    const indexeCourant = elements.indexOf(document.activeElement)
        
    if(indexeCourant >= 0){
      const prochainIndexe = Math.max(0, indexeCourant - 1)
      elements[prochainIndexe].setAttribute('focus', 'true')
    } else {
      elements[0].setAttribute('focus', 'true')
    }
  }


  function estMenuItem(element){
    return element && element.tagName.toLowerCase() === 'utd-menu-horizontal-item'
  }


  function onBlur(e){
    const utdMenuHorizontalParent = thisComponent.closest('utd-menu-horizontal')
    if(!utdMenuHorizontalParent.contains(e.relatedTarget)){
      const itemsMenu = utdMenuHorizontalParent.querySelectorAll('utd-menu-horizontal-item')
      itemsMenu.forEach((item) => {
       // item.setAttribute('afficher', 'false')
      })
    }
  }

</script>
<div class="utd-menu-horizontal-item niv{niveau}{afficher === 'true' ? ' visible' : ''}{actif === 'true' ? ' active' : ''}{estMenuPlus === 'true' ? ' menu-plus' : ''}" role="listitem">
  {#if possedeEnfants}    
    <a role="button" href="{href}" aria-expanded="{afficher}" aria-controls="{idSousMenu}" on:click|preventDefault={toggleAfficher} on:keydown={onKeyDown} on:blur={onBlur} >
      <span>{libelle}</span>
      <span aria-hidden="true" class="utd-icone-svg {niveau === 1 ? 'chevron-blanc' : 'chevron-bleu-piv'}"/>
    </a>
    {#if afficher === 'true'}
      <div id="{idSousMenu}" role="list" class="sous-menu" transition:slide="{{duration: animer ==='true' ? 250: 0}}">
        <slot></slot>
      </div>
    {/if}
  {:else}
    <a href="{href}" aria-current="{actif === 'true' ? 'page' : null}" on:keydown={onKeyDown} on:blur={onBlur}>
      <span>{libelle}</span>
    </a>    
  {/if}
  {#if niveau === 1}
    <span class="bordure-bas"></span>                  
  {/if}

</div>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

