<svelte:options tag="utd-champ-form" />
<script>
  import { Utils } from './utils.js'
  import { get_current_component } from "svelte/internal"
  import { onMount } from "svelte";
  export let obligatoire = "false"
  export let invalide = "false" 
  export let libelle = ""
  export let precision = ""
  export let messageErreur = ""

  let label = null
  let mounted = false
  const idPrecision = Utils.genererId()
  const idTitreMenu = Utils.genererId()
  const texteObligatoire = "Obligatoire."
  const thisComponent = get_current_component()
  
  
  onMount(() => {
//    html = thisComponent.getRootNode().getElementsByTagName("html")[0]
    label = thisComponent.querySelector("label")

    mounted = true

    gererChampObligatoire()

    
    if(precision){
      ajouterPrecision()
    }
//    slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
//    mounted = true 
  })

  //TODO implémnenter gestion langue (aller chercher dans balise html? lang=?)
  
  // Références pour accessibilité
  // https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-navigation, https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role et https://usability.yale.edu/web-accessibility/articles/focus-keyboard-operability

  $: gererChampObligatoire(obligatoire) 


  function ajouterPrecision(){
    if(label){
      const nodePrecision = thisComponent.querySelector(".utd-precision")

      if(!nodePrecision){
        const span = document.createElement('span')
        span.classList.add("utd-precision")
        span.id = idPrecision
        span.innerText = precision

        const indicateurObligatoire = thisComponent.querySelector(".utd-icone-champ-requis")
        if(indicateurObligatoire){
          indicateurObligatoire.after(span)
        } else {
          label.after(span)
        }          
      }
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
          indicateurObligatoire.parentElement.remove()
        }
      }      
    }
  }
  
</script>


<div class="utd-form-group">
  <slot/>
  {#if invalide && messageErreur}
  <span id="texteErreur1" role="alert" class="utd-erreur-champ">{messageErreur}</span>
  {/if}

  
</div>


<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>

<style>
</style>

