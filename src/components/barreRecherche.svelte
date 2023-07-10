<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-barre-recherche" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils";
import { slide } from "svelte/transition";
import { get_current_component } from "svelte/internal";
import MiniSearch from 'minisearch'

const languePage = Utils.obtenirLanguePage()

/* Attributs publics */
export let urlContenuRecherche = ''
export let placeholder = languePage === 'fr' ? "Rechercher..." : "Search..."

/* Attributs privés */
export let focus = 'false'
export let rechercheFloue = 'true'
export let precisionRecherche = "0.2"
export let contextePiv = 'false'


const ariaDescriptionRecherche = languePage === 'fr' ? "Saisir le terme recherché, puis utilisez les touches flèches haut et bas pour naviguer dans la liste des résultats, et ensuite Entrée ou Espace pour accéder au résultat désiré" : "Enter the search term, then use the up and down arrow keys to navigate the list of results, and then Enter or Space to access the desired result"
const srResultatsTrouves = languePage === 'fr' ? "{x} résultats trouvés" : "{x} results found."
const texteAucunResultat = languePage === 'fr' ? "Aucun résultat trouvé." : "No results found."
const srAucunResultat = texteAucunResultat
const titleBoutonReinitialiserRecherche = languePage === 'fr' ? "Réinitialiser la recherche" : "Reset search"

const srcBaseImage = `${Utils.imagesRelativePath}utd-sprite.svg_versionUtd_#`
const idControleRecherche = Utils.genererId()
const idControleResultats = Utils.genererId()
const thisComponent = get_current_component()


const nbCaracteresMinimalRecherche = 3

let mounted = false
let nbNiveaux = 1
let afficherResultats = false
let idActiveDescendant = null
let miniSearch
let optionsMiniSearch
let controleConteneurResultats
let contenuRecherche = null
let resultatsRecherche = null
let resultatsRechercheFlat = null
let texteRecherche = ""
let texteNotificationLecteurEcran = ""


/* Contrôles */
let controleRecherche

onMount(() => {  

  controleRecherche = thisComponent.shadowRoot.getElementById(idControleRecherche)  

  optionsMiniSearch = {
    fuzzy: rechercheFloue === 'true' ? parseFloat(precisionRecherche) : null,
    prefix: true,
    fields: ['c', 'sc', 't', 'mc'],
    storeFields: ['id', 'c', 'sc', 'r', 't', 'h'],
    stopWords: new Set([]),
    combineWith: 'OR',
    filter: null,
    processTerm: (term, _fieldName) => indexerTerme(term)
  }

  controleConteneurResultats = thisComponent.shadowRoot.querySelector('.resultats-recherche')

  mounted = true  
  Utils.reafficherApresChargement(thisComponent)
})

/* ============== Watches ============== */
  // Watch sur la prop focus
  $: toggleFocus(focus) 
  $: majContenuRecherche(contenuRecherche) 


function toggleFocus() {

  if(focus === 'true'){
    controleRecherche.focus()
    thisComponent.setAttribute('focus', 'false')
  }
}

function majContenuRecherche() {
  if(contenuRecherche && contenuRecherche.length > 0) {

    const contenuAvecId = contenuRecherche.map((c, i) => {
        c.id = Utils.genererId()
        c.indexe = i
        return c
    })

    miniSearch = new MiniSearch(optionsMiniSearch)    
    miniSearch.addAll(contenuAvecId)   

    nbNiveaux = obtenirNombreNiveaux(contenuAvecId)

    rechercher(true)
  }
}

function traiterSaisieRecherche(){  

  // Empêche le traitement si simplement un focus ou un blur (l'événement input est lancé sur focus et blur)
  if( texteRecherche === controleRecherche.value ){
    return
  } 

  texteRecherche = controleRecherche.value
  rechercherDebounced()
}

const rechercherDebounced = Utils.debounce(() => {
  if(resultatsRecherche === null && contenuRecherche === null) {
    initialiserRecherche()    
  } else {
    rechercher(true)
  }
}, 750)

function initialiserRecherche() {
  // console.log('initialiserRecherche ' + urlContenuRecherche)
  
  if(urlContenuRecherche) {
    obtenirContenuRechercheViaUrl()
      .then((contenu) => {
        contenuRecherche = contenu
    })
  }
  else {
    Utils.dispatchWcEvent(thisComponent, "initialiser", {definirContenuRecherche: (donnees) => { contenuRecherche = donnees.contenu }})
  }
}


function obtenirContenuRechercheViaUrl () {   
   return fetch(urlContenuRecherche)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status)
        }
        return response.json()
    })
}

function obtenirNombreNiveaux(contenuRecherche) {
  if(contenuRecherche && contenuRecherche.length > 0){
    if(contenuRecherche[0].sc && contenuRecherche[0].sc !== '') {
      return 3
    } else if(contenuRecherche[0].c && contenuRecherche[0].c !== '') {
      return 2
    } else {
      return 1
    }
  }

}

function rechercher(doitNotifierLecteurEcran) {

  //TODO retirer? si tjrs 3 caractères minimal
  const optionsRecherche = {...optionsMiniSearch, ...{fuzzy: term => term.length > nbCaracteresMinimalRecherche ? optionsMiniSearch.fuzzy : null}}

  const texteRechercheSansEspace = texteRecherche.trim()

  if(texteRechercheSansEspace !== "" && texteRechercheSansEspace.length >= nbCaracteresMinimalRecherche){    
    const resultats = obtenirResultatsGroupes(miniSearch.search(texteRechercheSansEspace, optionsRecherche))
    
    applatirResultatRecherche(resultats)
    resultatsRecherche = resultats

    if(doitNotifierLecteurEcran){
      if(resultatsRecherche.length === 0){
        notifierLecteurEcran(srAucunResultat)
      } else {
        notifierLecteurEcran(srResultatsTrouves.replace("{x}", resultatsRecherche.length))      
      }    
    }
  } else {
    // console.log('rechercher -> réinitialiser à null')
    resultatsRecherche = null
  }


  //Vérifier si scrollbar visible ou non (servira a ajouter une marge de droite afin que la scrollbar ne soit pas collée sur la bordure du contrôle)
  //definirPresenceScrollbarResultats()
}

function obtenirResultatsGroupes(retourMiniSearch) {
  resultatsRechercheFlat = []

  //Ajouter un indexe (i). Servira lors de la navigation au clavier pour savoir si nous sommes sur le 1er ou dernier élément (même s'ils sont regroupés)
  for (let i = 0; i < retourMiniSearch.length; i++) {
    retourMiniSearch[i].i = i    
  }

  if(nbNiveaux === 1){
    return retourMiniSearch
  } else if(nbNiveaux === 2) {    
    return regrouper(retourMiniSearch, "c")
  } else {
    // 3 niveaux
    resultatsRechercheFlat = []    
    const niveau1 = regrouper(retourMiniSearch, "c")
    if(niveau1) {
      niveau1.forEach((item) => {
        item.values = regrouper(item.values, "sc")
      })
    }
    return niveau1
  }
}

function applatirResultatRecherche(tableau) {
  if(nbNiveaux === 1) {
    resultatsRechercheFlat = tableau
    return 
  }

  tableau.forEach((item) => {
    if(item.values){
      applatirResultatRecherche(item.values)
    } else {
      resultatsRechercheFlat.push(item)
    }
  })
}

function regrouper(source, propriete) {
  return source.reduce((final, val) => {
      let groupe = final.find(r => r[propriete] === `${val[propriete]}`)
      if (groupe) {
        groupe.values.push(val)
      } else {
        const obj = {}
        obj[propriete] = val[propriete]
        obj['values'] = [ val ]
        final.push(obj) 
      }
      return final
    }, [])
}

function clickBoutonReinitialiser() {
  reinitialiserRecherche(true, true)
}

function reinitialiserRecherche(donnerFocusControleRecherche, initialiserValeurControleRecherche) {
    
  resultatsRecherche = null
  idActiveDescendant = null

  if(donnerFocusControleRecherche) {
    controleRecherche.focus()
  }

  if(initialiserValeurControleRecherche) {
    texteRecherche = ""
    controleRecherche.value = ""
  }
}

function notifierLecteurEcran(texte){
  texteNotificationLecteurEcran = texte
  
  //On s'assure que le texte va être lu (car parfois c'est le même texte, s'il ne change pas, il n'est pas lu)
  setTimeout(() => {
    texteNotificationLecteurEcran = ""
  }, 400);
}

function mouseoverResultat(e) {
  idActiveDescendant = this.id
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

function onKeyDownRecherche(e){
  switch(e.key) {
    case "Enter":
    case " ":
   
      if(idActiveDescendant === null) {
        if(e.key === "Enter") {
          reinitialiserRecherche()
        }
      } else {
        // Le focus visuel est dans la liste de résultats. Si ENTER ou SPACE on doit accéder au résultat.
        e.preventDefault()
        const activeDescendant = thisComponent.shadowRoot.getElementById(idActiveDescendant)
        controleRecherche.value = activeDescendant.innerText
        reinitialiserRecherche()
        activeDescendant.click()

      }

      break
    case "Escape":
      reinitialiserRecherche(true, resultatsRecherche === null)
      break        
    case "ArrowDown":
      e.preventDefault()

      if(resultatsRecherche !== null) {
        //Les résultats sont visibles, on donne le focus au résultat suivant
        definirProchainActiveDescendant(1)
        assurerOptionCouranteVisible()
      }

      break      
    case "ArrowUp":
      e.preventDefault()

      if(resultatsRecherche !== null) {
        //Les résultats sont visibles, on donne le focus au résultat précédent
        definirProchainActiveDescendant(-1)
        assurerOptionCouranteVisible()
      }
      break

    case "ArrowLeft":
    case "ArrowRight":
    case "Home":
    case "End":
      if(resultatsRecherche !== null) {
        reinitialiserRecherche()
      }

      break
  }
}

function definirProchainActiveDescendant(step) {
  let indexeActiveDescendant = resultatsRechercheFlat.findIndex((r) => r.id === idActiveDescendant)
  
  if(indexeActiveDescendant >= 0){

    if(step === 1) {
      if(indexeActiveDescendant < resultatsRechercheFlat.length - 1) {
        idActiveDescendant = resultatsRechercheFlat[indexeActiveDescendant + 1].id
      } else {
        idActiveDescendant = resultatsRechercheFlat[0].id
      }
    } else {
      if(indexeActiveDescendant > 0) {
        idActiveDescendant = resultatsRechercheFlat[indexeActiveDescendant - 1].id
      } else {
        idActiveDescendant = resultatsRechercheFlat[resultatsRechercheFlat.length - 1].id
      }
    }
  } else {
    if(step === 1) {
      idActiveDescendant = resultatsRechercheFlat[0].id
    } else {
      idActiveDescendant = resultatsRechercheFlat[resultatsRechercheFlat.length - 1].id
    }
  }
}

//TODO éventuellement vérifier pour faire une fonction réutilisable dans Utils. Est utilisé aussi dans liste déroulante. Seul le bout du premier et dernier élément est différent... À regarder éventuellement.
function assurerOptionCouranteVisible() {  
  //SetTimeout nécessaire afin que le paint de la page soit fait et qu'on puisse travailler avec l'option qui vient de recevoir le focus.
  setTimeout(() => {
    const option = thisComponent.shadowRoot.querySelector('.lien-resultat[aria-selected="true"]')

    if(!option){
      return
    }

    const hauteurConteneur = controleConteneurResultats.getBoundingClientRect().height
    const hauteurOption = option.getBoundingClientRect().height
    const offsetConteneur = controleConteneurResultats.scrollTop + hauteurConteneur

    //Si nous sommes sur la 1ere ou la dernière suggestion on gère manuellement le scroll
    if(option.classList.contains('premier')){
      controleConteneurResultats.scroll({top: 0})
      return
    } else if(option.classList.contains('dernier')){      
      controleConteneurResultats.scroll({top: option.offsetTop})
      return
    }

    if(option.offsetTop + hauteurOption > offsetConteneur){
      if(option.offsetTop + hauteurOption > (offsetConteneur + hauteurOption)){
        //Ici on traite le cas ou le user aurait modifié la position du scroll (ex. avec la souris), dans ce cas on remet l'option courant en haut de liste
        controleConteneurResultats.scroll({top: option.offsetTop});
      } else {
        controleConteneurResultats.scroll({top: controleConteneurResultats.scrollTop + hauteurOption});
      }
    } else if(option.offsetTop < (offsetConteneur - hauteurConteneur)){
      if(option.offsetTop < (offsetConteneur - hauteurOption)){
        //Ici on traite le cas ou le user aurait modifié la position du scroll (ex. avec la souris), dans ce cas on remet l'option courant en haut de liste
        controleConteneurResultats.scroll({top: option.offsetTop});
      } else {
        controleConteneurResultats.scroll({top: controleConteneurResultats.scrollTop - hauteurOption});
      }
    }
  })
}

function onBlurRecherche() {
  //reinitialiserRecherche()
}

/**
 * Petite twist permettant de ne pas avoir de blur sur le contrôle de recherche lors d'un click dans les résultats.
 * @param e
 */
function mouseDownResultatsRecherche(e) {
  e.preventDefault()
}

</script>

<div class="utd-barre-recherche">
  <div class="controle-recherche {contextePiv === 'true' ? ' contexte-piv' : ''}">
      <input id="{idControleRecherche}" type="text" autocomplete="off" autocapitalize="none" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="{idControleResultats}" aria-activedescendant="{afficherResultats ? idActiveDescendant : null}" placeholder="{placeholder}" aria-description="{ariaDescriptionRecherche}" on:input={traiterSaisieRecherche} class="utd-form-control xxl texte-recherche" on:keydown={onKeyDownRecherche} on:blur={onBlurRecherche}>
      {#if (texteRecherche !== '' && texteRecherche.length >= nbCaracteresMinimalRecherche)}
        <button class="reinitialiser-recherche" type="button" title="{titleBoutonReinitialiserRecherche}" on:click={clickBoutonReinitialiser}>
            <img aria-hidden="true" src="{`${srcBaseImage}ico-xfermer-bleu-moyen`}" width="16" height="16">
        </button>
      {/if} 
  </div>

  <div class="resultats-recherche {resultatsRecherche === null ? ' utd-d-none' : ''}" on:mousedown={mouseDownResultatsRecherche}>
    {#if resultatsRecherche && resultatsRecherche.length > 0}  
      <ul id="{idControleResultats}" role="listbox" class="liste-resultats {'nb-niveaux-' + nbNiveaux}" transition:slide="{{duration:250}}" >

        {#each resultatsRecherche as resultat}
          {#if nbNiveaux === 1}  
            <li class="lien-resultat{resultat.i === 0 ? ' premier' : ''}{resultat.i === resultatsRechercheFlat.length - 1  ? ' dernier' : ''}" role="option" aria-selected="{resultat.id === idActiveDescendant ? 'true' : 'false'}">
              <a href="{resultat.h}" id="{resultat.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{resultat.r}</span></a>
            </li>
          {:else}
            {#if nbNiveaux === 2}  
              <li role="group">
                <span class="titre-niveau1">{resultat.c}</span>      
                <ul role="none">
                  {#each resultat.values as valeur}
                    <li class="lien-resultat{valeur.i === 0 ? ' premier' : ''}{valeur.i === resultatsRechercheFlat.length - 1  ? ' dernier' : ''}" role="option" aria-selected="{valeur.id === idActiveDescendant ? 'true' : 'false'}">
                      <a href="{valeur.h}" id="{valeur.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{valeur.r}</span></a>
                    </li>
                  {/each}           
                </ul>
              </li>
            {:else}
                <li role="group">
                  <span class="titre-niveau1">{resultat.c}</span>      
                  <ul role="none">
                    {#each resultat.values as sousCategorie}
                    <span class="titre-niveau2">{sousCategorie.sc}</span>      
                    <ul role="none">
                      {#each sousCategorie.values as valeur}
                        <li class="lien-resultat{valeur.i === 0 ? ' premier' : ''}{valeur.i === resultatsRechercheFlat.length - 1  ? ' dernier' : ''}" role="option" aria-selected="{valeur.id === idActiveDescendant ? 'true' : 'false'}">
                          <a href="{valeur.h}" id="{valeur.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{valeur.r}</span></a>
                        </li>
                      {/each}           
                    </ul>
                    {/each}           
                  </ul>
                </li>
            {/if}  
          {/if}  
        {/each}       
        
      </ul>

    {:else}
      <span class="texte-aucun-resultat" aria-hidden="true">{texteAucunResultat}</span>  
    {/if}  
  </div>
  <span role="status" class="utd-sr-only" tabindex="-1">{texteNotificationLecteurEcran}</span>

</div>



<link rel='stylesheet' href='{Utils.cssFullPath}'>
