<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    import TableauParams from '../components/TableauParams.svelte'; 
    import TableauSlots from '../components/TableauSlots.svelte'; 

    let tableauParametres = []
    let tableauSlots = []
    let mounted = false

    onMount(() => {
        tableauParametres = obtenirTableauParametres()
        tableauSlots = obtenirTableauSlots()
        exemple6()

        mounted = true
    })


    function obtenirTableauParametres() {
        return [
            {nom: "nb-lignes", type: "String (Optionnel)", description: `Nombre de ligne à afficher initialement. Défaut "1".`},
            {nom: "afficher-texte-lien", type: "String (Optionnel)", description: `Ajoute le texte "Voir plus/Show more" dans le lien permettant l'affichage complet du texte. Ex. ... [Voir plus]. Défaut "false".`},
            {nom: "affichage-initial", type: "String (Optionnel)", description: `Attribut réactif permettant de forcer la réinitialisation de l'affichage si valeur = 'true'`}
        ];
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu du composant.</p>`},
        ];
    }

    function exemple6() {    
        document.getElementById('btnTest6').addEventListener('click', () => {
            document.getElementById('utdExemple6').setAttribute('affichage-initial', 'true')
        })
    }        

</script>

<style type="text/css">
</style>

<div class="documentation">
    <h1>Points de suspension</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>Les <strong>points de suspension</strong> (ellipsis) sont utilisés pour tronquer un texte trop long pour être entièrement affiché dans l’espace prévu. Ils indiquent qu’il y a une suite à lire et affichent la suite du texte lorsqu'ils sont cliqués.</p>

    <h3>Référence système de design Quebec.ca</h3>
    <p>N'existe pas dans la système de design.</p>    

    <h2>Attributs disponibles</h2>
    <TableauParams parametres="{tableauParametres}">
    </TableauParams>

    <h2>Slots disponibles</h2>
    <TableauSlots parametres="{tableauSlots}">
    </TableauSlots>

</div>

<div class="backstop-test">
    <h2>Exemples</h2>

    <h3>1- Texte long sur une ligne</h3>

    <div class="mb-32" id="exemplePointsSuspension1">
        <utd-points-suspension>
            Les ennemis des amis de Chuck Norris sont ses amis. Et oui! Les ennemis de Chuck Norris n'existent plus. L'avenir se demande parfois ce que Chuck Norris lui réserve. Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte. Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris n'a pas de père. On ne nique pas la mère de Chuck Norris. Chuck Norris ne ment pas, c'est la vérité qui se trompe. Quand Chuck Norris s'est mis aux arts martiaux, les Japonais se sont reconvertis dans les jeux videos. Les ennemis de Chuck Norris lui disent souvent d'aller au diable. Le Diable aimerait bien qu'ils arrêtent. Chuck Norris peut ressusciter un angle mort. Chuck Norris est le seul homme à posséder une bible dédicacée. Chuck Norris n'est pas égal à lui-même, il est meilleur. Un jour un mec a refuser de filer une clope à Chuck Norris. Depuis, on prévient sur tous les paquets que "Fumer tue".
        </utd-points-suspension>
    </div>
    <CodeSource idElementCodeSource="exemplePointsSuspension1">
    </CodeSource>   


    <h3>2- Texte long sur 3 lignes</h3>
    <div class="mb-32" id="exemplePointsSuspension2">
        <utd-points-suspension nb-lignes="3">
            Les ennemis des amis de Chuck Norris sont ses amis. Et oui! Les ennemis de Chuck Norris n'existent plus. L'avenir se demande parfois ce que Chuck Norris lui réserve. Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte. Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris n'a pas de père. On ne nique pas la mère de Chuck Norris. Chuck Norris ne ment pas, c'est la vérité qui se trompe. Quand Chuck Norris s'est mis aux arts martiaux, les Japonais se sont reconvertis dans les jeux videos. Les ennemis de Chuck Norris lui disent souvent d'aller au diable. Le Diable aimerait bien qu'ils arrêtent. Chuck Norris peut ressusciter un angle mort. Chuck Norris est le seul homme à posséder une bible dédicacée. Chuck Norris n'est pas égal à lui-même, il est meilleur. Un jour un mec a refuser de filer une clope à Chuck Norris. Depuis, on prévient sur tous les paquets que "Fumer tue".
        </utd-points-suspension>
    </div>
    <CodeSource idElementCodeSource="exemplePointsSuspension2">
    </CodeSource>   

    <h3>3- Texte court sur une ligne</h3>
    <div class="mb-32" id="exemplePointsSuspension3">
        <utd-points-suspension>
            Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris peut ressusciter un angle mort.
        </utd-points-suspension>
    </div>
    <CodeSource idElementCodeSource="exemplePointsSuspension3">
    </CodeSource>  

    <div id="exemplePointsSuspension4">
        <h3><utd-points-suspension nb-lignes="2">4- Texte sur 2 lignes dans un header. Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris peut ressusciter un angle mort.</utd-points-suspension></h3>
    </div>    
    <CodeSource idElementCodeSource="exemplePointsSuspension4">
    </CodeSource>  

    <h3>5- Texte court sur 3 lignes (entre toujours sur 2 lignes max.)</h3>
    <div class="mb-32" id="exemplePointsSuspension5">
        <utd-points-suspension nb-lignes="3">
            Chuck Norris a déjà compté jusqu'à l'infini. Deux fois.
        </utd-points-suspension>
    </div>
    <CodeSource idElementCodeSource="exemplePointsSuspension5">
    </CodeSource>  

    <h3>6- Texte court sur une ligne et exemple de réinitialisation</h3>
    <p>Cet exemple vise a démontrer la possibilité de réinitialiser l'affichage du contrôle à son état initial.</p>
    <p>Ex. si l'utilisateur a cliqué [...] afin de voir tout le contenu, il y a possibilité via le code de remettre l'affichage à son état initial. Dans cet exemple on le fait via un bouton, mais il suffit d'initialiser la valeur de l'attribut "affichage-initial" à "true".</p>
    
    <h4>Début de l'exemple</h4>
    <div class="mb-16" id="exemplePointsSuspension6">
        <utd-points-suspension id="utdExemple6">
            Les ennemis des amis de Chuck Norris sont ses amis. Et oui! Les ennemis de Chuck Norris n'existent plus. L'avenir se demande parfois ce que Chuck Norris lui réserve. Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte. Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris n'a pas de père. On ne nique pas la mère de Chuck Norris. Chuck Norris ne ment pas, c'est la vérité qui se trompe. Quand Chuck Norris s'est mis aux arts martiaux, les Japonais se sont reconvertis dans les jeux videos. Les ennemis de Chuck Norris lui disent souvent d'aller au diable. Le Diable aimerait bien qu'ils arrêtent. Chuck Norris peut ressusciter un angle mort. Chuck Norris est le seul homme à posséder une bible dédicacée. Chuck Norris n'est pas égal à lui-même, il est meilleur. Un jour un mec a refuser de filer une clope à Chuck Norris. Depuis, on prévient sur tous les paquets que "Fumer tue".
        </utd-points-suspension>
    </div>

    <button type="button" id="btnTest6" class="utd-btn secondaire compact mb-32">Réinitialiser</button>

    <CodeSource idElementCodeSource="exemplePointsSuspension6">
    </CodeSource>  
    
    {#if mounted}
        <CodeSource codeSource="{exemple6.toString()}" titre="Code source (js)" language="language-javascript">
        </CodeSource>   
    {/if}   

    <h3>7- Avec texte affiché dans le lien</h3>

    <div class="mb-32" id="exemplePointsSuspension7">
        <utd-points-suspension afficher-texte-lien="true">
            Les ennemis des amis de Chuck Norris sont ses amis. Et oui! Les ennemis de Chuck Norris n'existent plus. L'avenir se demande parfois ce que Chuck Norris lui réserve. Un jour Chuck Norris a eu un zero en latin, depuis c'est une langue morte. Chuck Norris a déjà compté jusqu'à l'infini. Deux fois. Chuck Norris n'a pas de père. On ne nique pas la mère de Chuck Norris. Chuck Norris ne ment pas, c'est la vérité qui se trompe. Quand Chuck Norris s'est mis aux arts martiaux, les Japonais se sont reconvertis dans les jeux videos. Les ennemis de Chuck Norris lui disent souvent d'aller au diable. Le Diable aimerait bien qu'ils arrêtent. Chuck Norris peut ressusciter un angle mort. Chuck Norris est le seul homme à posséder une bible dédicacée. Chuck Norris n'est pas égal à lui-même, il est meilleur. Un jour un mec a refuser de filer une clope à Chuck Norris. Depuis, on prévient sur tous les paquets que "Fumer tue".
        </utd-points-suspension>
    </div>
    <CodeSource idElementCodeSource="exemplePointsSuspension7">
    </CodeSource>   


</div>