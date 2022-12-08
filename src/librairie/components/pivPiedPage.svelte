<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-piv-pied-page" />

<script>
import { onMount } from "svelte";
import { Utils } from "./utils"
import { get_current_component } from "svelte/internal"  

const textesDefaut = Utils.obtenirTextesDefaut()
const languePage = Utils.obtenirLanguePage()

export let texteTitreSrLiens = languePage === 'fr' ? 'Liens vers informations complémentaires' : 'Links to additional information'   
export let urlLogo = languePage === 'fr' ? 'https://www.mtess.gouv.qc.ca/' : 'https://www.mtess.gouv.qc.ca/index_en.asp'   
export let altLogo = languePage === 'fr' ? `Ministère de l'Emploi et de la Solidarité sociale` : `Ministère de l'Emploi et de la Solidarité sociale`
export let srcLogo = '/images/logo_piv_bas_page.png'   
export let widthLogo = '210'   
export let heightLogo = '81'
export let texteCopyright = languePage === 'fr' ? '© Gouvernement du Québec, ' : '© Gouvernement du Québec, '
export let anneeCopyright = '2022'
export let urlCopyright = languePage === 'fr' ? 'https://www.quebec.ca/droit-auteur' : 'https://www.quebec.ca/en/copyright'
export let texteSrOuvertureNouvelOnglet = textesDefaut.texteSrOuvertureNouvelOnglet

const thisComponent = get_current_component()


let slots = []

onMount(() => {  
  slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
})


</script>

<div class="utd-container utd-piv-pied-page">
  
  {#if Utils.slotExiste(slots, 'liens')}
  <div class="liens">
    <h2 class="utd-sr-only" id="utdTitreLiensPivPiedPage">{texteTitreSrLiens}</h2>
    <nav aria-labelledby="utdTitreLiensPivPiedPage">
      <slot name="liens" />
    </nav>
  </div>    
  {/if}    

  <a href="{urlLogo}" target="_blank" rel="noopener">
      <img class="logo-mo" alt="{altLogo}{texteSrOuvertureNouvelOnglet}" src="{srcLogo}" width="{widthLogo}" height="{heightLogo}">
  </a>

  <span class="copyright">
      <a href="{urlCopyright}" target="_blank" rel="noopener">
          {texteCopyright}{anneeCopyright}
          <span class="utd-sr-only">{@html texteSrOuvertureNouvelOnglet}</span>
      </a>
  </span>
</div>


<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
