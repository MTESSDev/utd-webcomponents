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
  let slots = []
  let htmlSlotContenu

  onMount(() => {
    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    body = thisComponent.getRootNode().getElementsByTagName("body")[0]
    slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
    assignerHtmlSlotContenu()

    if(Utils.estMobile()){
      html.classList.add("est-mobile")      
    }
  })

  /**
   * Permet de pallier à un problème de perte de focus à l'intérieur de la modale. En effet, si on clique dans le contenu de la slot "contenu" et qu'on fait TAB, le focus
   * tombe dans la page en dessous car le keydown est sur le body de la page (probablement car nous sommes dans une slot).
   * Nous cachons donc le contenu de la slot, récupérons son html et l'assignons nous-même au contrôle. De cette façon nous allons nous réglons le problème et en bonus
   * nous nous assurons d'une conformité visuelle, puisque c'est le css de notre composant qui va s'appliquer et non celui de l'application.
   * NOTE. Le problème ne semble pas se produire avec le composant utd-dialog. On dirait que le fait que d'autres contrôles focusables sont présents empêche le problème. Je ne comprends pas vraiment.
   */
  function assignerHtmlSlotContenu() {
    if(slots.length){
      const slotContenu = thisComponent.querySelector("[slot=contenu]")
      
      if(slotContenu){
        const contenuHtml = thisComponent.querySelector("[slot=contenu]").innerHTML
        
        if(contenuHtml){
          htmlSlotContenu = contenuHtml
        }
      }     
    }
  }

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

  function conserverFocusInfobulle(e) {
    thisComponent.shadowRoot.getElementById(idEntete).focus()
    Utils.conserverFocusElement(thisComponent.shadowRoot.getElementById(idModale), thisComponent)
  }
</script>

<span class="utd-component utd-infobulle">
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
      in:fly={{ y: 200, duration: 500 }}
      out:fly={{ y: 200, duration: 250 }}
      on:introend={conserverFocusInfobulle}
      on:outroend={finAnimationFermeture}
      aria-modal="true"
      role="dialog"
    >
      <span class="utd-container entete">
        <h1 id={idEntete} tabindex="-1">
          <span class="utd-sr-only">{@html srTexteTitre}</span>
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
          {#if Utils.slotExiste(slots, 'contenu')}
            <slot name="contenu" class="utd-d-none"/>
            <span>
              {@html htmlSlotContenu}              
            </span>
          {:else}
            {#if contenu}
              {@html contenu}
            {/if}
          {/if}              
          </span>
      </span>
    </span>
  {/if}
</span>

<link rel='stylesheet' href='/css/utd-webcomponents-v1.3.0.min.css'>
