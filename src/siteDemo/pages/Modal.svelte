<script>
  import { onMount } from 'svelte';
  onMount(() => {
    document.getElementById('btnTest1').addEventListener('click', () => {
        document.getElementById('dialogTest1').setAttribute('afficher', true)
    })

    // window.addEventListener('DOMContentLoaded', () => {})
    document.getElementById("dialogTest1").addEventListener("apresFermeture", e => {
      alert(`Événement de fermeture modale Test1 avec les détails : ${e.detail.raisonFermeture}`)
    })
  
})

</script>

<h1>Dialogue modal</h1>
<button type="button" id="btnTest1" class="btn btn-primaire">Test</button>

<utd-dialog id="dialogTest1">
    <div slot="titre">
        Éditer l'image
    </div>
    <div slot="contenu">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.
        </p>
    </div>
    <div slot="pied">
        <button type="button" class="btn btn-secondaire">Annuler</button>        
        <button type="button" class="btn btn-primaire">Confirmer</button>        
    </div>
</utd-dialog>



<style>
</style>