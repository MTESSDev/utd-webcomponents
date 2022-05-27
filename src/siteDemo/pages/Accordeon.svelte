<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Accordéon</h1>

<h2>Description</h2>
<p>L’<strong>accordéon</strong> permet de réduire temporairement la quantité d’information affichée sur une page. Avec cette option, la personne survole le contenu et accède plus rapidement à l’information recherchée.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/affichage-de-contenu/accordeon" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>
<h3>1- Avec attributs "titre" et "contenu"</h3>
<div class="mb-32">
    <utd-accordeon titre="Exemple d'utilisation 1" id="exempleAccordeon1" contenu="<p>Ici un texte incroyable.</p><p>Qui peut même contenir du html.</p>">
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon1">
</CodeSource>   


<h3>2- Avec attribut "titre" et slot "contenu"</h3>
<div class="mb-32">
    <utd-accordeon titre="Exemple d'utilisation 2" id="exempleAccordeon2">
        <span slot="contenu">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </span>
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon2">
</CodeSource>   


<h3>3- Avec slots "titre" et "contenu"</h3>
<div class="mb-32">
    <utd-accordeon id="exempleAccordeon3" class="mb-32">
        <span slot="titre">
            Exemple d'utilisation 3
        </span>   
        <span slot="contenu">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </span>
    </utd-accordeon>
</div>
<CodeSource idElementCodeSource="exempleAccordeon3">
</CodeSource>   


