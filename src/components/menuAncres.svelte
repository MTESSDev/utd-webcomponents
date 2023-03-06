<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-menu-ancres" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  

export let titre = Utils.obtenirLanguePage() === 'fr' ? "Dans cette page :" : "On this page:"
export let selecteur = '.ancre'

let ancres
const thisComponent = get_current_component()

onMount(() => {  
  ancres = obtenirAncres()  
  
  Utils.reafficherApresChargement(thisComponent)
})

function obtenirAncres() {
  const ancres = document.querySelectorAll(selecteur)

  //Ajouter un id aux ancres qui n'en n'auraient pas
  ancres.forEach((ancre) => {
    if(!ancre.id){
      ancre.id = Utils.genererId()
    }
  })

  return ancres
}

</script>

{#if ancres && ancres.length}
  <div class="utd-component utd-menu-ancres">
    <h2 id="titreTableMatieres">{titre}</h2>
    <nav aria-describedby="titreTableMatieres">
      <ul>
        {#each ancres as ancre}
          <li>
            <a href="#{ancre.id}">{ancre.textContent}</a>
          </li>
        {/each}                    
      </ul>    
    </nav>
  </div>
{/if}

<link rel='stylesheet' href='{Utils.cssFullPath}'>
