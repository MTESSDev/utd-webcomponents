<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
Référence : https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-none.html
-->


<svelte:options tag="utd-liste-deroulante" />

<script>
//TODO2 (REVÉRIFIER CAR CHANGE DEVRAIT ETRE CALLÉ) Caller blur event du select quand sélectionne ou déselectionne une option



import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  
import MiniSearch from 'minisearch'

const languePage = Utils.obtenirLanguePage()

export let recherchable = "false"
export let rechercheFloue = "true"
export let precisionRecherche = "0.2"
export let largeur = "md" //Valeurs possible sm, md, lg
export let placeholder = languePage === 'fr' ? "Effectuer un choix" : "Make a selection"

//Contrôles
const thisComponent = get_current_component()
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idControleZoneNotificationLecteurEcran = Utils.genererId()


//Textes fixes TODO traduire
const titleEtiquette = languePage === 'fr' ? "Supprimer" : "Delete"
const descriptionEtiquette = languePage === 'fr' ? "Déselectionner" : "Unselect"
const texteNotificationEtiquetteSupprimee = languePage === 'fr' ? "Élément désélectionné" : "Item unselected"
const srPrefixeDescriptionValeurSelectionnee = languePage === 'fr' ? "Valeur sélectionnée" : "Selected value"
const srPrefixeDescriptionValeursSelectionnees = languePage === 'fr' ? "Valeurs sélectionnées" : "Selected values"
const labelListeValeursSelectionnees = languePage === 'fr' ? "Valeurs sélectionnées" : "Selected values"
const srResultatsTrouves = languePage === 'fr' ? "{x} résultats trouvés" : "{x} results found."
const texteAucunResultat = languePage === 'fr' ? "Aucun résultat trouvé." : "No results found."
const srAucunResultat = texteAucunResultat
const textePlaceholderRecherche = languePage === 'fr' ? "Rechercher dans la liste" : "Search in the list"
const texteCommunAriaDescriptionRecherche = languePage === 'fr' ? "Utilisez les touches flèches haut et bas pour naviguer dans la liste des choix possibles, Entrée ou Espace pour effectuer une sélection" : "Use the up and down arrow keys to navigate through the list of possible choices, Enter or Space to make a selection"
const texteAccesSelectionAriaDescriptionRecherche = languePage === 'fr' ? ", et Shift + Tab afin d'accéder à la liste des éléments sélectionnés" : ", and Shift + Tab to to access the list of selected items"
const srLibelleListeValeursPossibles = 'fr' ? "Choix disponibles:" : "Available choices:"
const nbCaracteresMinimalRecherche = 2

let mounted = false
let html
let composant
let controleConteneur
let controleSelection
let controleLabel
let ariaLabel = null
let ariaDescriptionConteneur = null
let ariaDescriptionRecherche = null
let controleRecherche
let controleSelect
let controleZoneNotificationLecteurEcran
let controleConteneurResultats
let afficherOptions = false
let indexeFocusSuggestion = null
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
let multiple = false


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
    if(!controleSelect){
      return
    }

    ajusterControleLabelOriginal()

    initialiserOptionsSuggestionsEtRecherche()

    definirAttributsInitiauxControles()
    observerChildListSelectOriginal()
    observerAttributsSelectOriginal()
    observerAttributsLabelOrignal()

})


// Watches
$: toggleAfficherOptions(afficherOptions) 
$: majActiveDescendant(indexeFocusSuggestion) 


function initialiserOptionsSuggestionsEtRecherche(){
  options = obtenirOptions()

  //Settimeout important afin de s'assurer que le paint et autres traitements sont complétés (ex. avec VueFormulate)
  setTimeout(() => {
    definirOptionsSelectionnees()      
    definirSuggestions()
  })  

  if(recherchable === 'true'){
      miniSearch = new MiniSearch(optionsMiniSearch)    
      miniSearch.addAll(options)   
    }
}
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
      ariaDescription = multiple ? `${texteCommunAriaDescriptionRecherche}${texteAccesSelectionAriaDescriptionRecherche}.` : `${texteCommunAriaDescriptionRecherche}.`
  }

  ariaDescriptionRecherche = ariaDescription
}

function definirAttributsInitiauxControles(){
  //Settimeout important afin de s'assurer que le paint et autres traitements sont complétés (ex. avec VueFormulate)
  setTimeout(() => {
    majAttributControle(controleConteneur, 'aria-invalid', controleSelect.getAttribute('aria-invalid'))
    majAttributControle(controleConteneur, 'aria-required', controleSelect.getAttribute('aria-required'))
    definirAriaLabelConteneur()
    definirAriaDescriptionConteneur()
    definirAriaDescriptionRecherche()
  })
}

function definirAriaLabelConteneur(){
  

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
  description = description ? description + '. ' : '' 

  const prefixe = multiple ? srPrefixeDescriptionValeursSelectionnees : srPrefixeDescriptionValeurSelectionnee

  if(optionsSelectionnees.length){
    const texteNbOptions = multiple ? ` (${optionsSelectionnees.length})` : ''
    description += `${prefixe}${texteNbOptions} : ${obtenirTexteOptionsSelectionnees()}`
  } else {
    description += `${placeholder}.`
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

function observerAttributsSelectOriginal(){

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

function observerChildListSelectOriginal(){

  const observer = new MutationObserver(function(mutations) {
    initialiserOptionsSuggestionsEtRecherche()
  })

  observer.observe(controleSelect, {subtree: true, childList: true})
}


function observerAttributsLabelOrignal(){

  if(!controleLabel){
    return
  }

  const observerCharacterData = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      definirAriaLabelConteneur()
    })
  })

  const observerAriaLabel = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      definirAriaLabelConteneur()
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
    } 
  }
  else {
      return ''
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
    if(option.value){
        const opt = {
        id: Utils.genererId(),
        texte: texte,
        valeur: option.value,
        motsCles: option.getAttribute('mots-cles'),
        indexe: i,
        selected: option.selected,
        disabled: option.disabled,
        hidden: option.hidden
      }

      options.push(opt)
    }
  }

  return options
}

function retirerOptionPlaceholderControleSelectOriginal(){
  //Pour le moment on ne retire que la 1ere option d'un select multiple si elle est vide, hidden et disabled... Dans ce cas il s'agit d'un placeholder, mais ça ne sert à rien pour un select multiple.
  if(controleSelect.options.length){
    const option = controleSelect.options[0]
    if(!option.value && option.getAttribute('hidden') !== null && option.getAttribute('disabled') !== null){
      controleSelect.options[0] = null
    }
  }
}

function definirSuggestions(doitNotifierLecteurEcran) {

  let nouvellesSuggestions = []
  let resultatRecherche = []

  const optionsRecherche = {...optionsMiniSearch, ...{fuzzy: term => term.length > 3 ? optionsMiniSearch.fuzzy : null}}

  const texteRechercheSansEspace = texteRecherche.trim()
  if(texteRechercheSansEspace !== "" && texteRechercheSansEspace.length >= nbCaracteresMinimalRecherche){
    resultatRecherche = miniSearch.search(texteRechercheSansEspace, optionsRecherche).map((item) => options.find((option) => item.indexe === option.indexe))
  } else {
    resultatRecherche = options
  }

  for (let i = 0; i < resultatRecherche.length; i++) {   
    const suggestion = resultatRecherche[i]

    suggestion.selected =  optionsSelectionnees.findIndex((option) => suggestion.indexe === option.indexe) >= 0
    nouvellesSuggestions.push(suggestion)
  }

  
  if(doitNotifierLecteurEcran){
    if(nouvellesSuggestions.length === 0){
      notifierLecteurEcran(srAucunResultat)
    } else {
      notifierLecteurEcran(srResultatsTrouves.replace("{x}", nouvellesSuggestions.length))      
      indexeFocusSuggestion = null
    }    
  }

  suggestions = nouvellesSuggestions

  //Vérifier si scrollbar visible ou non (servira a ajouter une marge de droite afin que la scrollbar ne soit pas collée sur la bordure du contrôle)
  definirPresenceScrollbarResultats()
}


const definirSuggestionsDebounced = Utils.debounce(() => definirSuggestions(true))


function definirPresenceScrollbarResultats(){
  setTimeout(() => {
    estScrollbarSuggestionsVisible = controleConteneurResultats.scrollHeight > controleConteneurResultats.clientHeight    
  })
}

function ajusterControleSelectOriginal() {
  
  controleSelect = thisComponent.querySelector("select")

  if(!controleSelect){
    return
  }

  if(controleSelect.getAttribute('multiple') !== null){
    multiple = true
  }
  
  ajouterPlaceholderSelectOriginal()

  //Si le select original reçoit le focus, on le redonne tout de suite à notre composant
  controleSelect.addEventListener('focus', (e) => { 
    e.preventDefault()
    e.stopPropagation()

    controleConteneur.focus()
  })

  controleSelect.classList.add('utd-sr-only')
  controleSelect.setAttribute("tabindex", "-1")  
  controleSelect.setAttribute("aria-hidden", "true")  

  if(multiple){
    controleSelect.setAttribute("multiple", "")
    retirerOptionPlaceholderControleSelectOriginal()
  }
}

function ajouterPlaceholderSelectOriginal(){
  
  if(controleSelect.options[0].value !== '' ){
    const optionPlaceholder = new Option(placeholder,'')
    optionPlaceholder.disabled = true
    optionPlaceholder.hidden = true
    optionPlaceholder.selected = true

    controleSelect.options.add(optionPlaceholder, 0)
  }
}

function ajusterControleLabelOriginal() {
  
  controleLabel = thisComponent.querySelector("label")

  if(!controleLabel){
    controleLabel = thisComponent.getRootNode().querySelector(`label[for="${controleSelect.id}"]`)
  }

  if(!controleLabel){
    controleLabel = thisComponent.parentElement.querySelector('label')
  } 

  //On annule le comportement par défaut du click afin d'éviter qu'il donne le focus au contrôle select original qui est hors écran. Cela faisait afficher le contrôle natif en mobile une fraction de seconde avant que le focus retourne sur notre conteneur.
  if(controleLabel){
    controleLabel.addEventListener('click', (e) => {  
      e.preventDefault()
      e.stopPropagation()
      controleConteneur.focus()
    })
  } 
}


function selectionnerOption(indexeSuggestion, doitNotifierLecteurEcran = false){
  if(indexeSuggestion !== null){

    const indexeSelectionPrecedente = controleSelect.selectedIndex
    const indexeOption = suggestions[indexeSuggestion].indexe

    majValeurListeOriginale(indexeOption)
    definirOptionsSelectionnees()

    if(!multiple){
      
      if(indexeSelectionPrecedente >= 0){
        const indexePrecedent = suggestions.findIndex((element) => element.indexe === indexeSelectionPrecedente)

        if(indexePrecedent >= 0){
          suggestions[indexePrecedent].selected = false
        }        
      }

      suggestions[indexeSuggestion].selected = true
      if(doitNotifierLecteurEcran){
        notifierLecteurEcran(suggestions[indexeSuggestion].texte)
      }
    } else {      
      suggestions[indexeSuggestion].selected = optionsSelectionnees.findIndex((element) => element.indexe === indexeOption) >= 0
    }

    if(!multiple){
      afficherOptions = false
      controleConteneur.focus()
    } else {
      indexeFocusSuggestion = indexeSuggestion
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
  
  if(multiple){
    controleSelect.options[indexe].selected = !controleSelect.options[indexe].selected
  } else {
    controleSelect.selectedIndex = indexe
  }
  //Important! Nécessaire afin que notamment VueFormulate (FRW) considère la nouvelle valeur saisie... Sinon c'est comme si rien n'avait été sélectionné.
  controleSelect.dispatchEvent(new Event('change'))
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

  for (let i = 0; i < controleSelect.selectedOptions.length; i++) {  
    const option = controleSelect.selectedOptions[i]   
    if(option.value){ 
      optionsSelectionnees.push(options.find((element) => element.indexe === option.index))
    }
  }
}

function onKeyDown(e){
  switch(e.key) {
    case "Enter":
    case " ":
   

      //On conserve comportement natif si barre espace et contrôle courant est textbox de recherche
      if(e.key === " " && e.target == controleRecherche && indexeFocusSuggestion === null) {
        return  
      }

      //Si contrôle courant est une etiquette, on procède à la désélection
      if(e.target.classList.contains('etiquette')) {
        return        
      }

      e.preventDefault()

      if(indexeFocusSuggestion !== null) {
        selectionnerOption(indexeFocusSuggestion)
        definirAriaDescriptionConteneur()
      } else {
        afficherOptions = !afficherOptions     
        if(suggestions.length && recherchable === 'false'){
          indexeFocusSuggestion = 0
        } 
      }

      break
    case "Tab":
      //Pour une liste déroulante multiple sans recherche avec des selections actives, on veut que le SHIFT + TAB donne le focus à la dernière étiquette et TAB passe au contrôle suivant.
      if(recherchable === 'false' && multiple && afficherOptions && e.target === controleConteneur && optionsSelectionnees.length > 0){            
        if(e.shiftKey){
          e.preventDefault()
          e.stopPropagation()

          const etiquettes = controleSelection.querySelectorAll('.etiquette')
          if(etiquettes.length){
            etiquettes[etiquettes.length -1].focus()
          }
        } else {            
            //Si tab seulement on ferme la liste (le focus ira au prochain contrôle)
            afficherOptions = false
        }
      }
      break        
      
    case "Escape":
      afficherOptions = false
      controleConteneur.focus()
      break        
    case "ArrowDown":
    case "ArrowRight":

      //On conserve comportement natif si flèche droite et contrôle courant est textbox de recherche
      if(e.key === 'ArrowRight' && e.target == controleRecherche) {
        return  
      }
      
      e.preventDefault()

      //Si liste simple sans recherche, la flèche provoque un changement de l'option sélectionnée comme un select natif
      if(recherchable === 'false' && !multiple && !afficherOptions){
        selectionnerOption(obtenirIndexeProchaineSuggestion(controleSelect.selectedIndex, 1), true)
        return
      }

      //Affiche les options si ne sont pas visibles actuellement
      if(!afficherOptions){
        afficherOptions = true

        if(suggestions.length && recherchable === 'false'){
          indexeFocusSuggestion = 0
        }
      } else if(suggestions.length){
        if(indexeFocusSuggestion !== null){
          modifierIndexeOptionCourante(1)     
        } else {
          indexeFocusSuggestion = indexeFocusSuggestion || 0
        }        
      }
      assurerOptionCouranteVisible()

      break      
    case "ArrowUp":
    case "ArrowLeft":

      //On conserve comportement natif si flèche gauche et contrôle courant est textbox de recherche
      if(e.key === 'ArrowLeft' && e.target == controleRecherche) {
        return  
      }

      e.preventDefault()

      //Si liste simple sans recherche, la flèche provoque un changement de l'option sélectionnée comme un select natif
      if(recherchable === 'false' && !multiple && !afficherOptions){
        selectionnerOption(obtenirIndexeProchaineSuggestion(controleSelect.selectedIndex, -1), true)
        return
      }

      if(!afficherOptions){
        afficherOptions = true

        if(suggestions.length && recherchable === 'false'){
          indexeFocusSuggestion = suggestions.length - 1
        }

      } else if(suggestions.length){
          if(indexeFocusSuggestion !== null){
            modifierIndexeOptionCourante(-1)     
          } else {
            indexeFocusSuggestion = indexeFocusSuggestion || suggestions.length - 1
          }      
      }
      assurerOptionCouranteVisible()
      break

      case "Home":
      case "PageUp":
        //On conserve comportement natif si End et contrôle courant est textbox de recherche
        if(e.target == controleRecherche) {
          return  
        }

        e.preventDefault()

        //Si liste simple sans recherche, la flèche provoque un changement de l'option sélectionnée comme un select natif
        if(recherchable === 'false' && !multiple && !afficherOptions){
          if(e.key === "PageUp"){
            let step = Math.floor((suggestions.length - 1) / 4)
            step = step > 8  ? 8 : step

            const indexe = (controleSelect.selectedIndex - step) < 0 ? 0 : controleSelect.selectedIndex - step
            selectionnerOption(indexe, true)
          } else {
            selectionnerOption(0, true)
          }
          return
        }

        if(!afficherOptions){
          afficherOptions = true

          if(suggestions.length && recherchable === 'false'){
            indexeFocusSuggestion = 0
          }

        } else if(suggestions.length){
          indexeFocusSuggestion = 0
        }
        assurerOptionCouranteVisible()
        break
      case "End":
      case "PageDown":
        //On conserve comportement natif si End et contrôle courant est textbox de recherche
        if(e.target == controleRecherche) {
          return  
        }

        e.preventDefault()

        //Si liste simple sans recherche, la flèche provoque un changement de l'option sélectionnée comme un select natif
        if(recherchable === 'false' && !multiple && !afficherOptions){
          if(e.key === "PageDown"){
            let step = Math.floor((suggestions.length - 1) / 4)
            step = step > 8  ? 8 : step

            const indexe = (controleSelect.selectedIndex + step) > suggestions.length - 1 ? suggestions.length - 1 : controleSelect.selectedIndex + step
            selectionnerOption(indexe, true)
          } else {
            selectionnerOption(suggestions.length - 1, true)
          }

          return
        }

        if(!afficherOptions){
          afficherOptions = true

          if(suggestions.length && recherchable === 'false'){
            indexeFocusSuggestion = suggestions.length - 1
          }

        } else if(suggestions.length){
          indexeFocusSuggestion = suggestions.length - 1
        }
        assurerOptionCouranteVisible()
        break
  }
}

function obtenirIndexeProchaineSuggestion(indexeCourantControleSelect, step){
  let indexeTrouve = false
  let indexeCourantSuggestion = suggestions.findIndex((s) => s.indexe === indexeCourantControleSelect)
  
  //Si suggestion associée à indexe courant du select (ex. le placeholder index 0 hidden disabled qui n'est pas intégré dans nos suggestions) on retourne 0 (1ere suggestion)
  if(indexeCourantSuggestion < 0){
      return 0
  }

  let prochainIndexe = indexeCourantSuggestion + step

  while (!indexeTrouve) {
    
    if(step > 0 && prochainIndexe > suggestions.length - 1 || step < 0 && prochainIndexe < 0){
      return indexeCourantSuggestion
    } else {
      const prochaineSuggestion = suggestions[prochainIndexe]
      if(!prochaineSuggestion.disabled && !prochaineSuggestion.hidden){
        return prochainIndexe
      }
    }
    prochainIndexe = prochainIndexe + step
  }
}

function clickSelection(e){

  
  afficherOptions = !afficherOptions

  if(recherchable === 'true' && afficherOptions){
    controleRecherche.parentElement.classList.remove('utd-d-none')
    controleRecherche.focus()              

  } else {
    controleConteneur.focus()  
  } 
}

function selectionMouseDown(e){
  //Petite twist afin de ne pas provoquer de blur si on click sur le contrôle de sélection à partir d'un autre contrôle. (Évite la loop de fermeture/ouverture du dropdown)
  e.preventDefault()
  e.stopPropagation()
}

function majActiveDescendant() {
  if(indexeFocusSuggestion !== null) {
    idActiveDescendant = suggestions[indexeFocusSuggestion].id
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
    
    assurerControleVisible()
    definirPresenceScrollbarResultats()      

  } else {
    definirAriaDescriptionRecherche()   
    indexeFocusSuggestion = null
  } 
}

function modifierIndexeOptionCourante(step) {
  if(!step){
    indexeFocusSuggestion = null
    return
  }

  const prochainIndexe = indexeFocusSuggestion + step
  const indexeDerniereOption = suggestions.length - 1

  if(prochainIndexe > indexeDerniereOption){
    indexeFocusSuggestion = 0;
  }
  else if(prochainIndexe < 0){
    indexeFocusSuggestion = indexeDerniereOption;
  }
  else {
    indexeFocusSuggestion = prochainIndexe;
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
    controleSelect.dispatchEvent(new Event('blur'))
    definirAriaDescriptionConteneur()
  }
 }

function blurRecherche(e){     
  if(!estFocusInterieurComposant(e)){
    afficherOptions = false
    controleSelect.dispatchEvent(new Event('blur'))
  } else {
    indexeFocusSuggestion = null
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

  const indexeSuggestion = e.currentTarget.getAttribute('indexeSuggestion')

  if(indexeSuggestion){
    selectionnerOption(parseInt(indexeSuggestion)) 
    definirAriaDescriptionConteneur()   
  }
}


function assurerOptionCouranteVisible() {
  //SetTimeout nécessaire afin que le paint de la page soit fait et qu'on puisse travailler avec l'option qui vient de recevoir le focus.
  setTimeout(() => {
    const option = thisComponent.shadowRoot.querySelector('.suggestions .focus')

    if(!option){
      return
    }

    const hauteurConteneur = controleConteneurResultats.getBoundingClientRect().height
    const hauteurOption = option.getBoundingClientRect().height
    const offsetConteneur = controleConteneurResultats.scrollTop + hauteurConteneur

    //Si nous sommes sur la 1ere ou la dernière suggestion on gère manuellement le scroll
    if(indexeFocusSuggestion === 0){
      controleConteneurResultats.scroll({top: 0})
      return
    } else if(indexeFocusSuggestion === suggestions.length - 1){
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

/**
 * On s'assure que notre contrôle est visible en entier ou du moins au maximum de la hauteur disponible.
 */
function assurerControleVisible() {
  //SetTimeout nécessaire afin que le paint de la page soit fait 
  setTimeout(() => {
    const rectConteneur = controleConteneur.getBoundingClientRect()
    const rectLabel = controleLabel.getBoundingClientRect()

    const hauteurFenetre = window.innerHeight
    const hauteurConteneur = rectConteneur.height
    const topLabel = rectLabel.top
    const topConteneur = rectConteneur.top
    const offsetTopLabel = html.scrollTop + topLabel
    const hauteurLabel = topConteneur - topLabel
    const hauteurControle = hauteurLabel + hauteurConteneur

    const posYBasFenetre = html.scrollTop + hauteurFenetre
    const posYBasControle = offsetTopLabel + hauteurControle

    if(hauteurControle > hauteurFenetre){
      //La hauteur de notre contrôle est supérieure à la hauteur du viewport, on scroll afin que le label soit au haut de l'écran.
      window.scroll({top: html.scrollTop + rectLabel.top})
    } else if(posYBasControle > posYBasFenetre) {
      //Notre contrôle n'est pas entièrement visible, on scroll juste ce qu'il faut pour que le bas de notre contrôle soit visible
      const hauteurPortionMasquee = posYBasControle - posYBasFenetre
      window.scroll({top: html.scrollTop + hauteurPortionMasquee})
    }    
  })
}

</script>


<div class="utd-component utd-liste-deroulante {largeur}{multiple ? ' multiple' : ''}{recherchable === 'true' ? ' recherchable' : ''}">
  <slot></slot>

    <span aria-live="polite" id="{idControleZoneNotificationLecteurEcran}" class="utd-sr-only" tabindex="-1">{texteNotificationLecteurEcran}</span>

    <span class="conteneur utd-form-control{afficherOptions ? ' ouvert' : ''}" dir="ltr" on:blur={blurConteneur}  role="{afficherOptions ? null : 'listbox'}" aria-expanded="{afficherOptions ? 'true' : 'false'}" tabindex="{afficherOptions ? '-1' : '0'}" on:keydown={onKeyDown} aria-disabled="false" aria-label="{ariaLabel}" aria-description="{ariaDescriptionConteneur}" aria-owns="{recherchable === 'false' ? idControleResultats : null}" aria-multiselectable="{multiple && recherchable === 'false' ? 'true' : null}" aria-activedescendant="{recherchable === 'false' && afficherOptions ? idActiveDescendant : null}">
      <span class="selection {multiple  && optionsSelectionnees.length > 0 ? 'contient-etiquettes': ''}" on:click={clickSelection} on:mousedown={selectionMouseDown}>

        {#if optionsSelectionnees.length === 0}
          <span class="utd-placeholder">{placeholder}</span>
        {:else}
          {#if !multiple}
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
          <label for="{idControleRecherche}" class="utd-sr-only">{textePlaceholderRecherche}</label>
          <input type="text" id="{idControleRecherche}" class="utd-form-control recherche" role="combobox" aria-expanded="true" aria-autocomplete="none" on:input={traiterSaisieRecherche} on:blur={blurRecherche} autocomplete="off" spellcheck="false" placeholder="{textePlaceholderRecherche}" aria-description="{ariaDescriptionRecherche}" aria-controls="{idControleResultats}" aria-activedescendant="{afficherOptions ? idActiveDescendant : null}">
        </span>            
      {/if}

      {#if !multiple && recherchable === 'false' && afficherOptions}
        <span class="separateur-resultats" aria-hidden="true"></span>
      {/if}

      <span class="resultats utd-scrollbar-verticale{!afficherOptions ? ' utd-d-none' : ''}{recherchable === 'true' ? ' recherchable' : ''}{estScrollbarSuggestionsVisible ? " scrollbar-visible" : ''}" on:mousedown={resultatsMouseDown}  dir="ltr">
        {#if suggestions.length === 0}
          <span class="texte-aucun-resultat" aria-hidden="true">{texteAucunResultat}</span>
        {/if}

        <ul class="suggestions" role="listbox" aria-label="{srLibelleListeValeursPossibles}" aria-multiselectable="{multiple ? 'true' : null}" id="{idControleResultats}">
          {#each suggestions as suggestion, i}
            <li class="{i === indexeFocusSuggestion ? 'focus' : ''}" aria-label="{suggestion.texte}" role="option" id="{suggestion.id}" value="{suggestion.value}" indexeSuggestion="{i}" indexeOption="{suggestion.indexe}" aria-selected="{suggestion.selected ? 'true' : 'false'}" on:click={clickOption}>
              {#if multiple}
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
