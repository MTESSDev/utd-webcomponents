<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-menu-ancres" />

<script>
import { onMount } from "svelte";
import { Utils } from "./utils"

export let titre = Utils.obtenirLanguePage() === 'fr' ? "Dans cette page :" : "On this page:"
export let selecteur = '.ancre'

let ancres

onMount(() => {  
  ancres = obtenirAncres()
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
            <a href="#{ancre.id}">{ancre.innerText}</a>
          </li>
        {/each}                    
      </ul>    
    </nav>
  </div>
{/if}

<link rel='stylesheet' href='{Utils.cssRelativePath}utd-webcomponents.min.css'>
