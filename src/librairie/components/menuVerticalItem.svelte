<svelte:options tag="utd-menu-vertical-item" />
<script>
  import { onMount } from "svelte";
  import { Utils } from './utils.js'
  import { slide } from "svelte/transition"
  import { get_current_component } from "svelte/internal"  

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
      thisComponent.querySelector('a').focus()
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
    switch(e.keyCode) {
      //Flèche gauche 
      case 37:
        e.preventDefault()
        break;
      //Flèche haut 
      case 38:
        e.preventDefault()
			  break;
      //Flèche droite
      case 39:
        if(possedeEnfants && afficher === 'false'){
          afficher=true                            
          thisComponent.querySelector('utd-menu-vertical-item').setAttribute('focus', 'true')
        }
        e.preventDefault()
        break;
      //Flèche bas
      case 40:
        e.preventDefault()
        break;        
		 }
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
    <a href="{href}" role="menuitem" aria-current="{estactif === 'true' ? 'page' : null}">
      <span>{label}</span>
    </a>    
  {/if}            
</div>
<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

