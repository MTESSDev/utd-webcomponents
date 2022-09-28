<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<style type="text/css">
</style>

<h1>Champs texte et autres</h1>

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
<p>Tous les champs (éléments de type "input") doivent être dans un conteneur (ex. un "div") ayant la classe <em>(utd-form-group)</em> et les champs eux-mêmes doivent avoir la classe <em>(utd-form-control)</em>.</p>


<h2>Formats disponibles</h2>
<p>Utilisez les classes "sm", "md", "lg", "xl", et "xxl" afin de préciser le format des champs. Si rien n'est spécifié, le format "large" par défaut s'applique.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Le format "extra extra-large" (<em>xxl</em>) prenant la largeur disponible à l'intérieur du conteneur du champ a été ajouté.</p>

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

<h3>Espace réservé</h3>
<p>Un espace réservé (<em>placeholder</em>) permet de préciser comment saisir les informations. Il est utilisé dans les champs dont le format est particulier, comme le code postal, le numéro de téléphone ou la date.</p>
<h3>Exemples</h3>
<div id="exemplePlaceholder">
    <div class="utd-form-group">
        <label for="placeholder1">Code postal</label>
        <input type="text" id="placeholder1" placeholder="A1A 1A1" class="utd-form-control md"/>
    </div>
</div>
<CodeSource idElementCodeSource="exemplePlaceholder">
</CodeSource>


<h3>Précision</h3>
<CodeSource idElementCodeSource="differentsTypes">
</CodeSource>

<h3>Différents types</h3>

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
<CodeSource idElementCodeSource="differentsTypes">
</CodeSource>



