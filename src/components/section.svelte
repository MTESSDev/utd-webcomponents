<!-- 
Le tag est nécessaire afin que le compilateur svelte sache qu'on veut batîr un custom element.
-->
<svelte:options tag="utd-section" />

<script> 
  import { slide } from "svelte/transition"
  import { Utils } from './js/utils'
  import { onMount } from "svelte";
  import { get_current_component } from "svelte/internal"
  export let extensible = "true"
  export let reduit = "true"
  export let titre = ""
  export let bordure = "true"
  export let tagTitre = "h2"
  export let conserverEtatAffichage = "false"

  const idEntete = Utils.genererId() 
  const idContenu = 'corps' + idEntete
  const thisComponent = get_current_component()
  let estReduit = reduit === 'true' ? true : false
  let mounted = false

  //TODO éventuellement déterminer automatiquement le niveau de header via un script? 
  onMount(() => {  
    definirEtatAffichageInitial()
    Utils.reafficherApresChargement(thisComponent)
    mounted = true
  })

  $: gererEtatAffichage(reduit)


  function gererEtatAffichage(){
    if(!mounted){
      return
    }

    estReduit =  reduit === 'true' ? true : false
    
    conserverEtatAffichageSession()
    
    Utils.dispatchWcEvent(thisComponent, "changementEtat", {reduit: estReduit})
  }

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

  function toggleAffichageContenu(){
    thisComponent.setAttribute('reduit', estReduit ? 'false' : 'true')    
  }
</script>

<div class="utd-component utd-section{extensible === 'true' ? ' extensible' : ''}{!estReduit ? ' ouvert' : ''}{bordure === 'true' ? ' bordure' : ''}" >
  <div class="entete">
    {#if extensible === 'true'}
    <svelte:element this={tagTitre} class="titre"> 
      <button type="button" class="" aria-controls="{idContenu}" aria-expanded="{!estReduit}" on:click={toggleAffichageContenu}>
          {#if titre}
            {titre}
          {/if}
          <slot name="titre" />            
        <span class="utd-icone-svg chevron-blanc"></span>        
      </button>
    </svelte:element> 
    {:else}
      <svelte:element this={tagTitre} class="titre"> 
        {#if titre}
          {titre}
        {/if}
        <slot name="titre" />      
      </svelte:element> 
    {/if}

  </div>

  <div id="{idContenu}" class="contenu" >
    {#if extensible === 'false' || !estReduit}
    <div transition:slide="{{duration:250}}">
      <slot/>
    </div>
    {/if}
  </div>

</div>

<link rel='stylesheet' href='{Utils.cssFullPath}'>
