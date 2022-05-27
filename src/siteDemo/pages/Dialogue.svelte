<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  let mounted = false;

  onMount(() => {
    ajouterCodedialogue1()
    mounted = true
})

function ajouterCodedialogue1() {
    document.getElementById('btnTest1').addEventListener('click', () => {
        utd.dialogue.afficher('exempleDialogue1')
    })

    document.getElementById("btnAnnuler1").addEventListener('click', () => {
        //TODO, ici tout le code que vous devez effectuer sur click du bouton (généralement pas grand chose sur une annulation)
        alert('Bravo le bouton "Annuler" a été cliqué. Vous pouvez mettre tout votre code ici!')
        utd.dialogue.masquer('exempleDialogue1')
    })

    document.getElementById("btnEnregistrer1").addEventListener('click', () => {
        alert('Bravo le bouton "Enregistrer" a été cliqué. Vous pouvez mettre tout votre code ici!')
        //TODO, ici tout le code que vous devez effectuer sur click du bouton
        utd.dialogue.masquer('exempleDialogue1')
    })
}

    /*
    document.getElementById("exempleDialogue1").addEventListener("fermeture", e => {
      console.log(`Événement de fermeture modale Test1 avec les détails : ${e.detail.raisonFermeture}`)
    })
    */
</script>

<h1>Dialogue modal</h1>
<h2>Description</h2>
<p>Le <strong>dialogue modal</strong> est une boîte qui se superpose au contenu de la page, en plein centre, à la suite d’une action déclenchée directement par l’utilisateur. Il sert à communiquer de l’information contextuelle.</p>
<p>Lorsque le dialogue modal est activé, l’arrière-plan de la page devient plus sombre pour qu’il soit en évidence.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/action/dialog-modal" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Le composant <strong>dialogue d'alerte</strong> a été remplacé par notre composant <strong><a href="/composants/message">message</a></strong> (seulement le nom est différent, il a les mêmes caractéristiques).</p>

<h2>Exemples</h2>
<h3>1- Ouverture par le biais d'un bouton</h3>
<button type="button" id="btnTest1" class="utd-btn secondaire mb-32">Afficher</button>
<utd-dialog id="exempleDialogue1" titre="Ajout d'un problème">
    <div slot="contenu">
        <label for="test1">Description du problème</label>
        <input type="text" id="test1" class="utd-form-group utd-form-control"/>

        <label for="test2">Solution</label>
        <input type="text" id="test2" class="utd-form-control"/>
    </div>
    <div slot="pied">
        <button id="btnAnnuler1" type="button" class="utd-btn secondaire compact">Annuler</button>        
        <button id="btnEnregistrer1" type="button" class="utd-btn primaire compact">Enregistrer</button>        
    </div>
</utd-dialog>
<CodeSource idElementCodeSource="exempleDialogue1" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{ajouterCodedialogue1.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   



<style>
</style>