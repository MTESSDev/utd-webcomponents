<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 


    let tableauParametres = [];
    let tableauSlots = [];

    onMount(() => {
        tableauParametres = obtenirTableauParametres();
        tableauSlots = obtenirTableauSlots();
    })
/*    xport let multiple = "false"
export let recherchable = "false"
export let rechercheFloue = "true"
export let precisionRecherche = "0.2"
export let largeur = "md" //Valeurs possible sm, md, lg
export let placeholder = languePage === 'fr' ? "Sélectionner une valeur" : "(en)Sélectionner une valeur"
export let placeholderRecherche = languePage === 'fr' ? "Rechercher dans la liste" : "(en)Rechercher dans la liste"*/

    function obtenirTableauParametres() {
        return [
            {nom: "multiple", type: "Booléen (Optionnel)", description: `Indique s'il s'agit d'une liste à sélection multiple. (Défaut : "false")`},
            {nom: "recherchable", type: "Booléen (Optionnel)", description: `Indique s'il est possible d'effectuer une recherche dans les valeurs possibles de la liste. (Défaut : "false")`},
            {nom: "largeur", type: "String (Optionnel)", description: `Largeur de la liste. Valeurs possibles : <span class="utd-emphase-gris">lg</span> (528px), <span class="utd-emphase-gris">md</span> (342px), <span class="utd-emphase-gris">sm</span> (156px).`},
            {nom: "recherche-floue", type: "Booléen (Optionnel)", description: `Indique si la recherche doit être précise ou non, i.e. doit contenir exactement le terme recherché. Si la recherche est floue, ça permet un certain niveau d'erreur (ex. une faute de frappe). (Défaut : "true")`}
        ]
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Ne devrait être que le contrôle "select" original.</p>`}
        ]
    }

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
<p>La <strong>boîte combinée</strong> est une liste à sélection unique ou multiple qui comprend un outil de recherche. Par défaut la recherche permet un certain flou (Voir paramètres "recherche-floue" et "precision-recherche").</p>
<p>Cette liste est utilisée pour faciliter la sélection d'éléments lorsque la liste est très longue, par exemple une liste de ministères et organismes.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/liste-deroulante" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>À venir?</p>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h2>Exemples</h2>
<h3>1a- Liste déroulante native à sélection simple</h3>
<div id="exemple1">
    <utd-champ-form libelle="Sélectionnez votre province canadienne préférée" precision="Ne soyez pas timide et assumez-vous.">
        <select id="select1">
            <option value="AB">Alberta</option>
            <option value="BC">Colombie-Britannique</option>
            <option value="MB">Manitoba</option>
            <option value="NB">Nouveau-Brunswick</option>
            <option value="NL">Terre-Neuve-et-Labrador</option>
            <option value="NS">Nouvelle-Écosse</option>
            <option value="ON">Ontario</option>
            <option value="PE">Île-du-Prince-Édouard</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Territoires du Nord-Ouest</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
        </select>          
    </utd-champ-form>
</div>
<h3>1b- Liste déroulante native à sélection multiple</h3>
<div id="exemple1b">
    <utd-champ-form libelle="Sélectionnez vos provinces canadiennes préférées" precision="Ne soyez pas timide et assumez-vous.">
        <select id="select1b" multiple>
            <option value="AB">Alberta</option>
            <option value="BC">Colombie-Britannique</option>
            <option value="MB">Manitoba</option>
            <option value="NB">Nouveau-Brunswick</option>
            <option value="NL">Terre-Neuve-et-Labrador</option>
            <option value="NS">Nouvelle-Écosse</option>
            <option value="ON">Ontario</option>
            <option value="PE">Île-du-Prince-Édouard</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Territoires du Nord-Ouest</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
        </select>          
    </utd-champ-form>
</div>
<h3>2a- Liste déroulante à sélection simple</h3>
<div id="exemple2">
    <utd-champ-form precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante>
            <label>Sélectionnez votre province canadienne préférée</label>
            <select id="select2">
                <option value="AB">Alberta</option>
                <option value="BC">Colombie-Britannique</option>
                <option value="MB">Manitoba</option>
                <option value="NB">Nouveau-Brunswick</option>
                <option value="NL">Terre-Neuve-et-Labrador</option>
                <option value="NS">Nouvelle-Écosse</option>
                <option value="ON">Ontario</option>
                <option value="PE">Île-du-Prince-Édouard</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Territoires du Nord-Ouest</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
            </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>

<h3>2b- Liste déroulante à sélection simple (avec peu de choix donc sans barre de défilement)</h3>
<div id="exemple2a">
    <utd-champ-form precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante>
            <label>Sélectionnez votre province canadienne préférée</label>
            <select id="select2a">
                <option value="AB">Alberta</option>
                <option value="BC">Colombie-Britannique</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
            </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple2a">
</CodeSource>

<h3>3- Liste déroulante à sélection multiple</h3>
<div id="exemple3">
    <utd-champ-form precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante multiple="true">
            <label>Sélectionnez vos provinces canadiennes préférées</label>
            <select id="select3">
                <option value="AB">Alberta</option>
                <option value="BC">Colombie-Britannique</option>
                <option value="MB">Manitoba</option>
                <option value="NB">Nouveau-Brunswick</option>
                <option value="NL">Terre-Neuve-et-Labrador</option>
                <option value="NS">Nouvelle-Écosse</option>
                <option value="ON">Ontario</option>
                <option value="PE">Île-du-Prince-Édouard</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Territoires du Nord-Ouest</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
              </select>          
        </utd-liste-deroulante>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>

<h3>4- Boîte combinée (sélection simple)</h3>
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

<h3>5- Boîte combinée (sélection multiple)</h3>
<p>Dans cet exemple des mots clés ont été ajoutés sur certaines options. Ex. "Nordiques Québec" pour "Colorado" et "pomme" pour "New York". Si une recherche est faite avec "Québec", le résultat "Colorado" sera disponible bien que le terme "Québec" ne soit pas dans le texte de l'option.</p>
<div id="exemple5">
    <utd-champ-form libelle="Sélectionnez vos états américains préférés" precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante recherchable="true" multiple="true">
            <select id="select5">
                <option value="AL">Alabama</option>
                <option value="AK" mots-cles="freeze">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA" mots-cles="sunshine">California</option>
                <option value="CO" mots-cles="Nordiques Québec">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE" mots-cles="Waynes world">Delaware</option>
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
                <option value="ME" mots-cles="Big Bad Bruins">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH" mots-cles="Live free or die">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY" mots-cles="grosse pomme">New York</option>
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

<h3>6- Boîte combinée (sélection multiple) avec recherche précise (aucun flou)</h3>
<p>Tenter une recherche avec le terme "Floride". Comme dans cet exemple la recherche est précise(vs. floue par défaut), il n'y aura aucun résultat contrairement à ce que nous pouvons obtenir dans l'exemple 5.</p>
<div id="exemple6">
    <utd-champ-form libelle="Sélectionnez vos états américains préférés" precision="Ne soyez pas timide et assumez-vous.">
        <utd-liste-deroulante recherchable="true" recherche-floue="false" multiple="true">
            <select id="select6">
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

<CodeSource idElementCodeSource="exemple6">
</CodeSource>
