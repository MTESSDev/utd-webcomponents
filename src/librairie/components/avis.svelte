<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-avis" />

<script>
  export let titre = ""
//   export let lang = "fr"
  export let type = "information"
  export let contenu = ""

const role = type === 'erreur' || type === 'avertissement' ? 'alert' : null


</script>

<div class="utd-component utd-avis {type}" {role}>
  <div class="zone-icone">
    <div aria-hidden="true" class="utd-icone-svg {type}"></div>
  </div>
  <div class="contenu zone-html">
    <h2 class="titre d-flex justify-content-between align-self-center">
      {titre}
    </h2>
    <div class="texte">
      {#if contenu}
        {@html contenu}
      {/if}
      <slot name="contenu" />
    </div>
  </div>
</div>

<link rel='stylesheet' href='/css/utd-webcomponents-v1.3.0.min.css'>
