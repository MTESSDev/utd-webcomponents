<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Accordéon</h1>

<h2>Exemple avec attributs "titre" et "contenu"</h2>
<div class="mb-32">
    <utd-accordeon titre="Exemple d'utilisation 1" id="exempleAccordeon1" contenu="<p>Ici un texte incroyable.</p><p>Qui peut même contenir du html.</p>">
    </utd-accordeon>
</div>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleAccordeon1">
        </CodeSource>   
    </span>
</utd-accordeon>


<h2>Exemple avec attribut "titre" et slot "contenu"</h2>
<div class="mb-32">
    <utd-accordeon titre="Exemple d'utilisation 2" id="exempleAccordeon2">
        <span slot="contenu">
            <p>Ici un texte incroyable.</p>
            <p>Qui peut même contenir du html.</p>
        </span>
    </utd-accordeon>
</div>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleAccordeon2">
        </CodeSource>   
    </span>
</utd-accordeon>


<h2>Exemple avec slots "titre" et "contenu"</h2>
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
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleAccordeon3">
        </CodeSource>   
    </span>
</utd-accordeon>


