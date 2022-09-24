<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Champs</h1>

<h2>Description</h2>
<p>Les <strong>boutons</strong> indiquent les actions qui peuvent être exécutées sur une page. Le libellé d’un bouton annonce l'action qui se produit lorsque l'utilisateur interagit avec celui-ci.&nbsp;</p>
<p>Quatre types de boutons sont disponibles&nbsp;: les boutons principaux, les boutons secondaires, les boutons tertiaires et les boutons d’avertissement.&nbsp;</p>
<p>Variante « boutons avec icône » à venir.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/action/boutons" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Input (text, number, date, tel, email, url) </h3>
<div class="" id="exemple1">
    
    <div class="utd-form-group">
        <label for="champ1">Champ type "text"</label>
        <input type="text" id="champ1" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ2">Champ type "number"</label>
        <input type="number" id="champ2" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ3">Champ type "date"</label>
        <input type="date" id="champ3" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ4">Champ type "url"</label>
        <input type="url" id="champ4" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ5">Champ type "tel"</label>
        <input type="tel" id="champ5" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ6">Champ type "email"</label>
        <input type="email" id="champ6" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ7">Champ type "password"</label>
        <input type="password" id="champ7" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ8">Champ type "search"</label>
        <input type="search" id="champ8" class="utd-form-control"/>
    </div>

    <div class="utd-form-group">
        <label for="champ9">Champ type "range"</label>
        <input type="range" id="champ9" class="utd-form-control"/>
    </div>


</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>



