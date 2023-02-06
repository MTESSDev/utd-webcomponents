<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Liste déroulante</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>La <strong>liste déroulante</strong> permet à l'utilisateur de sélectionner une ou plusieurs des options contenues dans une liste.</p>
<p>Il existe 3 types de liste déroulante.</p>
<p>La <strong>liste déroulante standard</strong> est utilisée lorsqu'un seul choix est requis, par exemple pour sélectionner la province de résidence dans une adresse postale.&nbsp;</p>
<p>La <strong>liste déroulante à sélection multiple</strong> permet de choisir un ou plusieurs éléments de la liste, comme la composante&nbsp;<a href="/composantes/formulaire/case-a-cocher">Case à cocher</a>. Elle ne devrait être utilisée uniquement lorsque les cases à cocher occupent trop d'espace dans l'écran.</p>
<p>Cette liste est utilisée pour permettre à l'utilisateur de sélectionner des critères comme dans le cas de conditions de travail d'un emploi.</p>
<p>La <strong>boîte combinée</strong> est une liste à sélection unique ou multiple qui comprend un outil de recherche.</p>
<p>Cette liste est utilisée pour faciliter la sélection d'éléments lorsque la liste est très longue, par exemple une liste de ministères et organismes.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/liste-deroulante" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>



<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>À venir?</p>

<h3>Exemples</h3>
<h4>1- Liste déroulante native à sélection simple</h4>
<div id="exemple1">
    <utd-champ-form libelle="Sélectionnez un modèle de voiture" precision="Ne soyez pas timide et assumez-vous.">
        <select id="select1">
            <option value="volvo">Volvo XC90</option>
            <option value="saab">Saab 95</option>
            <option value="mercedes">Mercedes SLK</option>
            <option value="audi">Audi TT</option>
        </select>          
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h4>2- Liste déroulante à sélection simple</h4>
<div id="exemple2">
    <utd-champ-form precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante>
            <label>Sélectionnez un modèle de voiture</label>
            <select id="select2">
                <option value="volvo">Volvo XC90</option>
                <option value="saab">Saab 95</option>
                <option value="mercedes">Mercedes SLK</option>
                <option value="audi">Audi TT</option>
              </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>

<h4>3- Liste déroulante à sélection multiple</h4>
<div id="exemple3">
    <utd-champ-form precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante multiple="true">
            <label>Sélectionnez un ou plusieurs modèles de voitures</label>
            <select id="select3">
                <option value="volvo">Volvo XC90</option>
                <option value="saab">Saab 95</option>
                <option value="mercedes">Mercedes SLK</option>
                <option value="audi">Audi TT</option>
              </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

<h4>4- Boîte combinée (sélection simple)</h4>
<div id="exemple4">
    <utd-champ-form libelle="Sélectionnez votre état américain préféré" precision="Ne soyez pas timide et assumez-vous." obligatoire="true" message-erreur="C'est mauvais!!!">
        <utd-liste-deroulante recherchable="true">
            <select id="select4">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple4">
</CodeSource>

<h4>5- Boîte combinée (sélection multiple)</h4>
<div id="exemple5">
    <utd-champ-form libelle="Sélectionnez vos états américains préférés" precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante recherchable="true" multiple="true">
            <select id="select5">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple5">
</CodeSource>

