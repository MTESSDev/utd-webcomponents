<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-infobulle" />

<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition"
  import { get_current_component } from "svelte/internal"  
  import { Utils } from './utils'
  export let afficher = false
  export let titre = ""
  export let lang = "fr"
  export let srtitre = ""
  export let srboutonouvrir = ""
  export let srboutonfermer = ""
  export let contenu = ""

  const idModale = Utils.genererId()
  const idEntete = Utils.genererId()
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
  const thisComponent = get_current_component()

  let html
  let body

  onMount(() => {
    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    body = thisComponent.getRootNode().getElementsByTagName("body")[0]

    if(Utils.estMobile()){
      html.classList.add("est-mobile")      
    }
  })

  function afficherModale(e) {
    Utils.ajusterInterfaceAvantAffichageModale(html, body)
    afficher = true
  }

  function masquerModale(e) {
    afficher = false
  }

  function keydown(e) {
    if (e.key === "Escape") {
      masquerModale(e)
    }
  }

  function finAnimationFermeture(e) {
    Utils.ajusterInterfaceApresFermetureModale(html, body)
  }

  function conserverFocusAideContextuelle(e) {
    thisComponent.shadowRoot.getElementById(idEntete).focus()
    Utils.conserverFocusElement(thisComponent.shadowRoot.getElementById(idModale), thisComponent)
  }
</script>

<span class="utd-infobulle">
  {#if $$slots["texte-lie"]}
    <span class="texte-lie" on:click={afficherModale}><slot name="texte-lie" /></span>
  {/if}
  <span class="conteneur-tooltip">&#xFEFF;<button type="button" on:click={afficherModale} aria-label={srTexteBoutonOuvrir} class="tooltip-toggle">
      <span class="conteneur-puce">
        <span aria-hidden="true" class="puce">
          <span
            aria-hidden="true"
            class="utd-icone-svg question"
          />
        </span>
      </span>
    </button>
  </span>

  {#if afficher}
    <div class="utd-backdrop" on:click={masquerModale} />
    <span
      tabindex="-1"
      aria-labelledby={idEntete}
      class="modale"
      id={idModale}
      on:keydown={keydown}
      in:fly={{ y: 200, duration: 750 }}
      out:fly={{ y: 200, duration: 500 }}
      on:introend={conserverFocusAideContextuelle}
      on:outroend={finAnimationFermeture}
      aria-modal="true"
      role="dialog"
    >
      <span class="utd-container entete">
        <h1 id={idEntete} tabindex="-1">
          <span class="sr-only">{@html srTexteTitre}</span>
          <span>
            {#if titre}
              {titre}
            {/if}
          </span>
        </h1>
        <button
          type="button"
          class="close"
          on:click={masquerModale}
          aria-label={srTexteBoutonFermer}
        >
          <span
            aria-hidden="true"
            class="utd-icone-svg x-fermer-bleu"
          />
        </button>
      </span>
      <span class="utd-container conteneur-corps">
        <span class="corps">
          {#if contenu}
            {@html contenu}
          {/if}
          <slot name="contenu" />
          <p class="d-none" />
        </span>
      </span>
    </span>
  {/if}
</span>

<link rel='stylesheet' href='/css/utd-webcomponents-v1.2.0.min.css'>
<style>
</style>
