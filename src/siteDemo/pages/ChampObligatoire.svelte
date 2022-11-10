<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Champ obligatoire</h1>

<utd-menuancres selecteurancres="#main h2">
</utd-menuancres>

<h2>Description</h2>
<p>La composante est constituée de deux éléments : la mention et l'astérisque.</p>
<p>La mention s’affiche sous le titre du formulaire avec la phrase : « Les champs suivis d'un * sont obligatoires ». Elle doit toujours être présente dès que la tâche dépasse 2 champs de formulaire.</p>
<p>L’astérisque est placé à la fin de l’étiquette de chacun des champs obligatoires. Il est toujours en rouge pour que l'utilisateur puisse repérer rapidement quel champ est obligatoire.
   Il suffit d'utiliser un &lt;span&gt; avec la classe <span class="utd-emphase-gris">utd-icone-champ-requis</span> ayant comme contenu une étoile "*".
</p>
<p>L’attribut <span class="utd-emphase-gris">aria-required</span> doit être spécifié avec la valeur "true" afin d'indiquer au lecteur écran que le champ est obligatoire.</p>
<p>Il serait possible d'utiliser l'attribut HTML5 <span class="utd-emphase-gris">required</span>, cependant dès qu'on accède à un champ <em>required</em>, le lecteur écran indique que le champ est invalide s'il est vide, et ce même si le champ n'a pas encore été touché.</p>

<h2>Exemples</h2>
<h3>Exemple 1</h3>
<div id="exempleChampObligatoire">
    <div class="utd-form-group">
        <label for="tel1" aria-describedby="tel1Precision">Téléphone<span class="utd-icone-champ-requis" aria-hidden="true">*</span></label>
        <span id="tel1Precision" class="utd-precision">Si vous n’avez pas de numéro de téléphone, inscrivez le numéro d’un membre de votre famille, d’un ami ou d’un organisme.</span>
        <input type="tel" id="tel1" placeholder="123 456-7890" aria-required="true" class="utd-form-control md"/>
    </div>
</div>
<CodeSource idElementCodeSource="exempleChampObligatoire">
</CodeSource>

