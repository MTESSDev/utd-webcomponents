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

    function obtenirTableauParametres() {
        return [
            {nom: "type", type: "String (Optionnel)", description: `Type de l'avis (icône/couleur). Valeurs possibles : <span class="utd-emphase-gris">information</span>, <span class="utd-emphase-gris">avertissement</span>, <span class="utd-emphase-gris">succes</span>, <span class="utd-emphase-gris">erreur</span>, ou <span class="utd-emphase-gris">complementaire</span>. Défaut "information".`},
            {nom: "titre", type: "String (Optionnel)", description: `Titre affiché dans l'avis.`},
            {nom: "contenu", type: "String (Optionnel)", description: `Texte à afficher dans l'avis.`}
        ];
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'avis.</p>`},
        ];
    }
</script>

<style type="text/css">
</style>

<div class="documentation">
    <h1>Avis</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>Les <strong>avis</strong> sont des messages contextuels qui peuvent s’afficher sur une page ou sur plusieurs pages d’un même sujet.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/affichage-de-contenu/avis" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

    <h2>Attributs disponibles</h2>
    <TableauParams parametres="{tableauParametres}">
    </TableauParams>

    <h2>Slots disponibles</h2>
    <TableauSlots parametres="{tableauSlots}">
    </TableauSlots>
</div>

<h2>Exemples</h2>

<h3>Avis information</h3>
<h4>1- Avec attribut "contenu"</h4>
<div id="exempleInformation1">
    <utd-avis titre="Nouvelle règlementation" contenu="Les nouveaux règlements de pêche seront en vigeur à partir du 12 mai."></utd-avis>
</div>
<CodeSource idElementCodeSource="exempleInformation1">
</CodeSource>   

<h4>2- Avec slot par défaut</h4>
<div id="exempleInformation2">
    <utd-avis titre="L’aide financière qui peut être accordée tient compte de votre situation familiale.">
        <span>Est considérée comme votre conjoint (même si elle est absente temporairement) :</span>
        <ul>
            <li>la personne qui habite avec vous et avec qui vous êtes marié ou uni civilement;</li>
            <li>la personne qui habite avec vous et qui est l’autre parent d’au moins un de vos enfants;</li>
            <li>la personne majeure qui vit maritalement avec vous et qui, à un moment donné, a habité avec vous pendant une période d’au moins un an.</li>
        </ul>
    </utd-avis>    
</div>
<CodeSource idElementCodeSource="exempleInformation2">
</CodeSource>    

<h3>Avis avertissement</h3>
<h4>3- Avec attribut "contenu"</h4>
<div id="exempleAvertissement1">
    <utd-avis type="avertissement" titre="Migration des contenus" contenu="Les contenus seront transférés dans Québec.ca à partir du 16 février et le site sera fermé le 20 avril."></utd-avis>
</div>
<CodeSource idElementCodeSource="exempleAvertissement1">
</CodeSource>



<h4>4- Avec slot par défaut</h4>
<div id="exempleAvertissement2">
    <utd-avis type="avertissement" titre="Les informations suivantes pourraient vous sauver la vie.">
        <span>Certains faits importants à savoir à propos de Chuck Norris :</span>
        <ul>
            <li>Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte.</li>
            <li>Chuck Norris a déjà compté jusqu'à l'infini. Deux fois.</li>
            <li>C'est Chuck Norris qui a décidé que toute phrase se terminait par un poing.</li>
        </ul>
    </utd-avis>    
</div>
<CodeSource idElementCodeSource="exempleAvertissement2">
</CodeSource>

<h3>Avis succès</h3>
<h4>5- Avec attribut "contenu"</h4>
<div id="exempleSucces1">
    <utd-avis type="succes" titre="Votre demande d'inscription a été reçue." contenu="Votre code de confirmation sera envoyé par courriel."></utd-avis>
</div>
<CodeSource idElementCodeSource="exempleSucces1">
</CodeSource>


<h4>6- Avec slot par défaut</h4>
<div id="exempleSucces2">
    <utd-avis type="succes" titre="Chuck Norris a été élu être humain le plus extraordinaire de tous les temps.">
        <span>Certains faits importants à savoir à propos de Chuck Norris :</span>
        <ul>
            <li>Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte.</li>
            <li>Chuck Norris a déjà compté jusqu'à l'infini. Deux fois.</li>
            <li>C'est Chuck Norris qui a décidé que toute phrase se terminait par un poing.</li>
        </ul>
    </utd-avis>    
</div>
<CodeSource idElementCodeSource="exempleSucces2">
</CodeSource>


<h3>Avis erreur</h3>
<h4>7- Avec attribut "contenu"</h4>
<div id="exempleErreur1">
    <utd-avis type="erreur" titre="Une erreur est survenue pendant le traitement de votre demande d'inscription." contenu="Veuillez contacter le bureau régional et demander le formulaire A38."></utd-avis>
</div>
<CodeSource idElementCodeSource="exempleErreur1">
</CodeSource>

<h4>8- Avec slot par défaut</h4>
<div id="exempleErreur2">
    <utd-avis type="erreur" titre="Des erreurs sont présentes dans le formulaire.">
        <ul>
            <li>
                <a href="#">Le champ « Nom de famille » est obligatoire.</a>
            </li>
            <li>
                <a href="#">Le champ « Prénom » est obligatoire.</a>
            </li>
            <li>
                <a href="#">Le champ « Numéro de dossier » est obligatoire.</a>
            </li>
        </ul>
    </utd-avis>    
</div>
<CodeSource idElementCodeSource="exempleErreur2">
</CodeSource>

<h3>Avis complémentaire</h3>
<p>Le type d'avis <span class="utd-emphase-gris">complementaire</span> doit être précisé (sous-type). Valeurs possibles: <span class="utd-emphase-gris">astuce</span> et <span class="utd-emphase-gris">rappel</span>.
<h4>9- Avec attribut "contenu" </h4>
<div id="exempleComplementaire1">
    <utd-avis type="complementaire astuce" titre="Saviez-vous que..." contenu="Chuck Norris a déjà compté jusqu'à l'infini. Deux fois!"></utd-avis>
</div>
<CodeSource idElementCodeSource="exempleComplementaire1">
</CodeSource>

<h4>10- Avec slot par défaut</h4>
<div id="exempleComplementaire2">
    <utd-avis type="complementaire rappel" titre="Ne pas oublier">
        <ul>
            <li>
                compléter le formulaire A38;
            </li>
            <li>
                armez-vous de patience;
            </li>
            <li>
                apporter le formulaire complété à la capitainerie du port.
            </li>
        </ul>
    </utd-avis>    
</div>
<CodeSource idElementCodeSource="exempleComplementaire2">
</CodeSource>





