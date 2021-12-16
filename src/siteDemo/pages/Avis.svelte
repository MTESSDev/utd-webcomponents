<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Avis</h1>

<h2>Avis information</h2>
<h3>Exemple d'utilisation avec attribut "contenu"</h3>
<utd-avis titre="Nouvelle règlementation" contenu="Les nouveaux règlements de pêche seront en vigeur à partir du 12 mai." id="exempleInformation1"></utd-avis>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleInformation1">
        </CodeSource>   
    </span>
</utd-accordeon>

<h3>Exemple d'utilisation avec slot "contenu"</h3>
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
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleInformation2">
        </CodeSource>    
    </span>
</utd-accordeon>

<h2>Avis avertissement</h2>
<h3>Exemple d'utilisation avec attribut "contenu"</h3>
<utd-avis type="avertissement" titre="Migration des contenus" contenu="Les contenus seront transférés dans Québec.ca à partir du 16 février et le site sera fermé le 20 avril." id="exempleAvertissement1"></utd-avis>

<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleAvertissement1">
        </CodeSource>
    </span>
</utd-accordeon>



<h3>Exemple d'utilisation avec slot "contenu"</h3>
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
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleAvertissement2">
        </CodeSource>
    </span>
</utd-accordeon>



<h2>Avis succès</h2>
<h3>Exemple d'utilisation avec attribut "contenu"</h3>
<utd-avis type="succes" titre="Votre demande d'inscription a été reçue." contenu="Votre code de confirmation sera envoyé par courriel." id="exempleSucces1"></utd-avis>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleSucces1">
        </CodeSource>
    </span>
</utd-accordeon>


<h3>Exemple d'utilisation avec slot "contenu"</h3>
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
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleSucces2">
        </CodeSource>
    </span>
</utd-accordeon>


<h2>Avis erreur</h2>
<h3>Exemple d'utilisation avec attribut "contenu"</h3>
<utd-avis type="erreur" titre="Votre demande d'inscription a été reçue." contenu="Votre code de confirmation sera envoyé par courriel." id="exempleErreur1"></utd-avis>
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleErreur1">
        </CodeSource>
    </span>
</utd-accordeon>

<h3>Exemple d'utilisation avec slot "contenu"</h3>
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
<utd-accordeon titre="Code source">
    <span slot="contenu">
        <CodeSource idElementCodeSource="exempleErreur2">
        </CodeSource>
    </span>
</utd-accordeon>





