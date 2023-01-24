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
const idControleSuggestions = Utils.genererId()

let mounted = false
let html
let controle
let controleConteneur
let controleLabel
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
  }  
})


// Watches
$: toggleAfficherOptions(afficherOptions) 
$: majActiveDescendant(indexeFocusOption) 

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

//  controleSelect.classList.add('utd-sr-only')

  controleSelect.setAttribute("tabindex", "-1")  

  if(multiple === 'true'){
    controleSelect.setAttribute("multiple", "")  
  }
}

function selectionnerOption(indexeSuggestion, indexeOption){
  if(indexeOption !== null){

    const indexeSelectionPrecedente = controleSelect.selectedIndex || null
    
    majValeurListeOriginale(indexeOption)

    if(multiple === 'false'){
      optionsSelectionnees = []
      
      if(indexeSelectionPrecedente){
        const indexePrecedent = suggestions.findIndex((element) => element.indexe === indexeSelectionPrecedente)

        if(indexePrecedent >= 0){
          suggestions[indexePrecedent].selected = false
        }        
      }

      suggestions[indexeSuggestion].selected = true
    } else {      
      suggestions[indexeSuggestion].selected = !optionsSelectionnees.findIndex((element) => element.indexe === indexeOption) >= 0
    }

    optionsSelectionnees.push(suggestions[indexeSuggestion])

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
      } else {
        modifierIndexeOptionCourante(1)     
      }

      break      
    case "ArrowUp":
      e.preventDefault()

      if(!afficherOptions){
        afficherOptions = true

        if(suggestions.length){
          indexeFocusOption = suggestions.length - 1
        }

      } else {
        modifierIndexeOptionCourante(-1)     
      }
      break
  }
}

function clickSelection(e){
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
        indexeFocusOption = 0
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
//  if(!e.currentTarget.classList.contains('selection')){

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

    <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{recherchable === 'true' ? 'button' : 'listbox'}" aria-expanded="{recherchable === 'false' ? null : afficherOptions ? 'true' : 'false'}" tabindex="0" on:keydown={onKeyDown} aria-disabled="false" aria-labelledby="{idControleLabel}" aria-controls="{recherchable === 'false' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}">
  
      <span class="selection select2-selection--multiple" on:click={clickSelection} on:mousedown={selectionMouseDown}>
        {#if multiple === 'false'}
          {#if optionsSelectionnees.length === 0}
            <span class="utd-placeholder">{placeholder}</span>
          {:else}
            <span>{optionsSelectionnees[0].texte}</span>      
          {/if}
          
        {:else}
          <ul class="select2-selection__rendered" id="select2-2cnb-container">
            <li class="select2-selection__choice" title="Hawaii" data-select2-id="select2-data-247-9kw9">
              <button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-2cnb-container-choice-s29e-HI">
                <span aria-hidden="true">×</span>
              </button>
              <span class="select2-selection__choice__display" id="select2-2cnb-container-choice-s29e-HI">Hawaii</span>
            </li>
          </ul>     

        {/if}
        <span class="utd-icone-svg chevron-bleu-piv"></span>
      </span>
  

        {#if recherchable === 'true'}
          <span class="conteneur-recherche {!afficherOptions ? 'utd-d-none' : ''}">
            <span id="{idTexteUtilisation}" class="utd-sr-only">{texteAideUtilisation}</span>
            <label for="{idControleRecherche}" class="utd-sr-only">{placeholderRecherche}</label>
            <input type="text" id="{idControleRecherche}" class="utd-form-control recherche" role="combobox" aria-expanded="true" aria-haspopup="listbox" on:input={traiterSaisieRecherche} on:blur={blurRecherche} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="{placeholderRecherche}" aria-describedby="{idTexteUtilisation}" aria-owns="{recherchable === 'true' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'true' && afficherOptions ? idActiveDescendant : null}">
          </span>            
        {/if}

        <span class="resultats {!afficherOptions ? 'utd-d-none' : ''}"  dir="ltr">
          <span class="select2-results">
            <ul class="select2-results__options" role="listbox" aria-multiselectable="{multiple === 'true' ? 'true' : null}" id="{idControleResultats}" aria-expanded="true" aria-hidden="false">
              {#each suggestions as suggestion, i}
                <li class="option select2-results__option--selectable {i === indexeFocusOption ? 'focus' : ''}" role="option" id="{suggestion.id}" value="{suggestion.value}" indexeSuggestion="{i}" indexeOption="{suggestion.indexe}" aria-selected="{suggestion.selected ? 'true' : 'false'}" on:click={clickOption} on:mousedown={optionMouseDown} data-select2-id="select2-data-select2-2cnb-result-fwrc-AK">{suggestion.texte}</li>
              {/each}   
            </ul>
          </span>
        </span>
        


    </span>    


  {/if}

  <!--
  <span class="select2 select2-container select2-container--default select2-container--above select2-container--focus select2-container--open" dir="ltr" data-select2-id="select2-data-62-9oiz" style="width: 100%;">
    <span class="selection">
      <span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="true" tabindex="-1" aria-disabled="false" aria-owns="select2-2cnb-results" aria-activedescendant="select2-2cnb-result-4xgc-HI">
        <ul class="select2-selection__rendered" id="select2-2cnb-container">
          <li class="select2-selection__choice" title="Hawaii" data-select2-id="select2-data-247-9kw9">
            <button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-2cnb-container-choice-s29e-HI">
              <span aria-hidden="true">×</span>
            </button>
            <span class="select2-selection__choice__display" id="select2-2cnb-container-choice-s29e-HI">Hawaii</span>
          </li>
        </ul>
        <span class="select2-search select2-search--inline">
          <textarea class="select2-search__field" type="search" tabindex="0" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" autocomplete="off" aria-label="Search" aria-describedby="select2-2cnb-container" placeholder="" style="width: 0.75em;" aria-controls="select2-2cnb-results" aria-activedescendant="select2-2cnb-result-4xgc-HI"></textarea>
        </span>
      </span>
    </span>
    <span class="dropdown-wrapper" aria-hidden="true"></span>
  </span>  
  -->
</div>




<!-- Select multiple 
<div class="form-group multiple">
                    
  <div class="select-a11y">
    <div class="tag-hidden" aria-hidden="true">
      <label for="select-element">What do you want to do today?</label>
      <select class="form-control" id="select-element" multiple="" data-select-a11y="" tabindex="-1">
        <option>Sleeping</option>
        <option>Climbing trees</option>
        <option>Knitting socks</option>
        <option selected="">Riding bikes</option>
        <option>Eating cupcakes</option>
      </select>
    </div>
    <p aria-live="polite" class="sr-only"></p>
    <button type="button" aria-expanded="false" class="btn btn-select-a11y">
      <span>What do you want to do today?</span>
      <span class="icon-select" aria-hidden="true"></span>
    </button>
    <ul class="list-inline list-selected">
      <li class="tag-item">
        <span>Riding bikes</span>
        <button class="tag-item-supp" title="Supprimer Riding bikes" type="button" data-index="3">
          <span class="sr-only">Supprimer</span>
          <span class="icon-delete" aria-hidden="true"></span>
        </button>
      </li>
    </ul>
  </div>
</div>
-->

<link rel='stylesheet' href='{Utils.cssFullPath}'>
