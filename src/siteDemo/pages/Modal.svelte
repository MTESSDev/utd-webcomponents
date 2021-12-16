<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  onMount(() => {
    document.getElementById('btnTest1').addEventListener('click', () => {
        document.getElementById('exempleDialogue1').setAttribute('afficher', true)
    })

    // window.addEventListener('DOMContentLoaded', () => {})
    document.getElementById("exempleDialogue1").addEventListener("fermeture", e => {
      console.log(`Événement de fermeture modale Test1 avec les détails : ${e.detail.raisonFermeture}`)
    })

    document.getElementById("btnAnnuler1").addEventListener('click', () => {
        document.getElementById('exempleDialogue1').setAttribute('afficher', false)
    })

    document.getElementById("btnConfirmer1").addEventListener('click', () => {
        alert('Bravo je contrôle le code sur clic du bouton confirmer. Je vais fermer la fenêtre sur OK.')
        document.getElementById('exempleDialogue1').setAttribute('afficher', false)
    })

})

</script>

<h1>Dialogue modal</h1>
<button type="button" id="btnTest1" class="utd-btn secondaire mb-32">Tester</button>
<utd-dialog id="exempleDialogue1" titre="Éditer l'image" idfocus="btnTest1">
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
        <button id="btnAnnuler1" type="button" class="utd-btn secondaire">Annuler</button>        
        <button id="btnConfirmer1" type="button" class="utd-btn primaire">Confirmer</button>        
    </div>
</utd-dialog>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleDialogue1">
        </CodeSource>   
    </span>
</utd-accordeon>



<style>
</style>