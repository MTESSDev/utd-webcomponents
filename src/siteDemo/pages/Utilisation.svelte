<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Utilisation</h1>

<p>Pour utiliser les composants utd, il suffit d'injecter un fichier javascript, un fichier css, un fichier svg et quelques fichiers de fonts.</p>
<p>Vous pouvez charger les fichiers directement à partir du CDN xyz ou encore en rappatriant les fichiers dans votre solution afin de pouvoir les fusionner avec les vôtres histoire de diminuer le nombre de fichiers.</p>
<p>Attention, les fichiers doivent cependant être dans un dossier avec la structure suivante :</p>

<h2>Chargement du script</h2>
<p>Charger le script à la fin du body de la page.</p>

<CodeSource codeSource="<script src='/js/utd-webcomponents.min.js'></script>">
</CodeSource>   

<h2>Chargement du css</h2>
<h2>Chargement du svg</h2>
<h2>Chargement des fonts</h2>

<style>
</style>