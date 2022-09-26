<svelte:options tag="utd-menu-secondaire-element" />
<script>
  import { onMount } from "svelte";
  import { Utils } from './utils.js'
  import { get_current_component } from "svelte/internal"  

  export let label = ""
  export let href = ""
  let possedeEnfants = false;

  let afficher = false

  const thisComponent = get_current_component()
  const idMenu = Utils.genererId()
 
  onMount(() => {
    debugger;
    possedeEnfants = !!thisComponent.querySelector('utd-menu-secondaire-element')
    
  
    
  })

  function toggleAfficher(){
    afficher = !afficher
  }

  
</script>
<li class="element" class:visible={afficher}>
  <a role="button" class="" href="{href}" aria-expanded="{afficher}" aria-controls="{idMenu}" on:click={toggleAfficher}>
    <span>{label}</span>
    <span aria-hidden="true" class="utd-icone-svg chevron-bleu-piv"/>
  </a>
  {#if possedeEnfants}
    <ul class:visible={afficher}>
      <slot></slot>
    </ul>
  {/if}    
  
</li>



<style>
</style>

