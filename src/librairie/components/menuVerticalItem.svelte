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

  let possedeEnfants = false
  let niveau = 1
  
  const thisComponent = get_current_component()
  const idSousMenu = Utils.genererId()
 
  onMount(() => {
    estactif = estElementActif()
    niveau = obtenirNiveau()
    possedeEnfants = !!thisComponent.querySelector('utd-menu-vertical-item')
  })

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
  
</script>
<div class="utd-menu-vertical-item niv{niveau} {afficher === 'true' ? 'visible' : ''} {estactif === 'true' ? 'active' : ''}">
  {#if possedeEnfants}    
    <a role="menuitem" href="{href}" aria-expanded="{afficher}" aria-controls="{idSousMenu}" on:click|preventDefault={toggleAfficher}>
      <span>{label}</span>
      <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
    </a>
    {#if afficher === 'true'}
      <div id="{idSousMenu}" role="menu" class="sous-menu" transition:slide="{{duration: animer ==='true' ? 250: 0}}">
        <slot></slot>
      </div>
    {/if}
  {:else}
    <a href="{href}" role="menuitem">
      <span>{label}</span>
    </a>    
  {/if}            
</div>
<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

