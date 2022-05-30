<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-accordeon" />

<script>
  import { slide } from "svelte/transition"
  import { Utils } from './utils'
  export let afficher = false
  export let titre = ""
  export let lang = "fr"
  export let srtitre = ""
  export let srboutonouvrir = ""
  export let srboutonfermer = ""
  export let contenu = ""

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete

  const srTexteTitre = srtitre
    ? srtitre
    : lang === "fr"
    ? "Aide à propos de&nbsp;"
    : "Help about&nbsp;"
  const srTexteBoutonOuvrir = srboutonouvrir
    ? srboutonouvrir
    : lang === "fr"
    ? "Afficher l'aide contextuelle"
    : "Show help about"
  const srTexteBoutonFermer = srboutonfermer
    ? srboutonfermer
    : lang === "fr"
    ? "Fermer"
    : "Close"

  function toggleAffichageContenu(){
    afficher = !afficher
  }
</script>

<div class="utd-component utd-accordeon {afficher ? 'ouvert' : ''}" >
  <div class="entete">
    <button class="" aria-controls="{idContenu}" aria-expanded="{afficher}" on:click={toggleAffichageContenu}>
      <span class="titre">
        {#if titre}
          {titre}
        {/if}
        <slot name="titre" />      
      </span>
      <span class="utd-icone-svg {afficher ? 'moins' : 'plus'} md"></span>
    </button>
  </div>

    <div id="{idContenu}" class="contenu" >
      {#if afficher}
      <div transition:slide="{{duration:250}}">
        {#if contenu}
          {@html contenu}
        {/if}
        <slot name="contenu" />
      </div>
      {/if}
    </div>

</div>

<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
