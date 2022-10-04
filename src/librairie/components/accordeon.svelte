<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-accordeon" />

<script>
  import { slide } from "svelte/transition"
  import { Utils } from './utils'
  export let afficher = "false"
  export let titre = ""
  export let contenu = ""

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete

  function toggleAffichageContenu(){
    afficher =  afficher === 'true' ? 'false' : 'true'
  }
</script>

<div class="utd-component utd-accordeon {afficher === 'true' ? 'ouvert' : ''}" >
  <div class="entete">
    <button type="button" class="" aria-controls="{idContenu}" aria-expanded="{afficher === 'true'}" on:click={toggleAffichageContenu}>
      <span class="titre">
        {#if titre}
          {titre}
        {/if}
        <slot name="titre" />      
      </span>
      <span class="utd-icone-svg {afficher === 'true' ? 'moins' : 'plus'}"></span>
    </button>
  </div>

    <div id="{idContenu}" class="contenu" >
      {#if afficher === 'true'}
      <div transition:slide="{{duration:250}}">
        {#if contenu}
          {@html contenu}
        {:else}
          <slot/>  
          <slot name="contenu" />
        {/if}
      </div>
      {/if}
    </div>

</div>

<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
