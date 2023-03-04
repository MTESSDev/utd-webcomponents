<script>
    import {Route} from 'tinro'; 
    import {active} from 'tinro';
    import { onMount } from "svelte";
    import Principe from './pages/Principe.svelte'; 
    import Utilisation from './pages/Utilisation.svelte'; 
    import Versions from './pages/Versions.svelte'; 
    import Accordeon from './pages/Accordeon.svelte'; 
    import Infobulle from './pages/Infobulle.svelte'; 
    import Section from './pages/Section.svelte'; 
    import Avis from './pages/Avis.svelte'; 
    import Boutons from './pages/Boutons.svelte'; 
    import ChampsTexte from './pages/ChampsTexte.svelte'; 
    import CaseCocher from './pages/CaseCocher.svelte'; 
    import BoutonRadio from './pages/BoutonRadio.svelte'; 
    import HautPage from './pages/HautPage.svelte'; 
    import Message from './pages/Message.svelte'; 
    import Dialogue from './pages/Dialogue.svelte'; 
    import Notifications from './pages/Notifications.svelte'; 
    import TraitementEnCours from './pages/TraitementEnCours.svelte'; 
    import {router} from 'tinro';
    import ChampsAutomatique from './pages/ChampsAutomatique.svelte';
    import ChampObligatoire from './pages/ChampObligatoire.svelte';
    import ChampErreur from './pages/ChampErreur.svelte';
    import MenuVertical from './pages/MenuVertical.svelte';
    import MenuAncres from './pages/MenuAncres.svelte';
    import PivEntete from './pages/PivEntete.svelte';
  import PivPiedPage from './pages/PivPiedPage.svelte';
  import PiedPageSite from './pages/PiedPageSite.svelte';
  import GabaritHtml from './pages/GabaritHTML.svelte';
  import NousJoindre from './pages/NousJoindre.svelte';
  import ListeDeroulante from './pages/ListeDeroulante.svelte';

    onMount(() => {  
        document.getElementById('pivEntete').addEventListener("clickLien", () => {       
            accederContenuPrincipal()
        })
    })


    //Patch afin de faire fonctionner le bouton "Passer au contenu", semble y avoir un problème avec le router tinro
    function accederContenuPrincipal(){
    const urlActuelle = location.href.replace(location.hash,"")
    const urlContenuPrincipal = urlActuelle + '#main' 

    if(location.href === urlContenuPrincipal){
        location.href = urlActuelle + '#main2'
    } 
    location.href = urlContenuPrincipal
    }

</script>

<div class="utd-conteneur-principal">    
    <header>
        <noscript>
            <div id="javascriptDesactive" class="fureteur-desuet">
                <div class="utd-container" role="alert" aria-atomic="true">
                    <div class="icone">
                        <img alt="Icône avertissement" src="../images/utd-sprite.svg_versionUtd_#ico-avertissement" width="28" height="26" aria-hidden="true">
                    </div>
                    <div class="texte">
                        Activez JavaScript dans votre navigateur pour que Système de design MESS fonctionne correctement.
                    </div>
                </div>
            </div>
        </noscript>
        <img id="pivLogoGouvernementPrint" alt="Logo du gouvernement du Québec." src="/images/quebecPrint.gif" width="199" height="60">
        <utd-piv-entete id="pivEntete" titre-site1="Composants du système de design – MESS" titre-site2="{$router.path.indexOf('/composants/entetepiedpage/piventete') >= 0 ? 'Description supplémentaire du site' : null}" alt-logo="Signature du gouvernement du Québec. Accédez à Système de design MESS.">

            <div slot="liens">
                <ul>
                    {#if $router.path.indexOf('/composants/entetepiedpage/piventete') >= 0}
                        <li><a href="#fakeEnglish">English</a></li>
                    {/if}
                    <li><a href="/base/nousjoindre">Nous joindre</a></li>
                </ul>
            </div>
            

            <!--            <div slot="boutonRecherche">
                <button type="button">RD</button>
            </div>
            <div slot="boutonRechercheMobile">
                <button type="button">RM</button>
            </div>
            <div slot="zoneRecherche">
                <div><input type="text"/></div>
            </div>            -->
        </utd-piv-entete>

        <!--Javascript désactivé-->


        <div class="conteneur-menu-identification">
            <div class="utd-container zone-menu-identification">
                <h2 id="titreMenuPrincipal" class="utd-sr-only">Menu principal de navigation</h2>
                <nav class="menu-principal" aria-labelledby="titreMenuPrincipal">
                    <ul>
                        <li>
                            <a href="/base" use:active>Base</a>
                        </li>
                        <li>
                            <a href="/composants" use:active>Composants</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="container zone-menu-principal">
            </div>
        </div>

    </header>

    <div class="utd-container">
        <div id="conteneur2Colonnes" class="utd contenu-principal-droite">
            <div id="colonneGauche" class="utd">                
                <utd-menu-vertical id="menuVertical" titre-visible="false" titre="{$router.path.indexOf('/composants') >= 0 ? 'Composants' : 'Éléments de base'}" sr-titre="{$router.path.indexOf('/composants') >= 0 ? 'Menu composants' : 'Menu éléments de base'}">
                    {#if $router.path.indexOf('/composants') >= 0}                                
                        <utd-menu-vertical-item href="/composants/versions" libelle="Historique des versions"></utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Action">                                
                            <utd-menu-vertical-item libelle="Boutons" href="/composants/actions/boutons"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Dialogue modal" href="/composants/actions/dialogue"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Message" href="/composants/actions/message"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Notifications" href="/composants/actions/notifications"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Traitement en cours" href="/composants/actions/traitementencours"></utd-menu-vertical-item>
                        </utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Affichage de contenu">                                
                            <utd-menu-vertical-item libelle="Accordéon" href="/composants/affichagecontenu/accordeon"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Avis" href="/composants/affichagecontenu/avis"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Infobulle" href="/composants/affichagecontenu/infobulle"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Section" href="/composants/affichagecontenu/section"></utd-menu-vertical-item>
                        </utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Formulaire">    
                            <utd-menu-vertical-item libelle="Bouton radio" href="/composants/formulaire/boutonradio"></utd-menu-vertical-item>                            
                            <utd-menu-vertical-item libelle="Case à cocher" href="/composants/formulaire/casecocher"></utd-menu-vertical-item>                            
                            <utd-menu-vertical-item libelle="Champs obligatoires" href="/composants/formulaire/champobligatoire"></utd-menu-vertical-item> 
                            <utd-menu-vertical-item libelle="Champs texte et autres" href="/composants/formulaire/champstexte"></utd-menu-vertical-item> 
                            <utd-menu-vertical-item libelle="Champs (Gestion automatique)" href="/composants/formulaire/champsautomatique"></utd-menu-vertical-item>                           
                            <utd-menu-vertical-item libelle="Erreurs" href="/composants/formulaire/champerreur"></utd-menu-vertical-item>                                 
                            <utd-menu-vertical-item libelle="Liste déroulante" href="/composants/formulaire/listederoulante"></utd-menu-vertical-item>                                 
                        </utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Navigation">                                
                            <utd-menu-vertical-item libelle="Haut de page" href="/composants/navigation/hautpage"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Menu d'ancres" href="/composants/navigation/menuancres"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Menu vertical" href="/composants/navigation/menuvertical"></utd-menu-vertical-item>
                        </utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Entête et pied de page">                                
                            <utd-menu-vertical-item libelle="Entête PIV" href="/composants/entetepiedpage/piventete"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Pied de page PIV" href="/composants/entetepiedpage/pivpiedpage"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Pied de page du site" href="/composants/entetepiedpage/piedpagesite"></utd-menu-vertical-item>
                        </utd-menu-vertical-item>

                    {:else}                                    
                        <utd-menu-vertical-item href="/base/principe" libelle="Principe"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/base/utilisation" libelle="Utilisation"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/gabarit1colonne" libelle="Gabarit 1 colonne"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/gabarit1colonneCdn" libelle="Gabarit 1 colonne (cdn)"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/gabarit2colonnes" libelle="Gabarit 2 colonnes"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/gabarit2colonnesCdn" libelle="Gabarit 2 colonnes (cdn)"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/base/nousjoindre" libelle="Nous joindre"></utd-menu-vertical-item>
                    {/if}
                </utd-menu-vertical> 
            </div>
        
            <div id="colonneDroite" class="utd">
                <main id="main">
                    <Route path="/" redirect="/base/principe" ></Route>
                    <Route path="/base" redirect="/base/principe" ></Route>
                    <Route path="/base/principe" ><Principe /></Route>
                    <Route path="/base/utilisation" ><Utilisation /></Route>
                    <Route path="/base/gabarithtml" ><GabaritHtml /></Route>
                    <Route path="/base/nousjoindre" ><NousJoindre /></Route>
                    <Route path="/composants" redirect="/composants/versions"></Route>
                    <Route path="/composants/*">
                        <Route path="/versions" ><Versions /></Route>
                        <Route path="/actions/*">
                            <Route path="/boutons" ><Boutons /></Route>
                            <Route path="/dialogue" ><Dialogue /></Route>
                            <Route path="/message" ><Message /></Route>                            
                            <Route path="/notifications" ><Notifications /></Route>
                            <Route path="/traitementencours" ><TraitementEnCours /></Route>
                        </Route>
                        <Route path="/affichagecontenu/*">
                            <Route path="/accordeon" ><Accordeon /></Route>
                            <Route path="/avis" ><Avis /></Route>
                            <Route path="/infobulle" ><Infobulle /></Route>    
                            <Route path="/section" ><Section /></Route>    
                        </Route>
                        <Route path="/formulaire/*">                    
                            <Route path="/boutonradio" ><BoutonRadio /></Route>
                            <Route path="/casecocher" ><CaseCocher /></Route>
                            <Route path="/champobligatoire" ><ChampObligatoire /></Route>
                            <Route path="/champstexte" ><ChampsTexte /></Route>
                            <Route path="/champsautomatique" ><ChampsAutomatique /></Route>
                            <Route path="/champerreur" ><ChampErreur /></Route>
                            <Route path="/listederoulante" ><ListeDeroulante /></Route>
                        </Route>
                        <Route path="/navigation/*">                    
                            <Route path="/hautpage" ><HautPage /></Route>
                            <Route path="/menuancres" ><MenuAncres /></Route>
                            <Route path="/menuvertical" ><MenuVertical /></Route>
                        </Route>                            
                        <Route path="/entetepiedpage/*">                    
                            <Route path="/piventete" ><PivEntete /></Route>
                            <Route path="/pivpiedpage" ><PivPiedPage /></Route>
                            <Route path="/piedpagesite" ><PiedPageSite /></Route>
                        </Route>                            
                    </Route>
                </main>        
            </div>
        </div>        
    </div>
</div>
<utd-hautpage id="hautPage"></utd-hautpage>
<footer class="utd">
    <!--
    <nav aria-labelledby="titreLiensNousJoindre">
        <h2 id="titreLiensNousJoindre">Nous joindre</h2>
        <ul>
            <li><a target="_blank" rel="noreferrer noopener" href="https://www.localisateur.servicesquebec.gouv.qc.ca/">Bureaux de services</a></li>
            <li><a target="_blank" rel="noreferrer noopener" href="https://www.localisateur.servicesquebec.gouv.qc.ca/">Bureaux de services</a></li>
        </ul>
    </nav>-->
    {#if $router.path.indexOf('/composants/entetepiedpage/piedpagesite') >= 0}                                    
        <utd-pied-page-site id="piedPageSite">
            <div slot="contenu">
                <span>Ici votre contenu de pied de page de site (C'est votre css qui devra le styler).</span>
            </div>
        </utd-pied-page-site>
    {/if}

    <utd-piv-pied-page id="pivPiedPage">
        {#if $router.path.indexOf('/composants/entetepiedpage/pivpiedpage') >= 0 || $router.path.indexOf('/composants/entetepiedpage/piedpagesite') >= 0}                                        
            <div slot="liens">
                <ul>
                    <li><a href="#a">Accessibilité</a></li>
                    <li><a href="#a">Politique et conditions d'utilisation</a></li>
                    <li><a href="#a">S'informer sur clicSÉQUR - Citoyens</a></li>
                    <li><a href="#a">FAQ</a></li>                    
                </ul>
            </div>
        {/if}                    
    </utd-piv-pied-page>    
</footer>