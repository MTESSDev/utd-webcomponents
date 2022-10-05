<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Bouton radio</h1>

<h2>Description</h2>
<p>Le <strong>bouton radio</strong>, ou case d’option, permet à l’utilisateur de choisir une seule option dans une liste.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/bouton-radio" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Radio </h3>
<div class="" id="exemple1">    
    <div class="utd-form-group radio">
        <label for="html">
            <input type="radio" id="html" name="fav_language" value="HTML">                
            HTML
        </label>               
        <label for="css">
            <input type="radio" id="css" name="fav_language" value="CSS">
            CSS
        </label>               
        <label for="javascript">
            <input type="radio" id="javascript" name="fav_language" value="JavaScript">
            JavaScript
        </label>
    </div>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>



