<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-piv-entete" />

<script>
import { onMount } from "svelte";
import { Utils } from "./utils"
import { get_current_component } from "svelte/internal"  

export let urlLogo = '/'
export let srcLogo = `${Utils.imagesRelativePath}utd-sprite.svg_versionUtd_#QUEBEC_blanc`   
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

function clickLien(){
  Utils.dispatchWcEvent(thisComponent, "clickLien")
}

</script>

{#if passerContenu === 'true'}
  <div class="utd-conteneur-passer-contenu">
    <div class="utd-passer-contenu">
        <a href="{urlPasserContenu}" on:click={clickLien} class="utd-passer-contenu">{textePasserContenu}</a>
    </div>   
  </div>
{/if}

<div class="utd-piv-entete">
  <div class="utd-container">
    <div class="conteneur-sections">
      <div class="section-gauche signature-gouvernement">
        <a href="{urlLogo}">
          <img alt="{altLogo}" src="{srcLogo}">
        </a>
      </div>
      <div class="section-centre">
        <a href="{urlTitreSite}" class="titre-site">
          <span>{titreSite1}</span>
          {#if titreSite2}
            <span class="description">{titreSite2}</span>  
          {/if}         
        </a>
      </div>

      <div class="section-droite">
        {#if Utils.slotExiste(slots, 'boutonRecherche')}
          <div class="bouton-recherche">
            <slot name="boutonRecherche" />
          </div>    
        {/if}    


        {#if Utils.slotExiste(slots, 'liens')}
          <slot name="liens" />
        {:else}    
          {#if urlNousJoindre || urlLangueAlternative}
            <ul>
              {#if urlLangueAlternative}
                <li><a href="{urlLangueAlternative}">{texteLangueAlternative}</a></li>  
              {/if}
              {#if urlNousJoindre}              
                <li><a href="{urlNousJoindre}">{texteNousJoindre}</a></li>
              {/if}
            </ul>
          {/if}
        {/if}            
      </div>
    </div>
    <div class="zone-titre-recherche">
      <div class="titre-site">
        <span>{titreSite1}</span>
        {#if titreSite2}
          <span class="description">{titreSite2}</span>  
        {/if}
      </div>

      {#if Utils.slotExiste(slots, 'boutonRechercheMobile')}
        <div class="bouton-recherche">
          <slot name="boutonRechercheMobile" />
        </div>    
      {/if}    
    </div>          
    {#if Utils.slotExiste(slots, 'zoneRecherche')}
      <div class="zone-recherche">
        <slot name="zoneRecherche" />
      </div>    
    {/if}    

  </div>
</div>



<link rel='stylesheet' href='{Utils.cssFullPath}'>
