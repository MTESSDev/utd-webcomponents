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
        mounted = true
    })


    function obtenirTableauParametres() {
        return [
            {nom: "nb-lignes", type: "String (Optionnel)", description: `Nombre de ligne à afficher initialement. Défaut "1".`}
        ];
    }

    function obtenirTableauSlots() {
        return [
            {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu du composant.</p>`},
        ];
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

    <div class="mb-32 bs-test" id="exemplePointsSuspension1">
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

</div>