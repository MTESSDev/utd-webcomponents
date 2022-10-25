<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Section</h1>

<utd-tablematieres selecteurancres="#main h2">
</utd-tablematieres>

<h2>Description</h2>
<p>Le composant <strong>section</strong> permet d'organiser le contenu en regroupant les informations en sections principales ou en blocs d'informations.</p>
<p>Selon les besoins, cette section peut être extensible ou non, et avoir une bordure ou non pour regrouper son contenu.</p>

<h3>Référence système de design Quebec.ca</h3>
N'existe pas sur le site de design Quebec.ca

<h2>Exemples</h2>
<h3>1- Section avec champs</h3>
<div class="mb-32" id="exempleSection1">
    <utd-section titre="Véhicule principal">
        <div class="utd-form-group">
            <label for="champ1a">Marque</label>
            <input type="text" id="champ1a" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ2a">Modèle</label>
            <input type="text" id="champ2a" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ3a">Numéro de série</label>
            <input type="text" id="champ3a" class="utd-form-control"/>
        </div>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection1">
</CodeSource>   


<h3>2- Section avec accordéons</h3>
<div class="mb-32" id="exempleSection2">
    <utd-section titre="Véhicules">
        <utd-accordeon titre="Véhicule principal" type="secondaire">
            <div class="utd-form-group">
                <label for="champ1b">Marque</label>
                <input type="text" id="champ1b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ2b">Modèle</label>
                <input type="text" id="champ2b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ3b">Numéro de série</label>
                <input type="text" id="champ3b" class="utd-form-control"/>
            </div>
        </utd-accordeon>
        <utd-accordeon titre="Véhicule secondaire" type="secondaire">
            <div class="utd-form-group">
                <label for="champ4b">Marque</label>
                <input type="text" id="champ4b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ5b">Modèle</label>
                <input type="text" id="champ5b" class="utd-form-control"/>
            </div>
        
            <div class="utd-form-group">
                <label for="champ5b">Numéro de série</label>
                <input type="text" id="champ5b" class="utd-form-control"/>
            </div>
        </utd-accordeon>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection2">
</CodeSource>   

<h3>3- Section sans bordure</h3>
<div class="mb-32" id="exempleSection3">
    <utd-section titre="Véhicules" bordure="false">
        <div class="utd-form-group">
            <label for="champ1c">Marque</label>
            <input type="text" id="champ1c" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ2c">Modèle</label>
            <input type="text" id="champ2c" class="utd-form-control"/>
        </div>
    
        <div class="utd-form-group">
            <label for="champ3c">Numéro de série</label>
            <input type="text" id="champ3c" class="utd-form-control"/>
        </div>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection3">
</CodeSource>   


<h3>4- Section non extensible</h3>
<div class="mb-32" id="exempleSection4">
    <utd-section titre="Informations personnelles" extensible="false">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>

<CodeSource idElementCodeSource="exempleSection4">
</CodeSource>   

<h3>5- Section non extensible sans bordure</h3>
<div class="mb-32" id="exempleSection5">
    <utd-section titre="Informations personnelles" extensible="false" bordure="false">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection5">
</CodeSource>   

<h3>6- Section ouverte par défaut et titre h3</h3>
<div class="mb-32" id="exempleSection6">
    <utd-section titre="Informations personnelles" reduit="false" tagtitre="h3">
        <p>Le mot de passe est associé à votre compte clicSÉQUR - Citoyens.</p>
        <p>
            <a href="#">Modifiez votre mot de passe</a>
        </p>
    </utd-section>
</div>
<CodeSource idElementCodeSource="exempleSection6">
</CodeSource>   
