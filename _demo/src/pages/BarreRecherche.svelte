<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 

    let tableauParametres = [];
    let tableauRetourEvenementChangementEtat = [];
    let mounted = false;

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauRetourEvenementChangementEtat = obtenirTableauRetourEvenementChangementEtat()
        chargerContenuRechercheExemple1b()
        chargerContenuRechercheExemple2b()
        chargerContenuRechercheExemple3b()
        mounted = true
    })

    function chargerContenuRechercheExemple1b() {
        document.querySelector("#exemple1b utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche (Appel à un api ou autre)
            const monContenuRecherche = [
                {"r": "Groupe de sections",
                 "h": "#groupesection",
                 "t": "Un formulaire est divise en groupes de sections chaque groupe de sections peut avoir...",    
                 "mc": "découpage"
                },
                {"r": "Section",
                 "h": "#section",
                 "t": "Un groupe de sections est divisé en sections le menu de gauche liste...",    
                },
            ]

            //Appel à la méthode permettant de définir le contenu de recherche (important d'utiliser le bon nom de méthode et de propriété dans l'objet)
            e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
        })
    }

    function chargerContenuRechercheExemple2b() {
        document.querySelector("#exemple2b utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche (Appel à un api ou autre)
            const monContenuRecherche = [
                {"c": "Navigation",
                 "r": "Groupe de sections",
                 "h": "#groupesection",
                 "t": "Un formulaire est divise en groupes de sections chaque groupe de sections peut avoir...",    
                 "mc": "découpage"
                },
                {"c": "Navigation",
                 "r": "Section",
                 "h": "#section",
                 "t": "Un groupe de sections est divisé en sections le menu de gauche liste...",    
                },
            ]

            //Appel à la méthode permettant de définir le contenu de recherche (important d'utiliser le bon nom de méthode et de propriété dans l'objet)
            e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
        })
    }

    function chargerContenuRechercheExemple3b() {
        document.querySelector("#exemple3b utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche
            fetch('/testsLocaux/recherche3Niveaux.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status)
                    }
                    response.json().then((monContenuRecherche) => {
                        //Appel à la méthode permettant de définir le contenu de recherche
                        e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
                    })
            })                    
        })
    }

    function obtenirTableauParametres() {
        return [
            {nom: "placeholder", type: "String (Optionnel)", description: `Texte (placeholder) à afficher dans le contrôle tant qu'aucune saisie n'est effectuée. Défaut "Rechercher..." et "Search...".`},        
            {nom: "url-contenu-recherche", type: "String (Optionnel)", description: `Si spécifié, url à laquelle un appel (fetch) sera effectué afin d'obtenir le contenu de recherche au format attendu en JSON.`}
        ];
    }


    function obtenirTableauRetourEvenementChangementEtat() {
        return [
            {nom: "definirContenuRecherche", type: "Fonction", description: `Fonction (callback) ayant en paramètre un objet qui doit posséder une propriété "contenu", laquelle doit contenir le contenu de recherche qui respecte le format requis.`},    
        ];
    }

    //TODO faire une méthode générique et ajouter dans utils afin de patcher le problème d'ancres avec tinro
    function clickAncre(e) {
        e.preventDefault();
        location.hash = ''
        location.hash = e.target.getAttribute('href')
    }


    

</script>

<style type="text/css">
</style>

<div class="documentation">
    <h1>Barre de recherche</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>La composante <strong>barre de recherche</strong> permet à l’utilisateur de faire des recherches dans un site Internet ou une application à partir de mots clés.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/action/barre-recherche" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>
    
    <h3>Particularités vs. le système de design Québec.ca</h3>
    <p>La barre de recherche ne mène pas à une page de résultats de recherche mais affiche les résultats au fur et à mesure de la saisie dans le champ ("search as you type").</p>
    <p>Les résultats sont affichés sous le champ et le click sur un résultat provoque la navigation vers ce dernier.</p>

    <h2>Attributs disponibles</h2>
    <TableauParams parametres="{tableauParametres}">
    </TableauParams>

    <h2>Événements disponibles</h2>
    <h3>initialiser</h3>
    <p>Est exécuté uniquement si le paramètre <span class="utd-emphase-gris">url-contenu-recherche</span> n'est pas spécifié.</p>
    <p>Son exécution se produit lorsque le contrôle de recherche est initialisé (lors d'une première tentative de recherche).</p>
    <p> Voir exemple <a href="#exemple1b" on:click="{clickAncre}">1b- Un niveau (callback)</a> ou n'importe quel exemple (callback).</p>
    <h4>Retour</h4>
    <TableauParams parametres="{tableauRetourEvenementChangementEtat}">
    </TableauParams>
</div>
<h2>Exemples</h2>
<h3>1a- Un niveau (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple1a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1a" titre="Code source (Html)">
</CodeSource>   

<h3>1b- Un niveau (callback)</h3>
<div class="mb-32 bs-test" id="exemple1b">
    <utd-barre-recherche></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1b" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple1b.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>2a- Deux niveaux (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple2a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche2Niveaux.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2a" titre="Code source (Html)">
</CodeSource>   

<h3>2b- Deux niveaux (callback)</h3>
<div class="mb-32 bs-test" id="exemple2b">
    <utd-barre-recherche></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2b" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple2b.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>3- Trois niveaux (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple3a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche3Niveaux.json"></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3a" titre="Code source (Html)">
</CodeSource>   

<h3>3- Trois niveaux (callback asynchrone)</h3>
<div class="mb-32 bs-test" id="exemple3b">
    <utd-barre-recherche></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3b" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple3b.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   
