<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 

    let tableauParametres = [];
    let tableauSlots = [];
    let tableauRetourEvenementChangementEtat = [];
    let mounted = false;

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauSlots = obtenirTableauSlots()
        tableauRetourEvenementChangementEtat = obtenirTableauRetourEvenementChangementEtat()
        controlerSection7()
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

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de la section.</p>`},
            {nom: "titre", description: `Contenu html injecté dans l'entête de la section. Exemple d'utilisation : Ajout d'une icône à gauche du titre.`}            
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

<h1>Section</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Le composant <strong>section</strong> permet d'organiser le contenu en regroupant les informations en sections principales ou en blocs d'informations.</p>
<p>Selon les besoins, cette section peut être extensible ou non, et avoir une bordure ou non pour regrouper son contenu.</p>

<h3>Référence système de design Quebec.ca</h3>
N'existe pas sur le site de design Quebec.ca

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h2>Événements disponibles</h2>
<h3>changementEtat</h3>
<p>Est exécuté lorsque l'état d'affichage (développé/réduit) de la section change. Voir exemple <a href="#exempleSectionJs" on:click="{clickAncre}">7- Section contrôlée par javascript</a>.</p>
<h4>Retour</h4>
<TableauParams parametres="{tableauRetourEvenementChangementEtat}">
</TableauParams>

<h2>Exemples</h2>
<h3>1- Section avec champs</h3>
<div class="mb-32" id="exempleSection1">
    <utd-section titre="Véhicule principal">
        <div class="utd-form-group">
            <label for="champ1a">Marque</label>
            <input type="text" id="champ1a" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ2a">Modèle</label>
            <input type="text" id="champ2a" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ3a">Numéro de série</label>
            <input type="text" id="champ3a" class="utd-form-control"/>
        </div>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection1">
</CodeSource>   


<h3>2- Section avec accordéons et conservation de l'état d'affichage</h3>
<div class="mb-32" id="exempleSection2">
    <utd-section titre="Véhicules" id="utdSection2" conserver-etat-affichage="true">
        <utd-accordeon titre="Véhicule principal" id="utdSection2Acc1" conserver-etat-affichage="true">
            <div class="utd-form-group">
                <label for="champ1b">Marque</label>
                <input type="text" id="champ1b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ2b">Modèle</label>
                <input type="text" id="champ2b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ3b">Numéro de série</label>
                <input type="text" id="champ3b" class="utd-form-control"/>
            </div>
        </utd-accordeon>
        <utd-accordeon titre="Véhicule secondaire" id="utdSection2Acc2" conserver-etat-affichage="true">
            <div class="utd-form-group">
                <label for="champ4b">Marque</label>
                <input type="text" id="champ4b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ5b">Modèle</label>
                <input type="text" id="champ5b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ5b">Numéro de série</label>
                <input type="text" id="champ5b" class="utd-form-control"/>
            </div>
        </utd-accordeon>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection2">
</CodeSource>   

<h3>3- Section sans bordure</h3>
<div class="mb-32" id="exempleSection3">
    <utd-section titre="Véhicules"  bordure="false">
        <div class="utd-form-group">
            <label for="champ1c">Marque</label>
            <input type="text" id="champ1c" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ2c">Modèle</label>
            <input type="text" id="champ2c" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ3c">Numéro de série</label>
            <input type="text" id="champ3c" class="utd-form-control"/>
        </div>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection3">
</CodeSource>   


<h3>4- Section non extensible</h3>
<div class="mb-32" id="exempleSection4">
    <utd-section titre="Informations personnelles" extensible="false">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>

<CodeSource idElementCodeSource="exempleSection4">
</CodeSource>   

<h3>5- Section non extensible sans bordure</h3>
<div class="mb-32" id="exempleSection5">
    <utd-section titre="Informations personnelles" extensible="false" bordure="false">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection5">
</CodeSource>   

<h3>6- Section ouverte par défaut et titre h3</h3>
<div class="mb-32" id="exempleSection6">
    <utd-section titre="Informations personnelles" reduit="false" tag-titre="h3">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection6">
</CodeSource>   


<h3 id="exempleSectionJs">7- Section contrôlée par javascript et conservation de l'état d'affichage</h3>
<div class="mb-32" id="exempleSection7">
    <utd-section class="mb-32" id="utdSection7" reduit="false" conserver-etat-affichage="true">
        <span slot="titre">
            Exemple d'utilisation 7
        </span>   
        <p>Un bel exemple de comment contrôler l'ouverture/fermeture de la section via un bouton.</p>
        <p>Cliquez le bouton "Contrôler section" pour essayer.</p>
        <p>Remarquez également le texte indiquant l'état d'affichage lorsque ce dernier change.</p>
    </utd-section>

    <button type="button" id="btnControleExemple7" class="utd-btn secondaire compact">Contrôler section</button>
</div>
<div id="resultat7" class="mt-32 mb-32"></div>
<CodeSource idElementCodeSource="exempleSection7" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{controlerSection7.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   

