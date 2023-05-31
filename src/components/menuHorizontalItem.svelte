<svelte:options tag="utd-menu-horizontal-item" />

<script>
  import { onMount } from "svelte";
  import { Utils } from "./js/utils"
  import { slide } from "svelte/transition"
  import { current_component, element, get_current_component } from "svelte/internal"  

  /* Propriétés "publiques" */
  export let libelle = ''
  export let href = ''

  /* Propriétés "internes" */
  export let srLibelle = ''
  export let afficher = 'false'
  export let animer = 'true'
  export let focus = 'false'
  export let actif = 'false'
  export let estMenuPlus = 'false'
  export let estMenuBurger = 'false'
  export let estMenuAccueil = 'false'
  export let estDernier = 'false'

  let possedeEnfants = false
  let niveau = 1
  
  const thisComponent = get_current_component()  
  const idSousMenu = Utils.genererId()
 
  onMount(() => {
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

  function fermerTousMenus() {
    Array.from(document.querySelector('utd-menu-horizontal').children).forEach((elementMenu) => {
      elementMenu.setAttribute('afficher', 'false')
    })
  }
  function obtenirElementsNiveauCourant() {
    if(thisComponent){
            
      const items = Array.from(thisComponent.parentElement.children).filter((enfant) => {
        return enfant.matches('utd-menu-horizontal-item:not(.utd-d-none)')
      })
      return items
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
    if(niveau === 1) {
      fermerTousMenus()
    } else {
      fermerMenusNiveauCourant()
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
        break
      case "ArrowDown":        
      case "ArrowRight":
        if(possedeEnfants){
          if(afficher === 'true'){
            donnerFocusElementSuivant(obtenirElementsNiveauSuivant())           
          } else {
            donnerFocusElementSuivant(obtenirElementsNiveauCourant())
          }
        } else {
          donnerFocusElementSuivant(obtenirElementsNiveauCourant())
        }
        e.preventDefault()        
        break;        

      case "Home":        
        if(possedeEnfants){
          if(afficher === 'true'){
            donnerFocusPremierElement(obtenirElementsNiveauSuivant())           
          } else {
            donnerFocusPremierElement(obtenirElementsNiveauCourant())
          }
        } else {
          donnerFocusPremierElement(obtenirElementsNiveauCourant())
        }
        e.preventDefault()        
        break;       

      case "End":        
        if(possedeEnfants){
          if(afficher === 'true'){
            donnerFocusDernierElement(obtenirElementsNiveauSuivant())           
          } else {
            donnerFocusDernierElement(obtenirElementsNiveauCourant())
          }
        } else {
          donnerFocusDernierElement(obtenirElementsNiveauCourant())
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

  function donnerFocusDernierElement(elements) {
    if(!elements.length){
      return
    }
    elements[elements.length - 1].setAttribute('focus', 'true')
  }

  function donnerFocusPremierElement(elements) {
    if(!elements.length){
      return
    }
    elements[0].setAttribute('focus', 'true')
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
/*    console.log('blur')
    console.log('relatedTarget')
    console.log(e.relatedTarget)
    console.log('currentTarget')
    console.log(e.currentTarget)*/

    const utdMenuHorizontalParent = thisComponent.closest('utd-menu-horizontal')

    if(!utdMenuHorizontalParent.contains(e.relatedTarget)){
      const itemsMenu = utdMenuHorizontalParent.querySelectorAll('utd-menu-horizontal-item')
      itemsMenu.forEach((item) => {
        item.setAttribute('afficher', 'false')
      })
    }
  }

</script>
<div class="utd-menu-horizontal-item niv{niveau}{afficher === 'true' ? ' visible' : ''}{actif === 'true' ? ' active' : ''}{estMenuPlus === 'true' ? ' menu-plus' : ''}{estMenuBurger === 'true' ? ' menu-burger' : ''}{estDernier === 'true' ? ' dernier' : ''}" role="listitem">
  {#if possedeEnfants}    
    <a role="button" href="{href}" aria-expanded="{afficher}" aria-controls="{idSousMenu}" on:click|preventDefault={toggleAfficher} on:keydown={onKeyDown} on:blur={onBlur}>
      {#if niveau === 1 && estMenuBurger === 'true'}    
        <span aria-hidden="true" class="utd-icone-svg{afficher === 'true' ?  ' x-fermer-bleu-moyen' : ' burger'}"/>
      {/if}      
      <span>{libelle}</span>
      {#if srLibelle}    
        <span class="utd-sr-only">{srLibelle}</span>
      {/if}
      {#if niveau !== 1 || estMenuBurger !== 'true'}    
        <span aria-hidden="true" class="utd-icone-svg {niveau === 1 ? 'chevron-blanc' : 'chevron-bleu-moyen'}"/>
      {/if}      
    </a>
    {#if afficher === 'true'}
      <div id="{idSousMenu}" role="list" class="sous-menu" transition:slide="{{duration: animer ==='true' ? 250: 0}}">
        <slot></slot>
      </div>
    {/if}
  {:else}
    <a href="{href}" title="{estMenuAccueil ? libelle : null}" aria-current="{actif === 'true' ? 'page' : null}" on:keydown={onKeyDown} on:blur={onBlur}>
      {#if estMenuAccueil === 'true'}    
        <span aria-hidden="true" class="utd-icone-svg maison"/>
      {:else}
      <span>{libelle}</span>
      {/if}        
      {#if srLibelle}    
        <span class="utd-sr-only">{srLibelle}</span>
      {/if}
    </a>    
  {/if}
  {#if niveau === 1}
    <span class="bordure-bas"></span>                  
  {/if}

</div>
<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

