<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-piv-entete" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils";
import { slide } from "svelte/transition";
import { get_current_component } from "svelte/internal";

export let urlLogo = '/'
export let srcLogo = `${Utils.imagesRelativePath}utd-sprite.svg_versionUtd_#QUEBEC_blanc`   
export let altLogo = Utils.obtenirLanguePage() === 'fr' ? 'Signature du gouvernement du Québec.' : 'Québec government signature.'
export let titreSite1 = ''
export let titreSite2 = ''
export let urlTitreSite = '/'
export let texteLangueAlternative = Utils.obtenirLanguePage() === 'fr' ? 'English' : 'Français'
export let urlLangueAlternative = ''
export let texteNousJoindre = Utils.obtenirLanguePage() === 'fr' ? 'Nous joindre' : 'Contact us'
export let urlNousJoindre = ''
export let passerContenu = 'true'
export let urlPasserContenu = '#main'
export let textePasserContenu = Utils.obtenirLanguePage() === 'fr' ? 'Passer au contenu' : 'Skip to content'
export let afficherRecherche = 'false'
export let titleBoutonRecherche = Utils.obtenirLanguePage() === 'fr' ? 'Afficher ou masquer la zone de recherche' : 'Display or hide the search box'
export let urlContenuRecherche = ''

const srcImageBoutonToggleRecherche = `${Utils.imagesRelativePath}utd-sprite.svg_versionUtd_#ico-loupe-piv-droite`

const thisComponent = get_current_component()
let slots = []
let mounted = false
let estZoneRechercheVisible = false
let focusControleRecherche = false
let estAffichagePleineLargeur = false


onMount(() => {  
  slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
  
  estAffichagePleineLargeur = document.getElementsByTagName('body')[0].classList.contains('utd-pleine-largeur')

  mounted = true
  
  if(afficherRecherche === 'true') {

    //Ici on utilise l'objet global window, car pour une raison inconnue, impossible de rafraichir l'écran avec l'utilisation d'une variable svelte... Tout essayé, avec une watch et tout... rien à faire. C'est un peu un mystère. La seule solution trouvée pour le moment est d'utiliser l'objet global "window". Comme il n'y a qu'un seul contrôle PIV entête dans une page c'est correct.
    Utils.dispatchWcEvent(thisComponent, "initialiserRecherche", {definirContenuRecherche: (donnees) => { window.contenuRecherchePiv = donnees.contenu }})


    thisComponent.shadowRoot.querySelector("utd-barre-recherche").addEventListener("initialiser", e => {
//      console.log('contenuRecherchePiv transmis barre recherche')  
//      console.log(window.contenuRecherchePiv)  
      e.detail.definirContenuRecherche({contenu: window.contenuRecherchePiv})    
    })      
  }
  
  Utils.reafficherApresChargement(thisComponent)
})



function clickLien(){
  Utils.dispatchWcEvent(thisComponent, "clickLien")
}

function clickToggleRecherche(){
  estZoneRechercheVisible = !estZoneRechercheVisible

  setTimeout(() => {
    focusControleRecherche = true
    
    setTimeout(() => {
      focusControleRecherche = null
    })
  })
}

</script>

{#if passerContenu === 'true'}
  <div class="utd-conteneur-passer-contenu">
    <div class="utd-passer-contenu">
        <a href="{urlPasserContenu}" on:click={clickLien} class="utd-passer-contenu">{textePasserContenu}</a>
    </div>   
  </div>
{/if}

<div class="utd-piv-entete{!mounted ? ' utd-d-none' : ''}{estAffichagePleineLargeur ? ' utd-pleine-largeur': ''}">
  <div class="utd-container">
    <div class="conteneur-sections">
      <div class="section-gauche signature-gouvernement">
        <a href="{urlLogo}">
          <img alt="{altLogo}" src="{srcLogo}">
        </a>
      </div>
      <div class="section-centre">
        <a href="{urlTitreSite}" class="titre-site">
          <span>{titreSite1}</span>
          {#if titreSite2}
            <span class="description">{titreSite2}</span>  
          {/if}         
        </a>
      </div>

      <div class="section-droite">
          
        {#if afficherRecherche === 'true' && window.contenuRecherchePiv !== null}
          <button type="button" class="bouton-toggle-recherche" aria-expanded="{estZoneRechercheVisible ? 'true' : 'false'}" aria-controls="recherchePIV" title="Afficher ou masquer la zone de recherche" on:click={clickToggleRecherche}>
            <img aria-hidden="true" src="{srcImageBoutonToggleRecherche}" width="24" height="24">
          </button>            
        {/if}

        {#if Utils.slotExiste(slots, 'liens')}
          <slot name="liens" />
        {:else}    
          {#if urlNousJoindre || urlLangueAlternative}
            <ul>
              {#if urlLangueAlternative}
                <li><a href="{urlLangueAlternative}">{texteLangueAlternative}</a></li>  
              {/if}
              {#if urlNousJoindre}              
                <li><a href="{urlNousJoindre}">{texteNousJoindre}</a></li>
              {/if}
            </ul>
          {/if}
        {/if}            
      </div>
    </div>
    <div class="zone-titre-recherche">
      <div class="titre-site">
        <span>{titreSite1}</span>
        {#if titreSite2}
          <span class="description">{titreSite2}</span>  
        {/if}
      </div>
      
      {#if afficherRecherche === 'true' && window.contenuRecherchePiv !== null}
        <button type="button" class="bouton-toggle-recherche visible" id="btnToggleRecherchePIVmobile" aria-expanded="{estZoneRechercheVisible ? 'true' : 'false'}" aria-controls="recherchePIV" title="{titleBoutonRecherche}" on:click={clickToggleRecherche}>
          <img aria-hidden="true" src="{srcImageBoutonToggleRecherche}" width="24" height="24">
        </button>            
      {/if}    
    </div>          

    {#if afficherRecherche === 'true'}
      <div id="recherchePIV" class="{estZoneRechercheVisible ? null : 'utd-d-none'}" >
        <utd-barre-recherche focus="{focusControleRecherche ? 'true' : null}" url-contenu-recherche="{urlContenuRecherche || null}" contexte-piv="true"></utd-barre-recherche>
      </div>
    {/if}    

  </div>
</div>



<link rel='stylesheet' href='{Utils.cssFullPath}'>
