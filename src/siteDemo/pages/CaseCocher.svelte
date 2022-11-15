<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    let mounted = false;

    onMount(() => {
        ajouterCodeExemple3()
        ajouterCodeExemple4()
        mounted = true
    })

    function ajouterCodeExemple3() {
        const controleUtd = document.getElementById('utdChamp3')
        controleUtd.querySelectorAll('input').forEach((controle) => {
            ['blur', 'change'].forEach((event) => {
                controle.addEventListener(event, () => {
                    controleUtd.setAttribute('invalide', !controleUtd.querySelector('input:checked'))
                })
            })
        })  
    }

    function ajouterCodeExemple4() {
        const controleUtd = document.getElementById('utdChamp4')
        controleUtd.querySelectorAll('input').forEach((controle) => {
            ['blur', 'change'].forEach((event) => {
                controle.addEventListener(event, () => {
                    controleUtd.setAttribute('invalide', !controleUtd.querySelector('input:checked'))
                })
            })
        })  
    }

</script>

<style type="text/css">
</style>

<h1>Case à cocher</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>La <strong>case à cocher</strong> permet à l’utilisateur de sélectionner une ou plusieurs options dans une liste.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/case-a-cocher" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Seul (gestion manuelle)</h3>
<div id="exemple1">    
    <div class="utd-form-group checkbox">
        <label>
            <input type="checkbox" name="rempliFormulaire1" value="PrisConnaissanceDirectives" aria-required="true" aria-invalid="true" aria-describedby="texteErreur1">
            J'ai pris connaissance des directives
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
        </label>         
        <span id="texteErreur1" class="utd-erreur-champ">Le champ «J'ai pris connaissance des directives» est obligatoire.</span>                      
    </div>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Liste (gestion manuelle)</h3>
<div id="exemple2">    
    <div class="utd-form-group checkbox" role="group" aria-labelledby="personnagePrefere2 precision2 texteErreur2">
        <span class="label" id="personnagePrefere2">Quels sont vos personnages préférés ?
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
            <span class="texte-obligatoire utd-sr-only"> obligatoire </span>
        </span>        
        <span id="precision2" class="utd-precision">Faites confiance à votre instinct.</span>        
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

        <span id="texteErreur2" class="utd-erreur-champ">Le champ «Quels sont vos personnages préférés ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>

<h3>3- Seul (Gestion automatique avec wrapper "utd-champ-form")</h3>
<div id="exemple3">    
    <utd-champ-form id="utdChamp3" obligatoire="true" message-erreur="Le champ «J'ai pris connaissance des directives» est obligatoire.">
        <label>
            <input type="checkbox" name="rempliFormulaire3" value="PrisConnaissanceDirectives">
            J'ai pris connaissance des directives
        </label>               
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3" titre="Code source (HTML)">
</CodeSource>
{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple3.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 

<h3>4- Liste (Gestion automatique avec wrapper "utd-champ-form")</h3>
<div id="exemple4">    
    <utd-champ-form id="utdChamp4" obligatoire="true" libelle="Quels sont vos personnages préférés ?" precision="Faites confiance à votre instinct." message-erreur="Le champ «Quels sont vos personnages préférés ?» est obligatoire.">
        <label>
            <input type="checkbox" name="persoPrefere4" value="Marty">                
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere4" value="Forrest">
            Forrest Gump
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere4" value="Vader">
            Darth Vador
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere4" value="Fonzi">
            Fonzi
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere4" value="CaptainAmerica">
            Captain America
        </label>    
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple4" titre="Code source (HTML)">
</CodeSource>

{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple4.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 


