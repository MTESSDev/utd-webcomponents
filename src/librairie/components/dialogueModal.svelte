<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-dialog" />

<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition"
  import { get_current_component } from "svelte/internal"
  import { Utils } from './utils'
  export let afficher = 'false'
  export let type = ''
  export let estfenetremessage = 'false' //Privée (utilisée dans notre plugin message)
  export let raisonFermeture = '' //Privée (utilisée dans notre plugin message)
  export let titre = ''
  export let srBoutonFermer = Utils.obtenirLanguePage() === "fr" ? "Fermer" : "Close"  
  export let idFocusOuverture = ''
  export let idFocusFermeture = ''
  export let boutonsTexteLong = 'false'
  export let forcerBoutonsInline = 'false'  
  export let affichageLateral = 'false'

  const idModale = Utils.genererId()
  const idEntete = Utils.genererId()
  const idCorps = Utils.genererId()

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
    
    if(Utils.estMobile()){
      html.classList.add("est-mobile")      
    }    
  })

  // Watch sur la prop afficher
  $: toggleAfficher(afficher) 

  function masquerModale(raisonFermetureModale) {    
    estModaleAffichee = false
    afficher = 'false'

    //Si une raison de fermeture est reçue en param, on l'utilise sinon on prend la raison de fermeture qui est sur la modale "raisonFermeture" qui va contenir une raison de fermeture externe à la modale (ex. clic sur bouton primaire ou secondaire)
    const raison = raisonFermetureModale || raisonFermeture

    //On redonne le focus au contrôle spécifié (normalement celui qui a initié l'affichage de la fenêtre modale)
    const controleFocus = thisComponent.getRootNode().getElementById(idFocusFermeture)
    if(controleFocus){
      controleFocus.focus()
    }

    Utils.dispatchWcEvent(thisComponent, "fermeture", {raisonFermeture: raison})
  }
  
  function animationAffichageOuverture(node) {
		return affichageLateral === 'false' ? fade(node, { duration: 250 }) : fly(node, { x: 200, duration: 250 });  
  }

  function animationAffichageFermeture(node) {
		return affichageLateral === 'false' ? fade(node, { y: 200, duration: 250 }) : fly(node, { x: 200, duration: 250 });  
  }

  // Exécuté lorsque la valeur de la prop "afficher" change
  function toggleAfficher(){
    if(mounted){
      if(afficher === 'true'){
        raisonFermeture = ''       
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

    //On force un scrollTop ici car Android ne semble pas supporter le preventScroll de la méthode focus (mais selon la doc il devrait). SOLUTION EN ATTENDANT MIEUX.
    modale.scrollTop = 0      
  }

  function estBouton(element) {
    const tag = element.tagName.toLowerCase()
    return tag === 'button' || element.getAttribute('type') === 'submit'
  }

  function donnerfocusPremierElementFocusable(modale){
    let premierElementFocusable = null
    if(estfenetremessage === 'true'){
      premierElementFocusable = thisComponent.querySelector('.utd-btn.primaire')
    } else {

      if(idFocusOuverture){
        const controleFocusOuverture = document.getElementById(idFocusOuverture)
        if(controleFocusOuverture){
          premierElementFocusable = controleFocusOuverture
        }
      }

      if(!premierElementFocusable) {
        const elementsFocusablesShadow = Array.from(Utils.obtenirElementsFocusables(modale))
        const elementsFocusablesRoot = Array.from(Utils.obtenirElementsFocusables(thisComponent))
        const elementsFocusables = elementsFocusablesRoot.concat(elementsFocusablesShadow)

        premierElementFocusable = elementsFocusables[0]

        //On force le mode "fenêtre de message" si le premier élément focusable est un bouton de la slot "pied"
        if(estBouton(premierElementFocusable)){
          const slotPied = Utils.obtenirSlot(slots, 'pied')
          if(slotPied){
            const boutonsSlotPied = slotPied.querySelectorAll('button, input[type="submit"]')
            
            if(boutonsSlotPied.length){                          
              for (let i = 0; i < boutonsSlotPied.length - 1; i++) {
                if (boutonsSlotPied[i] === premierElementFocusable) {
                  premierElementFocusable = thisComponent.querySelector('.utd-btn.primaire') || premierElementFocusable
                  estfenetremessage = true
                  break; 
                }                
              }
            }
          }          
        }
      }     
    }
    
    premierElementFocusable.focus({preventScroll: true})      
    //premierElementFocusable.focus()    
  }

</script>

{#if estModaleAffichee}
  <div class="utd-backdrop" on:click={() => masquerModale('clickBackdrop')} />
  <div
    aria-labelledby={idEntete}
    aria-describedby={estfenetremessage === 'true' ? idCorps : null}
    class="utd-component utd-dialog {estfenetremessage === 'true' ? 'fenetre-message' : ''} {boutonsTexteLong === 'true' ? 'boutons-texte-long' : ''} {affichageLateral === 'true' ? 'affichage-lateral' : ''} {forcerBoutonsInline === 'true' ? 'boutons-inline' : ''}"
    id={idModale}
    on:click={clickModale}
    on:keydown={keydown}
    in:animationAffichageOuverture
    out:animationAffichageFermeture
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
        aria-label={srBoutonFermer}
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
          <slot/>
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
