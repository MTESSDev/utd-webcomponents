<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-dialog" />

<script>
  import { onMount} from "svelte";
  import { fly, fade } from "svelte/transition"
  import { get_current_component } from "svelte/internal"
  import { Utils } from "./js/utils"
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

  const dureeMsAnimationOuverture = 250;
  const dureeMsAnimationFermeture = 250;

  let estModaleAffichee = afficher === 'true'
  const thisComponent = get_current_component()
  let html
  let body
  let slots = []
  let mounted = false
  let controleFocusFermeture = null

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

    //On redonne le focus au contrôle spécifié (normalement celui qui a initié l'affichage de la fenêtre modale). Après l'animation de fermeture afin de s'assurer qu'il puisse recevoir le focus.
    setTimeout(() => {

      if(idFocusFermeture){
        const controleFocus = thisComponent.getRootNode().getElementById(idFocusFermeture)
        if(controleFocus){
          controleFocus.focus()
        }
      } else if(controleFocusFermeture) {
        controleFocusFermeture.focus()
      }
    }, dureeMsAnimationFermeture)

    Utils.dispatchWcEvent(thisComponent, "fermeture", {raisonFermeture: raison})
  }
  
  function animationAffichageOuverture(node) {
		return affichageLateral === 'false' ? fade(node, { duration: dureeMsAnimationOuverture }) : fly(node, { x: 200, duration: dureeMsAnimationOuverture });  
  }

  function animationAffichageFermeture(node) {
		return affichageLateral === 'false' ? fade(node, { y: 200, duration: dureeMsAnimationFermeture }) : fly(node, { x: 200, duration: dureeMsAnimationFermeture });  
  }

  // Exécuté lorsque la valeur de la prop "afficher" change
  function toggleAfficher(){
    if(mounted){
      if(afficher === 'true'){

        if(!idFocusFermeture){
          if(document.activeElement){
            controleFocusFermeture = document.activeElement
          } else {
            controleFocusFermeture = null
          }
        }

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

  // Si un clic autre qu'un clic sur un élément qui est a l'extérieur de la fenêtre modale, on annule tout, afin que le focus demeure dans la fenêtre modale.
  // Sinon il était possible de cliquer à l'extérieur de la fenêtre, elle restait ouverte, mais notre fermeture avec ESC ne fonctionnait plus, jusqu'à ce que le focus revienne sur un contrôle à l'intérieur de la fenêtre modale.
  function mouseDown(e) {
    if(e.target === e.currentTarget){
      e.preventDefault()
      e.stopPropagation()
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
    if(Utils.estMobile()){
      modale.scrollTop = 0      
    }
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
        const controleFocusOuverture = thisComponent.querySelector(`#${idFocusOuverture}`)
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
                  estfenetremessage = 'true'
                  break; 
                }                
              }
            }
          }          
        }
      }     
    }
        
      premierElementFocusable.focus({preventScroll: true})            
  }

</script>

{#if estModaleAffichee}
  <div class="utd-backdrop"/>
  <div 
    aria-labelledby={idEntete}
    aria-describedby={estfenetremessage === 'true' ? idCorps : null}
    class="utd-component utd-dialog{estfenetremessage === 'true' ? ' fenetre-message' : ''}{boutonsTexteLong === 'true' ? ' boutons-texte-long' : ''}{affichageLateral === 'true' ? ' affichage-lateral' : ''}{forcerBoutonsInline === 'true' ? ' boutons-inline' : ''}"
    id={idModale}    
    on:mousedown={mouseDown}
    on:keydown={keydown}
    in:animationAffichageOuverture
    out:animationAffichageFermeture
    on:introstart={ajusterModaleDebutAffichage}
    on:introend={ajusterModaleFinAffichage}
    on:outroend={finAnimationFermeture}
    aria-modal="true"
    role="dialog"
    tabindex="-1"
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
        <div class="entete {type ? 'avec-type' : ''}" >
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

<link rel='stylesheet' href='{Utils.cssFullPath}'>
