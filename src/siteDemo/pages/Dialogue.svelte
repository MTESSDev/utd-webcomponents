<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let mounted = false;
  let tableauParametres = [];
  let tableauSlots = [];

  onMount(() => {
    tableauParametres = obtenirTableauParametres();
    tableauSlots = obtenirTableauSlots();

    ajouterCodeDialogue1()
    ajouterCodeDialogue2()
    mounted = true
})

function obtenirTableauParametres() {
    return [
        {nom: "afficher", type: "Boolean (Optionnel)", description: `Permet de spécifier si la fenêtre modale doit être affichée ou non.`},
        {nom: "type", type: "String (Optionnel)", description: `Type de la fenêtre modale (icône). Valeurs possibles : <span class="utd-emphase-gris">information</span>, <span class="utd-emphase-gris">avertissement</span>, <span class="utd-emphase-gris">succes</span>, <span class="utd-emphase-gris">erreur</span>.`},
        {nom: "titre", type: "String (Optionnel)", description: `Titre de la fenêtre modale.`},
        {nom: "lang", type: "String (Optionnel)", description: `Langue du contrôle. Utilisé pour les textes par défaut. Valeurs possibles "fr" et "en". Défaut : "fr".`},
        {nom: "sr-bouton-fermer", type: "String (Optionnel)", description: `Texte lecteur écran seulement du bouton permettant de fermer la fenêtre modale.`},
        {nom: "id-focus-ouverture", type: "String (Optionnel)", description: `Id du contrôle auquel on veut forcer le focus une fois la fenêtre modale affichée si le comportement pas défaut ne convient pas.`},
        {nom: "id-focus-fermeture", type: "String (Optionnel)", description: `Id du contrôle auquel on veut forcer le focus à la fermeture de la fenêtre modale si le comportement par défaut ne convient pas. Par défaut le contrôle redonne le focus à l'élément qui à ouvert la fenêtre modale (ex. un bouton).`},
        {nom: "boutons-texte-long", type: "Boolean (Optionnel)", description: `Affiche les boutons à partir de 525px et moins sous forme de colonne (au lieu du 425px normal).`},        
        {nom: "forcer-boutons-inline", type: "Boolean (Optionnel)", description: `Force l'affichage des boutons en mode inline (ne vont pas s'afficher en colonne à 425px et moins).`},
        {nom: "affichage-lateral", type: "Boolean (Optionnel)", description: `Indique si une animation d'ouverture latérale (droite vers la gauche) est utilisée pour l'affichage de la fenêtre modale.`}
    ];
}

function obtenirTableauSlots() {
    return [
        {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de la fenêtre modale.</p>`},
        {nom: "pied", description: `Contenu html injecté dans le pied de la fenêtre modale (généralement des boutons).`}            
    ];
}

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

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

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
    <utd-dialog id="dialogueVotreAvis" titre="Votre avis" affichage-lateral="true" forcer-boutons-inline="true" id-focus-ouverture="texteVotreAvis" sr-bouton-fermer="Exemple modification texte hors écran du bouton fermer.">
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