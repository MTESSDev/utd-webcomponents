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


const thisComponent = get_current_component()
const idTexteUtilisation = Utils.genererId()
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idLabelFake = Utils.genererId()
const idControleSuggestions = Utils.genererId()

let mounted = false
let html
let controle
let controleConteneur
let controleLabel
let libelle
let description
let idControleLabel = ""
let controleRecherche
let controleSelect
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
  controle = thisComponent.shadowRoot.querySelector('.utd-liste-deroulante')
  controleConteneur = thisComponent.shadowRoot.querySelector('.conteneur')
  controleRecherche = thisComponent.shadowRoot.getElementById(idControleRecherche)

  if(multiple === 'true' || recherchable === 'true'){
    ajusterControleSelectOriginal()
    
    options = obtenirOptions()
    definirSuggestions()
    definirOptionsSelectionnes()
    observerAttributsSelectOrignal()

    controleSelect.addEventListener('click', (event) => { clickSelection(event) });

    //TODO function pour définir les attributs aria initiaux du contrôle conteneur(description, invalid, required)
    //Définir la valeur initiale de l'attribut aria-description de contrôle conteneur
    majAttributControle(controleConteneur, 'aria-description', obtenirTexteSelonAttributAria(controleSelect, 'aria-describedby'))

  }  
})


// Watches
$: toggleAfficherOptions(afficherOptions) 
$: majActiveDescendant(indexeFocusOption) 


function observerAttributsSelectOrignal(){

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

        const nomAttribut = mutation.attributeName
        const nouvelleValeur = mutation.target.getAttribute(nomAttribut)
        
        let nomAttributMaj = nomAttribut === 'aria-describedby' ? 'aria-description' : nomAttribut

        if(nomAttribut === 'aria-describedby'){
          majAttributControle(controleConteneur, nomAttributMaj, obtenirTexteSelonAttributAria(controleSelect, nomAttribut))
        } else {
          majAttributControle(controleConteneur, nomAttributMaj, nouvelleValeur)
        }

        console.log("attributes changed")
    })
  })

  observer.observe(controleSelect, {
    attributeFilter: ['aria-describedby', 'aria-required', 'aria-invalid'] //configure it to listen to attribute changes
  })
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
  

  const fakeLabel = thisComponent.shadowRoot.getElementById(idLabelFake) 
  if(fakeLabel){
    fakeLabel.append(controleLabel.cloneNode(true))
  }

  controleSelect = thisComponent.querySelector("select")

  if(!controleSelect){
    return
  }

//  controleSelect.classList.add('utd-sr-only')

  controleSelect.setAttribute("tabindex", "0")  

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
      controleConteneur.focus()
    } else {
      indexeFocusOption = indexeSuggestion
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
      //Si contrôle courant est textbox recherche on ne fait rien
      if(e.target.classList.contains('recherche')) {
        break        
      }
  
      e.stopPropagation()      
      afficherOptions = false
      break
    case "Escape":
      afficherOptions = false
      controleConteneur.focus()  
      break        
    case "ArrowDown":
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

      break      
    case "ArrowUp":
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
      break
  }
}

function clickSelection(e){
  e.preventDefault()
  console.log('click selection')
  afficherOptions = !afficherOptions
  controleConteneur.focus()
}

function selectionMouseDown(e){
  //Petite twist afin de ne pas provoquer de blur si on click sur le contrôle de sélection à partir d'un autre contrôle. (Évite la loop de fermeture/ouverture du dropdown)
  e.preventDefault()
}

function optionMouseDown(e){
  //Petite twist afin de ne pas provoquer de blur si on click sur un contrôle d'option à partir d'un autre contrôle. (Évite la fermeture du dropdown via l'événement blur du contrôle de recherche)
  e.preventDefault()
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

    if(indexeFocusOption === null){
//        indexeFocusOption = 0
    }

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

function blurConteneur(){
  console.log('blurConteneur')
  if(recherchable === 'false'){
    afficherOptions = false
  }
}

function blurRecherche(e){  
  console.log('blurRecherche')

    //TODO concorder avec les touches ici afin de redonner focus au textbox (event du dropdown ENTER, Escape)
    afficherOptions = false

//  }

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

</script>


<!--<select class="js-example-basic-multiple js-states form-control select2-hidden-accessible" multiple="" data-select2-id="select2-data-61-j7fv" tabindex="-1" aria-hidden="true">-->


<div class="utd-component utd-liste-deroulante {largeur}{multiple === 'true' ? ' multiple' : ''}">
  <slot></slot>

  {#if recherchable === 'true' || multiple === 'true'}
      <p aria-live="polite" class="utd-sr-only"></p>

      <span id="{idLabelFake}" class="utd-sr-only" aria-hidden="true"></span>

      <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{recherchable === 'true' ? 'combobox' : 'listbox'}" aria-expanded="{afficherOptions ? 'true' : 'false'}" tabindex="0" on:keydown={onKeyDown} aria-disabled="false" aria-labelledby="{controleLabel ? idControleLabel : null}" aria-describedby="{controleLabel ? idControleLabel : null}" aria-owns="{recherchable === 'false' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}">
    
        <span class="selection select2-selection--multiple" on:click={clickSelection} on:mousedown={selectionMouseDown}>
          {#if multiple === 'false'}
            {#if optionsSelectionnees.length === 0}
              <span class="utd-placeholder">{placeholder}</span>
            {:else}
              <span>{optionsSelectionnees[0].texte}</span>      
            {/if}
            
          {:else}
              <ul class="select2-selection__rendered" id="select2-2cnb-container">
                {#each optionsSelectionnees as optionSelectionnee, i}
                  <li class="select2-selection__choice" data-select2-id="select2-data-247-9kw9">
                    <button type="button" class="select2-selection__choice__remove" title="Remove item" aria-describedby="select2-2cnb-container-choice-s29e-HI">
                      <span aria-hidden="true">×</span>
                    </button>
                    <span class="select2-selection__choice__display" id="select2-2cnb-container-choice-s29e-HI">{optionSelectionnee.texte}</span>
                  </li>
                {/each}   
              </ul>     
          {/if}
          <span class="utd-icone-svg chevron-bleu-piv"></span>
        </span>
    

          {#if recherchable === 'true'}
            <span class="conteneur-recherche {!afficherOptions ? 'utd-d-none' : ''}">
              <span id="{idTexteUtilisation}" class="utd-sr-only">{texteAideUtilisation}</span>
              <label for="{idControleRecherche}" class="utd-sr-only">{placeholderRecherche}</label>
              <input type="text" id="{idControleRecherche}" class="utd-form-control recherche" role="combobox" aria-multiselectable="{multiple === 'true' ? 'true' : null}" aria-expanded="true" aria-haspopup="listbox" on:input={traiterSaisieRecherche} on:blur={blurRecherche} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="{placeholderRecherche}" aria-describedby="{idTexteUtilisation}" aria-controls="{idControleResultats}" aria-activedescendant="{afficherOptions ? idActiveDescendant : null}">
            </span>            
          {/if}

          <span class="resultats {!afficherOptions ? 'utd-d-none' : ''}"  dir="ltr">
            <ul class="suggestions" role="listbox" aria-multiselectable="{multiple === 'true' ? 'true' : null}" id="{idControleResultats}" aria-expanded="true" aria-hidden="false">
              {#each suggestions as suggestion, i}
                <li class="{i === indexeFocusOption ? 'focus' : ''}" role="option" id="{suggestion.id}" value="{suggestion.value}" indexeSuggestion="{i}" indexeOption="{suggestion.indexe}" aria-selected="{suggestion.selected ? 'true' : 'false'}" on:click={clickOption} on:mousedown={optionMouseDown}>
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
