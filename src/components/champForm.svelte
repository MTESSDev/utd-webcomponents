<svelte:options tag="utd-champ-form" />
<script>
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal"
  import { onMount } from "svelte";

  export let obligatoire = "false"
  export let invalide = "false" 
  export let format = null
  export let libelle = ""
  export let precision = ""
  export let messageErreur = ""

  let mounted = false
  let typeChamp = null
  let elementLabel = null
  let elementWrapper = null
  let elementIndicateurObligatoire = null
  let elementObligatoireTexte = null
  let elementChamp = null
  let elementPrecision = null
  let elementErreur = null
  let idElementErreur = null

  const idChamp = Utils.genererId()
  const idParentUtd = Utils.genererId()
  const idLabelInitial = Utils.genererId()
  const idPrecisionInitial = Utils.genererId()
  const idErreurInitial = Utils.genererId()
  const thisComponent = get_current_component()
  const texteSrChampObligatoire = Utils.obtenirLanguePage() === 'fr' ? ' obligatoire ' : ' required '
  
  /* ===========================================================================================
    RÉFÉRENCES
  
    - Liste de boutons radio et checkbox
      https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/

  =============================================================================================*/

  onMount(() => {      
    typeChamp = obtenirTypeChamp()
    mounted = true

    if(typeChamp){ 

      wrapperControles() 
      gererChamp()
      gererLabel()
      gererChampObligatoire()

      if(typeChamp !== 'checkbox-seul'){
        gererPrecision()
      }   

      gererErreur()
    }
  })

  $: gererLabel(libelle) 
  $: gererChampObligatoire(obligatoire) 
  $: gererPrecision(precision) 
  $: gererErreur(messageErreur)
  $: gererErreur(invalide) 

  function wrapperControles(){
    elementWrapper = document.createElement('div')    
    
    const classeType = typeChamp === 'checkbox-seul' ? 'checkbox' : typeChamp
    elementWrapper.classList.add('utd-form-group', classeType)

    thisComponent.childNodes.forEach((element) => {
      elementWrapper.append(element)  
      if(typeChamp === 'radio'){
        elementWrapper.setAttribute('role', 'radiogroup')
      }
      if(typeChamp === 'checkbox'){
        elementWrapper.setAttribute('role', 'group')
      }
    })

    if(format){ 
      elementWrapper.classList.add(format)
    }

    thisComponent.prepend(elementWrapper)
  }


  function gererChamp() { 
    elementChamp.id = elementChamp.id || idChamp

    const idUtd = thisComponent.id || idParentUtd
    elementChamp.setAttribute('idutd', idUtd)
    thisComponent.id = idUtd

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

      if(type === 'radio'){ 
        return type
      } 
      else if(type === 'checkbox'){ 
        return thisComponent.querySelectorAll("input").length > 1 ? 'checkbox' : 'checkbox-seul'
      }
      else if(type === 'button' || type === 'submit'){ 
        return null
      }
      else { 
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
    if(!mounted){
      return
    }

    if(estGroupeControles()){
      elementLabel = thisComponent.querySelector(".label")
    } else {
      elementLabel = thisComponent.querySelector("label")
    }
    
    if(elementLabel){
      //Le label existe déjà. On s'assure qu'il est bien lié au champ.
      if(estGroupeControles()){
        if(!elementLabel.id){
          elementLabel.id = idLabelInitial
        }
        ajusterChampAriaDescribedBy('ajout', elementLabel.id)
      } else {
        elementLabel.setAttribute('for', elementChamp.id)
      }  
      if(libelle){
        elementLabel.innerText = libelle
      }
    }
    else if(libelle){
      //Le contrôle label n'existe pas      
      let element

      if(estGroupeControles()){
        element = document.createElement('span')
        element.classList.add('label')
        element.id = idLabelInitial
        ajusterChampAriaDescribedBy('ajout', element.id, typeChamp === 'radio' ? 'aria-labelledby' : null)
      } else {
        element = document.createElement('label')
        element.setAttribute('for', elementChamp.id)
      }

      element.innerText = libelle
      elementWrapper.prepend(element)
      elementLabel = element
    }
  }

  function gererPrecision(){
    if(!mounted){
      return
    }

    if(elementLabel){
      elementPrecision = thisComponent.querySelector(".utd-precision")

      if(precision){
        if(elementPrecision){
          elementPrecision.id = elementPrecision.id || idPrecisionInitial
        }
        else{
          const span = document.createElement('span')
          span.classList.add("utd-precision")
          span.id = idPrecisionInitial
          elementPrecision = span
          elementLabel.after(elementPrecision)  
        }
        elementPrecision.innerText = precision
        ajusterChampAriaDescribedBy('ajout', elementPrecision.id)
      } else {
        //Pas de précision en paramètre
        if(elementPrecision){
          //Contrôle précision dans le HTML
          elementPrecision.id = elementPrecision.id || idPrecisionInitial
          ajusterChampAriaDescribedBy('ajout', elementPrecision.id)
        }
        else {
          //Pas de contrôle de précision dans le html, on retire la précision du aria-describedby
          ajusterChampAriaDescribedBy('retrait', idPrecisionInitial)
        }
      } 
    }   
  }

  function ajusterChampAriaDescribedBy(operation = 'ajout', valeur, aria){
    
    let attribut

    if(aria){
      attribut = aria
    } else {
      attribut = typeChamp === 'checkbox' ? 'aria-labelledby' : 'aria-describedby'
    }

    let controle = elementChamp
    if(estGroupeControles()){
      controle = elementWrapper
    } 

    const valeurActuelle = controle.getAttribute(attribut) || ''
    let nouvelleValeur = ''

    if(operation === 'ajout'){
      nouvelleValeur = valeurActuelle + (valeurActuelle.indexOf(valeur) >= 0 ? '' : ' ' + valeur)
    } else {
      nouvelleValeur = valeurActuelle.replace(valeur, '')
    }

    if(nouvelleValeur.trim()){
      controle.setAttribute(attribut, nouvelleValeur.trim())
    } else {
      controle.removeAttribute(attribut)
    }     
  }

  function gererChampObligatoire(){
    if(!mounted){
      return
    }

    if(elementLabel){

      elementIndicateurObligatoire = thisComponent.querySelector(".utd-icone-champ-requis")
      elementObligatoireTexte = thisComponent.querySelector(".texte-obligatoire")

      if(obligatoire === 'true'){        

        if(typeChamp === 'checkbox'){
          //Pour les listes de checkbox, on doit ajouter un texte hors écran afin d'indiquer que le champ est obligatoire (aria-required ne fonctionne pas pour ces types de champs).
          elementObligatoireTexte = thisComponent.querySelector(".texte-obligatoire")
          if(!elementObligatoireTexte){
            elementObligatoireTexte = document.createElement('span')
            elementObligatoireTexte.classList.add("texte-obligatoire","utd-sr-only")
            elementObligatoireTexte.innerHTML = texteSrChampObligatoire 
            elementLabel.append(elementObligatoireTexte)
          }
        }        

        if(!elementIndicateurObligatoire){
          elementIndicateurObligatoire = document.createElement('span')
          elementIndicateurObligatoire.classList.add("utd-icone-champ-requis")
          elementIndicateurObligatoire.innerHTML = `*`
          elementLabel.append(elementIndicateurObligatoire)
        }
        elementIndicateurObligatoire.setAttribute('aria-hidden', 'true')
      } else {
        if(elementIndicateurObligatoire){
          elementIndicateurObligatoire.remove()
        }

        if(elementObligatoireTexte){
          elementObligatoireTexte.remove()
        }
      }      
    }

    if(obligatoire === 'true' && typeChamp !== 'checkbox') { 
      if(typeChamp === 'radio'){
        elementWrapper.setAttribute('aria-required', 'true')
      } else {
        elementChamp.setAttribute('aria-required', 'true')
      }
    } else  { 
      if(typeChamp === 'radio'){
        elementWrapper.removeAttribute('aria-required')
      } else {
        elementChamp.removeAttribute('aria-required')
      }

    } 
  }

  function gererErreur(){
    if(!mounted){
      return
    }

    let controle = elementChamp    
    if(estGroupeControles()){
      controle = elementWrapper
    } 

    elementErreur = thisComponent.querySelector(".utd-erreur-champ")

    if(invalide === 'true') { 

      if(elementErreur){
        elementErreur.id = elementErreur.id || idErreurInitial
      }
      else {
        const span = document.createElement('span')
        span.classList.add("utd-erreur-champ")
        span.id = idErreurInitial
        elementErreur = span

        if(typeChamp === 'checkbox-seul'){
          elementLabel.after(elementErreur)
        } else {
          if(estGroupeControles()){
            elementWrapper.append(elementErreur)
          } else {
            const listeDeroulante = thisComponent.querySelector("utd-liste-deroulante")
            if(listeDeroulante){
              listeDeroulante.after(elementErreur)
            } else {
              elementChamp.after(elementErreur)
            }
          }          
        }        
      }
      
      if(messageErreur){
        elementErreur.innerText = messageErreur
      }
      
      idElementErreur = elementErreur.id      
      
      const attribut = typeChamp === 'checkbox' ? 'aria-labelledby' : 'aria-describedby'
      const descByAvant = controle.getAttribute(attribut)

      controle.setAttribute(attribut, elementErreur.id)
      
      if(typeChamp !== 'checkbox'){
        controle.setAttribute('aria-invalid', 'true')        
      }

      //setTimeout nécessaire pour lecteur écran
      if(descByAvant){
        setTimeout(()=>{
          controle.setAttribute(attribut, `${descByAvant} ${idElementErreur}`)
        }, 100)  
      }

      elementErreur.classList.remove('utd-d-none')
    } else  { 
      controle.removeAttribute('aria-invalid')

      if(elementErreur){
        elementErreur.classList.add('utd-d-none')

        if(messageErreur){
          elementErreur.innerText = messageErreur
        }
      }

      if(idElementErreur){
        setTimeout(()=>{
          ajusterChampAriaDescribedBy('retrait', idElementErreur)
        },100)        
      }
    }    
  }
  
  function estGroupeControles(){
    return typeChamp === 'checkbox' || typeChamp === 'radio'
  }
</script>

<slot/>

<link rel='stylesheet' href='{Utils.cssFullPath}'>

<style>
</style>

