<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-pied-page-site" />

<script>
import { onMount } from "svelte";
import { Utils } from "./utils"
import { get_current_component } from "svelte/internal"  

export let urlLogo = '/'   
export let altLogo = Utils.obtenirLanguePage() === 'fr' ? 'Signature du gouvernement du Québec.' : 'Québec government signature.'
export let titreSite1 = ''
export let titreSite2 = ''
export let urlTitreSite = '/'
export let texteLangueAlternative = Utils.obtenirLanguePage() === 'fr' ? 'English' : 'Français'
export let urlLangueAlternative = ''
export let texteNousJoindre = Utils.obtenirLanguePage() === 'fr' ? 'Nous joindre' : 'Contact us'
export let urlNousJoindre = ''
export let passerContenu = 'true'
export let urlPasserContenu = '#main'
export let textePasserContenu = Utils.obtenirLanguePage() === 'fr' ? 'Passer au contenu' : 'Skip to content'

const thisComponent = get_current_component()
let slots = []

onMount(() => {  
  slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
})


</script>

<div class="utd-pied-page-site">
  <div class="utd-container">
    {#if Utils.slotExiste(slots, 'zoneSecondaire')}
      <div class="liens-base">
        <h2 class="utd-sr-only" id="utdTitreLiensBase">Liens vers informations complémentaires</h2>
        <nav aria-labelledby="utdTitreLiensBase">
          <slot name="zoneSecondaire" />
        </nav>
      </div>    
    {/if}    
    <slot></slot>
  </div>
</div>



<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>
