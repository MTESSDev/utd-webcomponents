<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-section" />

<script>
  import { slide } from "svelte/transition"
  import { Utils } from './utils'
  export let afficher = false
  export let titre = ""
  export let type = "primaire"

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete

  function toggleAffichageContenu(){
    afficher = !afficher
  }
</script>

<div class="utd-component utd-section {type} {afficher ? 'ouvert' : ''}" >
  <div class="entete">
    <button class="" aria-controls="{idContenu}" aria-expanded="{afficher}" on:click={toggleAffichageContenu}>
      <span class="titre">
        {#if titre}
          {titre}
        {/if}
        <slot name="titre" />      
      </span>
      <span class="utd-icone-svg {afficher ? 'moins' : 'plus'}"></span>
    </button>
  </div>

  <div id="{idContenu}" class="contenu" >
    {#if afficher}
    <div transition:slide="{{duration:250}}">
      <slot/>
    </div>
    {/if}
  </div>

</div>

<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
