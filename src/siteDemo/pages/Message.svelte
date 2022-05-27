<script>
    import { onMount } from 'svelte';
    import CodeSource from '../components/CodeSource.svelte'; 
    import TableauParams from '../components/TableauParams.svelte'; 

    let mounted = false;
    let tableauParametres = [];

    onMount(() => {
        tableauParametres = obtenirTableauParametres();
        message1();
        message2();
        message3();
        message4();
        message5();
        message6();
        mounted = true;
    });

    function obtenirTableauParametres() {
        return [
            {nom: "type", type: "String (Optionnel)", description: `Valeurs possibles : <span class="utd-emphase">avertissement</span>, <span class="utd-emphase">succes</span>, <span class="utd-emphase">erreur</span>.`},
            {nom: "titre", type: "String", description: `Titre du message.`},
            {nom: "corps", type: "String", description: `Corps du message.`},
            {nom: "texteBoutonPrimaire", type: "String", description: `Texte du bouton primaire. Si non spécifié, le bouton primaire n'est pas affiché.`},
            {nom: "texteBoutonSecondaire", type: "String (Optionnel)", description: `Texte du bouton secondaire. Si non spécifié, le bouton secondaire n'est pas affiché.`},
            {nom: "texteBoutonFermer", type: "String (Optionnel)", description: `Texte du bouton de fermeture du message. Défaut "Fermer" ou "Close" en anglais.`},
            {nom: "estBoutonsTexteLong", type: "Boolean (Optionnel)", description: `Indique si le texte des boutons est long. Si c'est le cas, les boutons sont affichés verticalement en pleine largeur si la largeur d'écran est inférieure ou égale à 525px. (Au lieu de 425px normalement)`},
            {nom: "idControleFocusFermeture", type: "String (Optionnel)", description: `Id du contrôle auquel on redonne le focus à la fermeture de la fenêtre de message. Si non spécifié, focus redonné à l'élément actif avant l'affichage du message.`},                        
        ];
    }

    function message1() {
        document.getElementById('btnTest1').addEventListener('click', () => {
        const params =             
            {type: "avertissement",
             titre: "Continuum espace temps en péril",
             corps: "<p>Vos dernières actions ont provoqué de graves perturbations du continuum espace temps.</p><p>Désirez-vous poursuivre avec la destruction potentielle de l'univers ou corriger le tout?</p>",
             texteBoutonPrimaire: "Corriger",
             texteBoutonSecondaire: "Détruire"};

        utd.message.afficher(params)
            .then((retour) => {
                document.getElementById('resultat1').innerText = `Raison fermeture = ${retour}`;
            });
        });
    }

    function message2() {
        document.getElementById('btnTest2').addEventListener('click', () => {
        const params =             
            {type: "information",
             titre: "Continuum espace temps en péril",
             corps: "<p>Vos dernières actions ont provoqué de graves perturbations du continuum espace temps.</p><p>Espérons que tout ira pour le mieux.</p>",
             texteBoutonPrimaire: "Je m'excuse"
            };

        utd.message.afficher(params)
            .then((retour) => {
                document.getElementById('resultat2').innerText = `Raison fermeture = ${retour}`;
            });
        });
    }

    function message3() {
        document.getElementById('btnTest3').addEventListener('click', () => {
        const params =             
            {type: "succes",
             titre: "Continuum espace temps sauvé",
             corps: "<p>Vos dernières actions ont réparé les graves perturbations du continuum espace temps.</p><p>Vous avez sauvé le monde!</p>",
             texteBoutonPrimaire: "Merci!"
            };

        utd.message.afficher(params)
            .then((retour) => {
                document.getElementById('resultat3').innerText = `Raison fermeture = ${retour}`;
            });
        });
    }

    function message4() {
        document.getElementById('btnTest4').addEventListener('click', () => {
        const params = {
            type: "erreur",
            titre: "Continuum espace temps brisé",
            corps: "<p>Une erreur est survenu lors de vos tentatives de réparation des perturbations du continuum espace temps.</p><p>Il n'y a rien à faire.</p>",
            texteBoutonPrimaire: "D'accord"
        };

        utd.message.afficher(params)
            .then((retour) => {
                document.getElementById('resultat4').innerText = `Raison fermeture = ${retour}`;
            });
        });
    }

    function message5() {
        document.getElementById('btnTest5').addEventListener('click', () => {
        const params =             
            {titre: "Continuum espace temps en péril",
             corps: "<p>Vos dernières actions ont provoqué de graves perturbations du continuum espace temps.</p><p>Désirez-vous poursuivre avec la destruction potentielle de l'univers ou corriger le tout?</p>",
             texteBoutonPrimaire: "Corriger",
             texteBoutonSecondaire: "Détruire"};

        utd.message.afficher(params)
            .then((retour) => {
                document.getElementById('resultat5').innerText = `Raison fermeture = ${retour}`;
            });
        });
    }

    function message6() {    
        document.getElementById('btnTest6').addEventListener('click', () => {
            const params =             
                {titre: "Continuum espace temps en péril",
                corps: "<p>Vos dernières actions ont provoqué de graves perturbations du continuum espace temps.</p><p>Désirez-vous poursuivre avec la destruction potentielle de l'univers ou corriger le tout?</p>",
                texteBoutonPrimaire: "Corriger et demander pardon",
                texteBoutonSecondaire: "Détruire",
                estBoutonsTexteLong: true
                };

            utd.message.afficher(params)
                .then((retour) => {
                    document.getElementById('resultat6').innerText = `Raison fermeture = ${retour}`;
                });
        });
    }
</script>

<h1>Message</h1>
<h2>Description</h2>
<p>Il s'agit du composant <strong>dialogue d’alerte</strong> du système de design Quebec.ca.</p>
<p>Il apparaît lorsqu’une action immédiate est requise. Le dialogue d’alerte contient un message ainsi qu’un ou plusieurs boutons d’action. </p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/action/dialog-modal" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Lorsqu'un type est spécifié, nous ajoutons une icône au titre du message et nous retirons le filet de couleur saumon sous le titre du message.</p>
<p>Nous estimons que cela ajoute un élément visuel fort qui indique rapidement de quel type de message il s'agit.</p>

<h2>Méthodes</h2>
<h3>utd.message.afficher</h3>
<h4>Paramètres</h4>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h4>Retour</h4>
<p>Une promesse javascript dont le résultat contiendra une chaîne de caractère contenant le raison de fermeture du message. Les valeurs possibles sont : </p>
<ul class="utd-liste">
    <li><span class="utd-emphase">primaire</span>, si le bouton primaire a été cliqué.</li>
    <li><span class="utd-emphase">secondaire</span>, si le bouton secondaire a été cliqué.</li>
    <li><span class="utd-emphase">clickBackdrop</span>, si l'utilisateur a cliqué dans le backdrop afin de fermer le message.</li>
    <li><span class="utd-emphase">boutonFermer</span>, si l'utilisateur a cliqué sur le bouton "Fermer (X)" afin de fermer le message.</li>
    <li><span class="utd-emphase">escape</span>, si l'utilisateur appuyé sur la touche "ESC" afin de fermer le message.</li>
</ul>

<h2>Exemples</h2>
<h3>1- Message de type avertissement avec 2 boutons</h3>
<button type="button" id="btnTest1" class="utd-btn secondaire mb-16">Test 1</button>
<div id="resultat1"></div>
{#if mounted}
    <CodeSource codeSource="{message1.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>2- Message de type information avec 1 bouton</h3>
<button type="button" id="btnTest2" class="utd-btn secondaire mb-16">Test 2</button>
<div id="resultat2"></div>
{#if mounted}
    <CodeSource codeSource="{message2.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>3- Message de type succès avec 1 bouton</h3>
<button type="button" id="btnTest3" class="utd-btn secondaire mb-16">Test 3</button>
<div id="resultat3"></div>
{#if mounted}
    <CodeSource codeSource="{message3.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>4- Message de type erreur avec 1 bouton</h3>
<button type="button" id="btnTest4" class="utd-btn secondaire mb-16">Test 4</button>
<div id="resultat4"></div>
{#if mounted}
    <CodeSource codeSource="{message4.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>5- Message sans type avec 2 boutons</h3>
<button type="button" id="btnTest5" class="utd-btn secondaire mb-16">Test 5</button>
<div id="resultat5"></div>
{#if mounted}
    <CodeSource codeSource="{message5.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>6- Message sans type avec 2 boutons et texte long</h3>
<button type="button" id="btnTest6" class="utd-btn secondaire mb-16">Test 6</button>
<div id="resultat6"></div>
{#if mounted}
    <CodeSource codeSource="{message6.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<style>
</style>