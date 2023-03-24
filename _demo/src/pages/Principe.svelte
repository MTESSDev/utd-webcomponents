<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Principe et utilisation des composants</h1>

<h2>Principe</h2>
<p>Composants web réutilisables pour le MESS qui sont basés sur les règles Quebec.ca.</p>

<p>Accessibles, "responsive", sans dépendance, utilisables dans tous les types de projets (.Net, Drupal, SharePoint, VueJs, etc.).</p>

<p>Pour utiliser ces composants, il suffit d'injecter un fichier javascript, un fichier css, un fichier svg et quelques fichiers de fonts.</p>


<h2>Utilisation des composants</h2>
<h3>Intégration dans un projet via CDN</h3>

<h4>Préchargement des fonts</h4>
<p>Précharger les fonts dans la balise <span class="utd-emphase-gris">head</span> de votre projet.</p>
<CodeSource codeSource="<link rel='preload' as='font' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/fonts/open-sans-v18-latin-regular.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/fonts/open-sans-v18-latin-600.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/fonts/open-sans-v18-latin-700.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/fonts/roboto-v20-latin-500.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/fonts/roboto-v20-latin-700.woff2' type='font/woff2' crossorigin='anonymous'>    
">
</CodeSource>   

<h4>Chargement du css</h4>
<p>Charger le css dans la balise <span class="utd-emphase-gris">head</span> <strong>avant</strong> le css de votre projet.</p>
<CodeSource codeSource="<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/css/utd-webcomponents.min.css'>">
</CodeSource>   

<h4>Chargement du javascript</h4>
<p>Charger le script à la fin du <span class="utd-emphase-gris">body</span> de la page.</p>
<CodeSource codeSource="<script src='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist/js/utd-webcomponents.min.js' relative-base-path='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.9.2/dist'></script>">
</CodeSource>   

<h3>Intégration dans un projet (Copie locale des fichiers)</h3>
<p>Vous pouvez rappatrier les fichiers dans votre solution afin de pouvoir les fusionner avec les vôtres histoire de diminuer le nombre de fichiers.</p>
<p>Attention, si vous copiez les fichiers dans votre projet, les fichiers doivent cependant respecter la structure définie dans de dossier "dist" disponible dans la release.</p>

<p><a href="https://github.com/MTESSDev/utd-webcomponents/releases" target="_blank">Consulter les releases et télécharger les fichiers requis</a></p>



<h4>Préchargement des fonts</h4>
<p>Précharger les fonts dans la balise <span class="utd-emphase-gris">head</span> de votre projet.</p>
<CodeSource codeSource="<link rel='preload' as='font' href='/fonts/open-sans-v18-latin-regular.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='/fonts/open-sans-v18-latin-600.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='/fonts/open-sans-v18-latin-700.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='/fonts/roboto-v20-latin-500.woff2' type='font/woff2' crossorigin='anonymous'>
    <link rel='preload' as='font' href='/fonts/roboto-v20-latin-700.woff2' type='font/woff2' crossorigin='anonymous'>">
</CodeSource>   

<h4>Chargement du css</h4>
<p>Charger le css dans la balise <span class="utd-emphase-gris">head</span> <strong>avant</strong> le css de votre projet.</p>
<CodeSource codeSource="<link rel='stylesheet' href='/css/utd-webcomponents.min.css?v=1.9.2'>">
</CodeSource>

<h4>Chargement du javascript</h4>
<p>Charger le script à la fin du <span class="utd-emphase-gris">body</span> de la page.</p>
<p>Il est possible de spécifier le chemin relatif pour atteindre le dossier contenant les éléments utd si ce dernier n'est pas "/" (ex. racine wwwroot). Il suffit d'ajouter l'attribut "relative-base-path" à la balise script.</p>
<CodeSource titre="Code source" codeSource="<script src='/js/utd-webcomponents.min.js?v=1.9.2'></script>">
</CodeSource>   

<CodeSource titre="Code source (avec chemin relatif)" codeSource="<script src='/js/utd-webcomponents.min.js?v=1.9.2' relative-base-path='/utd/'></script>">
</CodeSource>   

<style>
</style>