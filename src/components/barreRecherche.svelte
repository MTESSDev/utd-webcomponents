<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-barre-recherche" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils";
import { slide } from "svelte/transition";
import { get_current_component } from "svelte/internal";

const languePage = Utils.obtenirLanguePage()

export let placeholder = languePage === 'fr' ? "Rechercher..." : "Search..."
export let focus = 'false'
export let rechercheFloue = "true"
export let precisionRecherche = "0.2"


const ariaDescriptionRecherche = languePage === 'fr' ? "Saisir le terme recherché, puis utilisez les touches flèches haut et bas pour naviguer dans la liste des résultats, et ensuite Entrée ou Espace pour accéder au résultat désiré" : "Enter the search term, then use the up and down arrow keys to navigate the list of results, and then Enter or Space to access the desired result"
const srResultatsTrouves = languePage === 'fr' ? "{x} résultats trouvés" : "{x} results found."
const texteAucunResultat = languePage === 'fr' ? "Aucun résultat trouvé." : "No results found."
const srAucunResultat = texteAucunResultat
const titleBoutonReinitialiserRecherche = languePage === 'fr' ? "Réinitialiser la recherche" : "Reset search"

const srcBaseImage = `${Utils.imagesRelativePath}utd-sprite.svg_versionUtd_#`
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const idControleZoneNotificationLecteurEcran = Utils.genererId()
const thisComponent = get_current_component()

const nbCaracteresMinimalRecherche = 3

let mounted = false
let afficherResultats = false
let idActiveDescendant = null
let optionsMiniSearch
let contenuRecherche = []
let resultatsRecherche = null
let indexeFocusResultat = null
let texteRecherche = ""
let texteNotificationLecteurEcran = ""


/* Contrôles */
let controleRecherche

onMount(() => {  

  controleRecherche = thisComponent.shadowRoot.getElementById(idControleRecherche)  

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
  Utils.reafficherApresChargement(thisComponent)
})

/* ============== Watches ============== */
  // Watch sur la prop focus
  $: toggleFocus(focus) 


function toggleFocus() {

  if(focus === 'true'){
    controleRecherche.focus()
    thisComponent.setAttribute('focus', 'false')
  }
}

function traiterSaisieRecherche(){  
  console.log('saisie recherche')
  // Empêche le traitement si simplement un focus ou un blur (l'événement input est lancé sur focus et blur)
  if( texteRecherche === controleRecherche.value ){
    return
  } 

  texteRecherche = controleRecherche.value
  definirResultatsDebounced()
}

const definirResultatsDebounced = Utils.debounce(() => definirResultats(true))

function definirResultats(doitNotifierLecteurEcran) {
  console.log('RECHERCHE!!!!')
  return 
  //TODO retirer? si tjrs 3 caractères minimal
  const optionsRecherche = {...optionsMiniSearch, ...{fuzzy: term => term.length > nbCaracteresMinimalRecherche ? optionsMiniSearch.fuzzy : null}}

  const texteRechercheSansEspace = texteRecherche.trim()
  if(texteRechercheSansEspace !== "" && texteRechercheSansEspace.length >= nbCaracteresMinimalRecherche){
    resultatsRecherche = miniSearch.search(texteRechercheSansEspace, optionsRecherche).map((item) => options.find((option) => item.indexe === option.indexe))
  } else {
    resultatsRecherche = []
  }

  if(doitNotifierLecteurEcran){
    if(resultatsRecherche.length === 0){
      notifierLecteurEcran(srAucunResultat)
    } else {
      notifierLecteurEcran(srResultatsTrouves.replace("{x}", resultatsRecherche.length))      
      indexeFocusResultat = null
    }    
  }

  //Vérifier si scrollbar visible ou non (servira a ajouter une marge de droite afin que la scrollbar ne soit pas collée sur la bordure du contrôle)
  //definirPresenceScrollbarResultats()
}

function reinitialiserRecherche() {
  controleRecherche.value = ""
  resultatsRecherche = null
  controleRecherche.focus()
}

function notifierLecteurEcran(texte){
  texteNotificationLecteurEcran = texte
  
  //On s'assure que le texte va être lu (car parfois c'est le même texte, s'il ne change pas, il n'est pas lu)
  setTimeout(() => {
    texteNotificationLecteurEcran = ""
  }, 400);
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

</script>

<div class="utd-barre-recherche">
  <div class="controle-recherche">
      <input id="{idControleRecherche}" type="text" autocomplete="off" autocapitalize="none" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="{idControleResultats}" aria-activedescendant="{afficherResultats ? idActiveDescendant : null}" placeholder="{placeholder}" aria-description="{ariaDescriptionRecherche}" on:input={traiterSaisieRecherche} class="utd-form-control xxl texte-recherche">
      <button class="reinitialiser-recherche" type="button" title="{titleBoutonReinitialiserRecherche}" on:click={reinitialiserRecherche}>
          <img aria-hidden="true" src="{`${srcBaseImage}ico-xfermer-bleu-moyen`}" width="16" height="16">
      </button>
  </div>
  
  <ul id="{idControleResultats}" role="listbox" class="resultats-recherche utd-d-none">    
  </ul>

  <span role="status" class="utd-sr-only" tabindex="-1">{texteNotificationLecteurEcran}</span>

</div>



<link rel='stylesheet' href='{Utils.cssFullPath}'>
