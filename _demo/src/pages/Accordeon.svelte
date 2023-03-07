<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 

    let tableauParametres = []
    let tableauSlots = []
    let mounted = false

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauSlots = obtenirTableauSlots()
        controlerAccordeon5()
        mounted = true
    })


    function obtenirTableauParametres() {
        return [
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si l'accordéon doit être réduit ou développé. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développé/réduit). Défaut "true" (réduit).`},    
            {nom: "titre", type: "String (Optionnel)", description: `Titre affiché dans l'entête de l'accordéon.`},
            {nom: "tag-titre", type: "String (Optionnel)", description: `Balise html à utiliser pour le titre de l'entête. Défaut "h2".`},
            {nom: "contenu", type: "String (Optionnel)", description: `Texte à afficher dans la zone de contenu de l'accordéon.`}

        ];
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'accordéon.</p>`},
            {nom: "titre", description: `Contenu html injecté dans l'entête de l'accordéon. Exemple d'utilisation : Ajout d'une icône à gauche du titre.`}            
        ];
    }

    function controlerAccordeon5() {
        document.getElementById('btnControleExemple5').addEventListener('click', () => {
            
            const accordeon = document.getElementById('accordeon5')
            accordeon.setAttribute('reduit', accordeon.getAttribute('reduit') === 'false' ? 'true' : 'false')
        })
    }

</script>

<style type="text/css">
</style>

<h1>Accordéon</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>L’<strong>accordéon</strong> permet de réduire temporairement la quantité d’information affichée sur une page. Avec cette option, la personne survole le contenu et accède plus rapidement à l’information recherchée.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/affichage-de-contenu/accordeon" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>


<h2>Exemples</h2>
<h3>1- Avec attributs "titre" et "contenu"</h3>
<div class="mb-32" id="exempleAccordeon1">
    <utd-accordeon titre="Exemple d'utilisation 1" contenu="<p>Ici un texte incroyable.</p><p>Qui peut même contenir du html.</p>">
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon1">
</CodeSource>   


<h3>2- Avec attribut "titre", slot par défaut et tag-titre h5</h3>
<div class="mb-32" id="exempleAccordeon2">
    <utd-accordeon titre="Exemple d'utilisation 2" tag-titre="h5">
        <p>Dans cet exemple, le niveau de titre de l'accordéon a été forcé à "h5" au lieu de la valeur par défaut "h2" via l'attribut <span class="utd-emphase-gris">tag-titre</span>.</p>
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon2">
</CodeSource>   


<h3>3- Avec slots "titre" et slot par défaut</h3>
<div class="mb-32" id="exempleAccordeon3">
    <utd-accordeon class="mb-32">
        <span slot="titre">
            Exemple d'utilisation 3 avec un titre long long long long long long long long long long long long long long long long long long
        </span>   
        <p>Ici un texte incroyable.</p>
        <p>Qui peut même contenir du html.</p>
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon3">
</CodeSource>   

<h3>4- Accordéon développé par défaut</h3>
<div class="mb-32" id="exempleAccordeon4">
    <utd-accordeon class="mb-32" reduit="false">
        <span slot="titre">
            Exemple d'utilisation 4
        </span>   
        <p>Ici un texte incroyable.</p>
        <p>Qui peut même contenir du html.</p>
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon4">
</CodeSource>   

<h3>5- Accordéon contrôlé par javascript</h3>
<div class="mb-32" id="exempleAccordeon5">
    <utd-accordeon class="mb-32" id="accordeon5">
        <span slot="titre">
            Exemple d'utilisation 5
        </span>   
        <p>Un bel exemple de comment contrôler l'ouverture/fermeture de l'accordéon via un bouton.</p>
        <p>Cliquez le bouton "Contrôler accordéon" pour essayer.</p>
    </utd-accordeon>

    <button type="button" id="btnControleExemple5" class="utd-btn secondaire compact">Contrôler accordéon</button>
</div>

<CodeSource idElementCodeSource="exempleAccordeon5" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{controlerAccordeon5.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   
