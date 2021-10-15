<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-dialog" />

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

  const idModale = Utils.genererId()
  const idEntete = Utils.genererId()
  const srTexteBoutonFermer = srboutonfermer
    ? srboutonfermer
    : lang === "fr"
    ? "Fermer"
    : "Close"
  let controleModale
  const thisComponent = get_current_component()
  let html
  onMount(() => {
    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  })
  // Watch sur la prop afficher
  $: toggleAfficher(afficher) 

  function masquerModale(raisonFermeture) {
    
    Utils.dispatchWcEvent(thisComponent, "avantFermeture", {raisonFermeture: raisonFermeture})

    setTimeout(() => {
      html.classList.remove("modale-ouverte"); 
      Utils.dispatchWcEvent(thisComponent, "apresFermeture", {raisonFermeture: raisonFermeture})
    }, 500);    
    afficher = false
  }
  
  // Exécuté lorsque la valeur de la prop "afficher" change
  function toggleAfficher(){
    if(afficher){
      html.classList.add("modale-ouverte")
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

  function obtenirControleModale() {
    controleModale = thisComponent.shadowRoot.getElementById(idModale)
    return controleModale
  }

  function conserverFocusFenetreModale(e) {
    const controleModale = obtenirControleModale()
    thisComponent.shadowRoot.getElementById(idEntete).focus()
    Utils.conserverFocusElement(controleModale)
  }
</script>

{#if afficher}
  <div class="backdrop" part="backdrop" on:click={() => masquerModale('ClickBackdrop')} />
  <div
    tabindex="-1"
    aria-labelledby={idEntete}
    class="modale"
    id={idModale}
    on:click={clickModale}
    on:keydown={keydown}
    in:fly={{ y: 200, duration: 1000 }}
    out:fly={{ y: 200, duration: 500 }}
    on:outroend={conserverFocusFenetreModale()}
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
          part="icone-svg"
          class="utd-icone-svg x-fermer-bleu"
        />
      </button>
      <div class="principal">
        <div class="entete">
          <h1 id={idEntete} tabindex="-1">
            <slot name="titre" />
          </h1>
        </div>
        <div class="corps">
          <slot name="contenu" />
        </div>
        {#if $$slots["pied"]}
          <div class="pied">
            <slot name="pied" />
          </div>    
        {/if}    
      </div>
    </div>
  </div>  
{/if}

<style>

  .modale {
      position: fixed;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      height: auto;
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    max-width: 536px; /* (600 - padding de côté) */
    position: relative;
    width: auto;
    padding: 0 32px;
    box-shadow: 0 3px 12px rgba(34, 54, 84, 0.22);
    border: 1px solid #c5cad2;
    background-color: #fff;
    margin: 2rem auto;
  }

  .conteneur.sm {
    max-width: 300px
  }

  .principal {
    max-height: calc(100vh - 96px);
    overflow-y: auto;
    padding: 0 16px 32px 0;
    width: 100%;
  }

  /* Scrollbar du contenu */
  .principal::-webkit-scrollbar,
  .principal::-webkit-scrollbar-thumb,
  .principal::-webkit-scrollbar-track {
    background: transparent;
    border: none;
    border-radius: 0.3125rem;
    height: 50%;
    width: 0.625rem;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .principal::-webkit-scrollbar-button,
  .principal::-webkit-scrollbar-track-piece,
  .principal::-webkit-scrollbar-corner,
  .principal::-webkit-resizer {
    display: none;
  }

  .principal::-webkit-scrollbar-thumb {
    background-color: var(--couleur-bleu-pale);
    transition: all 0.35s;
  }

  .entete {
    position: relative;
    max-width: var(--largeur-max-zone-texte);
    margin-bottom: 24px;
  }

  .entete h1 {
    font-family: "Roboto-Bold", sans-serif;
    font-size: var(--text-xl-val);
    margin: 0;
  }

  .entete h1::after {
    content: "";
    display: block;
    margin: 0;
    width: 3rem;
    border-bottom: 4px solid;
    border-bottom-style: solid;
    border-bottom-color: var(--couleur-saumon);
  }

  .entete h1:focus {
    outline: 0;
  }

  .pied {
    margin-top: 24px;
  }

  .close {
    display: flex;
    line-height: 0;
    padding: 1rem;
    font-size: 1rem;
    opacity: 1;
    background-color: transparent;
    border: 0;
    margin: 0 -2rem -1rem auto;
  }

  .close:hover {
    cursor: pointer;
  }

  .utd-icone-svg.x-fermer-bleu {
    background-image: url("/images/utd-sprite-v1.0.0.svg#ico-xfermer-bleu");
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  .corps {
    line-height: 1.5rem;
    overflow-y: auto;
    font-size: 1rem;
  }

  .pied {
    display: flex;
    justify-content: end;  
  }

  @media (max-width: 425px) {
    .pied {
        flex-direction: column;
    }
  }


  @media (min-width: 992px) {
      .conteneur.lg,.contneeur.xl {
          max-width:800px
      }
  }

  @media (min-width: 1200px) {
      .conteneur.xl {
          max-width:1140px
      }
  }
</style>
