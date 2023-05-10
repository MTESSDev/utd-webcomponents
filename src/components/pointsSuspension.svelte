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
  export let affichageInitial = 'true'
  export let afficherTexteLien = 'false'
  export let texteLien = Utils.obtenirLanguePage() === "fr" ?  "Voir plus" : "Show more"

  // Références pour accessibilité
  // https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons/

  const idConteneur = Utils.genererId()
  const idTexteSupplementaire = Utils.genererId()
  const idTexte = Utils.genererId()
  const thisComponent = get_current_component()
  let estTexteCompletAffiche = false
  let estAffichageTexteTronque = false
  let conteneur
  let controleTexte
  let controleTexteSupplementaire
  let hauteurMax = 24
  let texteComplet = ''
  let texteSupplementaire = ''
  let estAjustementAffichageEnCours = true
  let estEvenementObserverEnCours = false
  let mounted = false

  onMount(() => {      

    //
    if (!window.ResizeObserver){
      estAjustementAffichageEnCours = false
      estTexteCompletAffiche = true
      Utils.reafficherApresChargement(thisComponent)
      mounted = true    
    } else {

      conteneur = thisComponent.shadowRoot.getElementById(idConteneur)
      controleTexte = thisComponent.shadowRoot.getElementById(idTexte)
      texteComplet = thisComponent.textContent

      ajusterAffichageControle()

      Utils.reafficherApresChargement(thisComponent)

      // Détecter les resize sur le composant et redessiner
      observerRezise()  

      mounted = true    
    } 
  })


  // Watch sur la prop affichageInitial
  $: initialiserAffichage(affichageInitial) 

  function initialiserAffichage(){
    if(mounted && affichageInitial === 'true'){    
      estTexteCompletAffiche = false  
      ajusterAffichageControle()
    }
  }

  function ajusterAffichageControle() {
    estAjustementAffichageEnCours = true
    estEvenementObserverEnCours = true
    controleTexte.textContent = ""
    conteneur.removeAttribute('style')

    // On doit repaint ici afin que l'interface soit à jour avant d'effectuer les ajustements à l'affichage du contrôle (ex. le bouton ... doit être retiré si présent, car bousille le calcul pour la hauteur)
    setTimeout(() => {
      ajusterAffichageControle2()
    })
  }

  function ajusterAffichageControle2() {
    hauteurMax = obtenirHauteurMaximale()
    
//    conteneur.style.maxHeight = hauteurMax + 'px'

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

    setTimeout(() => {
      estEvenementObserverEnCours = false
    }, 500)
  }

  const resizeObserverDebounced = Utils.debounce((entries) => resizeObserver(entries))

  function observerRezise(){
    const observer = new ResizeObserver(resizeObserverDebounced)

    observer.observe(thisComponent)    
  }
  
  function resizeObserver(entries) {
      entries.forEach(entry => {
       
        if(affichageInitial === 'true'){
          affichageInitial = 'false'
          return
        }

        if(estEvenementObserverEnCours){
          return
        }
        
        if(!estTexteCompletAffiche){
          ajusterAffichageControle()
        }
      })
  }

  function afficherContenuSupplementaire(){
    conteneur.removeAttribute('style')
    estTexteCompletAffiche = true

    setTimeout(() => {
      const controleTexteSupplementaire = thisComponent.shadowRoot.getElementById(idTexteSupplementaire)
      controleTexteSupplementaire.focus()
    }, 250)    
  }

  function obtenirHauteurMaximale() {
      const nombreLignes = parseInt(nbLignes)
      
      let htmlBidon = 'TjpyYZ'
      for (let i = 1; i < nombreLignes; i++) {
        htmlBidon += '<br/>TjpyYZ'          
      }

      controleTexte.innerHTML = htmlBidon

      const height = controleTexte.getBoundingClientRect().height
      controleTexte.textContent = ''

      // On se donne un petit jeu sur la hauteur... Il y a toujours une petite différence et ça cause problème (à cause du lien ... qui est plus gros entre autres)
      return height + 2
}  

function doitTronquerTexte() {
  console.log('hauteur contrôle texte -> ' + controleTexte.getBoundingClientRect().height + '     hauteur max -> ' + hauteurMax)
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
    controleTexte.innerHTML = texteCourant + texteTemp
    
    const height = controleTexte.getBoundingClientRect().height
    console.log('G ' + posGauche + '    M ' + posMilieu + '   height -> ' + height + '   hauteurMax -> ' + hauteurMax)
//Si height = 0 settimeout et reprendre
    if (height > hauteurMax) {
      posDroite = posMilieu
    } else {
      texteCourant += texteTemp
      posGauche = posMilieu
    }
  }

  // Ici petit ajustement de x caractères pour compenser l'ajustement requis avec notre "..."
  texteCourant = texteComplet.slice(0, posMilieu - obtenirNbCaracteresTexteLien())

  // Trouver le dernier espace avant notre tronquage et utiliser cette position pour le tronquage.
  const posDernierEspace = texteCourant.lastIndexOf(' ')

  texteSupplementaire = texteComplet.slice(posDernierEspace)
  controleTexte.textContent = texteComplet.slice(0, posDernierEspace)
}

function obtenirNbCaracteresTexteLien(){
  if(afficherTexteLien === 'true'){
    return `... [${texteLien}]`.length
  } else {
    return 5
  }

}
</script>

<div class="utd-component utd-points-suspension{estAjustementAffichageEnCours ? ' ajustement-en-cours' : ''}" id="{idConteneur}" >
  <span class="texte" id="{idTexte}">
    <slot></slot>    
  </span>
 
  {#if estAffichageTexteTronque && !estTexteCompletAffiche}    
    <a href="#" role="button" class="ellipsis {estAjustementAffichageEnCours ? ' utd-d-none' : ''}" title="{afficherTexteLien === 'true' ? null : texteLien}" on:click|preventDefault={afficherContenuSupplementaire}>
      <span aria-hidden="true">
        {#if afficherTexteLien === 'true'} 
          <span class="dots">...</span>&nbsp;[{texteLien}]        
        {:else}
          [<span class="dots">...</span>]        
        {/if}    
      </span>
      
      {#if afficherTexteLien === 'true'} 
        <span class="utd-sr-only">{texteLien}</span>
      {/if}    

    </a>
  {/if}    
  
  {#if estTexteCompletAffiche}    
    <span class="texte-supplementaire{estAffichageTexteTronque ? ' estAffichageTexteTronque' : ''}{estTexteCompletAffiche ? ' estTexteCompletAffiche' : ''}" id="{idTexteSupplementaire}" transition:fade="{{duration:250}}" tabindex="-1">{texteSupplementaire}</span>
  {/if}    

</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
