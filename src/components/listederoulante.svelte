<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
Référence : https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-none.html
-->
<svelte:options tag="utd-liste-deroulante" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  
import MiniSearch from 'minisearch'

const languePage = Utils.obtenirLanguePage()

export let multiple = "false"
export let recherchable = "false"
export let rechercheFloue = "true"
export let precisionRecherche = "0.2"
export let largeur = "md" //Valeurs possible sm, md, lg
export let placeholder = languePage === 'fr' ? "Sélectionner une valeur" : "(en)Sélectionner une valeur"
export let placeholderRecherche = languePage === 'fr' ? "Rechercher dans la liste" : "(en)Rechercher dans la liste"

//Contrôles
const thisComponent = get_current_component()
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idControleZoneNotificationLecteurEcran = Utils.genererId()


//Textes fixes TODO traduire
//const texteAideUtilisation = languePage === 'fr' ? "Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions." : "(en)Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions."
const titleEtiquette = languePage === 'fr' ? "Supprimer" : "Delete"
const descriptionEtiquette = languePage === 'fr' ? "Déselectionner" : "Unselect"
const texteNotificationEtiquetteSupprimee = languePage === 'fr' ? "Élément désélectionné" : "Item unselected"
const srPrefixeDescriptionValeursSelectionnees = languePage === 'fr' ? (multiple === 'true' ? "Valeurs sélectionnées" : "Valeur sélectionnée") : (multiple === 'true' ? "Selected values" : "Selected value")
const srDescriptionAucuneValeurSelectionnee = languePage === 'fr' ? "Aucune valeur sélectionnée." : "No selected value"
const labelListeValeursSelectionnees = languePage === 'fr' ? "Valeurs sélectionnées" : "Selected values"
const srResultatsTrouves = languePage === 'fr' ? "{x} résultats trouvés" : "{x} results found."
const texteAucunResultat = languePage === 'fr' ? "Aucun résultat trouvé." : "No results found."
const srAucunResultat = texteAucunResultat


let mounted = false
let html
let composant
let controleConteneur
let controleSelection
let controleLabel
let idControleLabel = ""
let ariaLabel = null
let ariaDescriptionConteneur = null
let ariaDescriptionRecherche = null
let controleRecherche
let controleSelect
let controleZoneNotificationLecteurEcran
let controleConteneurResultats
let afficherOptions = false
let indexeFocusOption = null
let idActiveDescendant = null
let options = []
let suggestions = []
let optionsSelectionnees = []
let texteRecherche = ""
let texteNotificationLecteurEcran = ""
let estDeselectionEnCours = false
let miniSearch
let optionsMiniSearch
let estScrollbarSuggestionsVisible = false


onMount(() => {  

  optionsMiniSearch = {
    fuzzy: rechercheFloue === 'true' ? parseFloat(precisionRecherche) : null,
    prefix: true,
    fields: ['texte', 'motsCles'],
    storeFields: ['id', 'indexe'],
    stopWords: new Set([]),
    combineWith: 'OR',
    filter: null,
    processTerm: (term, _fieldName) => indexerTerme(term)
}


  mounted = true
  html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  composant = thisComponent.shadowRoot.querySelector('.utd-liste-deroulante')
  controleConteneur = thisComponent.shadowRoot.querySelector('.conteneur')
  controleSelection = thisComponent.shadowRoot.querySelector('.selection')
  controleZoneNotificationLecteurEcran = thisComponent.shadowRoot.getElementById(idControleZoneNotificationLecteurEcran)
  controleRecherche = thisComponent.shadowRoot.getElementById(idControleRecherche)
  controleConteneurResultats = thisComponent.shadowRoot.querySelector('.resultats')


    ajusterControleSelectOriginal()
    
    options = obtenirOptions()
    definirSuggestions()
    definirOptionsSelectionnees()
    definirAttributsInitiauxSelectOriginal()
    observerAttributsSelectOrignal()
    observerAttributsLabelOrignal()

    miniSearch = new MiniSearch(optionsMiniSearch)    
    miniSearch.addAll(options)   
})


// Watches
$: toggleAfficherOptions(afficherOptions) 
$: majActiveDescendant(indexeFocusOption) 


/**
 * Obtient le terme à indexer (normalisé et tout).
 * @param terme
 */
function indexerTerme(terme) {
    if (terme.length <= 1 || optionsMiniSearch.stopWords.has(terme)) {
        return null
    }
    return Utils.normaliserChaineCaracteres(terme)
}


function definirAriaDescriptionRecherche(initial) {
  let ariaDescription = null
  if(initial || !afficherOptions){
    if(languePage === 'fr'){
      const texteCommun = "Utilisez les touches flèches haut et bas pour naviguer dans la liste des suggestions, Entrée ou Espace pour sélectionner un élément"      
      const texteSelectionMultiple = ", et Shift + Tab afin d'accéder à la liste des éléments sélectionnés"
      ariaDescription = multiple === 'true' ? `${texteCommun}${texteSelectionMultiple}.` : `${texteCommun}.`
    } else {
      const texteCommun = "(en)Utilisez les touches flèches haut et bas pour naviguer dans la liste des suggestions, Entrée ou Espace pour sélectionner un élément"      
      const texteSelectionMultiple = ", et Shift + Tab afin d'accéder à la liste des éléments sélectionnés"
      ariaDescription = multiple === 'true' ? `${texteCommun}${texteSelectionMultiple}.` : `${texteCommun}.`
    }
  }

  ariaDescriptionRecherche = ariaDescription
}

function definirAttributsInitiauxSelectOriginal(){
  majAttributControle(controleConteneur, 'aria-invalid', controleSelect.getAttribute('aria-invalid'))
  majAttributControle(controleConteneur, 'aria-required', controleSelect.getAttribute('aria-required'))
  definirAriaLabel()
  definirAriaDescriptionConteneur()
  definirAriaDescriptionRecherche()
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

function definirAriaDescriptionConteneur(){
  let description = obtenirTexteSelonAttributAria(controleSelect, 'aria-describedby')

  if(optionsSelectionnees.length){
    const texteNbOptions = multiple === 'true' ? ` (${optionsSelectionnees.length})` : ''
    description += `. ${srPrefixeDescriptionValeursSelectionnees}${texteNbOptions} : ${obtenirTexteOptionsSelectionnees()}`
  } else {
    description += `. ${srDescriptionAucuneValeurSelectionnee}`
  }

  ariaDescriptionConteneur = description.replace("..", ".")
}

function obtenirTexteOptionsSelectionnees(){
  let texte = ""
  optionsSelectionnees.forEach((option, i) => {    
    texte += option.texte + (i === optionsSelectionnees.length - 1 ? '' : ', ')
  })   

  return texte
}

function observerAttributsSelectOrignal(){

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

        const nomAttribut = mutation.attributeName
        const nouvelleValeur = mutation.target.getAttribute(nomAttribut)
        
        let nomAttributMaj = nomAttribut === 'aria-describedby' ? 'aria-description' : nomAttribut

        if(nomAttribut === 'aria-describedby'){
          definirAriaDescriptionConteneur()
        } else {
          majAttributControle(controleConteneur, nomAttributMaj, nouvelleValeur)
        }
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

    const opt = {
      id: Utils.genererId(),
      texte: texte,
      valeur: option.value,
      texteFormatte: texte.toLowerCase(),
      motsCles: option.getAttribute('mots-cles'),
      indexe: i,
      selected: option.selected
    }

    options.push(opt)
  }

  return options
}


function definirSuggestions(doitNotifierLecteurEcran) {

  let nouvellesSuggestions = []
  let resultatRecherche = []

  const optionsRecherche = {...optionsMiniSearch, ...{fuzzy: term => term.length > 3 ? optionsMiniSearch.fuzzy : null}}
  if(texteRecherche.trim() !== ""){
    resultatRecherche = miniSearch.search(texteRecherche.trim(), optionsRecherche).map((item) => options[item.indexe]);
  } else {
    resultatRecherche = options
  }

  for (let i = 0; i < resultatRecherche.length; i++) {   
    const suggestion = resultatRecherche[i]

    suggestion.selected = controleSelect.options[suggestion.indexe].selected
    nouvellesSuggestions.push(suggestion)
  }

  
  if(doitNotifierLecteurEcran){
    if(nouvellesSuggestions.length === 0){
      notifierLecteurEcran(srAucunResultat)
    } else {
      notifierLecteurEcran(srResultatsTrouves.replace("{x}", nouvellesSuggestions.length))      
      indexeFocusOption = null
    }    
  }

  suggestions = nouvellesSuggestions

  //Vérifier si scrollbar visible ou non (servira a ajouter une marge de droite afin que la scrollbar ne soit pas collée sur la bordure du contrôle)
  setTimeout(() => {
    definirPresenceScrollbarResultats()
  })
}


const definirSuggestionsDebounced = Utils.debounce(() => definirSuggestions(true))


function definirPresenceScrollbarResultats(){
  estScrollbarSuggestionsVisible = controleConteneurResultats.scrollHeight > controleConteneurResultats.clientHeight    
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
  controleSelect.setAttribute("aria-hidden", "true")  

  if(multiple === 'true'){
    controleSelect.setAttribute("multiple", "")  
  }
}

function selectionnerOption(indexeSuggestion, indexeOption){
  if(indexeOption !== null){

    const indexeSelectionPrecedente = controleSelect.selectedIndex
    
    majValeurListeOriginale(indexeOption)
    definirOptionsSelectionnees()
    definirAriaDescriptionConteneur()

    if(multiple === 'false'){
      
      if(indexeSelectionPrecedente >= 0){
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

function deselectionnerOptionViaEtiquette(e){
  e.preventDefault()
  e.stopPropagation()

  let indexeOption = e.currentTarget.getAttribute('indexeOption')

  if(indexeOption !== null){
    estDeselectionEnCours = true

    setTimeout(() => {
      estDeselectionEnCours = false
    })

    indexeOption = parseInt(indexeOption)

    //TODO la détection clavier ne fonctionne pas (e.detail ne semble pas toujours fonctionner c'est bizarre)... ce n'est pas si grave... pe avec un span role="button" et 2 events? click pour souris et enter/spacebar pour keydown?

    //On donne le focus à la prochaine étiquette (ou la précédente si aucune prochaine) suite à la suppression.
    let prochaineEtiquette
    prochaineEtiquette = e.currentTarget.parentNode.nextSibling
    if(!prochaineEtiquette){
      prochaineEtiquette = e.currentTarget.parentNode.previousSibling        
    }

    let indexeOptionProchaineEtiquette
    if(prochaineEtiquette){
      indexeOptionProchaineEtiquette = prochaineEtiquette.querySelector('button').getAttribute('indexeOption')
    } 

    majValeurListeOriginale(indexeOption)

    if(indexeOptionProchaineEtiquette >= 0){
      notifierLecteurEcran(texteNotificationEtiquetteSupprimee)

      //Ici on utilise les setTimeout pour la lecture au lecteur écran. Sans cela la lecture n'est pas faite au lecteur écran car pour lui il demeure sur la meme node (c'est effectivement la même occurance dans la liste). On masque l'élément avant son retrait des éléments sélectionnés afin que la lecture du changement d'étiquette se fasse bien au lecteur écran.
      e.currentTarget.parentNode.classList.add('utd-d-none')

      majOptionsSelectionees(indexeOption)
      definirAriaDescriptionConteneur()

      setTimeout(() => {
        controleSelection.querySelector(`[indexeOption="${indexeOptionProchaineEtiquette}"]`).parentNode.classList.remove('utd-d-none')
      });

      setTimeout(() => {
        const controle = controleSelection.querySelector(`[indexeOption="${indexeOptionProchaineEtiquette}"]`)
        if(controle){
          controle.focus()        
        }
      },250);
    }
    else {
      majOptionsSelectionees(indexeOption)
      definirAriaDescriptionConteneur()

      notifierLecteurEcran(texteNotificationEtiquetteSupprimee)

      if(recherchable === 'true'){
        controleRecherche.focus()

      } else {
        controleConteneur.focus()
      }
    }

    //Désélectionner l'élément dans la liste des suggestions
    const indexeSuggestion = suggestions.findIndex((element) => element.indexe === indexeOption)
    if(indexeSuggestion >= 0){
      suggestions[indexeSuggestion].selected = false     
    }

  }
}

function notifierLecteurEcran(texte){
  texteNotificationLecteurEcran = texte
  
  //On s'assure que le texte va être lu (car parfois c'est le même texte, s'il ne change pas, il n'est pas lu)
  setTimeout(() => {
    texteNotificationLecteurEcran = ""
  }, 400);
}
function majValeurListeOriginale(indexe) {
  if(multiple === 'false'){
    controleSelect.selectedIndex = indexe;
  } else {
    controleSelect.options[indexe].selected = !controleSelect.options[indexe].selected
  }
}

function majOptionsSelectionees(indexe){
  const indexeSelection = optionsSelectionnees.findIndex((element) => element.indexe === indexe)  
  if(indexeSelection >= 0){
    optionsSelectionnees.splice(indexeSelection, 1)
    optionsSelectionnees = optionsSelectionnees
  }
}

function definirOptionsSelectionnees(){
  optionsSelectionnees = []
  for (let i = 0; i < controleSelect.options.length; i++) {  
    const option = controleSelect.options[i]
    
    if(option.selected){
      optionsSelectionnees.push(options[i])
    }
  }
}

function onKeyDown(e){
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
      //Pour une liste déroulante multiple sans recherche avec des selections actives, on veut que le SHIFT + TAB donne le focus à la dernière étiquette.
      if(recherchable === 'false' && multiple === 'true'){        
        if(e.shiftKey && e.target === controleConteneur && afficherOptions && optionsSelectionnees.length > 0){
          e.preventDefault()
          e.stopPropagation()

          const etiquettes = controleSelection.querySelectorAll('.etiquette')
          if(etiquettes.length){
            etiquettes[etiquettes.length -1].focus()
          }
        }
      }
      break        
      
    case "Escape":
      afficherOptions = false
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
  afficherOptions = !afficherOptions
  controleConteneur.focus()  
}

function selectionMouseDown(e){
  //Petite twist afin de ne pas provoquer de blur si on click sur le contrôle de sélection à partir d'un autre contrôle. (Évite la loop de fermeture/ouverture du dropdown)
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
      })

      //Ici on attend volontairement avant de modifier le aria-description du champ recherche. Si on modifie immédiatement le lecteur écran considère la nouvelle valeur. Dans le cas présent, on veut que le aria-description disparaisse après l'affichage de la recherche. 
      setTimeout(() => {        
        definirAriaDescriptionRecherche()      
      },200)
    } else {
      controleConteneur.focus()
    }
    
    setTimeout(() => {
      definirPresenceScrollbarResultats()      
    })
  } else {
    definirAriaDescriptionRecherche()   
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
  if( texteRecherche === controleRecherche.value ){
    return
  } 
  
  texteRecherche = controleRecherche.value
  definirSuggestionsDebounced()
}

function blurConteneur(e){
  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
  }
 }

function blurRecherche(e){     
  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
  } else {
    indexeFocusOption = null
  }
}

function blurOptionSelectionnee(e){  
  if(estDeselectionEnCours){
    estDeselectionEnCours = false
    return
  }

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


<div class="utd-component utd-liste-deroulante {largeur}{multiple === 'true' ? ' multiple' : ''}{recherchable === 'true' ? ' recherchable' : ''}">
  <slot></slot>

    <span aria-live="polite" id="{idControleZoneNotificationLecteurEcran}" class="utd-sr-only" tabindex="-1">{texteNotificationLecteurEcran}</span>

    <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{afficherOptions ? null : 'listbox'}" aria-expanded="{afficherOptions ? 'true' : 'false'}" tabindex="{afficherOptions ? '-1' : '0'}" on:keydown={onKeyDown} aria-disabled="false" aria-label="{ariaLabel}" aria-description="{ariaDescriptionConteneur}" aria-owns="{recherchable === 'false' ? idControleResultats : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}">
      <span class="selection {multiple === 'true'  && optionsSelectionnees.length > 0 ? 'contient-etiquettes': ''}" on:click={clickSelection} on:mousedown={selectionMouseDown}>

        {#if optionsSelectionnees.length === 0}
          <span class="utd-placeholder">{placeholder}</span>
        {:else}
          {#if multiple === 'false'}
              <span>{optionsSelectionnees[0].texte}</span>                                
          {:else}
              <ul aria-label="{labelListeValeursSelectionnees}">
                {#each optionsSelectionnees as optionSelectionnee, i}
                  <li>
                    <button type="button" class="etiquette" title="{titleEtiquette}" tabindex="{afficherOptions ? '0' : '-1'}" aria-description="{descriptionEtiquette}" indexeOption="{optionSelectionnee.indexe}" on:click={deselectionnerOptionViaEtiquette} on:blur={blurOptionSelectionnee}>
                      <span class="texte">{optionSelectionnee.texte}</span>
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
          <label for="{idControleRecherche}" class="utd-sr-only">{placeholderRecherche}</label>
          <input type="text" id="{idControleRecherche}" class="utd-form-control recherche" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-multiselectable="{multiple === 'true' ? 'true' : null}" on:input={traiterSaisieRecherche} on:blur={blurRecherche} autocomplete="off" spellcheck="false" placeholder="{placeholderRecherche}" aria-description="{ariaDescriptionRecherche}" aria-controls="{idControleResultats}" aria-activedescendant="{afficherOptions ? idActiveDescendant : null}">
        </span>            
      {/if}
      <span class="resultats utd-scrollbar-verticale{!afficherOptions ? ' utd-d-none' : ''}{recherchable === 'true' ? ' recherchable' : ''}{estScrollbarSuggestionsVisible ? " scrollbar-visible" : ''}" on:mousedown={resultatsMouseDown}  dir="ltr">
        {#if suggestions.length === 0}
          <span class="texte-aucun-resultat" aria-hidden="true">{texteAucunResultat}</span>
        {/if}

        <ul class="suggestions" role="listbox" aria-label="Suggestions" aria-multiselectable="{multiple === 'true' ? 'true' : null}" id="{idControleResultats}">
          {#each suggestions as suggestion, i}
            <li class="{i === indexeFocusOption ? 'focus' : ''}" aria-label="{suggestion.texte}" role="option" id="{suggestion.id}" value="{suggestion.value}" indexeSuggestion="{i}" indexeOption="{suggestion.indexe}" aria-selected="{suggestion.selected ? 'true' : 'false'}" on:click={clickOption}>
              {#if multiple === 'true'}
                <span class="utd-checkbox" aria-hidden="true"></span>
              {/if}                            
              <span class="texte-option">{suggestion.texte}</span>      
            </li>
          {/each}   
        </ul> 
      </span>      
    </span>      
</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
