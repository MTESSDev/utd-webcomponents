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
    ? "Aide à propos de &nbsp;"
    : "Help about &nbsp;"
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

  onMount(() => {
    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  })

  function afficherModale(e) {
    html.classList.add("modale-ouverte")
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
    html.classList.remove("modale-ouverte")
  }

  function conserverFocusAideContextuelle(e) {
    thisComponent.shadowRoot.getElementById(idEntete).focus()
    Utils.conserverFocusElement(thisComponent.shadowRoot.getElementById(idModale), thisComponent)
  }
</script>

<span>
  {#if $$slots["texte-lie"]}
    <span class="texte-lie" on:click={afficherModale}><slot name="texte-lie" /></span>
  {/if}
  <span class="conteneur-tooltip">&#xFEFF;<button type="button" on:click={afficherModale} aria-label={srTexteBoutonOuvrir} class="tooltip-toggle">
      <span class="conteneur-puce">
        <span aria-hidden="true" class="puce">
          <span
            aria-hidden="true"
            part="icone-svg"
            class="utd-icone-svg question"
          />
        </span>
      </span>
    </button>
  </span>

  {#if afficher}
    <div class="backdrop" part="backdrop" on:click={masquerModale} />
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
      <span class="entete" part="container">
        <h1 id={idEntete} tabindex="-1">
          <span class="sr-only" part="sr-only">{@html srTexteTitre}</span>
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
            part="icone-svg"
            class="utd-icone-svg x-fermer-bleu"
          />
        </button>
      </span>
      <span class="conteneur-corps" part="container">
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

<style>
  .texte-lie:hover,
  button:hover {
    cursor: pointer;
  }
  .texte-lie {
    background-color: #e7f1fa;
    padding: 0 2px;
    display: inline-block;
    text-decoration: underline;
    text-decoration-color: var(--couleur-piv);
    text-underline-offset: 2px;
  }

  .conteneur-tooltip {
    position: relative;
    bottom: 8px;
    left: -4px;
    white-space: nowrap;
  }
  .texte-lie + .conteneur-tooltip {
    bottom: 6px;
    left: -6px;
  }

  button.tooltip-toggle {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    display: inline-block;
    border: 0;
    background-color: transparent;
    position: relative;
    padding: 0 12px;
  }

  .texte-lie + .conteneur-tooltip button.tooltip-toggle {
    width: auto;
    height: auto;
    min-width: 0;
    min-height: 0;
    padding: 2px 4px;
    margin-right: -10px;
  }

  button.tooltip-toggle .conteneur-puce {
    display: block;
    width: 16px;
  }

  button.tooltip-toggle .puce {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: var(--couleur-piv);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.tooltip-toggle .utd-icone-svg {
    width: 10px;
    height: 10px;
    min-width: 10px;
    margin-left: 0;
    background-image: url("/images/utd-sprite-v1.0.0.svg#ico-question");
  }

  .modale {
    font-family: "OpenSans-Regular", sans-serif;
    display: block !important;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 12px rgba(34, 54, 84, 0.22);
    border: 1px solid #c5cad2;
    height: auto;
    overflow: hidden;
    z-index: 10000;
    padding-top: var(--tc-24-16-val);
    padding-bottom: var(--tc-24-16-val);
  }

  .entete {
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    max-width: var(--largeur-max-zone-texte);
    padding-top: 0;
    padding-bottom: 0;
  }

  .entete h1 {
    font-family: "Roboto-Bold", sans-serif;
    font-size: var(--text-lg-val);
    letter-spacing: 0;
    max-width: 58.75rem;
    margin: 0;
  }

  .entete h1:focus {
    outline: 0;
  }

  .entete h1:after {
    content: none;
  }

  .entete .close {
    line-height: 0;
    padding: 1rem;
    font-size: 1rem;
    opacity: 1;
    background-color: transparent;
    border: 0;
    margin: -1rem -1rem -1rem auto;
  }

  .entete .close:hover {
    cursor: pointer;
  }

  .utd-icone-svg.x-fermer-bleu {
    background-image: url("/images/utd-sprite-v1.0.0.svg#ico-xfermer-bleu");
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  .conteneur-corps {
    max-width: var(--largeur-max-zone-texte);
    border: 0;
    line-height: 1.5rem;
    margin: var(--tc-24-16-val) auto 0 auto !important;
    overflow-y: auto;
    display: block;
  }

  .corps {
    display: block;
    padding: 0 1.5rem 0 0;
    max-height: calc(33.33333vh - (var(--tc-24-16-val) * 3) - 30px);
    overflow-y: auto;
    font-size: 1rem;
  }

  .corps p:first-of-type {
    margin-top: 0;
  }

  .corps p:nth-last-of-type(2) {
    margin-bottom: 0;
  }

  .corps .d-none {
    display: none;
  }

  /* Scrollbar aide contextuelle */
  .corps::-webkit-scrollbar,
  .corps::-webkit-scrollbar-thumb,
  .corps::-webkit-scrollbar-track {
    background: transparent;
    border: none;
    border-radius: 0.3125rem;
    height: 50%;
    width: 0.625rem;
    margin-top: 8px;
  }

  .corps::-webkit-scrollbar-button,
  .corps::-webkit-scrollbar-track-piece,
  .corps::-webkit-scrollbar-corner,
  .corps::-webkit-resizer {
    display: none;
  }

  .corps::-webkit-scrollbar-thumb {
    background-color: var(--couleur-bleu-pale);
    transition: all 0.35s;
  }
</style>
