<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-accordeon" />

<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition"
  import { Utils } from "./js/utils"
  import { get_current_component } from "svelte/internal" 
  export let reduit = "true"
  export let titre = ""
  export let contenu = ""
  export let tagTitre = "h2"
  export let conserverEtatAffichage = "false"

  const idEntete = Utils.genererId()
  const idContenu = 'corps' + idEntete
  const thisComponent = get_current_component()
  let estReduit
  let mounted = false

  onMount(() => {  
    definirEtatAffichageInitial()
    Utils.reafficherApresChargement(thisComponent)
    mounted = true
  })

  $: gererEtatAffichage(reduit)

  function definirEtatAffichageInitial() {
    if(conserverEtatAffichage === 'true'){
      if(thisComponent.id){       
        const valeur = sessionStorage.getItem(thisComponent.id)
        //Si null (clé non trouvée dans le session storage, on va utiliser la valeur par défaut reçue en paramètre, sinon on l'écrase avec celle du session storage)
        if(valeur !== null){
          if (valeur === '1') {
            thisComponent.setAttribute('reduit', 'false')
          }
          else {
            thisComponent.setAttribute('reduit', 'true')
          }
        }
      } 
    }

    estReduit = reduit === 'true' ? true : false

    conserverEtatAffichageSession()
  }


  function conserverEtatAffichageSession(){
    if(conserverEtatAffichage === 'true' && thisComponent.id){
      sessionStorage.setItem(thisComponent.id, estReduit ? '0' : '1')
    }
  }


  function gererEtatAffichage(){
    if(!mounted){
      return
    }

    estReduit =  reduit === 'true' ? true : false
    conserverEtatAffichageSession()

    Utils.dispatchWcEvent(thisComponent, "changementEtat", {reduit: estReduit})
  }

  function toggleAffichageContenu(){
    thisComponent.setAttribute('reduit', estReduit ? 'false' : 'true')    
  }

  //TODO trouver le moyen d'obtenir le niveau de titre par défaut...
</script>

<div class="utd-component utd-accordeon {!estReduit ? 'ouvert' : ''}" >
  <div class="entete">
    <svelte:element this={tagTitre} class="titre"> 
      <button type="button" class="" aria-controls="{idContenu}" aria-expanded="{!estReduit}" on:click={toggleAffichageContenu}>
        <span class="titre">
          {#if titre}
            {titre}
          {/if}
          <slot name="titre" />      
        </span>
        <span class="utd-icone-svg {!estReduit ? 'moins' : 'plus'}"></span>
      </button>
    </svelte:element>       
  </div>

    <div id="{idContenu}" class="contenu" >
      {#if !estReduit}
        <div class="conteneur" transition:slide="{{duration:250}}">
          {#if contenu}
            {@html contenu}
          {:else}
            <slot/>  
            <slot name="contenu" />
          {/if}
        </div>
      {/if}
    </div>

</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
