<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Champs texte et autres</h1>

<utd-tablematieres selecteurancres="#main h2">
</utd-tablematieres>

<utd-avis>
    <div slot="contenu">
        <p>Tout ce qui est décrit dans cette page s'applique également aux champs de type "number", "date", "tel", "email", "password", "url" et "search"</p>
    </div>
</utd-avis>

<h2>Description</h2>
<p>Le <strong>champ texte</strong> est un espace dans lequel est saisie une information qui tient sur une ligne de texte. </p>
<p>Le champ est accompagné d’une étiquette claire et succincte. Elle permet d’identifier au premier coup d’œil l’information requise dans le champ. Les signes de ponctuation sont à éviter.</p>
<p>On évite aussi d’ajouter des compléments d’information entre les champs d’un formulaire. Les précisions sont fournies à l’aide :</p>
<ul>
    <li>d’une étiquette claire et succincte;</li>
    <li>d’un espace réservé (<em>placeholder</em>), au besoin;</li>
    <li>d’une courte phrase sous l’étiquette, au besoin;</li>
</ul>

<h3>Référence système de design Quebec.ca</h3>
<a href="https://design.quebec.ca/composantes/formulaire/champ-texte" target="_blank">Voir les spécifications sur le site de design Quebec.ca</a>


<h2>Notions de base</h2>
<p>Un champ de type &lt;input&gt; doit posséder la classe <span class="utd-emphase-gris">utd-form-control</span> et être dans un conteneur (ex. un &lt;div&gt;) ayant la classe <span class="utd-emphase-gris">utd-form-group</span> (sauf le dernier champ d'une page).</p>


<h2>Étiquette (label)</h2>
<p>Style appliqué automatiquement à tous les éléments &lt;label&gt;.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Nous utilisons la graisse semi-bold au lieu de bold.</p>

<h3>Exemples</h3>
<div id="exempleLabel">
    <div class="utd-form-group">
        <label for="label1">Un beau libellé de champ</label>
        <input type="text" id="label1" class="utd-form-control"/>
    </div>
</div>

<CodeSource idElementCodeSource="exempleLabel">
</CodeSource>

<h2>Formats disponibles</h2>
<p>La longueur du champ doit être adaptée à la réponse requise, selon 5 formats disponibles.</p>
<p>Utilisez les classes <span class="utd-emphase-gris">sm</span>, <span class="utd-emphase-gris">md</span>, <span class="utd-emphase-gris">lg</span>, <span class="utd-emphase-gris">xl</span>, et <span class="utd-emphase-gris">xxl</span> afin de préciser le format des champs. Si rien n'est spécifié, le format "large" par défaut s'applique.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Nous avons ajouté un format "extra extra-large" <span class="utd-emphase-gris">xxl</span> prenant la largeur disponible à l'intérieur du conteneur.</p>

<h3>Exemples</h3>
<div id="exempleFormats">
    <div class="utd-form-group">
        <label for="taille1">Champ "petit" (<em>sm</em>)</label>
        <input type="text" id="taille1" class="utd-form-control sm"/>
    </div>
    <div class="utd-form-group">
        <label for="taille2">Champ "moyen" (<em>md</em>)</label>
        <input type="text" id="taille2" class="utd-form-control md"/>
    </div>
    <div class="utd-form-group">
        <label for="taille3">Champ "large" (<em>lg</em>)</label>
        <input type="text" id="taille3" class="utd-form-control lg"/>
    </div>
    <div class="utd-form-group">
        <label for="taille4">Champ "extra-large" (<em>xl</em>)</label>
        <input type="text" id="taille4" class="utd-form-control xl"/>
    </div>

    <div class="utd-form-group">
        <label for="taille5">Champ "extra extra-large" (<em>xxl</em>)</label>
        <input type="text" id="taille5" class="utd-form-control xxl"/>
    </div>
</div>
<CodeSource idElementCodeSource="exempleFormats">
</CodeSource>

<h2>Espace réservé et précision</h2>
<p>Un espace réservé (<em>placeholder</em>) permet de préciser comment saisir les informations. Il est utilisé dans les champs dont le format est particulier, comme le code postal, le numéro de téléphone ou la date.</p>
<p>La précision quant à elle permet d'ajouter certaines informations permettant de mieux comprendre ce qui doit être inscrit dans un champ. Elle s’ajoute à la suite de l’étiquette, avant le champ texte. Simplement utiliser un &lt;span&gt; avec la classe <span class="utd-emphase-gris">utd-precision</span>.</p>
<p>Lors de l'utilisation d'une précision, il est impératif d'ajouter l'attribut <span class="utd-emphase-gris">aria-describedby</span> sur le champ afin que la précision soit lue au lecteur écran avec le libellé.</p>
<h3>Exemples</h3>
<div id="exemplePlaceholderPrecision">
    <div class="utd-form-group">
        <label for="placeholder1" aria-describedby="precisionExemplePlaceholderPrecision">Téléphone</label>
        <span id="precisionExemplePlaceholderPrecision" class="utd-precision">Si vous n’avez pas de numéro de téléphone, inscrivez le numéro d’un membre de votre famille, d’un ami ou d’un organisme.</span>
        <input type="tel" id="placeholder1" placeholder="123 456-7890" class="utd-form-control md"/>
    </div>
</div>

<CodeSource idElementCodeSource="exemplePlaceholderPrecision">
</CodeSource>

<h3>Différents types</h3>
<form novalidate>
    <div id="differentsTypes">
        
        <div class="utd-form-group">
            <label for="champ1">Champ type "text"</label>
            <input type="text" id="champ1" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ2">Champ type "number"</label>
            <input type="number" id="champ2" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ3">Champ type "date"</label>
            <input type="date" id="champ3" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ4">Champ type "url"</label>
            <input type="url" id="champ4" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ5">Champ type "tel"</label>
            <input type="tel" id="champ5" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ6">Champ type "email"</label>
            <input type="email" id="champ6" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ7">Champ type "password"</label>
            <input type="password" id="champ7" class="utd-form-control"/>
        </div>

        <div class="utd-form-group">
            <label for="champ8">Champ type "search"</label>
            <input type="search" id="champ8" class="utd-form-control"/>
        </div>
    </div>
</form>
<CodeSource idElementCodeSource="differentsTypes">
</CodeSource>



