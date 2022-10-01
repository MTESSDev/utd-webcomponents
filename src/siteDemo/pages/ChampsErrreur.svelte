<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Champs (erreurs)</h1>

<h2>Description</h2>
<p>Une erreur dans un champ est indiquée par un contour rouge et un message contextuel placé sous le champ.</p>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/champ-texte" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>

<h2>Champs texte</h2>
<utd-avis>
    <div slot="contenu">
        <p>S'applique également aux champs de type "number", "date", "tel", "email", "password", "url" et "search"</p>
    </div>
</utd-avis>
<p>Une erreur dans un champ doit être signalée via un span de classe utd-erreur-champ, et ayant le role alert. Ce span doit être placé sous le champ en erreur.</p>
<p>Le champ en erreur doit avoir l'attribut aria-invalid="true". De plus, l'attibut aria-describedby de son libellé doit également contenir l'id du contrôle contenant le message d'erreur afin que le message soit lu au lecteur écran avec le libellé lors de l'accès au champ.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>La bordure rouge est de 2px au lieu de 3px et la graisse pour le message d'erreur est normale au lieu de bold.</p>

<h3>Exemples</h3>
<div id="exempleErreur1">
    <div class="utd-form-group">
        <label for="erreur1" aria-describedby="precisionErreur1 texteErreur1">Téléphone</label>
        <span id="precisionErreur1" class="utd-precision">Si vous n’avez pas de numéro de téléphone, inscrivez le numéro d’un membre de votre famille, d’un ami ou d’un organisme.</span>
        <input type="tel" id="erreur1" placeholder="123 456-7890" class="utd-form-control md" aria-invalid="true"/>
        <span id="texteErreur1" role="alert" class="utd-erreur-champ">Le champ "Téléphone" est obligatoire.</span>
    </div>
</div>


<CodeSource idElementCodeSource="exempleErreur1">
</CodeSource>




