<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-avis" />

<script>
  import { Utils } from "./js/utils"
  import { onMount } from "svelte";
  import { get_current_component } from "svelte/internal"  

  export let titre = ""
  export let type = "information"
  export let contenu = ""

  const thisComponent = get_current_component()

  onMount(() => {  
    Utils.reafficherApresChargement(thisComponent)
  })

</script>

<div class="utd-component utd-avis {type}" tabindex="0">
  <div class="zone-icone">
    <div aria-hidden="true" class="utd-icone-svg {type}"></div>
  </div>
  <div class="contenu zone-html">
    <h2 class="titre">
      {titre}
    </h2>
    <div class="texte">
      {#if contenu}
        {@html contenu}      
      {/if}
      <slot />
      <slot name="contenu" />
    </div>
  </div>
</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
