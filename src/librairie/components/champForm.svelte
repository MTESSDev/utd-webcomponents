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
  let elementIndicateurObligatoire = null
  let elementChamp = null
  let elementPrecision = null
  let elementErreur = null
  let idElementErreur = null

  const idChamp = Utils.genererId()
  const idParentUtd = Utils.genererId()
  const idPrecisionInitial = Utils.genererId()
  const idErreurInitial = Utils.genererId()
  const thisComponent = get_current_component()
  
  /* ===========================================================================================
    RÉFÉRENCES
  
    - Liste de boutons radio et checkbox
      https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/

  =============================================================================================*/

  onMount(() => {    
//    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    

    typeChamp = obtenirTypeChamp()
    console.log(typeChamp)
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

//    slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
//    mounted = true 
  })

  //TODO implémnenter gestion langue (aller chercher dans balise html? lang=?)

  //TODO wrapper les checkbox (liste) et radio dans un div role="group" avec le aria-labelledby
  //TODO modifier champUtd afin que precision et message erreur soient dans le label... pas de describedby pour liste radio et checkbox||
  

  $: gererChampObligatoire(obligatoire) 
  $: gererPrecision(precision) 
  $: gererErreur(invalide) 
// { }   ||

  function wrapperControles(){
    const wrapper = document.createElement('div')    
    
    const classeType = typeChamp === 'checkbox-seul' ? 'checkbox' : typeChamp
    wrapper.classList.add('utd-form-group', classeType)

    thisComponent.childNodes.forEach((element) => {
      wrapper.append(element)  
      if(typeChamp === 'radio' || typeChamp === 'checkbox'){
        wrapper.setAttribute('role', 'group')
      }
    })
    
    thisComponent.prepend(wrapper)
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
          elementPrecision.id = elementPrecision.id || idPrecisionInitial
        }
        else{
          const span = document.createElement('span')
          span.classList.add("utd-precision")
          span.id = idPrecisionInitial
          span.innerText = precision
          elementPrecision = span
          label.after(elementPrecision)  
        }
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
          ajusterChampAriaDescribedBy('retrait', elementPrecision.id)
        }
      } 
    }   
  }
  function ajusterChampAriaDescribedBy(operation = 'ajout', valeur){
    
    const valeurActuelle = elementChamp.getAttribute('aria-describedby') || ''
    let nouvelleValeur = ''

    if(operation === 'ajout'){
      nouvelleValeur = valeurActuelle + (valeurActuelle.indexOf(valeur) >= 0 ? '' : ' ' + valeur)
    } else {
      nouvelleValeur = valeurActuelle.replace(valeur, '')
    }


    const controle = elementChamp
    if(type === 'radio' || type === 'checkbox'){
//      controle = 
    } 

    if(nouvelleValeur.trim()){
      controle.setAttribute('aria-describedby', nouvelleValeur.trim())
    } else {
      controle.removeAttribute('aria-describedby')
    } 
    
  }

  function gererChampObligatoire(){
    if(!mounted){
      return
    }

    if(label){
      elementIndicateurObligatoire = thisComponent.querySelector(".utd-icone-champ-requis")

      if(obligatoire === 'true'){        
        if(!elementIndicateurObligatoire){
          const span = document.createElement('span')
          span.classList.add("utd-icone-champ-requis")
          span.innerHTML = `*`
          elementIndicateurObligatoire = span
          label.append(elementIndicateurObligatoire)
        }
        elementIndicateurObligatoire.setAttribute('aria-hidden', 'true')
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

    elementErreur = thisComponent.querySelector(".utd-erreur-champ")

    if(invalide === 'true') { 

      if(elementErreur){
        elementErreur.id = elementErreur.id || idErreurInitial
      }
      else {
        const span = document.createElement('span')
        span.classList.add("utd-erreur-champ")
        span.id = idErreurInitial
        span.innerText = messageerreur
        elementErreur = span

        if(typeChamp === 'checkbox-seul'){
          label.after(elementErreur)
        } else {
          elementChamp.after(elementErreur)
        }        
      }
      idElementErreur = elementErreur.id
      
      const descByAvant = elementChamp.getAttribute('aria-describedby')

      elementChamp.setAttribute('aria-describedby', elementErreur.id)
      elementChamp.setAttribute('aria-invalid', 'true')

      //setTimeout nécessaire pour lecteur écran
      if(descByAvant){
        setTimeout(()=>{
          elementChamp.setAttribute('aria-describedby', `${descByAvant} ${idElementErreur}`)
        }, 100)  
      }

      elementErreur.classList.remove('utd-d-none')
    } else  { 
      elementChamp.removeAttribute('aria-invalid')
      if(elementErreur){
        elementErreur.classList.add('utd-d-none')
      }
      setTimeout(()=>{
        ajusterChampAriaDescribedBy('retrait', idElementErreur)
      },50)        
    }    
  }

  function gererErreurCheckboxRadio(){
    if(!mounted){
      return
    }

    elementErreur = thisComponent.querySelector(".utd-erreur-champ")

    if(invalide === 'true') { 
      elementChamp.setAttribute('aria-invalid', 'true')

      if(elementErreur){
        elementErreur.id = elementErreur.id || idErreurInitial
      }
      else {
        const span = document.createElement('span')
        span.classList.add("utd-erreur-champ")
        span.id = idErreurInitial
        span.innerText = messageerreur
        elementErreur = span
        elementChamp.after(elementErreur)
      }
      idElementErreur = elementErreur.id
      ajusterChampAriaDescribedBy('ajout', elementErreur.id)
      elementErreur.classList.remove('utd-d-none')
    } else  { 
      elementChamp.removeAttribute('aria-invalid')
      if(elementErreur){
        elementErreur.classList.add('utd-d-none')
      }

      ajusterChampAriaDescribedBy('retrait', idElementErreur)
    } 
  }
  
</script>



<slot/>



<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

