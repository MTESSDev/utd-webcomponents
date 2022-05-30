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
  export let type = ''
  export let estfenetremessage = 'false'
  export let raisonfermeture = ''
  export let titre = ''
  export let lang = 'fr'
  export let srboutonfermer = ''
  export let idfocus = ''
  export let estboutonstextelong = 'false'

  const idModale = Utils.genererId()
  const idEntete = Utils.genererId()
  const idCorps = Utils.genererId()
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

  function masquerModale(raisonFermetureModale) {    
    estModaleAffichee = false
    afficher = 'false'

    //Si une raison de fermeture est reçue en param, on l'utilise sinon on prend la raison de fermeture qui est sur la modale "raisonfermeture" qui va contenir une raison de fermeture externe à la modale (ex. clic sur bouton primaire ou secondaire)
    const raison = raisonFermetureModale || raisonfermeture

    //On redonne le focus au contrôle spécifié (normalement celui qui a initié l'affichage de la fenêtre modale)
    const controleFocus = thisComponent.getRootNode().getElementById(idfocus)
    if(controleFocus){
      controleFocus.focus()
    }

    Utils.dispatchWcEvent(thisComponent, "fermeture", {raisonFermeture: raison})
  }
  
  // Exécuté lorsque la valeur de la prop "afficher" change
  function toggleAfficher(){
    if(mounted){
      if(afficher === 'true'){
        raisonfermeture = ''
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
      masquerModale('escape')
    }
  }

  function clickModale(e) {
    if(e.target === e.currentTarget){
      masquerModale('clickBackdrop')
    }
  }

  function finAnimationFermeture(e) {
    Utils.ajusterInterfaceApresFermetureModale(html, body, thisComponent.shadowRoot.getElementById(idModale))
    Utils.dispatchWcEvent(thisComponent, "apresFermeture")
  }

  function ajusterModaleDebutAffichage(e){
    const modale = thisComponent.shadowRoot.getElementById(idModale)

    donnerfocusPremierElementFocusable(modale)
    Utils.conserverFocusElement(modale, thisComponent)
  }

  function ajusterModaleFinAffichage(e){
    const modale = thisComponent.shadowRoot.getElementById(idModale)
    Utils.ajusterInterfacePendantAffichageModale(body, modale)
  }

  function donnerfocusPremierElementFocusable(modale){
    let premierElementFocusable = null
    if(estfenetremessage === 'true'){
      premierElementFocusable = thisComponent.querySelector('.utd-btn.primaire')
    } 
    
    if(!premierElementFocusable) {
      const elementsFocusablesShadow = Array.from(Utils.obtenirElementsFocusables(modale))
      const elementsFocusablesRoot = Array.from(Utils.obtenirElementsFocusables(thisComponent))
      const elementsFocusables = elementsFocusablesRoot.concat(elementsFocusablesShadow)
      premierElementFocusable = elementsFocusables[0]
    }

    premierElementFocusable.focus({preventScroll: true})
  }
</script>

{#if estModaleAffichee}
  <div class="utd-backdrop" on:click={() => masquerModale('clickBackdrop')} />
  <div
    tabindex="-1"
    aria-labelledby={idEntete}
    aria-describedby={estfenetremessage === 'true' ? idCorps : null}
    class="utd-component utd-dialog {estfenetremessage === 'true' ? 'fenetre-message' : ''} {estboutonstextelong === 'true' ? 'boutons-texte-long' : ''}"
    id={idModale}
    on:click={clickModale}
    on:keydown={keydown}
    in:fly={{ y: 200, duration: 500 }}
    out:fly={{ y: 200, duration: 250 }}
    on:introstart={ajusterModaleDebutAffichage}
    on:introend={ajusterModaleFinAffichage}
    on:outroend={finAnimationFermeture}
    aria-modal="true"
    role="dialog"
  >

    <div class="conteneur">
        <button
        type="button"
        class="close"
        on:click={() => masquerModale('boutonFermer')}
        aria-label={srTexteBoutonFermer}
      >
        <span
          aria-hidden="true"
          class="utd-icone-svg x-fermer-bleu"
        />
      </button>
      <div class="principal">
        <div class="entete {type ? 'avec-type' : ''}">
          {#if type}
            <span class="utd-icone-svg {type}" aria-hidden="true"></span>
          {/if}   
          <h1 id={idEntete} class="titre-dialog">
            {titre}
          </h1>
        </div>
        <div class="corps" id={idCorps}>
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

<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
