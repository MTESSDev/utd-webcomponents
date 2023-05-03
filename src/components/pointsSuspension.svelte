<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-points-suspension" />

<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition"
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal" 
  export let nbLignes = '1'

  // Références pour accessibilité
  // https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons/

  const idConteneur = Utils.genererId()
  const idTexteSupplementaire = Utils.genererId()
  const idTexte = Utils.genererId()
  const thisComponent = get_current_component()
  let estTexteCompletAffiche = false
  let estAffichageTexteTronque = true
  let conteneur
  let controleTexte
  let controleTexteSupplementaire
  let hauteurLigne = 0
  let hauteurMax = 24
  let texteComplet = thisComponent.textContent
  let texteCache = ""
  let estAjustementAffichageEnCours = true
  let estAffichageInitial = true

  onMount(() => {      
    hauteurLigne = obtenirHauteurLigne(thisComponent)
    hauteurMax = hauteurLigne * parseInt(nbLignes)

    conteneur = thisComponent.shadowRoot.getElementById(idConteneur)
    controleTexte = thisComponent.shadowRoot.getElementById(idTexte)

    conteneur.style.maxHeight = hauteurMax + 'px'

    ajusterAffichageControle()

    Utils.reafficherApresChargement(thisComponent)

    // Détecter les resize sur le composant et redessiner
    observerRezise()          
  })

  function ajusterAffichageControle() {

    estAjustementAffichageEnCours = true
    controleTexte.textContent = texteComplet
    controleTexteSupplementaire = thisComponent.shadowRoot.getElementById(idTexteSupplementaire)

    if(controleTexteSupplementaire){
      controleTexteSupplementaire.textContent = ''
    }


    estAffichageTexteTronque = doitTronquerTexte()

    if(estAffichageTexteTronque){
      thisComponent.textContent = ""
      tronquerTexte()
    } 

    estAjustementAffichageEnCours = false
  }

  const resizeObserverDebounced = Utils.debounce((entries) => resizeObserver(entries), 250)

  function observerRezise(){
    const observer = new ResizeObserver(resizeObserverDebounced)

    observer.observe(thisComponent)    
  }
  
  function resizeObserver(entries) {
      entries.forEach(entry => {
       
        if(estAffichageInitial){
          estAffichageInitial = false
          return
        }

        if(estAjustementAffichageEnCours){
          estAjustementAffichageEnCours = false
          return
        }
        
        if(!estTexteCompletAffiche){
          console.log('resize')
          ajusterAffichageControle()
        }
      })
  }

  function afficherContenuSupplementaire(){
    estTexteCompletAffiche = true
    conteneur.style.maxHeight = null

    setTimeout(() => {
      const controleTexteSupplementaire = thisComponent.shadowRoot.getElementById(idTexteSupplementaire)
      controleTexteSupplementaire.focus()
    }, 250)    
  }

  function obtenirHauteurLigne(conteneur) {
    const style = window.getComputedStyle(conteneur, null)
    const lineHeight = style.getPropertyValue('line-height')    
   
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
    
    const { height } = controleTexte.getBoundingClientRect()
    if (height > hauteurMax) {
      posDroite = posMilieu
    } else {
      texteCourant += texteTemp
      posGauche = posMilieu
    }
  }

  // Ici petit ajustement de 4 caractères pour compenser l'ajustement requis avec notre ...
  texteCourant = texteComplet.slice(0, posMilieu - 4)

  // Trouver le dernier espace avant notre tronquage et utiliser cette position pour le tronquage.
  const posDernierEspace = texteCourant.lastIndexOf(' ')

  texteCache = texteComplet.slice(posDernierEspace)
  controleTexte.textContent = texteComplet.slice(0, posDernierEspace)
}

</script>

<div class="utd-component utd-points-suspension{estAjustementAffichageEnCours ? ' ajustement-affichage-en-cours' : ''}" id="{idConteneur}" >
  <span class="texte" id="{idTexte}">
    <slot></slot>    
  </span>
 
  {#if estAffichageTexteTronque && !estTexteCompletAffiche}    
    <a href="#" role="button" class="ellipsis" title="Voir plus" on:click|preventDefault={afficherContenuSupplementaire}>
      <span aria-hidden="true">...</span>
    </a>
  {:else} 
    <span class="texte-supplementaire" id="{idTexteSupplementaire}" transition:fade="{{duration:250}}" tabindex="-1">{texteCache}</span>
  {/if}    
</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
