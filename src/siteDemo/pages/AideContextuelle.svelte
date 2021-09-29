<script>
</script>

<h1>Aide contextuelle!</h1>

<h2>Essai dans un paragraphe sans mot lié (on doit passer le contenu via un prop)</h2>
<p>
    Ici un texte plus ou moins important. Aucun mot lié directement à l'aide contextuelle (cas de figure limite qui ne devrait pas se produire souvent)
    <utd-aide-contextuelle titre="Type de demandeAAA" contenu="<p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>">
    </utd-aide-contextuelle>
</p>

<h2>Essai à l'intérieur d'un paragraphe avec mot lié (on doit passer le contenu via un prop) et le mot lié est dans la slot "texte-lie"</h2>
<p>Un texte incroyable avec un mot très important, à savoir
    <utd-aide-contextuelle titre="Banane" contenu="<p>1. Fruit allongé, un peu incurvé, vert ou jaune, groupé en grappes dites « régimes » sur le bananier, et qui contient, sous une peau épaisse aisée à détacher, une pulpe amylacée nutritive et savoureuse de consistance fondante.</p><p>2. Populaire. Décoration, galon.</p><p>3. Populaire. Injure familière adressée à quelqu'un dont on souligne la bêtise, la naïveté.</p>">
        <span slot="texte-lie">banane</span>
    </utd-aide-contextuelle>qui a été inséré ici de façon arbitraire et qui réflète un cas d'utilisation typique de l'aide contextuelle associée à un mot.
</p>

<h2>Essai à l'extérieur d'un paragraphe sans mot lié (ici on utilise la slot "contenu")</h2>
<label for="test2">Votre nom officiel
</label>
<utd-aide-contextuelle titre="Type de demande 2" lang="en">
    <div slot="contenu">
        <p>Banana Boat2!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>
    </div>
</utd-aide-contextuelle>
<input type="text" id="test2" class="utd-form-control utd-form-group" />

<h2>Essai à l'extérieur d'un paragraphe sans mot lié (ici on utilise l'attribut "contenu")</h2>
<label for="test2">Votre nom officiel
</label>
<utd-aide-contextuelle titre="Type de demande 2" contenu="<p>Banana Boat!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p><p>Banana Boat!</p>"
    lang="en">
</utd-aide-contextuelle>
<input type="text" id="test2" class="utd-form-control utd-form-group" />


<h2>Essai avec attributs avancés (srTitre, srBoutonFermer)</h2>
<label for="test4">Une question de test bidon</label>
<utd-aide-contextuelle titre="Type de demande 4" srTitre="Aide tabarnac! " srboutonfermer="Close tabarnac!">
    <div slot="contenu">
        <p>Banana Boat3!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident error vel veritatis itaque nemo commodi.</p>
    </div>
</utd-aide-contextuelle>
<input type="text" id="test4" class="utd-form-control" />    


<style>
</style>