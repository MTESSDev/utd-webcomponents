<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Avis</h1>
<h2>Description</h2>
<p>Les <strong>avis</strong> sont des messages contextuels qui peuvent s’afficher sur une page ou sur plusieurs pages d’un même sujet.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/affichage-de-contenu/avis" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Exemples</h2>

<h3>Avis information</h3>
<h4>1- Avec attribut "contenu"</h4>
<utd-avis titre="Nouvelle règlementation" contenu="Les nouveaux règlements de pêche seront en vigeur à partir du 12 mai." id="exempleInformation1"></utd-avis>
<CodeSource idElementCodeSource="exempleInformation1">
</CodeSource>   

<h4>2- Avec slot "contenu"</h4>
<utd-avis titre="L’aide financière qui peut être accordée tient compte de votre situation familiale." id="exempleInformation2">
    <div slot="contenu">
        <span>Est considérée comme votre conjoint (même si elle est absente temporairement) :</span>
        <ul>
            <li>la personne qui habite avec vous et avec qui vous êtes marié ou uni civilement;</li>
            <li>la personne qui habite avec vous et qui est l’autre parent d’au moins un de vos enfants;</li>
            <li>la personne majeure qui vit maritalement avec vous et qui, à un moment donné, a habité avec vous pendant une période d’au moins un an.</li>
        </ul>
    </div>
</utd-avis>
<CodeSource idElementCodeSource="exempleInformation2">
</CodeSource>    

<h3>Avis avertissement</h3>
<h4>3- Avec attribut "contenu"</h4>
<utd-avis type="avertissement" titre="Migration des contenus" contenu="Les contenus seront transférés dans Québec.ca à partir du 16 février et le site sera fermé le 20 avril." id="exempleAvertissement1"></utd-avis>
<CodeSource idElementCodeSource="exempleAvertissement1">
</CodeSource>



<h4>4- Avec slot "contenu"</h4>
<utd-avis type="avertissement" titre="Les informations suivantes pourraient vous sauver la vie." id="exempleAvertissement2">
    <div slot="contenu">
        <span>Certains faits importants à savoir à propos de Chuck Norris :</span>
        <ul>
            <li>Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte;</li>
            <li>Chuck Norris a déjà compté jusqu'à l'infini. Deux fois;</li>
            <li>C'est Chuck Norris qui a décidé que toute phrase se terminait par un poing;</li>
        </ul>
    </div>
</utd-avis>
<CodeSource idElementCodeSource="exempleAvertissement2">
</CodeSource>

<h3>Avis succès</h3>
<h4>5- Avec attribut "contenu"</h4>
<utd-avis type="succes" titre="Votre demande d'inscription a été reçue." contenu="Votre code de confirmation sera envoyé par courriel." id="exempleSucces1"></utd-avis>
<CodeSource idElementCodeSource="exempleSucces1">
</CodeSource>


<h4>6- Avec slot "contenu"</h4>
<utd-avis type="succes" titre="Chuck Norris a été élu être humain le plus extraordinaire de tous les temps." id="exempleSucces2">
    <div slot="contenu">
        <span>Certains faits importants à savoir à propos de Chuck Norris :</span>
        <ul>
            <li>Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte;</li>
            <li>Chuck Norris a déjà compté jusqu'à l'infini. Deux fois;</li>
            <li>C'est Chuck Norris qui a décidé que toute phrase se terminait par un poing;</li>
        </ul>
    </div>
</utd-avis>
<CodeSource idElementCodeSource="exempleSucces2">
</CodeSource>


<h3>Avis erreur</h3>
<h4>7- Avec attribut "contenu"</h4>
<utd-avis type="erreur" titre="Votre demande d'inscription a été reçue." contenu="Votre code de confirmation sera envoyé par courriel." id="exempleErreur1"></utd-avis>
<CodeSource idElementCodeSource="exempleErreur1">
</CodeSource>

<h4>8- Avec slot "contenu"</h4>
<utd-avis type="erreur" titre="Des erreurs sont présentes dans le formulaire." id="exempleErreur2">
    <div slot="contenu">
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
    </div>
</utd-avis>
<CodeSource idElementCodeSource="exempleErreur2">
</CodeSource>





