<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 

    let tableauParametres = []
    let tableauSlots = []
    let tableauRetourEvenementChangementEtat = []
    let mounted = false

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauSlots = obtenirTableauSlots()
        tableauRetourEvenementChangementEtat = obtenirTableauRetourEvenementChangementEtat()
        controlerAccordeon5()
        mounted = true
    })


    function obtenirTableauParametres() {
        return [
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si l'accordéon doit être réduit ou développé. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développé/réduit). Défaut "true" (réduit).`},    
            {nom: "type", type: "String (Optionnel)", description: `Type de l'accordéon (icône/couleur). Valeurs possibles : <span class="utd-emphase-gris">information</span>, <span class="utd-emphase-gris">avertissement</span>, <span class="utd-emphase-gris">succes</span>, <span class="utd-emphase-gris">erreur</span>, ou <span class="utd-emphase-gris">general</span>. Défaut "general".`},            
            {nom: "titre", type: "String (Optionnel)", description: `Titre affiché dans l'entête de l'accordéon.`},
            {nom: "tag-titre", type: "String (Optionnel)", description: `Balise html à utiliser pour le titre de l'entête. Défaut "h2".`},
            {nom: "contenu", type: "String (Optionnel)", description: `Texte à afficher dans la zone de contenu de l'accordéon.`},
            {nom: "conserver-etat-affichage", type: "Boolean (Optionnel)", description: `<p>Indique si l'état d'affichage (développé/réduit) de l'accordéon doit être conservé pendant la session (tant que le fureteur est ouvert). Défaut "false".</p><p>IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-accordeon doit avoir un id.</p>`}
        ];
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'accordéon.</p>`},
            {nom: "titre", description: `Contenu html injecté dans l'entête de l'accordéon. Exemple d'utilisation : Ajout d'une icône à gauche du titre.`}            
        ];
    }

    function obtenirTableauRetourEvenementChangementEtat() {
        return [
            {nom: "reduit", type: "Boolean (Optionnel)", description: `Indique si l'accordéon est réduit. Il s'agit du nouvel état suite au changement d'état d'affichage.`},    
        ];
    }

    function controlerAccordeon5() {        
        document.getElementById('btnControleExemple5').addEventListener('click', () => {            
            const accordeon = document.getElementById('utdAccordeon5')
            accordeon.setAttribute('reduit', accordeon.getAttribute('reduit') === 'false' ? 'true' : 'false')
        })

        document.getElementById("utdAccordeon5").addEventListener("changementEtat", e => {
            document.getElementById('resultat5').innerText = `État d'affichage = ${e.detail.reduit ? 'réduit' : 'développé'}`;
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
    <h1>Accordéon</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>L’<strong>accordéon</strong> permet de réduire temporairement la quantité d’information affichée sur une page. Avec cette option, la personne survole le contenu et accède plus rapidement à l’information recherchée.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/affichage-de-contenu/accordeon" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

    <h3>Particularités vs. le système de design Québec.ca</h3>
    <p>La notion de "type" n'existe pas dans le système de design Québec.ca. Il s'agit d'une particularité MESS qui doit être utilisée avec <b>jugement et parcimonie</b> (ex. Ne pas avoir de multiples accordéons typés dans une même page).</p>

    <h2>Attributs disponibles</h2>
    <TableauParams parametres="{tableauParametres}">
    </TableauParams>

    <h2>Slots disponibles</h2>
    <TableauSlots parametres="{tableauSlots}">
    </TableauSlots>

    <h2>Événements disponibles</h2>
    <h3>changementEtat</h3>
    <p>Est exécuté lorsque l'état d'affichage (développé/réduit) de l'accordéon change. Voir exemple <a href="#aaa" on:click="{clickAncre}">5- Accordéon contrôlé par javascript</a>.</p>
    <h4>Retour</h4>
    <TableauParams parametres="{tableauRetourEvenementChangementEtat}">
    </TableauParams>
</div>

<div class="backstop-test">
    <h2>Exemples</h2>
    <h3>1- Avec attributs "titre" et "contenu"</h3>

    <div class="mb-32 bs-test" id="exempleAccordeon1">
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


    <h3>3- Avec slots "titre" et slot par défaut et conservation de l'état d'affichage</h3>
    <p>Dans cet exemple, l'état d'affichage (développé/réduit) et conservé tout au long de la session.</p> 
    <p>Pour tester, développer l'accordéon, changer de page et revenir dans cette page. Vous constaterez que l'accordéon sera ouvert.</p>
    <div class="mb-32" id="exempleAccordeon3">
        <utd-accordeon class="mb-32" id="utdAccordeon3" conserver-etat-affichage="true">
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

    <div class="mb-32 bs-test" id="exempleAccordeon4">
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

    <h3>5- Accordéon contrôlé par javascript et conservation de l'état d'affichage</h3>
    <p>Cet exemple démontre l'utilisation de javascript afin de développer/réduire l'accordéon via un bouton.</p>
    <p>Il utilise également l'événement <span class="utd-emphase-gris">changementEtat</span> afin de signaler l'état d'affichage de l'accordéon (développé/réduit) lorsque son état change.</p>
    <p>Aussi dans cet exemple, l'état d'affichage (développé/réduit) et conservé tout au long de la session.</p> 
    <p>Pour tester, réduire l'accordéon, changer de page et revenir dans cette page. Vous constaterez que l'accordéon sera réduit.</p>

    <div class="mb-32 bs-test" id="exempleAccordeon5">
        <utd-accordeon class="mb-32" id="utdAccordeon5" reduit="false" conserver-etat-affichage="true">
            <span slot="titre">
                Exemple d'utilisation 5
            </span>   
            <p>Un bel exemple de comment contrôler l'ouverture/fermeture de l'accordéon via un bouton.</p>
            <p>Cliquez le bouton "Contrôler accordéon" pour essayer.</p>        
            <p>Remarquez également le texte indiquant l'état d'affichage lorsque ce dernier change.</p>
        </utd-accordeon>

        <button type="button" id="btnControleExemple5" class="utd-btn secondaire compact">Contrôler accordéon</button>
    </div>
    <div id="resultat5" class="mt-32 mb-32"></div>
    <CodeSource idElementCodeSource="exempleAccordeon5" titre="Code source (Html)">
    </CodeSource>   

    {#if mounted}
        <CodeSource codeSource="{controlerAccordeon5.toString()}" titre="Code source (js)" language="language-javascript">
        </CodeSource>   
    {/if}   

    <h3>6- Accordéons avec type spécifié</h3>

    <div class="mb-32 bs-test" id="exempleAccordeon6">
        <utd-accordeon class="mb-32" titre="Exemple type information" type="information">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </utd-accordeon>
        <utd-accordeon class="mb-32" titre="Exemple type avertissement" type="avertissement">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </utd-accordeon>
        <utd-accordeon class="mb-32" titre="Exemple type succès" type="succes">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </utd-accordeon>
        <utd-accordeon class="mb-32" titre="Exemple type erreur" type="erreur">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </utd-accordeon>
    </div>
    <CodeSource idElementCodeSource="exempleAccordeon6">
    </CodeSource>   

</div>