<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<div class="documentation">
    <h1>Erreurs</h1>

    <utd-menu-ancres selecteur="#main h2">
    </utd-menu-ancres>

    <h2>Description</h2>
    <p>Une erreur dans un champ est indiquée par un contour rouge (excepté pour les cases à cocher et boutons radio) et un message contextuel placé sous le champ.</p>
    <p>Pour le message d'erreur, il suffit d'utiliser un &lt;span&gt; avec la classe <span class="utd-emphase-gris">utd-erreur-champ</span>. Ce &lt;span&gt; doit obligatoirement avoir un "id".</p>
    <p>L'attribut <span class="utd-emphase-gris">aria-describedby</span> de l'élément doit contenir l'id du &lt;span&gt; contenant le message d'erreur, ainsi que l'id de la précision s'il y en a une afin que le message d'erreur, et la précision soient lus au lecteur écran.</p>
    <p>L'attribut <span class="utd-emphase-gris">aria-invalid</span> doit avoir la valeur "true".</p>

    <h3>Particularités vs. le système de design Quebec.ca</h3>
    <p>La bordure rouge est de 2px au lieu de 3px et la graisse pour le message d'erreur est normale au lieu de bold.</p>
</div>

<h2>Exemples</h2>
<h3>Exemple 1</h3>
<div id="exemple1" class="bs-test">
    <div class="utd-form-group">
        <label for="tel1">Téléphone<span class="utd-icone-champ-requis" aria-hidden="true">*</span></label>
        <span id="tel1Precision" class="utd-precision">Si vous n’avez pas de numéro de téléphone, inscrivez le numéro d’un membre de votre famille, d’un ami ou d’un organisme.</span>
        <input type="tel" id="tel1" placeholder="123 456-7890"  aria-required="true" aria-invalid="true" aria-describedby="tel1Precision tel1Erreur" class="utd-form-control md"/>
        <span class="utd-erreur-champ" id="tel1Erreur">Le champ «Téléphone» est obligatoire.</span>
    </div>
</div>

<CodeSource idElementCodeSource="exemple1">
</CodeSource>
