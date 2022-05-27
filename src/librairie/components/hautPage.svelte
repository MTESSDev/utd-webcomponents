<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-hautpage" />

<script>
import { onMount } from "svelte";
import { Utils } from "./utils"
import { get_current_component } from "svelte/internal"  

export let title = Utils.obtenirLanguePage() === 'fr' ? "Retour en haut de page." : "Return to the top of the page."
export let hauteurMinimaleSroll = 555

const thisComponent = get_current_component()
let html
let controle
let ticking = false

onMount(() => {  
  html = thisComponent.getRootNode().getElementsByTagName("html")[0]
  controle = thisComponent.shadowRoot.querySelector('.utd-hautpage')
  controle.classList.add("utd-d-none")
})

window.addEventListener('scroll', function(e) {

  if (!ticking) {
    window.requestAnimationFrame(function() {
      gererAffichageBouton()
      ticking = false
    })
  }

  ticking = true
})

function gererAffichageBouton() {
  const dureeAnimationMs = 500;

  if (document.body.scrollTop > hauteurMinimaleSroll || document.documentElement.scrollTop > hauteurMinimaleSroll) {
    if(controle.classList.contains('utd-d-none')){
      controle.classList.remove('utd-d-none')
      setTimeout(() => {
        html.setAttribute('retourhautpagevisible', 'true')
        controle.classList.add('visible')      
      }, 10)
    }
  } else {
    if(controle.classList.contains("visible")){
      setTimeout(() => {        
          controle.classList.add('utd-d-none')  
          html.setAttribute('retourhautpagevisible', 'false')
      }, dureeAnimationMs);      
    }
    controle.classList.remove('visible')
  }  
}

function scrollerHautPage(e) {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

</script>

<div class="utd-component utd-hautpage">
  <button type="button" class="utd-btn primaire" title="{title}" on:click={scrollerHautPage}>
    <div class="contenu">
      <span aria-hidden="true" class="utd-icone-svg fleche-haut-blanche" />        
    </div>
  </button>
</div>

<link rel='stylesheet' href='/css/utd-webcomponents-v1.3.0.min.css'>
