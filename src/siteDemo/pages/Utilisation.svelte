<script>
    import CodeSource from '../components/CodeSource.svelte'; 
</script>

<h1>Utilisation</h1>

<p>Pour utiliser les composants utd, il suffit d'injecter un fichier javascript, un fichier css, un fichier svg et quelques fichiers de fonts.</p>
<p>Vous pouvez charger les fichiers directement à partir du CDN xyz ou encore en rappatriant les fichiers dans votre solution afin de pouvoir les fusionner avec les vôtres histoire de diminuer le nombre de fichiers.</p>
<p>Attention, si vous copiez les fichiers dans votre projet, les fichiers doivent cependant être dans un dossier avec la structure suivante :</p>



<h2>Intégration dans un projet</h2>
<h3>Chargement du javascript</h3>
<p>Charger le script à la fin du body de la page. Ici on présente le lien du CDN mais vous pouvez pointer sur votre copie le cas échéant.</p>
<CodeSource codeSource="<script src='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.4.1/dist/js/utd-webcomponents.min.js'></script>">
</CodeSource>   

<h3>Chargement du css</h3>
<p>Charger le css dans la balise head après le css de votre projet. Ici on présente le lien du CDN mais vous pouvez pointer sur votre copie le cas échéant.</p>
<CodeSource codeSource="<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/MTESSDev/utd-webcomponents@1.4.1/dist/css/utd-webcomponents.min.css'>">
</CodeSource>   

<h3>Chargement des fonts</h3>

<style>
</style>