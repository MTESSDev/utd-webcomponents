<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  let mounted = false;

  onMount(() => {
    ajouterCodeDialogue1()
    ajouterCodeDialogue2()
    mounted = true
})

function ajouterCodeDialogue1() {
    document.getElementById('btnTest1').addEventListener('click', () => {
        utd.dialogue.afficher('dialogue1')
    })

    document.getElementById("btnAnnuler1").addEventListener('click', () => {
        //TODO, ici tout le code que vous devez effectuer sur click du bouton (généralement pas grand chose sur une annulation)
        alert('Bravo le bouton "Annuler" a été cliqué. Vous pouvez mettre tout votre code ici!')
        utd.dialogue.masquer('dialogue1')
    })

    document.getElementById("btnEnregistrer1").addEventListener('click', () => {
        alert('Bravo le bouton "Enregistrer" a été cliqué. Vous pouvez mettre tout votre code ici!')
        //TODO, ici tout le code que vous devez effectuer sur click du bouton
        utd.dialogue.masquer('dialogue1')
    })
}

function ajouterCodeDialogue2() {
    document.getElementById('btnVotreAvis').addEventListener('click', () => {
        utd.dialogue.afficher('dialogueVotreAvis')
    })

    document.getElementById("btnAnnulerAvis").addEventListener('click', () => {
        //TODO, ici tout le code que vous devez effectuer sur click du bouton (généralement pas grand chose sur une annulation)
        alert('Bravo le bouton "Annuler" a été cliqué. Vous pouvez mettre tout votre code ici!')
        utd.dialogue.masquer('dialogueVotreAvis')
    })

    document.getElementById("btnEnregistrerAvis").addEventListener('click', () => {
        alert('Bravo le bouton "Enregistrer" a été cliqué. Vous pouvez mettre tout votre code ici!')
        //TODO, ici tout le code que vous devez effectuer sur click du bouton
        utd.dialogue.masquer('dialogueVotreAvis')
    })
}

    /*
    document.getElementById("exempleDialogue1").addEventListener("fermeture", e => {
      console.log(`Événement de fermeture modale Test1 avec les détails : ${e.detail.raisonFermeture}`)
    })
    */
</script>

<h1>Dialogue modal</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Le <strong>dialogue modal</strong> est une boîte qui se superpose au contenu de la page, en plein centre, à la suite d’une action déclenchée directement par l’utilisateur. Il sert à communiquer de l’information contextuelle.</p>
<p>Lorsque le dialogue modal est activé, l’arrière-plan de la page devient plus sombre pour qu’il soit en évidence.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/action/dialog-modal" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Le composant <strong>dialogue d'alerte</strong> a été remplacé par notre composant <strong><a href="/composants/message">message</a></strong> (seulement le nom est différent, il a les mêmes caractéristiques).</p>

<h2>Exemples</h2>
<h3>1- Ouverture par le biais d'un bouton</h3>
<div id="exempleDialogue1">
    <button type="button" id="btnTest1" class="utd-btn secondaire mb-32">Afficher</button>
    <utd-dialog id="dialogue1" titre="Ajout d'un problème">
        <div slot="contenu">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet pulvinar ipsum. Donec luctus nulla scelerisque, congue nibh a, malesuada dolor. Sed mattis interdum pellentesque. Vivamus lacinia risus a justo imperdiet imperdiet at quis ligula. Cras a dictum tortor, sit amet venenatis tortor. Vestibulum aliquam elit eu venenatis laoreet. Aenean tellus enim, consectetur eu condimentum accumsan, malesuada volutpat lectus. Aliquam sit amet rhoncus mauris, a placerat mauris. Mauris neque nulla, vulputate a convallis in, imperdiet tincidunt leo.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet pulvinar ipsum. Donec luctus nulla scelerisque, congue nibh a, malesuada dolor. Sed mattis interdum pellentesque. Vivamus lacinia risus a justo imperdiet imperdiet at quis ligula. Cras a dictum tortor, sit amet venenatis tortor. Vestibulum aliquam elit eu venenatis laoreet. Aenean tellus enim, consectetur eu condimentum accumsan, malesuada volutpat lectus. Aliquam sit amet rhoncus mauris, a placerat mauris. Mauris neque nulla, vulputate a convallis in, imperdiet tincidunt leo.</p>
            <label for="test1">Description du problème</label>
            <input type="text" id="test1" class="utd-form-group utd-form-control"/>

            <label for="test2">Solution 1</label>
            <input type="text" id="test2" class="utd-form-group utd-form-control"/>

            <label for="test3">Solution 2</label>
            <input type="text" id="test3" class="utd-form-group utd-form-control"/>

            <label for="test5">Solution 4</label>
            <input type="text" id="test5" class="utd-form-control"/>

        </div>
        <div slot="pied">
            <button id="btnAnnuler1" type="button" class="utd-btn secondaire compact">Annuler</button>        
            <button id="btnEnregistrer1" type="button" class="utd-btn primaire compact">Enregistrer</button>        
        </div>
    </utd-dialog>
</div>
<CodeSource idElementCodeSource="exempleDialogue1" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{ajouterCodeDialogue1.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>2- Ouverture latérale, affichage forcé des boutons sur une ligne et focus à l'ouverture sur le contrôle spécifié</h3>
<p>Utilisez le bouton "Votre avis" à droite fin de tester.</p>
<div id="exempleDialogueVotreAvis">
    <button type="button" id="btnVotreAvis" class="utd-btn primaire btn-avis">
        <span class="texte">Votre avis</span>
    </button>
    <utd-dialog id="dialogueVotreAvis" titre="Votre avis" estaffichagelateral="true" estaffichageboutonsinline="true" idfocusouverture="texteVotreAvis">
        <div slot="contenu">
            <form>
                <div id="texteAvantAvis" class="utd-text-sm mb-32">
                    <p>Pour toutes questions relatives à votre dossier, ou si vous avez besoin d'aide, n'hésitez pas à <a href="#NousJoindre">Nous joindre</a>.</p>
                    <p>Évitez d'inscrire des renseignements personnels. Notez que vous ne recevrez aucune réponse et que nous collectons votre avis dans le respect de votre anonymat.</p>
                </div>
                <textarea id="texteVotreAvis" class="utd-form-control" aria-describedby="erreurTexteVotreAvis" rows="3" placeholder="Parlez-nous de votre expérience..." required></textarea>
                <span id="erreurTexteVotreAvis" class="utd-erreur-champ utd-d-none" role="status" aria-live="polite">Le champ « Votre avis » est obligatoire.</span>
                <span id="texteApresAvis" class="utd-text-sm">
                </span>
            </form>
        </div>
        <div slot="pied">
            <button id="btnAnnulerAvis" type="button" class="utd-btn secondaire compact">Annuler</button>        
            <button id="btnEnregistrerAvis" type="button" class="utd-btn primaire compact">Envoyer</button>        
        </div>
    </utd-dialog>
</div>

<CodeSource idElementCodeSource="exempleDialogueVotreAvis" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{ajouterCodeDialogue2.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   

<style>
</style>