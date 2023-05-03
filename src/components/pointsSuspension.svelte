<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-points-suspension" />

<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition"
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal" 
  export let nbLignes = '1'

  const idConteneur = Utils.genererId()
  const idContenuSupplementaire = Utils.genererId()
  const idTexte = Utils.genererId()
  const idTexteCache = Utils.genererId()
  const thisComponent = get_current_component()
  let estReduit = true
  let conteneur
  let controleTexte
  let controleTexteCache
  let hauteurLigne = 0
  let hauteurMax = 24
  let texteComplet = thisComponent.textContent
  let texteCache = ""

  onMount(() => {      
    hauteurLigne = obtenirHauteurLigne(thisComponent)
    hauteurMax = hauteurLigne * parseInt(nbLignes)

    conteneur = thisComponent.shadowRoot.getElementById(idConteneur)
    controleTexte = thisComponent.shadowRoot.getElementById(idTexte)
    controleTexteCache = thisComponent.shadowRoot.getElementById(idTexte)
    estReduit = doitTronquerTexte()

    if(estReduit){
      thisComponent.textContent = ""
      tronquerTexte()
    } 

    Utils.reafficherApresChargement(thisComponent)
  })

  function toggleAffichageContenu(){
    estReduit = !estReduit
    controleTexteCache.focus()

  }

  function obtenirHauteurLigne(conteneur) {
    const style = window.getComputedStyle(conteneur, null)
    const lineHeight = style.getPropertyValue('line-height')
    
    console.log(lineHeight)
    
    if (lineHeight === 'normal') {
        // Créer un élément temporaire afin d'obtenir la hauteur de la ligne
        const el = document.createElement('span');
        el.style.width = '300px';
        el.style.position = 'absolute';
        el.style.visibility = 'hidden';
        el.innerText = 'Test';
        conteneur.appendChild(el);

        const height = el.clientHeight;
        conteneur.removeChild(el);
        return height;
    }
    return parseFloat(lineHeight);
}  

function doitTronquerTexte() {
  return controleTexte.getBoundingClientRect().height > hauteurMax
}

function tronquerTexte() {

  let texteCourant = "";
  let posGauche = 0;
  let posDroite = texteComplet.length - 1;
  let posMilieu = 0
  
  while (posGauche < posDroite) {
    posMilieu = Math.floor((posGauche + posDroite) / 2)
    if (posGauche === posMilieu) {
      break
    }
    const texteTemp = texteComplet.slice(posGauche, posMilieu)
    controleTexte.textContent = texteCourant + texteTemp
    
    const { height } = conteneur.getBoundingClientRect()
    if (height > hauteurMax) {
      posDroite = posMilieu
    } else {
      texteCourant += texteTemp
      posGauche = posMilieu
    }
  }

  // Trouver le dernier espace avant notre tronquage et utiliser cette position pour le tronquage.
  const posDernierEspace = texteCourant.lastIndexOf(' ')

  texteCache = texteComplet.slice(posDernierEspace + 1)
  controleTexte.textContent = texteComplet.slice(0, posDernierEspace)
}

</script>

<div class="utd-component utd-points-suspension {!estReduit ? 'ouvert' : ''}" id="{idConteneur}" >
  <span class="texte" id="{idTexte}">
    <slot></slot>    
  </span>
  
 
  {#if estReduit}    
    <a href="#" role="button" class="ellipsis" title="Voir plus" aria-controls="{idContenuSupplementaire}" aria-expanded="{!estReduit}" on:click|preventDefault={toggleAffichageContenu}>
      <span aria-hidden="true">...</span>
    </a>
  {:else} 
    <div class="texte-supplementaire" id="{idTexteCache}" transition:slide="{{duration:500}}" tabindex="-1">{texteCache}</div>
  {/if}    
</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
