<script>
    import { onMount } from 'svelte';
    import CodeSource from '../components/CodeSource.svelte'; 
    import TableauParams from '../components/TableauParams.svelte'; 

    let mounted = false;
    let tableauParametresDebuter = [];
    let tableauParametresTerminer = [];

    onMount(() => {
        test1();
        test2();
        test3();

        tableauParametresDebuter = obtenirTableauParametresDebuter();
        tableauParametresTerminer = obtenirTableauParametresTerminer();
        mounted = true;
    })

    function obtenirTableauParametresDebuter() {
        return [
            {nom: "idBouton", type: "String", description: `Id du bouton ayant initié le traitement en cours.`},
            {nom: "avecOverlay", type: "Boolean (Optionnel)", description: `Indique si l'interface doit être bloquée (overlay). Défaut true.`}
        ];
    }

    function obtenirTableauParametresTerminer() {
        return [
            {nom: "idBouton", type: "String", description: `Id du bouton ayant initié le traitement en cours.`}
        ];
    }

    function test1() {
        document.getElementById('btnTest1').addEventListener('click', function() {

            utd.traitementEnCours.debuter(this);
            
            setTimeout((that) => {
                utd.traitementEnCours.terminer(that);
            }, 5000, this);
        })
    }

    function test2() {
        document.getElementById('btnTest2').addEventListener('click', function() {
            utd.traitementEnCours.debuter(this, false);

            setTimeout((that) => {
                utd.traitementEnCours.terminer(that);
            },5000, this);
        })
    }

    function test3() {
        document.getElementById('btnTest3').addEventListener('click', function() {
            const bouton1 = document.getElementById('btnTest1');
            const bouton2 = document.getElementById('btnTest2');
            
            //On débute le traitement en cours sur les 3 boutons
            utd.traitementEnCours.debuter(bouton1);
            utd.traitementEnCours.debuter(bouton2, false);
            utd.traitementEnCours.debuter(this);

            setTimeout(() => {
                utd.traitementEnCours.terminer(bouton1);
            },5000);

            setTimeout(() => {
                utd.traitementEnCours.terminer(bouton2);
            },10000);

            setTimeout((that) => {
                //Terminer le traitement en cours sur le bouton 3
                utd.traitementEnCours.terminer(that);
            },15000, this);
        })
    }

</script>

<h1>Traitement en cours</h1>

<h2>Description</h2>
<p>Permet de gérer la notion de traitement en cours dans une interface. Un visuel (spinner) est affiché sur le bouton ayant initié le traitement et il est possible de bloquer l'interface (overlay).</p>
<p>Effectue également une notification au lecteur écran afin d'aviser que le traitement est débuté ou terminé.</p>

   
<h2>Méthodes</h2>
<h3>utd.traitementEnCours.debuter</h3>
<h4>Paramètres</h4>
<TableauParams parametres="{tableauParametresDebuter}">
</TableauParams>

<h3>utd.traitementEnCours.terminer</h3>
<h4>Paramètres</h4>
<TableauParams parametres="{tableauParametresTerminer}">
</TableauParams>

<h2>Exemples</h2>

<h3>1- Sur un bouton (avec overlay)</h3>
<p>Simule un traitement de 5 secondes.</p>
<button type="button" id="btnTest1" class="utd-btn secondaire mb-16">Test 1</button>
{#if mounted}
    <CodeSource codeSource="{test1.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   



<h3>2- Sur un bouton (sans overlay)</h3>
<p>Simule un traitement de 5 secondes.</p>
<button type="button" id="btnTest2" class="utd-btn primaire mb-16">Test 2</button>
{#if mounted}
    <CodeSource codeSource="{test2.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>3- Sur un bouton compact (avec overlay)</h3>
<p>Simule un traitement simultané de 5 secondes sur le bouton 1, 10 secondes sur le bouton 2 et 15 secondes sur le bouton 3.</p>
<button type="button" id="btnTest3" class="utd-btn primaire compact mb-16">Test 3</button>
{#if mounted}
    <CodeSource codeSource="{test3.toString()}" language="language-javascript">
    </CodeSource>   
{/if}   

<style>
</style>