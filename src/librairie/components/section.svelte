<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-section" />

<script>
  import { slide } from "svelte/transition"
  import { Utils } from './utils'
  export let extensible = "true"
  export let reduit = "true"
  export let titre = ""
  export let bordure = "true"
  export let tagtitre = "h2"

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete

  //TODO éventuellement déterminer automatiquement le niveau de header via un script? 

  function toggleAffichageContenu(){
    reduit =  reduit === 'true' ? 'false' : 'true'
  }
</script>

<div class="utd-component utd-section {extensible === 'true' ? 'extensible' : ''} {reduit === 'false' ? 'ouvert' : ''} {bordure === 'true' ? 'bordure' : ''}" >
  <div class="entete">
    {#if extensible === 'true'}
    <svelte:element this={tagtitre} class="titre"> 
      <button type="button" class="" aria-controls="{idContenu}" aria-expanded="{reduit === 'false'}" on:click={toggleAffichageContenu}>
          {#if titre}
            {titre}
          {/if}
          <slot name="titre" />            
        <span class="utd-icone-svg chevron-blanc"></span>        
      </button>
    </svelte:element> 
    {:else}
      <svelte:element this={tagtitre} class="titre"> 
        {#if titre}
          {titre}
        {/if}
        <slot name="titre" />      
      </svelte:element> 
    {/if}

  </div>

  <div id="{idContenu}" class="contenu" >
    {#if extensible === 'false' || reduit === 'false'}
    <div transition:slide="{{duration:250}}">
      <slot/>
    </div>
    {/if}
  </div>

</div>

<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
