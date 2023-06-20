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
        mounted = true
    })


    function obtenirTableauParametres() {
        return [
            {nom: "extensible", type: "Boolean (Optionnel)", description: `Indique si la section doit être extensible ou non. Défaut "true" (extensible).`},        
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si la section doit être réduite ou développée. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développée/réduite). Défaut "true" (réduite).`},    
            {nom: "bordure", type: "Boolean (Optionnel)", description: `Indique si la section doit être affichée avec bordure ou non. Défaut "true" (avec bordure).`},    
            {nom: "titre", type: "String (Optionnel)", description: `Titre affiché dans l'entête de la section.`},
            {nom: "tag-titre", type: "String (Optionnel)", description: `Balise html à utiliser pour le titre de l'entête. Défaut "h2".`},
            {nom: "conserver-etat-affichage", type: "Boolean (Optionnel)", description: `<p>Indique si l'état d'affichage (développé/réduit) de la section doit être conservé pendant la session (tant que le fureteur est ouvert). Défaut "false".</p><p>IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-section doit avoir un id.</p>`}
        ];
    }


    function obtenirTableauRetourEvenementChangementEtat() {
        return [
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si la section est réduite. Il s'agit du nouvel état suite au changement d'état d'affichage.`},    
        ];
    }

    function controlerSection7() {
        document.getElementById('btnControleExemple7').addEventListener('click', () => {
            
            const section = document.getElementById('utdSection7')
            section.setAttribute('reduit', section.getAttribute('reduit') === 'false' ? 'true' : 'false')
        })

        document.getElementById("utdSection7").addEventListener("changementEtat", e => {
            document.getElementById('resultat7').innerText = `État d'affichage = ${e.detail.reduit ? 'réduit' : 'développé'}`;
        })
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
    <h3>changementEtat</h3>
    <p>Est exécuté lorsque l'état d'affichage (développé/réduit) de la section change. Voir exemple <a href="#exempleSectionJs" on:click="{clickAncre}">7- Section contrôlée par javascript</a>.</p>
    <h4>Retour</h4>
    <TableauParams parametres="{tableauRetourEvenementChangementEtat}">
    </TableauParams>
</div>
<h2>Exemples</h2>
<h3>1- Un niveau</h3>
<div class="mb-32 bs-test" id="exemple1">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>   


<h3>2- Deux niveaux</h3>
<div class="mb-32 bs-test" id="exemple2">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche2Niveaux.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2">
</CodeSource>   

<h3>3- Trois niveaux</h3>
<div class="mb-32 bs-test" id="exemple3">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche3Niveaux.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple3">
</CodeSource>   

