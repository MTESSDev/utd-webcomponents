<script>
    import {Route} from 'tinro'; 
    import {active} from 'tinro';
    import Principe from './pages/Principe.svelte'; 
    import Utilisation from './pages/Utilisation.svelte'; 
    import Accordeon from './pages/Accordeon.svelte'; 
    import AideContextuelle from './pages/AideContextuelle.svelte'; 
    import Avis from './pages/Avis.svelte'; 
    import Boutons from './pages/Boutons.svelte'; 
    import Modal from './pages/Modal.svelte'; 
    import MenuSecondaire from './components/MenuSecondaire.svelte'; 
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
                    <img alt="Icône avertissement" src="/images/utd-sprite-v1.2.0.svg#ico-avertissement" width="28" height="26" aria-hidden="true">
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
                            <img alt="Signature du gouvernement du Québec. Accédez à Système de design MTESS." src="/images/utd-sprite-v1.2.0.svg#QUEBEC_blanc">
                        </a>
                    </div>
                    <div class="section-centre">
                        <a href="/" class="titre-site">
                            <span>Système de design MTESS</span>
                            <span class="description"></span>
                        </a>
                    </div>

                    
                    <div class="section-droite">
                        <ul>
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
                <h2 id="titreMenuPrincipal" class="sr-only">Menu principal de navigation</h2>
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
            <div class="container zone-menu-principal d-flex d-md-none">
            </div>
        </div>

    </header>

    <div class="utd-container">
        <div id="conteneur2Colonnes" class="contenu-principal-droite">
            <div id="colonneGauche">                
                <MenuSecondaire titre="{$router.path.indexOf('/composants') >= 0 ? 'Liste des composants' : 'Liste des éléments de base'}">
                    <div slot="contenu">
                        <ul>
                            {#if $router.path.indexOf('/composants') >= 0}                                
                                <li><a href="/composants/accordeon" tinro-ignore use:active exact>Accordeon</a></li>
                                <li><a href="/composants/avis" tinro-ignore use:active exact>Avis</a></li>
                                <li><a href="/composants/boutons" tinro-ignore use:active exact>Boutons</a></li>
                                <li><a href="/composants/aidecontextuelle" tinro-ignore use:active exact>Infobulle</a></li>
                                <li><a href="/composants/modal" tinro-ignore use:active exact>Modal</a></li>
                            {:else}                                    
                                <li><a href="/base/principe" tinro-ignore use:active exact>Principe</a></li>
                                <li><a href="/base/utilisation" tinro-ignore use:active exact>Utilisation</a></li>
                            {/if}
                        </ul>
                    </div>          
                </MenuSecondaire> 
            </div>
        
            <div id="colonneDroite">
                <main id="main">
                    <Route path="/" redirect="/base/principe" ></Route>
                    <Route path="/base" ><Principe /></Route>
                    <Route path="/base/principe" ><Principe /></Route>
                    <Route path="/base/utilisation" ><Utilisation /></Route>
                    <Route path="/composants" ><Accordeon /></Route>
                    <Route path="/composants/accordeon" ><Accordeon /></Route>
                    <Route path="/composants/avis" ><Avis /></Route>
                    <Route path="/composants/boutons" ><Boutons /></Route>
                    <Route path="/composants/aidecontextuelle" ><AideContextuelle /></Route>
                    <Route path="/composants/modal" ><Modal /></Route>
                </main>        
            </div>
        </div>
        
    </div>
</div>
