<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Utilisation</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<p>Pour utiliser les composants utd, il suffit d'injecter un fichier javascript, un fichier css, un fichier svg et quelques fichiers de fonts.</p>



<h2>Intégration dans un projet via CDN</h2>
<h3>Chargement du javascript</h3>
<p>Charger le script à la fin du <span class="utd-emphase-gris">body</span> de la page.</p>
<CodeSource codeSource="<script src='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.7.1/dist/js/utd-webcomponents.min.js'></script>">
</CodeSource>   

<h3>Chargement du css</h3>
<p>Charger le css dans la balise <span class="utd-emphase-gris">head</span> après le css de votre projet.</p>
<CodeSource codeSource="<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.7.1/dist/css/utd-webcomponents.min.css'>">
</CodeSource>   

<h2>Intégration dans un projet (Copie locale des fichiers)</h2>
<p>Vous pouvez rappatrier les fichiers dans votre solution afin de pouvoir les fusionner avec les vôtres histoire de diminuer le nombre de fichiers.</p>
<p>Attention, si vous copiez les fichiers dans votre projet, les fichiers doivent cependant respecter la structure définie dans de dossier "dist" disponible dans la release.</p>

<p><a href="https://github.com/MTESSDev/utd-webcomponents/releases" target="_blank">Consulter les releases et télécharger les fichiers requis</a></p>


<h3>Chargement du javascript</h3>
<p>Charger le script à la fin du <span class="utd-emphase-gris">body</span> de la page.</p>
<CodeSource codeSource="<script src='/js/utd-webcomponents.min.js'></script>">
</CodeSource>   

<h3>Chargement du css</h3>
<p>Charger le css dans la balise <span class="utd-emphase-gris">head</span> après le css de votre projet.</p>
<CodeSource codeSource="<link rel='stylesheet' href='/css/utd-webcomponents.min.css'>">
</CodeSource>





<style>
</style>