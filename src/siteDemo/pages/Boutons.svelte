<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Boutons</h1>

<h2>Description</h2>
<p>Les <strong>boutons</strong> indiquent les actions qui peuvent être exécutées sur une page. Le libellé d’un bouton annonce l'action qui se produit lorsque l'utilisateur interagit avec celui-ci.&nbsp;</p>
<p>Quatre types de boutons sont disponibles&nbsp;: les boutons principaux, les boutons secondaires, les boutons tertiaires et les boutons d’avertissement.&nbsp;</p>
<p>Variante « boutons avec icône » à venir.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/action/boutons" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Bouton primaire</h3>
<div class="exemples-boutons" id="exempleBoutons1">
    <button type="button" class="utd-btn primaire">Base</button>
    <button type="button" class="utd-btn primaire compact">Compact</button>
    <button type="button" class="utd-btn primaire arrondi">Arrondi</button>
    <button type="button" class="utd-btn primaire compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn primaire" disabled>Inactif</button>
</div>
<CodeSource idElementCodeSource="exempleBoutons1">
</CodeSource>



<h3>2- Bouton secondaire</h3>
<div class="exemples-boutons" id="exempleBoutons2">
    <button type="button" class="utd-btn secondaire">Base</button>
    <button type="button" class="utd-btn secondaire compact">Compact</button>
    <button type="button" class="utd-btn secondaire arrondi">Arrondi</button>
    <button type="button" class="utd-btn secondaire compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn secondaire" disabled>Inactif</button>
</div>
<CodeSource idElementCodeSource="exempleBoutons2">
</CodeSource>


<h3>3- Bouton tertiaire</h3>
<div class="exemples-boutons" id="exempleBoutons3">
    <button type="button" class="utd-btn tertiaire">Base</button>
    <button type="button" class="utd-btn tertiaire compact">Compact</button>
    <button type="button" class="utd-btn tertiaire" disabled>Inactif</button>
</div>
<CodeSource idElementCodeSource="exempleBoutons3">
</CodeSource>


<h3>4-Bouton avertissement</h3>
<div class="exemples-boutons" id="exempleBoutons4">
    <button type="button" class="utd-btn avertissement">Base</button>
    <button type="button" class="utd-btn avertissement compact">Compact</button>
    <button type="button" class="utd-btn avertissement arrondi">Arrondi</button>
    <button type="button" class="utd-btn avertissement compact arrondi">Compact et arrondi</button>
    <button type="button" class="utd-btn avertissement" disabled>Inactif</button>
</div>
<CodeSource idElementCodeSource="exempleBoutons4">
</CodeSource>

