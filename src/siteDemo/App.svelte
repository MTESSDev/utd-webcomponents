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

<div class="conteneur-principal">    
    <header>

        <utd-piv-entete id="pivEntete" titre-site1="Système de design MESS" titre-site2="Un petit test" url-langue-alternative2="#" url-nous-joindre2="#" alt-logo="Signature du gouvernement du Québec. Accédez à Système de design MESS.">
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
        <noscript>
        <div id="javascriptDesactive" class="fureteur-desuet">
            <div class="utd-container" role="alert" aria-atomic="true">
                <div class="icone">
                    <img alt="Icône avertissement" src="/images/utd-sprite.svg?v=1.7.1#ico-avertissement" width="28" height="26" aria-hidden="true">
                </div>
                <div class="texte">
                    Activez JavaScript dans votre navigateur pour que Système de design MESS fonctionne correctement.
                </div>
            </div>
        </div>
        </noscript>

        <img id="pivLogoGouvernementPrint" alt="Logo du gouvernement du Québec." src="/images/quebecPrint.gif" width="199" height="60">
        

        
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
                        </utd-menu-vertical-item>
                        <utd-menu-vertical-item libelle="Navigation">                                
                            <utd-menu-vertical-item libelle="Haut de page" href="/composants/navigation/hautpage"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Menu d'ancres" href="/composants/navigation/menuancres"></utd-menu-vertical-item>
                            <utd-menu-vertical-item libelle="Menu vertical" href="/composants/navigation/menuvertical"></utd-menu-vertical-item>
                        </utd-menu-vertical-item>
                    {:else}                                    
                        <utd-menu-vertical-item href="/base/principe" libelle="Principe"></utd-menu-vertical-item>
                        <utd-menu-vertical-item href="/base/utilisation" libelle="Utilisation"></utd-menu-vertical-item>
                    {/if}
                </utd-menu-vertical> 
            </div>
        
            <div id="colonneDroite" class="utd">
                <main id="main">
                    <Route path="/" redirect="/base/principe" ></Route>
                    <Route path="/base" redirect="/base/principe" ></Route>
                    <Route path="/base/principe" ><Principe /></Route>
                    <Route path="/base/utilisation" ><Utilisation /></Route>
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
                        </Route>
                        <Route path="/navigation/*">                    
                            <Route path="/hautpage" ><HautPage /></Route>
                            <Route path="/menuancres" ><MenuAncres /></Route>
                            <Route path="/menuvertical" ><MenuVertical /></Route>
                        </Route>                            
                    </Route>
                </main>        
            </div>
        </div>        
    </div>
</div>
<utd-hautpage id="hautPage"></utd-hautpage>
<footer class="piv-bas-page">
    <h2 id="titreMenuPiedPage" class="utd-sr-only">Menu pied de page</h2>
    <div class="utd-container conteneur-signature-mo">
        <a href="https://www.mtess.gouv.qc.ca/" target="_blank" rel="noopener">
            <img class="logo-mo" alt="Ministère de l'Emploi et de la Solidarité sociale. Ce lien sera ouvert dans un nouvel onglet." src="/images/logo_piv_bas_page.png" width="210" height="81">
        </a>

        <span class="copyright">
            <a href="http://www.droitauteur.gouv.qc.ca/copyright.php" target="_blank" rel="noopener">
                © Gouvernement du Québec,&nbsp;2021
                <span class="utd-sr-only">. Ce lien sera ouvert dans un nouvel onglet.</span>
            </a>
        </span>
    </div>
</footer>