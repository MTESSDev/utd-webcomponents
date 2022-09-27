<svelte:options tag="utd-menu-vertical-item" />
<script>
  import { onMount } from "svelte";
  import { Utils } from './utils.js'
  import { slide } from "svelte/transition"
  import { element, get_current_component } from "svelte/internal"  

  export let label = ''
  export let href = ''
  export let estactif = 'false'
  export let afficher = 'false'
  export let animer = 'true'
  export let focus = 'false'

  let possedeEnfants = false
  let niveau = 1
  
  const thisComponent = get_current_component()
  const idSousMenu = Utils.genererId()
 
  onMount(() => {
    estactif = estElementActif()
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

        if(estactif === 'true'){
          elementParent.setAttribute('estactif', 'true')
          elementParent.setAttribute('animer', 'false')
          elementParent.setAttribute('afficher', 'true')
          elementParent.setAttribute('animer', 'true')
        }
        elementParent = elementParent.parentElement
    }

    return niveau
  }

  function onKeyDown(e) {
    console.log(e.keyCode)
    const parent = thisComponent.parentElement

    switch(e.keyCode) {
      //Flèche gauche 
      case 37:
        if(possedeEnfants){
          afficher = 'false'
            
          const menuPrecedent = thisComponent.previousElementSibling
          if(menuPrecedent){
            menuPrecedent.setAttribute('focus', 'true')              
          }
        } else {
          if(estMenuItem(parent)){
            parent.setAttribute('afficher', 'false')
            parent.setAttribute('focus', 'true')
          }
        }
        e.preventDefault()
        break;
      //Flèche haut 
      case 38:
        accederMenuPrecedent(true)
        e.preventDefault()
			  break;
      //Flèche droite
      case 39:
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
      //Flèche bas
      case 40:
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
        menuPrecedent = parent.previousElementSibling
    } else {
      menuPrecedent = thisComponent.previousElementSibling
    }

    if(estMenuItem(menuPrecedent)){            
      menuPrecedent.setAttribute('focus', 'true')
    } else {
      let elementDepart
      
      if(doitBoucler){
        elementDepart = parent
      } else {
        elementDepart = parent.parentElement        
      }      
      const elements = elementDepart.children
      elements[elements.length - 1].setAttribute('focus', 'true')
    }
  }


  function estMenuItem(element){
    return element && element.tagName.toLowerCase() === 'utd-menu-vertical-item'
  }
</script>
<div class="utd-menu-vertical-item niv{niveau} {afficher === 'true' ? 'visible' : ''} {estactif === 'true' ? 'active' : ''}">
  {#if possedeEnfants}    
    <a role="menuitem" href="{href}" aria-expanded="{afficher}" aria-haspopup="menu" aria-controls="{idSousMenu}" on:click|preventDefault={toggleAfficher} on:keydown={onKeyDown}>
      <span>{label}</span>
      <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    </a>
    {#if afficher === 'true'}
      <div id="{idSousMenu}" role="menu" class="sous-menu" transition:slide="{{duration: animer ==='true' ? 250: 0}}">
        <slot></slot>
      </div>
    {/if}
  {:else}
    <a href="{href}" role="menuitem" aria-current="{estactif === 'true' ? 'page' : null}" on:keydown={onKeyDown}>
      <span>{label}</span>
    </a>    
  {/if}            
</div>
<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

