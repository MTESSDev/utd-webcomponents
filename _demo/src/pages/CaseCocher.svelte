<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    let mounted = false;

    onMount(() => {
        ajouterCodeExemple5()
        ajouterCodeExemple6()
        ajouterCodeExemple7()
        ajouterCodeExemple8()
        mounted = true
    })

    function ajouterCodeExemple5() {
        const controleUtd = document.getElementById('utdChamp5')
        controleUtd.querySelectorAll('input').forEach((controle) => {
            ['blur', 'change'].forEach((event) => {
                controle.addEventListener(event, () => {
                    controleUtd.setAttribute('invalide', !controleUtd.querySelector('input:checked'))
                })
            })
        })  
    }

    function ajouterCodeExemple6() {
        const controleUtd = document.getElementById('utdChamp6')
        controleUtd.querySelectorAll('input').forEach((controle) => {
            ['blur', 'change'].forEach((event) => {
                controle.addEventListener(event, () => {
                    controleUtd.setAttribute('invalide', !controleUtd.querySelector('input:checked'))
                })
            })
        })  
    }

    function ajouterCodeExemple7() {
        const controleUtd = document.getElementById('utdChamp7')
        controleUtd.querySelectorAll('input').forEach((controle) => {
            ['blur', 'change'].forEach((event) => {
                controle.addEventListener(event, () => {
                    controleUtd.setAttribute('invalide', !controleUtd.querySelector('input:checked'))
                })
            })
        })  
    }

    function ajouterCodeExemple8() {
        const controleUtd = document.getElementById('utdChamp8')
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

<div class="documentation">
    <h1>Case à cocher</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>La <strong>case à cocher</strong> permet à l’utilisateur de sélectionner une ou plusieurs options dans une liste.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/formulaire/case-a-cocher" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>
</div>

<h2>Exemples</h2>

<h3>1- Seul (gestion manuelle)</h3>
<div id="exemple1" class="bs-test">    
    <div class="utd-form-group checkbox">
        <label>
            <input type="checkbox" name="rempliFormulaire1" value="PrisConnaissanceDirectives" aria-required="true" aria-invalid="true" aria-describedby="texteErreur1">
            <span>J'ai pris connaissance des directives</span>
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
        </label>         
        <span id="texteErreur1" class="utd-erreur-champ">Le champ «J'ai pris connaissance des directives» est obligatoire.</span>                      
    </div>
</div>
<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Seul (gestion manuelle, format compact)</h3>
<div id="exemple2" class="bs-test">    
    <div class="utd-form-group checkbox compact">
        <label>
            <input type="checkbox" name="rempliFormulaire2" value="PrisConnaissanceDirectives" aria-required="true" aria-invalid="true" aria-describedby="texteErreur2">
            <span>J'ai pris connaissance des directives</span>
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
        </label>         
        <span id="texteErreur2" class="utd-erreur-champ">Le champ «J'ai pris connaissance des directives» est obligatoire.</span>                      
    </div>
</div>
<CodeSource idElementCodeSource="exemple2">
</CodeSource>

<h3>3- Liste (gestion manuelle)</h3>
<div id="exemple3">    
    <div class="utd-form-group checkbox" role="group" aria-labelledby="personnagePrefere3 precision3 texteErreur3">
        <span class="label" id="personnagePrefere3">Quels sont vos personnages préférés ?
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
            <span class="texte-obligatoire utd-sr-only"> obligatoire </span>
        </span>        
        <span id="precision3" class="utd-precision">Faites confiance à votre instinct.</span>        
        <label>
            <input type="checkbox" name="persoPrefere3" value="Marty">                
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere3" value="Forrest">
            <span>Forrest Gump</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere3" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere3" value="Fonzi">
            <span>Fonzi</span>
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere3" value="CaptainAmerica">
            <span>Captain America</span>
        </label>    

        <span id="texteErreur3" class="utd-erreur-champ">Le champ «Quels sont vos personnages préférés ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

<h3>4- Liste (gestion manuelle, format compact)</h3>
<div id="exemple4">    
    <div class="utd-form-group checkbox compact" role="group" aria-labelledby="personnagePrefere4 precision4 texteErreur4">
        <span class="label" id="personnagePrefere4">Quels sont vos personnages préférés ?
            <span class="utd-icone-champ-requis" aria-hidden="true">*</span>
            <span class="texte-obligatoire utd-sr-only"> obligatoire </span>
        </span>        
        <span id="precision4" class="utd-precision">Faites confiance à votre instinct.</span>        
        <label>
            <input type="checkbox" name="persoPrefere4" value="Marty">                
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere4" value="Forrest">
            <span>Forrest Gump</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere4" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere4" value="Fonzi">
            <span>Fonzi</span>
        </label>    
        <label>
            <input type="checkbox" name="persoPrefere4" value="CaptainAmerica">
            <span>Captain America</span>
        </label>    

        <span id="texteErreur4" class="utd-erreur-champ">Le champ «Quels sont vos personnages préférés ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple4">
</CodeSource>

<h3>5- Seul (Gestion automatique avec wrapper "utd-champ-form")</h3>
<div id="exemple5" class="bs-test">    
    <utd-champ-form id="utdChamp5" obligatoire="true" message-erreur="Le champ «J'ai pris connaissance des directives» est obligatoire.">
        <label>
            <input type="checkbox" name="rempliFormulaire5" value="PrisConnaissanceDirectives">
            <span>J'ai pris connaissance des directives</span>
        </label>               
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple5" titre="Code source (HTML)">
</CodeSource>
{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple5.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 

<h3>6- Seul (Gestion automatique avec wrapper "utd-champ-form", format compact)</h3>
<div id="exemple6" class="bs-test">    
    <utd-champ-form id="utdChamp6" obligatoire="true" format="compact" message-erreur="Le champ «J'ai pris connaissance des directives» est obligatoire.">
        <label>
            <input type="checkbox" name="rempliFormulaire6" value="PrisConnaissanceDirectives">
             <span>J'ai pris connaissance des directives</span>
        </label>               
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple6" titre="Code source (HTML)">
</CodeSource>
{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple6.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 

<h3>7- Liste (Gestion automatique avec wrapper "utd-champ-form")</h3>
<div id="exemple7" class="bs-test">    
    <utd-champ-form id="utdChamp7" obligatoire="true" libelle="Quels sont vos personnages préférés ?" precision="Faites confiance à votre instinct." message-erreur="Le champ «Quels sont vos personnages préférés ?» est obligatoire.">
        <label>
            <input type="checkbox" name="persoPrefere7" value="Marty">                
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere7" value="Forrest">
            <span>Forrest Gump</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere7" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <label>
            <input type="checkbox" disabled name="persoPrefere7" value="Fonzi">
            <span>Fonzi</span>
        </label>    
        <label>
            <input type="checkbox" disabled name="persoPrefere7" value="VinnyBarberino">
            <span>Vinny Barberino</span>
        </label>    
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple7" titre="Code source (HTML)">
</CodeSource>

{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple7.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 

<h3>8- Liste (Gestion automatique avec wrapper "utd-champ-form", format compact)</h3>
<div id="exemple8" class="bs-test">    
    <utd-champ-form id="utdChamp8" obligatoire="true" format="compact" libelle="Quels sont vos personnages préférés ?" precision="Faites confiance à votre instinct." message-erreur="Le champ «Quels sont vos personnages préférés ?» est obligatoire.">
        <label>
            <input type="checkbox" name="persoPrefere8" value="Marty">                
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere8" value="Forrest">
            <span>Forrest Gump</span>
        </label>               
        <label>
            <input type="checkbox" name="persoPrefere8" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <label>
            <input type="checkbox" disabled name="persoPrefere8" value="Fonzi">
            <span>Fonzi</span>
        </label>    
        <label>
            <input type="checkbox" disabled name="persoPrefere8" value="CaptainAmerica">
            <span>Captain America</span>
        </label>    
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple8" titre="Code source (HTML)">
</CodeSource>

{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple8.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 



