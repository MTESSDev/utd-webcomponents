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

onMount(() => {  
  slots = Array.from(thisComponent.querySelectorAll('[slot]'))    
})

</script>

<div class="utd-pied-page-site">
  <div class="utd-container">
    {#if Utils.slotExiste(slots, 'contenu')}
      <slot name="contenu" />
    {/if}    
  </div>
</div>

<link rel='stylesheet' href="https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.8.1/dist/css/utd-webcomponents.min.css?v=1.8.1">
