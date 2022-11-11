<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    let mounted = false;

    onMount(() => {
        ajouterCodeExemple2()
        mounted = true
    })

    function ajouterCodeExemple2() {
        const controleUtd = document.getElementById('utdChamp2')
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

<h1>Bouton radio</h1>

<utd-menuancres selecteur="#main h2">
</utd-menuancres>

<h2>Description</h2>
<p>Le <strong>bouton radio</strong>, ou case d’option, permet à l’utilisateur de choisir une seule option dans une liste.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/bouton-radio" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>1- Gestion manuelle</h3>
<div id="exemple1">    
    <div class="utd-form-group radio" role="radiogroup" aria-labelledby="personnagePrefere1" aria-describedby="precision1 texteErreur1" aria-required="true">
        <span class="label" id="personnagePrefere1">Quel est votre personnage préféré ?</span>
        <span id="precision1" class="utd-precision">Faites confiance à votre instinct.</span>        
        <label>
            <input type="radio" name="persoPrefere1" value="Marty">                
            Marty MacFly
        </label>               
        <label>
            <input type="radio" name="persoPrefere1" value="Forrest">
            Forrest Gump
        </label>               
        <label>
            <input type="radio" name="persoPrefere1" value="Vader">
            Darth Vador
        </label>    
        <span id="texteErreur1" role="alert" class="utd-erreur-champ">Le champ «Quel est votre personnage préféré ?» est obligatoire.</span>        
    </div>
</div>

<CodeSource idElementCodeSource="exemple1">
</CodeSource>


<h3>2- Gestion automatique (Avec wrapper "utd-champ-form")</h3>
<div id="exemple2">    
    <utd-champ-form id="utdChamp2" obligatoire="true" libelle="Quel est votre personnage préféré ?" precision="Faites confiance à votre instinct." messageerreur="Le champ «Quel est votre personnage préféré ?» est obligatoire.">
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
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>

