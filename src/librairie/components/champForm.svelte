<svelte:options tag="utd-champ-form" />
<script>
  import { Utils } from './utils.js'
  import { get_current_component } from "svelte/internal"
  import { onMount } from "svelte";
  export let obligatoire = "false"
  export let invalide = "false" 
  export let format = null
  export let libelle = ""
  export let precision = ""
  export let messageerreur = ""

  let label = null
  let mounted = false
  let typeChamp = null
  let elementChamp = null
  let elementPrecision = null
  let elementErreur = null
  const idChamp = Utils.genererId()
  const idPrecision = Utils.genererId()
  const idErreur = Utils.genererId()
  const texteObligatoire = "Obligatoire."
  const thisComponent = get_current_component()
  
  
  onMount(() => {
//    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    typeChamp = obtenirTypeChamp()
    mounted = true

    if(typeChamp){ 
     
      gererChamp()
      gererLabel()
      gererChampObligatoire()
      gererPrecision()
      gererErreur()
    }

    

    

    
//    slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
//    mounted = true 
  })

  //TODO implémnenter gestion langue (aller chercher dans balise html? lang=?)
  
  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-navigation, https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role et https://usability.yale.edu/web-accessibility/articles/focus-keyboard-operability

  $: gererChampObligatoire(obligatoire) 
  $: gererPrecision(precision) 
  $: gererErreur(invalide) 
// { }   ||

  function gererChamp() { 
    elementChamp.id = elementChamp.id || idChamp
    if(typeChamp === 'standard' || typeChamp === 'select' || typeChamp === 'textarea') { 
      elementChamp.classList.add('utd-form-control')

      if(format){ 
        elementChamp.classList.add(format)
      }
    } 
  }

  function obtenirTypeChamp(){ 
    const input = thisComponent.querySelector("input")
   
    if(input){ 
      elementChamp = input
      const type = input.getAttribute("type")

      if(type === 'radio' || type === 'checkbox'){ 
        return type
      } else if(type === 'button' || type === 'submit'){ 
        return null
      } else { 
        return 'standard'
      } 
    } else if(thisComponent.querySelector("textarea")){
        elementChamp = thisComponent.querySelector("textarea")
        return 'standard'
    } else if(thisComponent.querySelector("select")){ 
       elementChamp = thisComponent.querySelector("select") 
       return 'select'
    } else  {
      return null
    }  
  }
  function gererLabel(){
    label = thisComponent.querySelector("label")

    if(label){
      //Le label existe déjà. On s'assure qu'il est bien lié au champ.
        label.setAttribute('for', elementChamp.id)
    } else {
      //Aucun label, mais un attribut libelle est spécifié. On doit donc ajouter le label et l'associer au champ.
      if(libelle){
        const element = document.createElement('label')
        element.innerText = libelle
        element.setAttribute('for', elementChamp.id)
        thisComponent.prepend(element)
        label = element
      }    
    }     
  }
  function gererPrecision(){
    if(!mounted){
      return
    }
   
    if(label){
      elementPrecision = thisComponent.querySelector(".utd-precision")

      if(precision){
        if(elementPrecision){
          elementPrecision.id = elementPrecision.id || idPrecision
        }
        else{
          const span = document.createElement('span')
          span.classList.add("utd-precision")
          span.id = idPrecision
          span.innerText = precision
          elementPrecision = span

          const indicateurObligatoire = thisComponent.querySelector(".utd-icone-champ-requis")
          if(indicateurObligatoire){
            indicateurObligatoire.after(elementPrecision)
          } else {
            label.after(elementPrecision)
          }          
        }
        ajusterChampAriaDescribedBy('ajout', elementPrecision.id)
      } else {
        if(elementPrecision){
          elementPrecision.remove()
        }
        //On retire la précision du aria-describedby
        ajusterChampAriaDescribedBy('retrait', elementPrecision.id)
      } 
    }   
  }
  function ajusterChampAriaDescribedBy(operation = 'ajout', valeur){
    
    const valeurActuelle = elementChamp.getAttribute('aria-describedby') || ''
    let nouvelleValeur = ''

    if(operation === 'ajout'){
      nouvelleValeur = valeurActuelle + valeurActuelle.indexOf(valeur) >= 0 ? '' : valeur
    } else {
      nouvelleValeur = valeurActuelle.replace(valeur, '')
    }

    if(nouvelleValeur.trim()){
      elementChamp.setAttribute('aria-describedby', nouvelleValeur.trim())
    } else {
      elementChamp.removeAttribute('aria-describedby')
    } 
    
  }

  function gererChampObligatoire(){
    if(!mounted){
      return
    }

    if(label){
      const indicateurObligatoire = thisComponent.querySelector(".utd-icone-champ-requis")

      if(obligatoire === 'true'){        
        if(!indicateurObligatoire){
          const span = document.createElement('span')
          span.classList.add("utd-icone-champ-requis")
          span.innerHTML = `<span aria-hidden="true">&nbsp;*</span><span class="utd-sr-only">&nbsp;${texteObligatoire}</span>`
          label.after(span)
        }
      } else {
        if(indicateurObligatoire){
          indicateurObligatoire.remove()
        }
      }      
    }

    if(obligatoire === 'true') { 
      elementChamp.setAttribute('aria-required', 'true')
    } else  { 
      elementChamp.removeAttribute('aria-required')
    } 
  }
  function gererErreur(){
    if(!mounted){
      return
    }

    if(!elementErreur){
      elementErreur = thisComponent.querySelector(".utd-erreur-champ")
    }

    //TODO gérer aria-describedby pour l'erreur avec ajusterChampAriaDescribedBy. Si elementErreur pas d'id on doit lui assigné celui généré
    if(invalide === 'true') { 
      elementChamp.setAttribute('aria-invalid', 'true')

      if(!elementErreur){
        const span = document.createElement('span')
        span.classList.add("utd-erreur-champ")
        span.id = idErreur
        span.innerText = messageerreur
        elementErreur = span
        elementChamp.after(elementErreur)
      }

      elementErreur.classList.remove('utd-d-none')
    } else  { 
      elementChamp.removeAttribute('aria-invalid')
      if(elementErreur){
        elementErreur.classList.add('utd-d-none')
      }
    } 
  }
</script>


<div class="utd-form-group">
  <slot/>
</div>


<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

