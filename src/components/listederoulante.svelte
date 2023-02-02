<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
Référence : https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-none.html
-->
<svelte:options tag="utd-liste-deroulante" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  

export let multiple = "false"
export let recherchable = "false"
export let largeur = "md" //Valeurs possible sm, md, lg
export let texteAideUtilisation = Utils.obtenirLanguePage() === 'fr' ? "Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions." : "(en)Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions."
export let placeholder = Utils.obtenirLanguePage() === 'fr' ? "Sélectionner une valeur" : "(en)Sélectionner une valeur"
export let placeholderRecherche = Utils.obtenirLanguePage() === 'fr' ? "Rechercher dans la liste" : "(en)Rechercher dans la liste"
export let noResult = Utils.obtenirLanguePage() === 'fr' ? "Aucun résultat" : "(en)Aucun résultat"
export let results = Utils.obtenirLanguePage() === 'fr' ? "{x} suggestion(s) disponibles" : "(en){x} suggestion(s) disponibles"
export let deleteItem = Utils.obtenirLanguePage() === 'fr' ? "Supprimer {t}" : "(en)Supprimer {t}"
export let supprimer = Utils.obtenirLanguePage() === 'fr' ? "Supprimer" : "(en)Supprimer"

//TODO ajouter mutation observer sur le label (attribut aria-label + les nodes) qui appele definirAriaLabel
const thisComponent = get_current_component()
const idTexteUtilisation = Utils.genererId()
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idLabelFake = Utils.genererId()
const idControleSuggestions = Utils.genererId()

let mounted = false
let html
let composant
let controleConteneur
let controleSelection
//let controleBoutonToggle
let controleLabel
let idControleLabel = ""
let ariaLabel = null
let controleRecherche
let controleSelect
let controleConteneurResultats
let afficherOptions = false
let indexeFocusOption = null
let idActiveDescendant = null
let options = []
let suggestions = []
let optionsSelectionnees = []
let texteRecherche = ""

onMount(() => {  
  mounted = true
  html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  composant = thisComponent.shadowRoot.querySelector('.utd-liste-deroulante')
  controleConteneur = thisComponent.shadowRoot.querySelector('.conteneur')
  controleSelection = thisComponent.shadowRoot.querySelector('.selection')
//  controleBoutonToggle = recherchable === 'true' ? thisComponent.shadowRoot.querySelector('button.toggle') : null
  controleRecherche = thisComponent.shadowRoot.getElementById(idControleRecherche)
  controleConteneurResultats = thisComponent.shadowRoot.querySelector('.resultats')

  if(multiple === 'true' || recherchable === 'true'){
    ajusterControleSelectOriginal()
    
    options = obtenirOptions()
    definirSuggestions()
    definirOptionsSelectionnes()

//    controleConteneur.addEventListener('click', (event) => { clickSelection(event) });

    definirAttributsInitiauxSelectOriginal()
    observerAttributsSelectOrignal()
    observerAttributsLabelOrignal()
  }  
})


// Watches
$: toggleAfficherOptions(afficherOptions) 
$: majActiveDescendant(indexeFocusOption) 


function definirAttributsInitiauxSelectOriginal(){
  //const controle = controleBoutonToggle || controleConteneur
  majAttributControle(controleConteneur, 'aria-invalid', controleSelect.getAttribute('aria-invalid'))
  majAttributControle(controleConteneur, 'aria-required', controleSelect.getAttribute('aria-required'))
  definirAriaLabel()
  majAttributControle(controleConteneur, 'aria-description', obtenirTexteSelonAttributAria(controleSelect, 'aria-describedby'))
}

function definirAriaLabel(){

  //1 - aria-label sur le select
  if(controleSelect && controleSelect.getAttribute('aria-label')) {
    ariaLabel = controleSelect.getAttribute('aria-label')
    return
  }

  //2 - aria-label sur le label
  if(controleLabel && controleLabel.getAttribute('aria-label')){
      ariaLabel = controleLabel.getAttribute('aria-label')
      return
  }

  //3 - aria-labelledby sur le select
  const ariaLabelledBySelect = obtenirTexteSelonAttributAria(controleSelect, 'aria-labelledby')
  if(ariaLabelledBySelect){
    ariaLabel = ariaLabelledBySelect
    return
  }

  //4 - contenu textuel du label
  if(controleLabel){
    ariaLabel = obtenirTexteLecteurEcranControle(controleLabel)
  }

  return null
}

function observerAttributsSelectOrignal(){

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

        const nomAttribut = mutation.attributeName
        const nouvelleValeur = mutation.target.getAttribute(nomAttribut)
        
        let nomAttributMaj = nomAttribut === 'aria-describedby' ? 'aria-description' : nomAttribut

//        const controle = controleBoutonToggle || controleConteneur

        if(nomAttribut === 'aria-describedby'){
          majAttributControle(controleConteneur, nomAttributMaj, obtenirTexteSelonAttributAria(controleSelect, nomAttribut))
        } else {
          majAttributControle(controleConteneur, nomAttributMaj, nouvelleValeur)
        }

        console.log("attributes changed")
    })
  })

  observer.observe(controleSelect, {
    attributeFilter: ['aria-describedby', 'aria-required', 'aria-invalid', 'aria-label']
  })
}

function observerAttributsLabelOrignal(){

  const observerCharacterData = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      definirAriaLabel()
    })
  })

  const observerAriaLabel = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      definirAriaLabel()
    })
  })

  observerAriaLabel.observe(controleLabel, {
    attributeFilter: ['aria-label']
  })

  observerCharacterData.observe(controleLabel, {
    subtree: true,
    childList: true,
    characterData: true
  })
}
//TODO déplacer dans utils?
//On obtient le texte à partir du contenu textuel du contrôle label en excluant les éléments qui ne doivent pas être lus au lecteur écran.
function obtenirTexteLecteurEcranControle(controle, selecteurExclusion){
  const selecteurs = selecteurExclusion || ["[aria-hidden='true']"]
  const controleEpure = controle.cloneNode(true)

  const elementsExlus = controleEpure.querySelectorAll(selecteurs.join(','))

  for (let i = 0; i < elementsExlus.length; i++) {
    elementsExlus[i].remove();
  }

  return controleEpure.textContent
}

//TODO déplacer dans utils?
function obtenirTexteSelonAttributAria(controle, nomAttribut){
  
    if(controle && controle.getAttribute(nomAttribut)) {
      const ids = controle.getAttribute(nomAttribut).split(' ')
  
      if(ids.length){
        const textes = []
        
        for (let i = 0; i < ids.length; i++) {
          const controle = document.getElementById(ids[i])
          if(controle){
            textes.push(controle.textContent)
          }
        }

        return textes.join(' ')
    } else {
      return null
    }  
  } 
}

//TODO déplacer dans utils?
function majAttributControle(controle, nomAttribut, valeur){
  if(valeur){
      controle.setAttribute(nomAttribut, valeur)
    } else{
      controle.removeAttribute(nomAttribut)
    }
}


function obtenirOptions() {
  const options = []

  for (let i = 0; i < controleSelect.options.length; i++) {
    const option = controleSelect.options[i]
    const texte = option.label || option.value
//    const texteFormatte = texte.toLowerCase()

    const opt = {
      id: Utils.genererId(),
      texte: texte,
      valeur: option.value,
      texteFormatte: texte.toLowerCase(),
      indexe: i,
      selected: option.selected
    }

    options.push(opt)
  }

  return options
}


function definirSuggestions() {
  const nouvellesSuggestions = []

  //ICI la recherche
  for (let i = 0; i < options.length; i++) {   
    const suggestion = options[i] 
//    suggestions.push(options[i])

    if(texteRecherche === "" || suggestion.texteFormatte.indexOf(texteRecherche) >= 0){
      suggestion.selected = controleSelect[i].selected
      nouvellesSuggestions.push(suggestion)
    }
  }

  suggestions = nouvellesSuggestions
}

function ajusterControleSelectOriginal() {
  controleLabel = thisComponent.querySelector("label")

  //Si le contrôle label n'a pas d'id on lui en assigne un
  if(!controleLabel){
    controleLabel = thisComponent.parentElement.querySelector('label')
  }

  if(controleLabel){
    if(!controleLabel.getAttribute("id")){
      controleLabel.setAttribute("id", Utils.genererId())
    }
    idControleLabel = controleLabel.getAttribute("id")
  }
  
  controleSelect = thisComponent.querySelector("select")

  if(!controleSelect){
    return
  }

  controleSelect.classList.add('utd-sr-only')

  controleSelect.setAttribute("tabindex", "-1")  

  if(multiple === 'true'){
    controleSelect.setAttribute("multiple", "")  
  }
}

function selectionnerOption(indexeSuggestion, indexeOption){
  if(indexeOption !== null){

    const indexeSelectionPrecedente = controleSelect.selectedIndex || null
    
    majValeurListeOriginale(indexeOption)
    definirOptionsSelectionnes()

    if(multiple === 'false'){
      
      if(indexeSelectionPrecedente){
        const indexePrecedent = suggestions.findIndex((element) => element.indexe === indexeSelectionPrecedente)

        if(indexePrecedent >= 0){
          suggestions[indexePrecedent].selected = false
        }        
      }

      suggestions[indexeSuggestion].selected = true
    } else {      
      suggestions[indexeSuggestion].selected = optionsSelectionnees.findIndex((element) => element.indexe === indexeOption) >= 0
    }



    if(multiple === 'false'){
      afficherOptions = false

//      const controle = controleBoutonToggle || controleConteneur
//      controle.focus()
      controleConteneur.focus()
    } else {
      indexeFocusOption = indexeSuggestion
    }
  }
}

function deselectionnerOptionViaEtiquette(e){
  console.log('deselectionnerOptionViaEtiquette')
  e.preventDefault()
  e.stopPropagation()

  let indexeOption = e.currentTarget.getAttribute('indexeOption')
  console.log('event detail = ' + e.detail)
  if(indexeOption !== null){

    //TODO la détection clavier ne fonctionne pas... ce n'est pas si grave... pe avec un span role="button" et 2 events? click pour souris et enter/spacebar pour keydown?
    //Si événement clavier on donne le focus à la prochaine étiquette (ou la précédente si aucune prochaine) suite à la suppression.
    let prochaineEtiquette
    if(e.detail === 1){
      prochaineEtiquette = e.currentTarget.parentNode.nextSibling
      if(!prochaineEtiquette){
        prochaineEtiquette = e.currentTarget.parentNode.previousSibling        
      }
    }

    let indexeOptionProchaineEtiquette
    if(prochaineEtiquette){
      indexeOptionProchaineEtiquette = prochaineEtiquette.querySelector('button').getAttribute('indexeOption')
    } 


    majValeurListeOriginale(indexeOption)
    definirOptionsSelectionnes()

    console.log(indexeOptionProchaineEtiquette)
    if(indexeOptionProchaineEtiquette >= 0){
      //setTimeout afin de s'assurer que le paint a été refait avant de donner le focus (sinon parfois ne fonctionne pas)
      setTimeout(() => {
        controleSelection.querySelector(`[indexeOption="${indexeOptionProchaineEtiquette}"]`).focus()        
      });
    }
    else {
      if(recherchable === 'true'){
        controleRecherche.focus()
      } else {
        controleConteneur.focus()
      }
    }

    //Désélectionner l'élément dans la liste des suggestions
    indexeOption = parseInt(indexeOption)
    const indexeSuggestion = suggestions.findIndex((element) => element.indexe === indexeOption)
    if(indexeSuggestion >= 0){
      suggestions[indexeSuggestion].selected = false     
    }

  }
}


function majValeurListeOriginale(indexe) {
  if(multiple === 'false'){
    controleSelect.selectedIndex = indexe;
  } else {
    controleSelect.options[indexe].selected = !controleSelect.options[indexe].selected
  }
}

function definirOptionsSelectionnes(){
  optionsSelectionnees = []
  for (let i = 0; i < controleSelect.options.length; i++) {  
    const option = controleSelect.options[i]
    
    if(option.selected){
      optionsSelectionnees.push(options[i])
    }
  }
}

function onKeyDown(e){
  console.log(e.key)
  switch(e.key) {
    case "Enter":
    case " ":
   
      //Si contrôle courant est une etiquette, on procède à la désélection
      if(e.target.classList.contains('etiquette')) {
        break        
      }

      e.preventDefault()

      if(indexeFocusOption !== null) {
        selectionnerOption(indexeFocusOption, suggestions[indexeFocusOption].indexe)
      } else {
        afficherOptions = !afficherOptions     
        if(suggestions.length && recherchable === 'false'){
          indexeFocusOption = 0
        } 
      }

      break
    
    case "Tab":
      //Si contrôle courant est le textbox de recherche on ne fait rien

      //TODO texte sélection SR
      //TODO si options affichées et multiple et etiquettes  TAB = on ferme fenetre et focus suivant, SHIFT TAB focus dernière
      if(e.target === controleConteneur & e.shiftKey && afficherOptions && multiple && optionsSelectionnees.length) {
        console.log('conteneur shift!!')

      }
      break
    case "Escape":
      afficherOptions = false

//      const controle = controleBoutonToggle || controleConteneur
//      controle.focus()
      controleConteneur.focus()
      break        
    case "ArrowDown":

      if(recherchable === 'true' && e.target !== controleRecherche){
        break
      }

      e.preventDefault()
      //Affiche les options si ne sont pas visibles actuellement
      if(!afficherOptions){
        afficherOptions = true

        if(suggestions.length && recherchable === 'false'){
          indexeFocusOption = 0
        }

      } else {
        if(indexeFocusOption !== null){
          modifierIndexeOptionCourante(1)     
        } else {
          indexeFocusOption = indexeFocusOption || 0
        }        
      }
      assurerOptionCouranteVisible()

      break      
    case "ArrowUp":
      
      if(recherchable === 'true' && e.target !== controleRecherche){
        break
      }

      e.preventDefault()

      if(!afficherOptions){
        afficherOptions = true

        if(suggestions.length && recherchable === 'false'){
          indexeFocusOption = suggestions.length - 1
        }

      } else {
        if(indexeFocusOption !== null){
          modifierIndexeOptionCourante(-1)     
        } else {
          indexeFocusOption = indexeFocusOption || suggestions.length - 1
        }      
      }
      assurerOptionCouranteVisible()
      break
  }
}

function clickSelection(e){
//  e.preventDefault()

  console.log('click selection')
  afficherOptions = !afficherOptions

//  const controle = controleBoutonToggle || controleConteneur
//  controle.focus()
  controleConteneur.focus()  
}

function selectionMouseDown(e){
  //Petite twist afin de ne pas provoquer de blur si on click sur le contrôle de sélection à partir d'un autre contrôle. (Évite la loop de fermeture/ouverture du dropdown)
  console.log('selectionMouseDown')
    //Si événement clavier on donne le focus à la prochaine étiquette (ou la précédente si aucune prochaine) suite à la suppression.
/*    let prochaineEtiquette
    if(e.detail === 1){
      prochaineEtiquette = e.currentTarget.parentNode.nextSibling
      if(!prochaineEtiquette){
        prochaineEtiquette = e.currentTarget.parentNode.previousSibling        
      }
    }*/

  e.preventDefault()
  e.stopPropagation()
}

function majActiveDescendant() {
  if(indexeFocusOption !== null) {
    idActiveDescendant = suggestions[indexeFocusOption].id
  } else {
    idActiveDescendant = null
  }
}

function toggleAfficherOptions() {

  if(!mounted){
    return
  }
  
  if(afficherOptions){    

    if(recherchable === 'true'){
      
      controleRecherche.value = ''
      texteRecherche = ''
      
      definirSuggestions()
      
      setTimeout(() => {
        controleRecherche.focus()        
      });


    } else {
      controleConteneur.focus()
    }
  } else {
    indexeFocusOption = null
  } 
}

function modifierIndexeOptionCourante(step) {
  if(!step){
    indexeFocusOption = null
    return
  }

  const prochainIndexe = indexeFocusOption + step
  const indexeDerniereOption = suggestions.length - 1

  if(prochainIndexe > indexeDerniereOption){
    indexeFocusOption = 0;
  }
  else if(prochainIndexe < 0){
    indexeFocusOption = indexeDerniereOption;
  }
  else {
    indexeFocusOption = prochainIndexe;
  }

}

function traiterSaisieRecherche(){  

  // Empêche le traitement si simplement un focus ou un blur (l'événement input est lancé sur focus et blur)
/*  if( texteRecherche === controleRecherche.value ){
    return;
  } */
  console.log('input')
  texteRecherche = controleRecherche.value
  definirSuggestions()
  indexeFocusOption = 0
}

function blurConteneur(e){
  console.log('blurConteneur')
  console.log(e.relatedTarget)

  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
  }
 }

function blurRecherche(e){  
  console.log('blurRecherche')
  console.log(e.relatedTarget)
    
  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
  } else {
    indexeFocusOption = null
  }
}

function blurOptionSelectionnee(e){  
  console.log('blurOptionSelectionnee')
  console.log(e.relatedTarget)
    
  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
  }
}

function estFocusInterieurComposant(e){
  return composant !== e.relatedTarget && composant.contains(e.relatedTarget)  
}
function resultatsMouseDown(e){
    //Petite twist afin de ne pas provoquer de blur si on click sur un contrôle d'option à partir d'un autre contrôle. (Évite la fermeture du dropdown via l'événement blur du contrôle de recherche)
  e.preventDefault()  
}

function clickOption(e){  
  
  console.log('clickOption')
  e.stopPropagation()

  const indexeOption = e.currentTarget.getAttribute('indexeOption')
  const indexeSuggestion = e.currentTarget.getAttribute('indexeSuggestion')

  if(indexeOption && indexeSuggestion){
    selectionnerOption(parseInt(indexeSuggestion), parseInt(indexeOption))    
  }
}


function assurerOptionCouranteVisible() {
  //SetTimeout nécessaire afin que le paint de la page soit fait et qu'on puisse travailler avec l'option qui vient de recevoir le focus.
  setTimeout(() => {
    const option = thisComponent.shadowRoot.querySelector('.suggestions .focus')
    const hauteurConteneur = controleConteneurResultats.getBoundingClientRect().height
    const hauteurOption = option.getBoundingClientRect().height
    const offsetConteneur = controleConteneurResultats.scrollTop + hauteurConteneur

    //Si nous sommes sur la 1ere ou la dernière suggestion on gère manuellement le scroll
    if(indexeFocusOption === 0){
      controleConteneurResultats.scroll({top: 0})
      return
    } else if(indexeFocusOption === suggestions.length - 1){
      controleConteneurResultats.scroll({top: option.offsetTop})
      return
    }


    if(option.offsetTop + hauteurOption > offsetConteneur){
      if(option.offsetTop + hauteurOption > (offsetConteneur + hauteurOption)){
        //Ici on traite le cas ou le user aurait modifié la position du scroll (ex. avec la souris), dans ce cas on remet l'option courant en au de liste
        controleConteneurResultats.scroll({top: option.offsetTop});
      } else {
        controleConteneurResultats.scroll({top: controleConteneurResultats.scrollTop + hauteurOption});
      }
    } else if(option.offsetTop < (offsetConteneur - hauteurConteneur)){
      if(option.offsetTop < (offsetConteneur - hauteurOption)){
        //Ici on traite le cas ou le user aurait modifié la position du scroll (ex. avec la souris), dans ce cas on remet l'option courant en au de liste
        controleConteneurResultats.scroll({top: option.offsetTop});
      } else {
        controleConteneurResultats.scroll({top: controleConteneurResultats.scrollTop - hauteurOption});
      }
    }
  })
}

</script>


<!--<select class="js-example-basic-multiple js-states form-control select2-hidden-accessible" multiple="" data-select2-id="select2-data-61-j7fv" tabindex="-1" aria-hidden="true">-->


<div class="utd-component utd-liste-deroulante {largeur}{multiple === 'true' ? ' multiple' : ''}{recherchable === 'true' ? ' recherchable' : ''}">
  <slot></slot>

  {#if recherchable === 'true' || multiple === 'true'}
      <p aria-live="polite" class="utd-sr-only"></p>

      <span id="{idLabelFake}" class="utd-sr-only" aria-hidden="true"></span>

      <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{afficherOptions ? null : 'listbox'}" aria-expanded="{afficherOptions ? 'true' : 'false'}" tabindex="{afficherOptions ? '-1' : '0'}" on:keydown={onKeyDown} aria-disabled="false" aria-label="{ariaLabel}" aria-owns="{recherchable === 'false' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}">
      <!-- <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{recherchable === 'true' ? null : 'listbox'}" aria-expanded="{recherchable === 'true' ? null : afficherOptions ? 'true' : 'false'}" tabindex="{recherchable === 'true' ? '-1' : '0'}" on:keydown={onKeyDown} aria-disabled="false" aria-label="{recherchable === 'false' ? ariaLabel : null}" aria-owns="{recherchable === 'false' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}"> -->
        <span class="selection {multiple === 'true'  && optionsSelectionnees.length > 0 ? 'contient-etiquettes': ''}" on:click={clickSelection} on:mousedown={selectionMouseDown}>
        <!--<span class="selection {multiple === 'true'  && optionsSelectionnees.length > 0 ? 'contient-etiquettes': ''}" on:click={recherchable === 'false' ? clickSelection : null} on:mousedown={selectionMouseDown}>
          
          {#if recherchable === 'true'}
            <button type="button" class="utd-form-control toggle" aria-disabled="false" aria-label="{ariaLabel}" aria-expanded="{afficherOptions ? 'true' : 'false'}" on:click={clickSelection}></button>
          {/if}-->

          {#if optionsSelectionnees.length === 0}
            <span class="utd-placeholder">{placeholder}</span>
          {:else}
            {#if multiple === 'false'}
                <span>{optionsSelectionnees[0].texte}</span>                                
            {:else}
                <ul>
                  {#each optionsSelectionnees as optionSelectionnee, i}
                    <li>
                      <button type="button" class="etiquette" title="Remove item" tabindex="{afficherOptions ? '0' : '-1'}" aria-describedby="select2-2cnb-container-choice-s29e-HI" indexeOption="{optionSelectionnee.indexe}" on:click={deselectionnerOptionViaEtiquette} on:blur={blurOptionSelectionnee}>
                        <span class="texte" id="select2-2cnb-container-choice-s29e-HI">{optionSelectionnee.texte}</span>
                        <span aria-hidden="true" class="utd-icone-svg md x-fermer-bleu"></span>
                      </button>  
                    </li>
                  {/each}   
                </ul>     
            {/if}
          {/if}
          <span class="utd-icone-svg chevron-bleu-piv developper"></span>
        </span>
    
        {#if recherchable === 'true'}
          <span class="conteneur-recherche {!afficherOptions ? 'utd-d-none' : ''}">
            <span id="{idTexteUtilisation}" class="utd-sr-only">{texteAideUtilisation}</span>
            <label for="{idControleRecherche}" class="utd-sr-only">{placeholderRecherche}</label>
            <input type="text" id="{idControleRecherche}" class="utd-form-control recherche" role="combobox" aria-multiselectable="{multiple === 'true' ? 'true' : null}" aria-expanded="true" aria-haspopup="listbox" on:input={traiterSaisieRecherche} on:blur={blurRecherche} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="{placeholderRecherche}" aria-describedby="{idTexteUtilisation}" aria-controls="{idControleResultats}" aria-activedescendant="{afficherOptions ? idActiveDescendant : null}">
          </span>            
        {/if}

        <span class="resultats {!afficherOptions ? 'utd-d-none' : ''}" on:mousedown={resultatsMouseDown}  dir="ltr">
          <ul class="suggestions" role="listbox" aria-multiselectable="{multiple === 'true' ? 'true' : null}" id="{idControleResultats}" aria-expanded="true" aria-hidden="false">
            {#each suggestions as suggestion, i}
              <li class="{i === indexeFocusOption ? 'focus' : ''}" role="option" id="{suggestion.id}" value="{suggestion.value}" indexeSuggestion="{i}" indexeOption="{suggestion.indexe}" aria-selected="{suggestion.selected ? 'true' : 'false'}" on:click={clickOption}>
                {#if multiple === 'true'}
                  <span class="utd-checkbox" aria-hidden="true"></span>
                {/if}                            
                <span class="texte-option">{suggestion.texte}</span>      
              </li>
            {/each}   
          </ul>
        </span>      
      </span>      
  {/if}

</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
