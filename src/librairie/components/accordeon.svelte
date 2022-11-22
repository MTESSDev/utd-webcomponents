<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-accordeon" />

<script>
  import { slide } from "svelte/transition"
  import { Utils } from './utils'
  export let reduit = "true"
  export let titre = ""
  export let contenu = ""
  export let tagTitre = "h2"

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete

  function toggleAffichageContenu(){
    reduit =  reduit === 'true' ? 'false' : 'true'
  }

  //TODO trouver le moyen d'obtenir le niveau de titre par défaut...
</script>

<div class="utd-component utd-accordeon {reduit === 'false' ? 'ouvert' : ''}" >
  <div class="entete">
    <svelte:element this={tagTitre} class="titre"> 
      <button type="button" class="" aria-controls="{idContenu}" aria-expanded="{reduit === 'false'}" on:click={toggleAffichageContenu}>
        <span class="titre">
          {#if titre}
            {titre}
          {/if}
          <slot name="titre" />      
        </span>
        <span class="utd-icone-svg {reduit === 'false' ? 'moins' : 'plus'}"></span>
      </button>
    </svelte:element>       
  </div>

    <div id="{idContenu}" class="contenu" >
      {#if reduit === 'false'}
        <div class="conteneur" transition:slide="{{duration:250}}">
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
