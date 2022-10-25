<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Bouton radio</h1>

<utd-tablematieres selecteurancres="#main h2">
</utd-tablematieres>

<h2>Description</h2>
<p>Le <strong>bouton radio</strong>, ou case d’option, permet à l’utilisateur de choisir une seule option dans une liste.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/bouton-radio" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Radio </h3>
<div id="exemple1">    
    <div class="utd-form-group radio">
        <span class="label" id="personnagePrefere">Quel est votre personnage préféré ?</span>
        <div role="radiogroup" aria-labelledby="personnagePrefere">
            <label>
                <input type="radio" name="persoPrefere" value="Marty">                
                Marty MacFly
            </label>               
            <label>
                <input type="radio" name="persoPrefere" value="Forrest">
                Forrest Gump
            </label>               
            <label>
                <input type="radio" name="persoPrefere" value="Vader">
                Darth Vador
            </label>    
        </div>
    </div>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Champ en erreur </h3>
<div id="exemple2">    
    <div class="utd-form-group radio">
        <span class="label" id="personnagePrefere2">Quel est votre personnage préféré ?</span>
        <span id="precision2" class="utd-precision">Faites confiance à votre instinct.</span>        
        <div role="radiogroup" aria-labelledby="personnagePrefere2" aria-describedby="precision2 texteErreur2" aria-required="true">
            <label>
                <input type="radio" name="persoPrefere2" value="Marty">                
                Marty MacFly
            </label>               
            <label>
                <input type="radio" name="persoPrefere2" value="Forrest">
                Forrest Gump
            </label>               
            <label>
                <input type="radio" name="persoPrefere2" value="Vader">
                Darth Vador
            </label>    
        </div>
        <span id="texteErreur2" role="alert" class="utd-erreur-champ">Le champ "Quel est votre personnage préféré ?" est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>


<h3>3- Avec wrapper "utd-champ" </h3>
<div id="exemple3">    
    <div class="utd-form-group radio">
        <span class="label" id="personnagePrefere2">Quel est votre personnage préféré ?</span>
        <span id="precision2" class="utd-precision">Faites confiance à votre instinct.</span>        
        <div role="radiogroup" aria-labelledby="personnagePrefere2" aria-describedby="precision2 texteErreur2" aria-required="true">
            <label>
                <input type="radio" name="persoPrefere2" value="Marty">                
                Marty MacFly
            </label>               
            <label>
                <input type="radio" name="persoPrefere2" value="Forrest">
                Forrest Gump
            </label>               
            <label>
                <input type="radio" name="persoPrefere2" value="Vader">
                Darth Vador
            </label>    
        </div>
        <span id="texteErreur2" role="alert" class="utd-erreur-champ">Le champ "Quel est votre personnage préféré ?" est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

