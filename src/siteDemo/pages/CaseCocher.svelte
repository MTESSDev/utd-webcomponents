<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Case à cocher</h1>

<utd-tablematieres selecteurancres="#main h2">
</utd-tablematieres>

<h2>Description</h2>
<p>La <strong>case à cocher</strong> permet à l’utilisateur de sélectionner une ou plusieurs options dans une liste.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/case-a-cocher" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Seul</h3>
<div id="exemple1">    
    <div class="utd-form-group checkbox">
        <label>
            <input type="checkbox" name="rempliFormulaire" value="formulaireRempliAutre">
            Je n'ai pas rempli moi même ce formulaire
        </label>         
        <span id="texteErreur1" role="alert" class="utd-erreur-champ">Le champ "Quels sont vos personnages préférés ?" est obligatoire.</span>                      
    </div>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Liste </h3>
<div id="exemple2">    
    <div class="utd-form-group checkbox">
        <span class="label" id="personnagePrefere2">Quels sont vos personnages préférés ?</span>
        <span id="precision2" class="utd-precision">Faites confiance à votre instinct.</span>        
        <div role="group" aria-labelledby="personnagePrefere2" aria-describedby="personnagePrefere2 precision2 texteErreur2">
            <label>
                <input type="checkbox" name="persoPrefere2" value="Marty">                
                <span>Marty MacFly</span>
            </label>               
            <label>
                <input type="checkbox" name="persoPrefere2" value="Forrest">
                Forrest Gump
            </label>               
            <label>
                <input type="checkbox" name="persoPrefere2" value="Vader">
                Darth Vador
            </label>    
            <label>
                <input type="checkbox" name="persoPrefere2" value="Fonzi">
                Fonzi
            </label>    
            <label>
                <input type="checkbox" name="persoPrefere2" value="CaptainAmerica">
                Captain America
            </label>    
        </div>
        <span id="texteErreur2" role="alert" class="utd-erreur-champ">Le champ "Quels sont vos personnages préférés ?" est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>


<h3>3- Seul (Avec wrapper "utd-champ-form")</h3>
<div id="exemple3">    
    <utd-champ-form obligatoire="true" invalide="true" messageerreur="Le champ «J'ai pris connaissance des directives» est obligatoire.">
        <label>
            <input type="checkbox" name="rempliFormulaire" value="formulaireRempliAutre">
            J'ai pris connaissance des directives
        </label>               
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

<h3>4- Liste (Avec wrapper "utd-champ-form")</h3>
<div id="exemple3">    
    <utd-champ-form obligatoire="true" invalide="true" messageerreur="Le champ «J'ai pris connaissance des directives» est obligatoire.">
        <label>
            <input type="checkbox" name="rempliFormulaire" value="formulaireRempliAutre">
            J'ai pris connaissance des directives
        </label>               
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>



