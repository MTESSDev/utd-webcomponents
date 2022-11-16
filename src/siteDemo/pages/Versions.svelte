<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Historique des versions</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>1.7.0 (2022-11-??)</h2>
<h3>Améliorations</h3>
<ul class="utd">
    <li>Ajout du composant <a href="/composants/navigation/menuvertical">Menu vertical</a>.</li>
    <li>Ajout du composant <a href="/composants/navigation/menuancres">Menu d'ancres</a>.</li>
    <li>Ajout du composant <a href="/composants/affichagecontenu/section">Sections</a>.</li>
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
            <li>Attribut renommé. id-focusouverture devient id-focus-ouverture.</li>            
            <li>Attribut renommé. idfocus devient id-focus-fermerture.</li>            
            <li>Attribut renommé. estboutonstextelong devient boutons-textelong.</li>            
            <li>Attribut renommé. estaffichageboutonsinline devient forcer-boutons-inline.</li>            
            <li>Attribut renommé. estaffichagelateral devient affichage-lateral.</li>            
        </ul>
    </li>
</ul>


<h2>1.6.1 (2022-09-18)</h2>
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

<h2>1.6.0 (2022-07-19)</h2>
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

<h2>1.5.1 (2022-07-14)</h2>
<h3>Corrections d'anomalies</h3>
<ul class="utd">
    <li>
        <span>Dialogue modale</span>
        <ul>
            <li>Correction anomalies mineures en mode mobile sur IOS et Android.</li>            
        </ul>
    </li>
</ul>

<h2>1.5.0 (2022-05-31)</h2>
<p>Première version avec distribution officielle.</p>

<style>
</style>