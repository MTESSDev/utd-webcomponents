<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-liste-deroulante" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  

export let multiple = "false"
export let recherchable = "false"

export let texteAideUtilisation = Utils.obtenirLanguePage() === 'fr' ? "Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions." : "(en)Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions."
export let placeholder = Utils.obtenirLanguePage() === 'fr' ? "Rechercher dans la liste" : "(en)Rechercher dans la liste"
export let noResult = Utils.obtenirLanguePage() === 'fr' ? "Aucun résultat" : "(en)Aucun résultat"
export let results = Utils.obtenirLanguePage() === 'fr' ? "{x} suggestion(s) disponibles" : "(en){x} suggestion(s) disponibles"
export let deleteItem = Utils.obtenirLanguePage() === 'fr' ? "Supprimer {t}" : "(en)Supprimer {t}"
export let supprimer = Utils.obtenirLanguePage() === 'fr' ? "Supprimer" : "(en)Supprimer"


const thisComponent = get_current_component()
const idTexteUtilisation = Utils.genererId()
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idControleSuggestions = Utils.genererId()


let html
let controle
let controleSelect
let controleLabel
let idControleLabel = ""
let afficherOptions = false
let indexeFocus = null
let options = []
let suggestions = []
let texteRecherche = ""

onMount(() => {  
  html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  controle = thisComponent.shadowRoot.querySelector('.utd-liste-deroulante')



  if(multiple === 'true' || recherchable === 'true'){
    ajusterControleSelectOriginal()
    
    options = obtenirOptions()
    definirSuggestions()
    console.log(suggestions)
  }

  
})


function obtenirOptions() {
  const options = []

  for (let i = 0; i < controleSelect.options.length; i++) {
    const option = controleSelect.options[i]
    const texte = option.label || option.value
//    const texteFormatte = texte.toLowerCase()

    const opt = {
      texte: texte,
      valeur: option.value,
      texteFormatte: texte.toLowerCase() 
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

function toggleAfficherResultats(e){
  if(e.keyCode){
    //Si Enter ou SpaceBar
    if(e.keyCode === 13 || e.keyCode === 32){
      e.preventDefault()
      afficherOptions = !afficherOptions      
    }
  } else {
    //Ici c'est un click
    afficherOptions = !afficherOptions
  }
}


function moveIndex(step) {
  if(indexeFocusOption === null){
    indexeFocusOption = 0
  }
  else {
    const prochainIndexe = indexeFocusOption + step
//    const indexeDerniereOption = this.suggestions.length - 1

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

//  this.suggestions[indexeFocusOption].classList.add('focusVisuel');
}

function donnerFocusVisuelOption(indexe) {

//  this.suggestions[indexeFocusOption].classList.add('focusVisuel');
}

</script>


<!--<select class="js-example-basic-multiple js-states form-control select2-hidden-accessible" multiple="" data-select2-id="select2-data-61-j7fv" tabindex="-1" aria-hidden="true">-->


<div class="utd-component utd-liste-deroulante">
  <slot></slot>

  {#if recherchable === 'true' || multiple === 'true'}
    <p aria-live="polite" class="utd-sr-only"></p>
<!--    <button type="button" aria-expanded="false" class="btn btn-select-a11y" id="{idBoutonRecherche}" aria-labelledby="{idControleLabel} select-option-button">
      <span>Perceivable</span>
      <span class="icon-select" aria-hidden="true"></span>
    </button>-->  

    <span class="conteneur {afficherOptions ? 'ouvert' : ''} --focus" dir="ltr" data-select2-id="select2-data-62-9oiz">
      {#if recherchable === 'true'}
        <span id="{idTexteUtilisation}" class="utd-sr-only">{texteAideUtilisation}</span>
        <label for="{idControleRecherche}" class="utd-sr-only">{placeholder}</label>
        <input type="text" id="{idControleRecherche}" class="utd-form-control" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="{placeholder}" aria-describedby="{idTexteUtilisation}">
      {/if}
  
      <span class="selection utd-form-control select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="{afficherOptions ? 'true' : 'false'}" tabindex="0" on:click={toggleAfficherResultats} on:keydown={toggleAfficherResultats} aria-disabled="false" aria-controls="{afficherOptions ? idControleResultats : null}" aria-activedescendant="{afficherOptions ? 'testbidon' : null}" >
        <ul class="select2-selection__rendered" id="select2-2cnb-container">
          <li class="select2-selection__choice" title="Hawaii" data-select2-id="select2-data-247-9kw9">
            <button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-2cnb-container-choice-s29e-HI">
              <span aria-hidden="true">×</span>
            </button>
            <span class="select2-selection__choice__display" id="select2-2cnb-container-choice-s29e-HI">Hawaii</span>
          </li>
        </ul>
        {#if afficherOptions}    
          <span class="resultats" id="{idControleResultats}" dir="ltr">
            <span class="select2-results">
              <ul class="select2-results__options" role="listbox" aria-multiselectable="true" id="select2-2cnb-results" aria-expanded="true" aria-hidden="false">
                {#each suggestions as suggestion, i}
                  <li class="select2-results__option select2-results__option--selectable" id="select2-2cnb-result-fwrc-AK" role="option" value="{suggestion.value}" data-select2-id="select2-data-select2-2cnb-result-fwrc-AK" aria-selected="false">{suggestion.texte}</li>
                {/each}   
              </ul>
            </span>
          </span>
        {/if}      

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
