<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Infobulle</h1>

<h2>Description</h2>
<p>L<strong>’infobulle</strong> est utilisée pour fournir des informations contextuelles liées à un élément particulier.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/affichage-de-contenu/infobulle" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Notre composant prend toujours l'aspect feuille, i.e. l'infobulle est toujours affichée au bas de la page et jamais à côté du bouton qui lui est associé.</p>

<h2>Exemples</h2>

<h3>1- Utilisation dans un paragraphe sans mot lié</h3>
<p>Le contenu doit être fourni via l'attribut <span class="utd-emphase">contenu</span>.</p>
<p id="exempleInfobulle1">
    Ici un texte plus ou moins important. Aucun mot lié directement à l'aide contextuelle (cas de figure limite qui ne devrait pas se produire souvent)
    <utd-infobulle titre="Type de demandeAAA" contenu="<p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>">
    </utd-infobulle>
</p>

<CodeSource idElementCodeSource="exempleInfobulle1">
</CodeSource>   

<h3>2- Utilisation à l'intérieur d'un paragraphe avec mot lié</h3>
<p>Le contenu doit être fourni via l'attribut <span class="utd-emphase">contenu</span> et le mot lié est dans la slot <span class="utd-emphase">texte-lie</span>.</p>
<p id="exempleInfobulle2">Un texte incroyable avec un mot très important, à savoir
    <utd-infobulle titre="Banane" contenu="<p>1. Fruit allongé, un peu incurvé, vert ou jaune, groupé en grappes dites « régimes » sur le bananier, et qui contient, sous une peau épaisse aisée à détacher, une pulpe amylacée nutritive et savoureuse de consistance fondante.</p><p>2. Populaire. Décoration, galon.</p><p>3. Populaire. Injure familière adressée à quelqu'un dont on souligne la bêtise, la naïveté.</p>">
        <span slot="texte-lie">banane</span>
    </utd-infobulle>qui a été inséré ici de façon arbitraire et qui réflète un cas d'utilisation typique de l'aide contextuelle associée à un mot.
</p>
<CodeSource idElementCodeSource="exempleInfobulle2">
</CodeSource>   


<h3>3- Utilisation à l'extérieur d'un paragraphe sans mot lié (avec la slot "contenu")</h3>
<div id="exempleInfobulle3">
    <label for="test2">Votre nom officiel
    </label>
    <utd-infobulle titre="Type de demande 2">
        <div slot="contenu">
            <p>Banana Boat2!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>
        </div>
    </utd-infobulle>
    <input type="text" id="test2" class="utd-form-control utd-form-group" />
</div>
<CodeSource idElementCodeSource="exempleInfobulle3">
</CodeSource>   

<h3>4- Utilisation à l'extérieur d'un paragraphe sans mot lié (avec l'attribut "contenu")</h3>
<div id="exempleInfobulle4">
    <label for="test4">Votre nom officiel
    </label>
    <utd-infobulle titre="Type de demande" contenu="<p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p>">
    </utd-infobulle>
    <input type="text" id="test4" class="utd-form-control utd-form-group" />
</div>
<CodeSource idElementCodeSource="exempleInfobulle4">
</CodeSource>   


<h3>5- Utilisation avec attributs avancés (srTitre, srBoutonFermer)</h3>
<div id="exempleInfobulle5">
    <label for="test5">Une question de test bidon</label>
    <utd-infobulle titre="Type de demande" srTitre="Aide personnalisée" srboutonfermer="Fermer la fenêtre">
        <div slot="contenu">
            <p>Banana Boat3!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>
        </div>
    </utd-infobulle>
    <input type="text" id="test5" class="utd-form-control utd-form-group" />    
</div>
<CodeSource idElementCodeSource="exempleInfobulle5">
</CodeSource>   


<style>
</style>