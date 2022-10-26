<script>
    import CodeSource from '../components/CodeSource.svelte'; 
    import { onMount } from 'svelte';
    let mounted = false;

    onMount(() => {
        ajouterCodeExemple6()
        mounted = true
    })

    function ajouterCodeExemple6() {
        const controleUtd = document.getElementById('telephone6')
        controleUtd.querySelector('input').addEventListener('blur', (event) => {
            controleUtd.setAttribute('invalide', event.target.value === '' ? 'true': 'false')
        })
    }
</script>

<style type="text/css">
</style>

<h1>Champs (gestion automatique)</h1>

<utd-tablematieres selecteurancres="#main h2">
</utd-tablematieres>

<h2>Description</h2>
<p>Il est possible de grandement simplifier à différents niveaux le code requis pour les champs en utilisant le contrôle <span class="utd-emphase-gris">utd-champ-form</span>.</p>
<p>En effet, il prend en charge la gestion du label, de la précision, du champ requis, du message d'erreur et évidemment de tous les attributs requis pour l'accessibilité.</p>
<p>Il est possible de tout spécifier via des attributs du contrôle <span class="utd-emphase-gris">utd-champ-form</span>, ou bien via du html traditionnel et tous va être bien ficelé (ex. label for, les attributs aria, la précision, le message d'erreur, etc.</p>

<h2>Exemples</h2>
<p>Tous les exemples utilisent le cas de figure le plus complexe, i.e. un champ obligatoire, avec précision et message d'erreur.</p>
<h3>1- Gestion manuelle</h3>
<p>Dans cet exemple, tout doit être présent dans le html. Noter le nombre d'ids, d'attributs aria et de classes css requis.</p>
<div id="exemple1">
    <div class="utd-form-group">
        <label for="tel1">Téléphone<span class="utd-icone-champ-requis" aria-hidden="true">*</span></label>
        <span id="tel1Precision" class="utd-precision">Indiquez le numéro de téléphone de l'établissement concerné.</span>
        <input type="tel" id="tel1" placeholder="123 456-7890"  aria-required="true" aria-invalid="true" aria-describedby="tel1Precision tel1Erreur" class="utd-form-control md"/>
        <span class="utd-erreur-champ" id="tel1Erreur">Le champ «Téléphone» est obligatoire.</span>
    </div>
</div>

<CodeSource idElementCodeSource="exemple1">
</CodeSource>

<h3>2- Gestion automatique (la plus simple)</h3>
<p>Exemple de gestion complète à sa plus simple expression.</p>
<div id="exemple2">
    <utd-champ-form obligatoire="true" libelle="Téléphone" format="md" invalide="true" precision="Indiquez le numéro de téléphone de l'établissement concerné." messageerreur="Le champ «Téléphone» est obligatoire.">
        <input type="tel" placeholder="123 456-7890"/>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple2">
</CodeSource>


<h3>3- Gestion automatique (partielle)</h3>
<p>Comme exemple 2, mais ici on a spécifié nous même un label via le html.</p>
<p>À noter que l'attribut <span class="utd-emphase-gris">for</span> n'est pas spécifié pour le label. Il sera ajouté automatiquement comme tout le reste!</p>
<div id="exemple3">
    <utd-champ-form obligatoire="true" format="md" invalide="true" precision="Indiquez le numéro de téléphone de l'établissement concerné." messageerreur="Le champ «Téléphone» est obligatoire.">
        <label>Téléphone</label>
        <input type="tel" id="telephone3" placeholder="123 456-7890"/>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple3">
</CodeSource>


<h3>4- Gestion automatique (partielle)</h3>
<p>Comme exemple 3, mais ici nous spécifions l'attribut for du label et une précision via le html.</p>
<p>Noter l'attribut <span class="utd-emphase-gris">aria-describedby</span> du contrôle qui est bien associé à notre précision, même si nous n'avions pas spécifié d'id pour cette dernière.</p>
<div id="exemple4">
    <utd-champ-form obligatoire="true" format="md" invalide="true" messageerreur="Le champ «Téléphone» est obligatoire.">
        <label for="telephone4">Téléphone</label>
        <span class="utd-precision">Indiquez le numéro de téléphone de l'établissement concerné.</span>        
        <input type="tel" id="telephone4" placeholder="123 456-7890"/>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple4">
</CodeSource>

<h3>5- Gestion automatique (partielle)</h3>
<p>Comme exemple 4, mais ici nous spécifions le message d'erreur via le html.</p>
<p>Noter l'attribut <span class="utd-emphase-gris">aria-describedby</span> du contrôle qui est bien associé à notre id de précision et de message d'erreur, même si nous n'avions pas spécifié d'id pour le message d'erreur.</p>
<div id="exemple5">
    <utd-champ-form obligatoire="true" format="md" invalide="true">
        <label for="telephone5">Téléphone</label>
        <span class="utd-precision" id="precision5">Indiquez le numéro de téléphone de l'établissement concerné.</span>        
        <input type="tel" id="telephone5" placeholder="123 456-7890"/>
        <span class="utd-erreur-champ">Le champ "Téléphone" est obligatoire.</span>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple5">
</CodeSource>

<h3>6- Gestion automatique (la plus simple avec dynamisme)</h3>
<p>Afin de modifier l'affichage du contrôle il suffit de modifier la valeur des différents attributs.</p>
<p>Par exemple pour modifier l'affichage du message d'erreur il suffit de spécifier la valeur désirée dans l'attribut <span class="utd-emphase-gris">invalide</span> (true/false) et toutes les attaches vont être faites.</p>
<p>À noter que le présent exemple est très basique et vérifie uniquement que le champ contient une valeur ou non.</p>

<div id="exemple6">
    <utd-champ-form id="telephone6" obligatoire="true" libelle="Téléphone" format="md" invalide="false" precision="Indiquez le numéro de téléphone de l'établissement concerné." messageerreur="Le champ &#34;Téléphone&#34; est obligatoire.">
        <input type="tel" placeholder="123 456-7890"/>
    </utd-champ-form>
</div>

<CodeSource idElementCodeSource="exemple6" titre="Code source (HTML)">
</CodeSource>

{#if mounted}
    <CodeSource codeSource="{ajouterCodeExemple6.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if} 