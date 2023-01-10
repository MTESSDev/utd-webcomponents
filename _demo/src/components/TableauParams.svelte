<script>
  import { onMount } from "svelte"
  
  export let parametres = [];
  
  onMount(() => {
  })

</script>

<table class="utd-table bordures-lignes rayee">
  <thead>
      <tr>
          <th style="width: 100px;">Nom</th>
          <th style="width: 80px;">Type</th>
          <th>Description</th> 
      </tr>
  </thead> 
  <tbody>
      {#each parametres as p}
        <tr>
            <th><span>{p.nom}</span></th>
            <td>{p.type}</td> 
            <td> {@html p.description}</td>
        </tr>
      {/each}        
  </tbody>
</table>
<style>
</style>

