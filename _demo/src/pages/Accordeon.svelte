<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 

    let tableauParametres = [];
    let tableauSlots = [];

    onMount(() => {
        tableauParametres = obtenirTableauParametres();
        tableauSlots = obtenirTableauSlots();
    })


    function obtenirTableauParametres() {
        return [
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si l'accordéon doit être réduit ou développé. Défaut "true" (réduit).`},    
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


