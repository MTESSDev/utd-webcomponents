<script>
</script>

<h1>Historique des versions récentes</h1>

<utd-accordeon reduit="false">
    <div slot="titre"><h2>1.13.0 (2023-08-18)</h2></div>       
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li><p>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/formulaire/listederoulante">Liste déroulante</a>. Lorsque le composant est utilisé dans un composant "Dialogue modale" la touche ESCAPE ferme maintenant uniquement la liste déroulante et non la fenêtre modale.</p>
        </li>
    </ul>

    <h3>Améliorations</h3>
    <ul class="utd">
        <li>Ajout du composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/actions/barrerecherche">Barre de recherche</a> et intégration de ce dernier dans le composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/entetepiedpage/piventete">Entête PIV</a> via de nouveaux paramètres pour la recherche et intégration de la recherche dans le site démo UTD.</li>        
    </ul>    
    <ul class="utd">
        <li><p>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/actions/dialogue">Dialogue modal</a>. Mise à jour afin de se conformer aux nouvelles règles du système de design Québec.ca.</p>
            <p>Un clic en dehors de la fenêtre modale ne ferme plus cette dernière. La règle ne semble pas encore diffusée sur leur site, mais elle nous a clairement été indiquée par courriel en réponse à une question sur le sujet.</p>
        </li>
    </ul>
    <ul class="utd">
        <li><p>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/actions/dialogue">Menu horizontal</a>. Modifications afin de supporter la définition de l'élément de menu actif et la navigation par routing dans une SPA (ex. Vue).</p>
        </li>
    </ul>
    <ul class="utd">
        <li>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/accordeon">Accordéon</a> modification des images "plus" et "moins" afin qu'elles soient conforment à ce qui est dans le système de design gouvernemental.</li>        
    </ul>    
    <ul class="utd">
        <li>Ajout du gabarit <a href="https://lively-cliff-018a9540f.azurestaticapps.net/gabaritpleinelargeur">pleine largeur</a>, qui comme son nom l'inddique utilise la pleine largeur de l'écran. Il suffit d'ajouter la classe <span class="utd-emphase-gris">utd-pleine-largeur</span> sur la balise <span class="utd-emphase-gris">body</span> d'une page. À utiliser uniquement dans des cas très précis.</li>        
    </ul>    
    <ul class="utd">
        <li>Ajout d'une <a href="https://lively-cliff-018a9540f.azurestaticapps.net/actions/animations">animation de chargement en cours</a>. Cette animation affiche un fond gris "flashy" (change de teinte de gris en boucle) afin d'indiquer un contenu en cours de chargement.
        </li>
    </ul>


</utd-accordeon>

<utd-accordeon reduit="true">
    <div slot="titre"><h2>1.12.1 (2023-07-11)</h2></div>       
    <h3>Correction d'anomalies</h3>
    <ul class="utd">
        <li><p>Composant <a href="https://lively-cliff-018a9540f.azurestaticapps.net/composants/formulaire/listederoulante">Liste déroulante</a> gère maintenant l'état désactivé (disabled ou readonly).</p>
            <p>Si le select à la source de la liste déroulante avait l'attribut "disabled" ou "readonly", ce dernier n'était pas considéré et la liste était toujours active.</p>
        </li>
    </ul>            
</utd-accordeon>

<utd-accordeon reduit="true">
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

<div class="mt-32">
    <a href="/composants/versionsanciennes">Consulter les versions antérieures</a>
</div>

<style>
</style>