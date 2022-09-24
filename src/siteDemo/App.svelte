<script>
    import {Route} from 'tinro'; 
    import {active} from 'tinro';
    import Principe from './pages/Principe.svelte'; 
    import Utilisation from './pages/Utilisation.svelte'; 
    import Versions from './pages/Versions.svelte'; 
    import Accordeon from './pages/Accordeon.svelte'; 
    import Infobulle from './pages/Infobulle.svelte'; 
    import Avis from './pages/Avis.svelte'; 
    import Boutons from './pages/Boutons.svelte'; 
    import Champs from './pages/Champs.svelte'; 
    import HautPage from './pages/HautPage.svelte'; 
    import Message from './pages/Message.svelte'; 
    import Dialogue from './pages/Dialogue.svelte'; 
    import MenuSecondaire from './components/MenuSecondaire.svelte'; 
    import Notifications from './pages/Notifications.svelte'; 
    import TraitementEnCours from './pages/TraitementEnCours.svelte'; 
    import {router} from 'tinro';
//    a on:click|preventDefault={() => window.location.href = '/composants/avis'}

</script>

<div class="conteneur-principal">
    <header role="banner">
        <div class="conteneur-passer-contenu">
            <div class="passer-contenu">
                <a href="#main" class="passer-contenu">Passer au contenu</a>
            </div>   
        </div>

        <!--Javascript désactivé-->
        <noscript>
        <div id="javascriptDesactive" class="fureteur-desuet">
            <div class="utd-container" role="alert" aria-atomic="true">
                <div class="icone">
                    <img alt="Icône avertissement" src="/images/utd-sprite.svg?v=1.6.1#ico-avertissement" width="28" height="26" aria-hidden="true">
                </div>
                <div class="texte">
                    Activez JavaScript dans votre navigateur pour que Système de design MTESS fonctionne correctement.
                </div>
            </div>
        </div>
        </noscript>
        <img id="pivLogoGouvernementPrint" alt="Logo du gouvernement du Québec." src="/images/quebecPrint.gif" width="199" height="60">
        <div class="piv piv-entete">
            <div class="utd-container">
                <div class="conteneur-sections">
                    <div class="section-gauche signature-gouvernement" lang="fr">
                        <a href="/">
                            <img alt="Signature du gouvernement du Québec. Accédez à Système de design MTESS." src="/images/utd-sprite.svg?v=1.6.1#QUEBEC_blanc">
                        </a>
                    </div>
                    <div class="section-centre">
                        <a href="/" class="titre-site">
                            <span>Système de design MTESS</span>
                            <span class="description"></span>
                        </a>
                    </div>

                    
                    <div class="section-droite">
                        <ul class="utd-d-none">
                            <li><a href="/Commun/NousJoindre">Nous joindre</a></li>
                        </ul>
                    </div>
                </div>
                <div class="titre-site mobile">
                    <span>Système de design MTESS</span>
                </div>
            </div>
        </div>

        
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
            <div class="container zone-menu-principal d-flex">
            </div>
        </div>

    </header>

    <div class="utd-container">
        <div id="conteneur2Colonnes" class="utd contenu-principal-droite">
            <div id="colonneGauche" class="utd">                
                <MenuSecondaire titre="{$router.path.indexOf('/composants') >= 0 ? 'Liste des composants' : 'Liste des éléments de base'}">
                    <div slot="contenu">
                        <ul>
                            {#if $router.path.indexOf('/composants') >= 0}                                
                                <utd-menu-secondaire-element label="Affichage de contenu" href="/base"></utd-menu-secondaire-element>
                                <li><a href="/composants/versions" tinro-ignore use:active exact>Historique des versions</a></li>
                                <li>
                                    <a href="#groupe0" role="button" aria-expanded="true" aria-controls="groupe0" class=""><span class="groupe">Affichage de contenu</span><span aria-hidden="true" class="utd-icone-svg md chevron-bleu-piv"></span></a>
                                    <ul>
                                        <li><a href="/composants/affichagecontenu/accordeon" tinro-ignore use:active >Accordeon</a></li>
                                        <li><a href="/composants/affichagecontenu/avis" tinro-ignore use:active >Avis</a></li>   
                                    </ul>
                                </li>
                                <li><a href="/composants/actions/boutons" tinro-ignore use:active >Boutons</a></li>
                                <li><a href="/composants/actions/champs" tinro-ignore use:active >Champs</a></li>
                                <li><a href="/composants/actions/dialogue" tinro-ignore use:active >Dialogue modal</a></li>
                                <li><a href="/composants/navigation/hautpage" tinro-ignore use:active >Haut de page</a></li>
                                <li><a href="/composants/affichagecontenu/infobulle" tinro-ignore use:active >Infobulle</a></li>
                                <li><a href="/composants/actions/message" tinro-ignore use:active >Message</a></li>
                                <li><a href="/composants/actions/notifications" tinro-ignore use:active >Notifications</a></li>
                                <li><a href="/composants/actions/traitementencours" tinro-ignore use:active >Traitement en cours</a></li>
                            {:else}                                    
                                <li><a href="/base/principe" tinro-ignore use:active exact>Principe</a></li>
                                <li><a href="/base/utilisation" tinro-ignore use:active exact>Utilisation</a></li>
                            {/if}
                        </ul>
                    </div>          
                </MenuSecondaire> 
            </div>
        
            <div id="colonneDroite" class="utd">
                <main id="main">
                    <Route path="/" redirect="/base/principe" ></Route>
                    <Route path="/base" redirect="/base/principe" ></Route>
                    <Route path="/base/principe" ><Principe /></Route>
                    <Route path="/base/utilisation" ><Utilisation /></Route>
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
                        </Route>
                        <Route path="/formulaire/*">                    
                            <Route path="/champs" ><Champs /></Route>
                        </Route>
                        <Route path="/navigation/*">                    
                            <Route path="/hautpage" ><HautPage /></Route>
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
            <img class="logo-mo" alt="Ministère du Travail, de l'Emploi et de la Solidarité sociale. Ce lien sera ouvert dans un nouvel onglet." src="/images/logo_piv_bas_page.gif">
        </a>

        <span class="copyright">
            <a href="http://www.droitauteur.gouv.qc.ca/copyright.php" target="_blank" rel="noopener">
                © Gouvernement du Québec,&nbsp;2021
                <span class="utd-sr-only">. Ce lien sera ouvert dans un nouvel onglet.</span>
            </a>
        </span>
    </div>
</footer>