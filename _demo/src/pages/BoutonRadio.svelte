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

<div class="documentation">
    <h1>Bouton radio</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>Le <strong>bouton radio</strong>, ou case d’option, permet à l’utilisateur de choisir une seule option dans une liste.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/formulaire/bouton-radio" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>
</div>

<h2>Exemples</h2>

<h3>1- Gestion manuelle</h3>
<div id="exemple1" class="bs-test">    
    <div class="utd-form-group radio" role="radiogroup" aria-labelledby="personnagePrefere1" aria-describedby="precision1 texteErreur1" aria-required="true">
        <span class="label" id="personnagePrefere1">Quel est votre personnage préféré ?</span>
        <span id="precision1" class="utd-precision">Faites confiance à votre instinct.</span>        
        <label>
            <input type="radio" name="persoPrefere1" value="Marty">
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="radio" name="persoPrefere1" value="Forrest">
            <span>Forrest Gump</span>
        </label>               
        <label>
            <input type="radio" name="persoPrefere1" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <span id="texteErreur1" role="alert" class="utd-erreur-champ">Le champ «Quel est votre personnage préféré ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Gestion manuelle (affichage compact)</h3>
<div id="exemple2" class="bs-test">    
    <div class="utd-form-group radio compact" role="radiogroup" aria-labelledby="personnagePrefere2" aria-describedby="precision2 texteErreur2" aria-required="true">
        <span class="label" id="personnagePrefere2">Quel est votre personnage préféré ?</span>
        <span id="precision2" class="utd-precision">Faites confiance à votre instinct.</span>        
        <label>
            <input type="radio" name="persoPrefere2" value="Marty">
            <span>Marty MacFly</span>
        </label>               
        <label>
            <input type="radio" name="persoPrefere2" value="Forrest">
            <span>Forrest Gump</span>            
        </label>               
        <label>
            <input type="radio" name="persoPrefere2" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
        <span id="texteErreur2" role="alert" class="utd-erreur-champ">Le champ «Quel est votre personnage préféré ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>


<h3>3- Gestion automatique (Avec wrapper "utd-champ-form")</h3>
<div id="exemple3" class="bs-test">    
    <utd-champ-form id="utdChamp3" obligatoire="true" libelle="Quel est votre personnage préféré ?" precision="Faites confiance à votre instinct." message-erreur="Le champ «Quel est votre personnage préféré ?» est obligatoire.">
        <label>
            <input type="radio" name="persoPrefere3" value="Marty">
            <span>Marty MacFly</span>            
        </label>               
        <label>
            <input type="radio" disabled name="persoPrefere3" value="Forrest">
            <span>Forrest Gump</span>            
        </label>               
        <label>
            <input type="radio" name="persoPrefere3" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

<h3>4- Gestion automatique (Avec wrapper "utd-champ-form" affichage compact)</h3>
<div id="exemple4" class="bs-test">    
    <utd-champ-form id="utdChamp4" format="compact" obligatoire="true" libelle="Quel est votre personnage préféré ?" precision="Faites confiance à votre instinct." message-erreur="Le champ «Quel est votre personnage préféré ?» est obligatoire.">
        <label>
            <input type="radio" name="persoPrefere4" value="Marty">
            <span>Marty MacFly</span>            
        </label>               
        <label>
            <input type="radio" disabled name="persoPrefere4" value="Forrest">
            <span>Forrest Gump</span>            
        </label>               
        <label>
            <input type="radio" name="persoPrefere4" value="Vader">
            <span>Darth Vador (AKA Anakin Skywalker, AKA Dark Lord of the Sith)</span>
        </label>    
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple4">
</CodeSource>
