<script>
</script>

<h1>Historique des versions</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<utd-accordeon reduit="false">
    <div slot="titre"><h2>1.12.0 (2023-06-13)</h2></div>       
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulante">Liste déroulante</a>, si une option était sélectionnée par défaut (via son attribut "selected") elle n'était pas considérée. C'était toujours le placeholder qui était affiché (Effectuer une sélection).</li>
    </ul>            

    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout du composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuhorizontal">Menu horizontal</a>.</li>
    </ul>    
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.11.0 (2023-05-26)</h2></div>
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Le focus dans un textarea provoquait un léger décalage vers le bas (le contrôle devenait légèrement plus haut, soit 2px de bordure).</li>
        <li>Ajustement de la font par défaut du texte à l'intérieur des contrôles. Était laissée à la discrétion du fureteur et devait être OpenSans-Regular.</li>
    </ul>            
        
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/avis">Avis</a>, ajout de l'avis de type "complémentaire".</li>
        <li>Ajout du composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/pointssuspension">Points de suspension</a>.</li>
    </ul>    
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.10.0 (2023-04-17)</h2></div>
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Taille par défaut des champs de taille "sm" et "md" en format téléphone.</li>
        <li>Taille par défaut des champs de type "email" et "url" en format téléphone.</li>
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/navigation/menuvertical">Menu vertical</a>, l'affichage initial sur connexions lentes provoquait parfois un effet visuel désagréable (flicking et contenu html non stylé) durant la phase d'affichage.</li>
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulante">Liste déroulante</a>, lorsque la liste est ouverte, son contenu s'affiche maintenant par dessus le contenu de la page au lieu de pousser le contenu de la page vers le bas.</li>
    </ul>            
        
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout d'essais automatisés pour chaque composant.</li>
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/piventete">Piv entête</a>, rendre plus conforme au système de design Québec.ca. Notamment la taille du titre de site et l'espacement entre les liens de langue alternative et nous joindre.</li>
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/section">Section</a>, visuel au focus beaucoup plus visible (accessibilité), ainsi que l'ajout d'un visuel sur hover.</li>        
    </ul>   
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.9.2 (2023-03-27)</h2></div>
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/champsautomatique">Champ (gestion automatique)</a>
            <ul>
                <li>Correction d'un problème d'affichage avec les champs gérés automatiquement avec le compostant "utd-champ-form".</li>
            </ul>     
        </li>
    </ul>            
        
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout du visuel pour les champs inactifs (disabled) et lecture seule (readonly).</li>
        <li>Ajustement visuel des champs avec focus (outline bleu un peu plus foncé) selon règles Québec.ca.</li>
    </ul>
    
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.9.1 (2023-03-20)</h2></div>
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/accordeon">Accordéon</a>
        <ul>
            <li>Correction d'une régression visuelle au chargement de la page (introduite à la version 1.9.0). Selon la position de l'accordéon dans la page, il était possible qu'on voit son contenu une fraction de seconde au chargement.</li>
        </ul>            
    </ul>
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.9.0 (2023-03-13)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Composants <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/accordeon">Accordéon</a> et <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/section">Section</a>
        <ul>
            <li>L'attribut "reduit" est maintenant réactif. On peut modifier sa valeur une fois le composant chargé afin de le développer ou réduire à l'aide de script.</li>
            <li>Ajout de l'événement "changementEtat" levé au changement d'état (développé/réduit). Il retourne un indicateur permettant de savoir l'état d'affichage actuel du composant.</li>
            <li>Ajout de l'attribut "conserver-etat-affichage" indiquant si l'état d'affichage (développé/réduit) de l'accordéon doit être conservé pendant la session (tant que le fureteur est ouvert).</li>
        </ul>            
    </ul>
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>L'utilisation avec CDN est maintenant pleinement fonctionnelle. Tous les fichiers peuvent être sur le CDN.</li>
    </ul>
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.8.1 (2023-03-07)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Forcer un fond blanc pour la zone de contenu des composants "Section" et "Accordeon".</li>
        <li>Amélioration de l'affichage initial de certains composants sur connexions lentes. Provoquait parfois un effet visuel désagréable (flicking et contenu html non stylé) durant la phase d'affichage. Dorénavant les composants susceptibles d'avoir ce problème (ex. Piv entête/pied de page, accordéon, section, etc.) ne sont pas visibles pendant leur chargement.</li>
    </ul>
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>Composant <a href="/composants/formulaire/listederoulante">Liste déroulante</a>
            <ul>
                <li>Pour les listes à choix multiple, alignement du texte à gauche dans les étiquettes (valeurs sélectionnées). Était centré si le texte était sur plus d'une ligne.</li>
            </ul>
        </li>
    </ul>
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.8.0 (2023-02-23)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout du composant <a href="/composants/formulaire/listederoulante">Liste déroulante</a>.</li>
        <li>Tailles adaptatives pour les headers (h1 à h6).</li>
        <li>Ajout des gabarits 1 et 2 colonnes avec utilisation du cdn.</li>
    </ul>
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.7.6 (2023-01-18)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Composant <a href="/composants/affichagecontenu/infobulle">Infobulle</a>
            <ul>
                <li>Ajustement du composant selon les nouvelles normes du système de design Quebec.ca (padding + largeur ascenceur).</li>
                <li>Ajout du paramètre "sr-prefixe-contenu". Ce texte permet d'améliorer l'accessibilité du composant. Il s'agit d'un texte hors écran qui reçoit le focus lorsque l'infobulle est affichée. Il permet de ne pas lire tout le contenu de l'infobulle lors de son ouverture. Il est positionné juste avant la zone de contenu de l'infobulle.</li>
            </ul>
        </li>

        <li>Restructuration du projet
            <ul>
                <li>Début du passage des css vers sass.</li>
                <li>Restructuration de certains répertoires de la solution.</li>    
            </ul>
        </li>
    </ul>
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.7.5 (2023-01-10)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Accessibilité du composant <a href="/composants/affichagecontenu/infobulle">Infobulle</a>. Le titre était lu 3 fois (au lieu de 2 le mieux que nous pouvons faire) et le bouton "Fermer" était aussi lu automatiquement (au lieu de le lire seulement lorsqu'il reçoit le focus).</li>
    </ul>
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.7.4 (2022-12-16)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Mise à jour du site de documentation.</li>
        <li>Ajustement des largeurs par défaut des champs de types (email, password, number, url et date).</li>
    </ul>    
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.7.3 (2022-12-15)</h2></div>
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li>Ajout d'un cache buster sur l'url du css importé dans les différents composants.</li>
    </ul>    
</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.7.2 (2022-12-08)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout du composant <a href="/composants/piv/piventete">Piv entête</a></li>
        <li>Ajout du composant <a href="/composants/piv/pivpiedpage">Piv pied page</a></li>
        <li>Ajout du composant <a href="/composants/navigation/piedpagesite">Pied de page de site</a></li>
        <li>Ajout de 2 gabarits contenant la structure HTML de base pour l'intégration des composants UTD. <a href="/base/principe">Voir la section "Base"</a></li>
        <li>Ajout de la possibilité de spécifier le chemin relatif du dossier contenant les fichiers utd via l'attribut "relative-base-path" de la balise script.</li>
    </ul>    
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.7.1 (2022-11-28)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Composant <a href="/composants/actions/dialogue">Dialogue</a>, si aucun contrôle de saisie présent dans la fenêtre de dialogue et que le paramètre "id-focus-ouverture" n'est pas spécifié, le focus est donné automatiquement au bouton primaire (comme pour un message).</li>
    </ul>
    
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>
            <span>Notification</span>
            <ul>
                <li>Corrections accessibilité. Ajout espace forcé au lecteur écran entre titre et contenu. Le bouton de fermeture ne fait plus partie de l'alerte qui est lu au lecteur écran.</li>            
            </ul>
        </li>
        <li>
            <span>Déploiement</span>
            <ul>
                <li>Retrait d'un répertoire "node_modules" qui était inclu dans le code source de la solution.</li>            
            </ul>
        </li>
    </ul>    
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.7.0 (2022-11-24)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Bonification importante de la documentation (attributs et slots)</li>
        <li>Ajout du composant <a href="/composants/navigation/menuvertical">Menu vertical</a></li>
        <li>Ajout du composant <a href="/composants/navigation/menuancres">Menu d'ancres</a></li>
        <li>Ajout du composant <a href="/composants/affichagecontenu/section">Sections</a></li>
        <li>Composant <a href="/composants/affichagecontenu/section">Avis</a> mise à jour des couleurs et maintenant focusable</li>
        <li>
            <span>Champs de formulaires</span>
            <ul>
                <li>Ajout des styles pour les champs de formulaire.
                </li>            
                <li>Ajout du composant "utd-champ-form" qui permet d'encapsuler les champs de formulaires afin de simplifier grandement leur utilisation. Il prend notamment en charge la gestion du label, de la précision, du champ requis, du message d'erreur et évidemment de tous les attributs requis pour l'accessibilité.
                </li>            
            </ul>
        </li>
    </ul>
    
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>
            <span>Accordéon</span>
            <ul>
                <li>Correction de l'animation de fermeture. Il y avait un décalage du contenu pendant qu'il disparaîssait.</li>            
            </ul>
        </li>
    </ul>
    
    <h3>Breaking changes</h3>
    <ul class="utd">
        <li>
            <span>Infobulle</span>
            <ul>
                <li>Attribut renommé. srtitre devient sr-titre.</li>            
                <li>Attribut renommé. srboutonfermer devient sr-bouton-fermer.</li>            
                <li>Attribut renommé. srboutonouvrir devient sr-bouton-ouvrir.</li>            
            </ul>
        </li>
        <li>
            <span>Dialogue modal</span>
            <ul>
                <li>Attribut renommé. srboutonfermer devient sr-bouton-fermer.</li>            
                <li>Attribut renommé. idfocusouverture devient id-focus-ouverture.</li>            
                <li>Attribut renommé. idfocus devient id-focus-fermerture.</li>            
                <li>Attribut renommé. estboutonstextelong devient boutons-textelong.</li>            
                <li>Attribut renommé. estaffichageboutonsinline devient forcer-boutons-inline.</li>            
                <li>Attribut renommé. estaffichagelateral devient affichage-lateral.</li>            
            </ul>
        </li>
    </ul>        
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.6.1 (2022-09-18)</h2></div>
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>
            <span>Accordéon</span>
            <ul>
                <li>Correction alignement texte du titre lorsqu'il est affiché sur plusieurs lignes. Ajustements mineurs avec nouvelles spécifications Quebec.ca.
                </li>            
            </ul>
        </li>
        <li>
            <span>Traitement en cours</span>
            <ul>
                <li>La méthode "debuter" ne désactivait pas le bouton cliqué si "avecOverlay" était "true". L'overlay à lui seul bloquait les clics subséquents sur le bouton pendant le traitement, mais n'empêchait pas la touche "ENTER".
                </li>            
            </ul>
        </li>
    
    </ul>        
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.6.0 (2022-07-19)</h2></div>
    <h3>Améliorations</h3>
    <ul class="utd">
        <li>
            <span>Dialogue modale</span>
            <ul>
                <li>Ajout du paramètre "estaffichageboutonsinline" (optionnel) permettant de forcer l'affichage sur une seule ligne des boutons de la slot "pied".</li>
                <li>Ajout du paramètre "estaffichagelateral" (optionnel) permettant que le dialogue modale s'affiche de droite à gauche (et non simplement avec un fade comme par défaut).</li>
                <li>Ajout du paramètre "idfocusouverture" (optionnel) permettant de spécifier un id de contrôle auquel donner le focus à l'affichage.</li>               
            </ul>
        </li>    
    </ul>
    
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>
            <span>Base</span>
            <ul>
                <li>Ajustements afin de retirer tous les conflits de css potentiels avec les différents projets. Ex. Retrait de marges supérieures aux différents headers par défaut.</li>            
                <li>Ajustement mineur css bouton compact (hauteur minimale).</li>            
                <li>Ajout css pour affichage des erreurs de champs (classe utd-erreur-champ).</li>            
            </ul>
        </li>
        <li>
            <span>Notifications</span>
            <ul>
                <li>Positionnement revu lorsque le composant "Retour haut page" est affiché. Comme la notification est temporaire, on l'affiche par dessus le bouton car sinon la notification est beaucoup top haute et ça ne fait pas de sens (même si contradictoire avec ce qui est défini dans le système de design Quebec.ca).</li>            
                <li>Ajout du paramètre "estaffichageboutonsinline" permettant de forcer l'affichage sur une seule ligne des boutons de la slot "pied".</li>            
            </ul>
        </li>
    </ul>        
</utd-accordeon>

<utd-accordeon>
    <div slot="titre"><h2>1.5.1 (2022-07-14)</h2></div>
    <h3>Corrections d'anomalies</h3>
    <ul class="utd">
        <li>
            <span>Dialogue modale</span>
            <ul>
                <li>Correction anomalies mineures en mode mobile sur IOS et Android.</li>            
            </ul>
        </li>
    </ul>        
</utd-accordeon>


<utd-accordeon>
    <div slot="titre"><h2>1.5.0 (2022-05-31)</h2></div>
    <p>Première version avec distribution officielle.</p>    
</utd-accordeon>

<style>
</style>