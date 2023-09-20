<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-pied-page-site" />

<script>
import { onMount } from "svelte";
import { Utils } from "./js/utils"
import { get_current_component } from "svelte/internal"  

const thisComponent = get_current_component()
let slots = []
let estAffichagePleineLargeur = false

onMount(() => {  
  estAffichagePleineLargeur = document.getElementsByTagName('body')[0].classList.contains('utd-pleine-largeur')  
  slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
})

</script>

<div class="utd-pied-page-site{estAffichagePleineLargeur ? ' utd-pleine-largeur': ''}">
  <div class="utd-container">
    {#if Utils.slotExiste(slots, 'contenu')}
      <slot name="contenu" />
    {/if}    
  </div>
</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
