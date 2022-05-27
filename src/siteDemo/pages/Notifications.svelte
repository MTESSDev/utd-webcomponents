<script>
    import { onMount } from 'svelte';
    import CodeSource from '../components/CodeSource.svelte'; 
    import TableauParams from '../components/TableauParams.svelte'; 

    let mounted = false;
    let tableauParametres = [];

    onMount(() => {
        tableauParametres = obtenirTableauParametres();
        notification1();
        notification2();
        notification3();
        notification4();
        notification5();
        notification6();
        mounted = true;
    });

    function obtenirTableauParametres() {
        return [
            {nom: "type", type: "String (Optionnel)", description: `Type de notification. Valeurs possibles : <span class="utd-emphase">positif</span> (Défaut), <span class="utd-emphase">negatif</span>, <span class="utd-emphase">neutre</span>.`},
            {nom: "titre", type: "String (Optionnel)", description: `Titre de la notification.`},
            {nom: "message", type: "String", description: `Texte de la notification.`},
            {nom: "delaiFermeture", type: "Number (Optionnel)", description: `Délai de fermeture de la notification (en millisecondes). Défaut 5000.`},
            {nom: "texteBoutonFermer", type: "String (Optionnel)", description: `Texte du bouton de fermeture de la notification. Défaut "Fermer" ou "Close" en anglais.`}            
        ];
    }

    function notification1() {
        document.getElementById('test1').addEventListener('click', () => {
            const params = {
                titre: "Bravo champion!",
                message: "Tu as réussi à enregistrer le formulaire."
                };

            utd.notification.emettre(params);
        });
    }

    function notification2() {
        document.getElementById('test2').addEventListener('click', () => {
            const params = {
                message: "Tu as réussi à enregistrer comme un grand.",
                delaiFermeture: 10000
                };

            utd.notification.emettre(params);
        });
    }

    function notification3() {
        document.getElementById('test3').addEventListener('click', () => {
            const params = {
                type: "negatif",
                titre: "Erreur",
                message: "Une erreur s'est produite."
                };

            utd.notification.emettre(params);
        });
    }

    function notification4() {
        document.getElementById('test4').addEventListener('click', () => {
            const params = {
                type: "negatif",
                message: "Une erreur s'est produite."
                };

            utd.notification.emettre(params);
        });
    }

    function notification5() {
        document.getElementById('test5').addEventListener('click', () => {
            const params = {
                type: "neutre",
                titre: "À noter",
                message: "Chuck Norris est incroyable. Il a compté jusqu'à l'infini. 2 fois!"
                };

            utd.notification.emettre(params);
        });
    }

    function notification6() {
        document.getElementById('test6').addEventListener('click', () => {
            const params = {
                type: "neutre",
                message: "Chuck Norris est incroyable. Il a compté jusqu'à l'infini. 2 fois!"
                };

            utd.notification.emettre(params);
        });
    }
</script>

<h1>Notifications</h1>
<h2>Description</h2>
<p>Il s'agit du composant <strong>notification contextuelle</strong> du système de design Quebec.ca.</p>
<p>La notification contextuelle affiche un message temporaire qui apparaît à la suite d’une interaction humaine.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/notification-contextuelle" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Lorsqu'un titre est spécifié et que le type est "positif" ou "negatif", nous ajoutons une icône au titre du message.</p>
<p>Nous estimons que cela ajoute un élément visuel fort qui indique rapidement de quel type de notification il s'agit.</p>
    
<h2>Méthodes</h2>
<h3>utd.notification.emettre</h3>
<h4>Paramètres</h4>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h4>Retour</h4>
<p>Aucun.</p>

<h2>Exemples</h2>
<h3>1- Notification de type "positif" avec titre</h3>
<button type="button" id="test1" class="utd-btn secondaire mb-16">Test 1</button>
{#if mounted}
    <CodeSource codeSource="{notification1.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   

<h3>2- Notification de type "positif" sans titre et délai de fermeture plus long spécifié (10 secondes)</h3>
<button type="button" id="test2" class="utd-btn secondaire mb-16">Test 2</button>
{#if mounted}
    <CodeSource codeSource="{notification2.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   

<h3>3- Notification de type "negatif" avec titre</h3>
<button type="button" id="test3" class="utd-btn secondaire mb-16">Test 3</button>
{#if mounted}
    <CodeSource codeSource="{notification3.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>4- Notification de type "negatif" sans titre</h3>
<button type="button" id="test4" class="utd-btn secondaire mb-16">Test 4</button>
{#if mounted}
    <CodeSource codeSource="{notification4.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>5- Notification de type "neutre" avec titre</h3>
<button type="button" id="test5" class="utd-btn secondaire mb-16">Test 5</button>
{#if mounted}
    <CodeSource codeSource="{notification5.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>6- Notification de type "neutre" sans titre</h3>
<button type="button" id="test6" class="utd-btn secondaire mb-16">Test 6</button>
{#if mounted}
    <CodeSource codeSource="{notification6.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   

<style>
</style>