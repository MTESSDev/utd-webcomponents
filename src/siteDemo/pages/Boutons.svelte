<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Boutons</h1>

<h2>Bouton primaire</h2>
<div class="exemples-boutons" id="exempleBoutons1">
    <button type="button" class="utd-btn primaire">Base</button>
    <button type="button" class="utd-btn primaire compact">Compact</button>
    <button type="button" class="utd-btn primaire arrondi">Arrondi</button>
    <button type="button" class="utd-btn primaire compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn primaire" disabled>Inactif</button>
</div>
<utd-accordeon titre="Code source">
    <div slot="contenu">
        <CodeSource idElementCodeSource="exempleBoutons1">
        </CodeSource>
    </div>
</utd-accordeon>



<h2>Bouton secondaire</h2>
<div class="exemples-boutons" id="exempleBoutons2">
    <button type="button" class="utd-btn secondaire">Base</button>
    <button type="button" class="utd-btn secondaire compact">Compact</button>
    <button type="button" class="utd-btn secondaire arrondi">Arrondi</button>
    <button type="button" class="utd-btn secondaire compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn secondaire" disabled>Inactif</button>
</div>
<utd-accordeon titre="Code source">
    <div slot="contenu">
        <CodeSource idElementCodeSource="exempleBoutons2">
        </CodeSource>
    </div>
</utd-accordeon>


<h2>Bouton tertiaire</h2>
<div class="exemples-boutons" id="exempleBoutons3">
    <button type="button" class="utd-btn tertiaire">Base</button>
    <button type="button" class="utd-btn tertiaire compact">Compact</button>
    <button type="button" class="utd-btn tertiaire" disabled>Inactif</button>
</div>
<utd-accordeon titre="Code source">
    <div slot="contenu">
        <CodeSource idElementCodeSource="exempleBoutons3">
        </CodeSource>
    </div>
</utd-accordeon>


<h2>Bouton avertissement</h2>
<div class="exemples-boutons" id="exempleBoutons4">
    <button type="button" class="utd-btn avertissement">Base</button>
    <button type="button" class="utd-btn avertissement compact">Compact</button>
    <button type="button" class="utd-btn avertissement arrondi">Arrondi</button>
    <button type="button" class="utd-btn avertissement compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn avertissement" disabled>Inactif</button>
</div>
<utd-accordeon titre="Code source">
    <div slot="contenu">
        <CodeSource idElementCodeSource="exempleBoutons4">
        </CodeSource>
    </div>
</utd-accordeon>

