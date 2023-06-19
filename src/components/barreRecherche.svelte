<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-barre-recherche" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils";
import { slide } from "svelte/transition";
import { escape, get_current_component } from "svelte/internal";
import MiniSearch from 'minisearch'

const languePage = Utils.obtenirLanguePage()

export let placeholder = languePage === 'fr' ? "Rechercher..." : "Search..."
export let focus = 'false'
export let urlContenuRecherche = ''
export let rechercheFloue = "true"
export let precisionRecherche = "0.2"
export let nbNiveaux = '2'


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
let miniSearch
let optionsMiniSearch
let contenuRecherche = []
let resultatsRecherche = null
let resultatsRechercheFlat = null
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
    fields: ['c', 'sc', 't', 'mc'],
    storeFields: ['id', 'c', 'sc', 'r', 't'],
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

  // Empêche le traitement si simplement un focus ou un blur (l'événement input est lancé sur focus et blur)
  if( texteRecherche === controleRecherche.value ){
    return
  } 

  texteRecherche = controleRecherche.value
  rechercherDebounced()
}

const rechercherDebounced = Utils.debounce(() => {
  
  if(resultatsRecherche === null) {
    obtenirContenuRecherche()
      .then((contenu) => {

        const contenuAvecId = contenu.map((c, i) => {
          c.id = Utils.genererId()
          c.indexe = i
          return c
        })

        miniSearch = new MiniSearch(optionsMiniSearch)    
        miniSearch.addAll(contenuAvecId)   

        rechercher(true)
      })
  } else {
    rechercher(true)
  }
}, 750)

function rechercher(doitNotifierLecteurEcran) {

  //TODO retirer? si tjrs 3 caractères minimal
  const optionsRecherche = {...optionsMiniSearch, ...{fuzzy: term => term.length > nbCaracteresMinimalRecherche ? optionsMiniSearch.fuzzy : null}}

  const texteRechercheSansEspace = texteRecherche.trim()
  if(texteRechercheSansEspace !== "" && texteRechercheSansEspace.length >= nbCaracteresMinimalRecherche){

    resultatsRechercheFlat = miniSearch.search(texteRechercheSansEspace, optionsRecherche)
    resultatsRecherche = definirResultatsGroupes(resultatsRechercheFlat)
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

function definirResultatsGroupes(retourMiniSearch) {
  if(nbNiveaux === '1'){
    return retourMiniSearch
  } else if(nbNiveaux === '2') {
    return regrouper(retourMiniSearch, "c")
  } else {
    // 3 niveaux
    const niveau1 = regrouper(retourMiniSearch, "c")
    if(niveau1) {
      niveau1.forEach((item) => {
        const test = regrouper(item.values, "sc")
        item.values = test
      })
    }
    return niveau1
  }
}

function regrouper(source, propriete) {
  return source.reduce((final, val) => {
      let niveau1 = final.find(r => r[propriete] === `${val[propriete]}`)
      if (niveau1) {
        niveau1.values.push(val)
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

function obtenirContenuRecherche () {
   
   return fetch(urlContenuRecherche)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status)
        }
        return response.json()
    })
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
        // TODO
      }
      e.preventDefault()

      break
    case "Escape":
      reinitialiserRecherche(true, resultatsRecherche === null)
      break        
    case "ArrowDown":
      e.preventDefault()

      if(resultatsRecherche !== null) {
        //Les résultats sont visibles, on donne le focus au résultat suivant
        definirProchainActiveDescendant(1)
//      assurerOptionCouranteVisible()
      }

      break      
    case "ArrowUp":
      e.preventDefault()

      if(resultatsRecherche !== null) {
        //Les résultats sont visibles, on donne le focus au résultat précédent
        definirProchainActiveDescendant(-1)
        //      assurerOptionCouranteVisible()
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

function onBlurRecherche() {
  reinitialiserRecherche()
}


</script>

<div class="utd-barre-recherche">
  <div class="controle-recherche">
      <input id="{idControleRecherche}" type="text" autocomplete="off" autocapitalize="none" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="{idControleResultats}" aria-activedescendant="{afficherResultats ? idActiveDescendant : null}" placeholder="{placeholder}" aria-description="{ariaDescriptionRecherche}" on:input={traiterSaisieRecherche} class="utd-form-control xxl texte-recherche" on:keydown={onKeyDownRecherche} on:blur={onBlurRecherche}>
      <button class="reinitialiser-recherche" type="button" title="{titleBoutonReinitialiserRecherche}" on:click={clickBoutonReinitialiser}>
          <img aria-hidden="true" src="{`${srcBaseImage}ico-xfermer-bleu-moyen`}" width="16" height="16">
      </button>
  </div>

  <div class="resultats-recherche {resultatsRecherche === null ? 'utd-d-none' : null}">
    {#if resultatsRecherche && resultatsRecherche.length > 0}  
      <ul id="{idControleResultats}" role="listbox" class="liste-resultats {'nb-niveaux-' + nbNiveaux}" transition:slide="{{duration:250}}" >

        {#each resultatsRecherche as resultat, i}
          {#if nbNiveaux === '1'}  
            <li class="lien-resultat" role="option" aria-selected="{resultat.id === idActiveDescendant ? 'true' : 'false'}">
              <a href="#" id="{resultat.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{resultat.r}</span></a>
            </li>
          {:else}
            {#if nbNiveaux === '2'}  
              <li role="group">
                <span class="titre-niveau1">{resultat.c}</span>      
                <ul role="none">
                  {#each resultat.values as valeur, j}
                    <li class="lien-resultat" role="option" aria-selected="{valeur.id === idActiveDescendant ? 'true' : 'false'}">
                      <a href="#" id="{valeur.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{valeur.r}</span></a>
                    </li>
                  {/each}           
                </ul>
              </li>
            {:else}
                <li role="group">
                  <span class="titre-niveau1">{resultat.c}</span>      
                  <ul role="none">
                    {#each resultat.values as sousCategorie, j}
                    <span class="titre-niveau2">{sousCategorie.sc}</span>      
                    <ul role="none">
                      {#each sousCategorie.values as valeur, k}
                        <li class="lien-resultat" role="option" aria-selected="{valeur.id === idActiveDescendant ? 'true' : 'false'}">
                          <a href="#" id="{valeur.id}" on:mouseover={mouseoverResultat}><span class="texte-option">{valeur.r}</span></a>
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
