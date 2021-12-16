<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-dialog" />

<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition"
  import { get_current_component } from "svelte/internal"
  import { Utils } from './utils'
  export let afficher = 'false'
  export let titre = ""
  export let lang = "fr"
  export let srboutonfermer = ""
  export let idfocus = ""

  const idModale = Utils.genererId()
  const idEntete = Utils.genererId()
  const srTexteBoutonFermer = srboutonfermer  
    ? srboutonfermer
    : lang === "fr"
    ? "Fermer"
    : "Close"
  let estModaleAffichee = afficher === 'true'
  const thisComponent = get_current_component()
  let html
  let body
  let slots = []
  let mounted = false

  onMount(() => {
    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    body = thisComponent.getRootNode().getElementsByTagName("body")[0]
    slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
    mounted = true  
  })

  // Watch sur la prop afficher
  $: toggleAfficher(afficher) 

  function masquerModale(raisonFermeture) {    
    estModaleAffichee = false
    afficher = 'false'
    
    //On redonne le focus au contrôle spécifié (normalement celui qui a initié l'affichage de la fenêtre modale)
    const controleFocus = thisComponent.getRootNode().getElementById(idfocus)
    if(controleFocus){
      controleFocus.focus()
    }

    Utils.dispatchWcEvent(thisComponent, "fermeture", {raisonFermeture: raisonFermeture})
  }
  
  // Exécuté lorsque la valeur de la prop "afficher" change
  function toggleAfficher(){
    if(mounted){
      if(afficher === 'true'){
        Utils.ajusterInterfaceAvantAffichageModale(html, body)
        estModaleAffichee = true       
      } else {
        if(estModaleAffichee){
          masquerModale()
        }
      }
    }
  }

  function keydown(e) {
    if (e.key === "Escape") {
      masquerModale('Escape')
    }
  }

  function clickModale(e) {
    if(e.target === e.currentTarget){
      masquerModale('ClickBackdrop')
    }
  }

  function finAnimationFermeture(e) {
    Utils.ajusterInterfaceApresFermetureModale(html, body, thisComponent.shadowRoot.getElementById(idModale))
    Utils.dispatchWcEvent(thisComponent, "apresFermeture")
  }

  function ajusterModalePendantAffichage(e){
    const modale = thisComponent.shadowRoot.getElementById(idModale)
    Utils.ajusterInterfacePendantAffichageModale(body, modale)

    thisComponent.shadowRoot.getElementById(idEntete).focus()
    Utils.conserverFocusElement(modale, thisComponent)
  }
</script>

{#if estModaleAffichee}
  <div class="utd-backdrop" on:click={() => masquerModale('ClickBackdrop')} />
  <div
    tabindex="-1"
    aria-labelledby={idEntete}
    class="utd-dialog"
    id={idModale}
    on:click={clickModale}
    on:keydown={keydown}
    in:fly={{ y: 200, duration: 750 }}
    out:fly={{ y: 200, duration: 500 }}
    on:introend={ajusterModalePendantAffichage}
    on:outroend={finAnimationFermeture}
    aria-modal="true"
    role="dialog"
  >

    <div class="conteneur">
        <button
        type="button"
        class="close"
        on:click={() => masquerModale('BoutonFermer')}
        aria-label={srTexteBoutonFermer}
      >
        <span
          aria-hidden="true"
          class="utd-icone-svg x-fermer-bleu"
        />
      </button>
      <div class="principal">
        <div class="entete">
          <h1 id={idEntete} tabindex="-1">
            {titre}
          </h1>
        </div>
        <div class="corps">
          <slot name="contenu" />
        </div>
        {#if Utils.slotExiste(slots, 'pied')}
          <div class="pied">
            <slot name="pied" />
          </div>    
        {/if}    
      </div>
    </div>
  </div>  
{/if}

<link rel='stylesheet' href='/css/utd-webcomponents-v1.2.0.min.css'>
<style>
</style>
