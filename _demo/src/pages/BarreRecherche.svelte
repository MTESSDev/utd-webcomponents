<script>
    //Référence accessibilité : https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import { Utils } from '../../../src/components/js/utils';

    let tableauParametres = [];
    let tableauRetourEvenementChangementEtat = [];
    let mounted = false;

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauRetourEvenementChangementEtat = obtenirTableauRetourEvenementChangementEtat()
        chargerContenuRechercheExemple1c()
        chargerContenuRechercheExemple2c()
        chargerContenuRechercheExemple3c()

        Utils.definirEvenementClickAncre()

        mounted = true
    })

    function chargerContenuRechercheExemple1c() {
        document.querySelector("#exemple1c utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche (Appel à un api ou autre)
            const monContenuRecherche = [
                {"r": "Groupe de sections",
                 "h": "#groupesection",
                 "t": "Un formulaire est divise en groupes de sections chaque groupe de sections peut avoir...",    
                 "mc": "découpage"
                },
                {"r": "Section",
                 "h": "#section",
                 "t": "Un groupe de sections est divisé en sections le menu de gauche liste..."   
                },
            ]

            //Appel à la méthode permettant de définir le contenu de recherche (important d'utiliser le bon nom de méthode et de propriété dans l'objet)
            e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
        })
    }

    function chargerContenuRechercheExemple2c() {
        document.querySelector("#exemple2c utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche (Appel à un api ou autre)
            const monContenuRecherche = [
                {"c": "Navigation",
                 "r": "Groupe de sections",
                 "h": "#groupesection",
                 "t": "Un formulaire est divise en groupes de sections chaque groupe de sections peut avoir...",    
                 "mc": "découpage"
                },
                {"c": "Navigation",
                 "r": "Section",
                 "h": "#section",
                 "t": "Un groupe de sections est divisé en sections le menu de gauche liste..."   
                },
            ]

            //Appel à la méthode permettant de définir le contenu de recherche (important d'utiliser le bon nom de méthode et de propriété dans l'objet)
            e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
        })
    }

    function chargerContenuRechercheExemple3c() {
        document.querySelector("#exemple3c utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche (Appel à un api ou autre)
            const monContenuRecherche = [
                {
                    "c": "Navigation",
                    "sc": "Section",
                    "h": "#section",
                    "r": "Texte résultat Section",
                    "t": "Un groupe de sections est divisé en sections le menu de gauche liste automatiquement les sections lorsqu'un groupe de sections est ouvert chaque section est automatiquement numérotée le numéro de la section courante est surligné après avoir été visitée si une section est complétée et ne contient pas d'erreur de validation, le numéro est remplacé par un crochet si une section contient une erreur de validation, le numéro est remplacé par un x rouge"
                },
                {
                    "c": "Navigation",
                    "sc": "Section",
                    "h": "#section2",
                    "r": "Texte résultat Section 2",
                    "t": "Un groupe de sections est divisé en sections le menu de gauche liste automatiquement les sections lorsqu'un groupe de sections est ouvert chaque section est automatiquement numérotée le numéro de la section courante est surligné après avoir été visitée si une section est complétée et ne contient pas d'erreur de validation, le numéro est remplacé par un crochet si une section contient une erreur de validation, le numéro est remplacé par un x rouge"
                },
                {
                    "c": "Avancé",
                    "sc": "Validations personnalisées",
                    "r": "Texte résultat Validations personnalisées",
                    "h": "#validperso",
                    "t": "Description Lorsque les validateurs de bases ne répondent pas au besoin, il est possible d'ajouter des validateurs personnalisés (\"custom\"). Il s'agit d'une fonctionnalité avancée qui nécessite des connaissances en javascript.      Détails        Une validation personnalisée est constituée principalement de 2 éléments, soit la validation et le message d'erreur qui lui est associé.        L'image et le tableau ci-après décrivent en détails les éléments qui constituent une validation personnalisée.",    
                    "mc": "validation-rules, validation-message, scripts"
                },
                {
                    "c": "Personnalisation des formulaires",
                    "sc": "Page de révision/soumission",
                    "r": "Texte résultat Page de révision/soumission",
                    "h": "#domaine",
                    "t": "1- personnalisation du texte affiche avant les boutons \"valider\" et \"soumettre\" la personnalisation de ces textes peut etre effectuee dans le fichier de configuration d'un formulaire, plus precisement dans la section \"revision\". Il est important de ne rien modifier d'autre que les elements \"text\" des deux components de type \"dynamic\" de cette section. Dans l'image qui suit, les blocs en jaune sont des exemples de cette personnalisation. 2- validation automatique il est possible d'executer immediatement la validation des que la page revision est accedee. Le bouton \"valider\" et le texte de la page ne sont alors pas affiches et la validation s'effectue comme si l'utilisateur avait clique le bouton \"valider\". Utile lorsqu'aucune consigne particuliere ne doit etre affichee avant la validation. 3- personnalisation du texte du bouton \"soumettre\" la personnalisation de ce texte peut etre effectuee dans le fichier de configuration d'un formulaire, plus precisement dans la section \"soumission\". Voici un exemple dans un contexte de formulaire d'aiguillage :",    
                    "mc": "scripts"
                }    
            ]

            //Appel à la méthode permettant de définir le contenu de recherche (important d'utiliser le bon nom de méthode et de propriété dans l'objet)
            e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
        })
    }

    function chargerContenuRechercheExemple3d() {
        document.querySelector("#exemple3d utd-barre-recherche").addEventListener("initialiser", e => {

            //Ici votre code pour obtenir le contenu de recherche
            fetch('/testsLocaux/recherche3Niveaux.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status)
                    }
                    response.json().then((monContenuRecherche) => {
                        //Appel à la méthode permettant de définir le contenu de recherche
                        e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
                    })
            })                    
        })
    }

    function obtenirTableauParametres() {
        return [
            {nom: "placeholder", type: "String (Optionnel)", description: `Texte (placeholder) à afficher dans le contrôle tant qu'aucune saisie n'est effectuée. Défaut "Rechercher..." et "Search...".`},        
            {nom: "url-contenu-recherche", type: "String (Optionnel)", description: `Si spécifié, url à laquelle un appel (fetch) sera effectué afin d'obtenir le contenu de recherche au <a class="ancre" href="#formatAttendu">format attendu en JSON</a>.`},
            {nom: "nb-max-resultats", type: "Integer (Optionnel)", description: `Nombre de résultats de recherche maximal à afficher. Défaut : 10.`}
        ];
    }


    function obtenirTableauRetourEvenementChangementEtat() {
        return [
            {nom: "definirContenuRecherche", type: "Fonction", description: `Fonction (callback) ayant en paramètre un objet qui doit posséder une propriété "contenu", laquelle doit contenir le contenu de recherche qui respecte le <a class="ancre" href="#formatAttendu">format requis</a>.`},    
        ];
    }
</script>

<style type="text/css">
</style>

<div class="documentation">
    <h1>Barre de recherche</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>La composante <strong>barre de recherche</strong> permet à l’utilisateur de faire des recherches dans un site Internet ou une application à partir de mots clés.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <a href="https://design.quebec.ca/composantes/action/barre-recherche" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

    <h3>Particularités vs. le système de design Québec.ca</h3>
    <p>La barre de recherche ne mène pas à une page de résultats de recherche mais affiche les résultats au fur et à mesure de la saisie dans le champ ("search as you type").</p>
    <p>Les résultats sont affichés sous le champ et le click sur un résultat provoque la navigation vers ce dernier.</p>

    <h2>Attributs disponibles</h2>
    <TableauParams parametres="{tableauParametres}">
    </TableauParams>

    <h2>Événements disponibles</h2>
    <h3>initialiser</h3>
    <p>Est exécuté uniquement si le paramètre <span class="utd-emphase-gris">url-contenu-recherche</span> n'est pas spécifié.</p>
    <p>Son exécution se produit lorsque le contrôle de recherche est initialisé (lors d'une première tentative de recherche).</p>
    <p> Voir exemple <a href="#1c" class="ancre">1c- Un niveau (callback)</a> ou n'importe quel exemple (callback).</p>
    <h4>Retour</h4>
    <TableauParams parametres="{tableauRetourEvenementChangementEtat}">
    </TableauParams>

    <h2 id="formatAttendu">Format (JSON) du contenu de recherche attendu</h2>
    <p>Le contenu de recherche fourni doit être un array d'objets ayant la structure suivante :</p>
    <table class="utd-table bordures-lignes rayee mb-32">
        <thead>
            <tr>
                <th style="width: 100px;">Propriété</th>
                <th><span>Obligatoire</span></th>
                <th>Description</th> 
            </tr>
        </thead> 
        <tbody>
            <tr>
                <th><span>c</span></th>
                <td>Affichage à 2 et 3 niveaux.</td>
                <td><strong>Catégorie</strong>. Correspond au 1er niveau de regroupement.</td>
            </tr>
            <tr>
                <th><span>sc</span></th>
                <td>Affichage à 3 niveaux.</td>
                <td><strong>Sous-catégorie</strong>. Correspond au 2ème niveau de regroupement.</td>
            </tr>
            <tr>
                <th><span>r</span></th>
                <td>Oui</td>
                <td><strong>Résultat</strong>. Texte du lien permettant d'accéder au résultat de recherche.</td>
            </tr>
            <tr>
                <th><span>h</span></th>
                <td>Oui</td>
                <td><strong>Url</strong> relative ou absolue du lien permettant d'accéder au résultat de recherche. (Valeur "href" du lien)</td>
            </tr>
            <tr>
                <th><span>t</span></th>
                <td>Oui</td>
                <td><strong>Texte</strong> à indexer. Correspond à tout le texte à indexer pour le résultat de recherche. Ex. le contenu d'une page, la description d'un service, etc.</td>
            </tr>

            <tr>
                <th><span>mc</span></th>
                <td>Non</td>
                <td><strong>Mots-clés</strong>. Termes supplémentaires à indexer. Permet d'indexer des mots ne figurant pas dans le texte à indexer. Ex. des synonymes, accronymes, etc.</td>
            </tr>
        </tbody>
    </table>
    <p>Consulter le code source (js) des exemples <a class="ancre" href="#1c">1c (1 niveau)</a>, <a class="ancre" href="#2c">2c (2 niveaux)</a> et <a href="#3c" class="ancre">3c (3 niveaux)</a> afin de voir des cas d'utilisation. Regarder plus précisément le contenu de la variable <span class="utd-emphase-gris">monContenuRecherche</span>.</p>
      
    <h2>Accessibilité</h2>
    Inspiré du <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none/" target="_blank">"combobox pattern" défini au W3C</a>, avec quelques légères différences pour adapter à notre besoin.
    
</div>
<h2>Exemples</h2>
<h3>1a- Un niveau (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple1a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1a" titre="Code source (Html)">
</CodeSource>   

<h3>1b- Un niveau (url de contenu et 3 résultats maximum)</h3>
<div class="mb-32 bs-test" id="exemple1b">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche.json" nb-max-resultats="3"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1b" titre="Code source (Html)">
</CodeSource>   

<h3 id="1c">1c- Un niveau (callback)</h3>
<div class="mb-32 bs-test" id="exemple1c">
    <utd-barre-recherche></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple1c" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple1c.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>2a- Deux niveaux (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple2a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche2Niveaux.json"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2a" titre="Code source (Html)">
</CodeSource>   

<h3>2b- Deux niveaux (url de contenu et 3 résultats maximum)</h3>
<div class="mb-32 bs-test" id="exemple2b">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche2Niveaux.json" nb-max-resultats="3"></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2b" titre="Code source (Html)">
</CodeSource>   

<h3 id="2c">2c- Deux niveaux (callback)</h3>
<div class="mb-32 bs-test" id="exemple2c">
    <utd-barre-recherche></utd-barre-recherche>
</div>
<CodeSource idElementCodeSource="exemple2c" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple2c.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h3>3a- Trois niveaux (url de contenu)</h3>
<div class="mb-32 bs-test" id="exemple3a">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche3Niveaux.json"></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3a" titre="Code source (Html)">
</CodeSource>   

<h3>3b- Trois niveaux (url de contenu et 3 résultats maximum)</h3>
<div class="mb-32 bs-test" id="exemple3b">
    <utd-barre-recherche url-contenu-recherche="/testsLocaux/recherche3Niveaux.json" nb-max-resultats="3"></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3b" titre="Code source (Html)">
</CodeSource>   

<h3 id="3c">3c- Trois niveaux (callback synchrone)</h3>
<div class="mb-32 bs-test" id="exemple3c">
    <utd-barre-recherche></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3c" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple3c.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   

<h3 id="3d">3d- Trois niveaux (callback asynchrone)</h3>
<div class="mb-32 bs-test" id="exemple3d">
    <utd-barre-recherche></utd-barre-recherche>
</div>

<CodeSource idElementCodeSource="exemple3d" titre="Code source (Html)">
</CodeSource>   

{#if mounted}
    <CodeSource codeSource="{chargerContenuRechercheExemple3d.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   
