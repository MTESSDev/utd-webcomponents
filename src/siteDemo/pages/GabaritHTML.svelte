<script>
    import CodeSource from '../components/CodeSource.svelte'; 

    const gabaritHtml = `<html lang="fr"><body>test</body></html>`    
    
</script>

<h1>Gabarit HTML</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<p>Pour utiliser les composants utd, il suffit d'injecter un fichier javascript, un fichier css, un fichier svg et quelques fichiers de fonts.</p>

<div class="utd-d-none">
<code id="test">
    <html lang="fr">
        <head></head>
        <body>
            <div class="utd-conteneur-principal">
                <header>
                    <utd-piv-entete></utd-piv-entete>
                    <utd-navigation-principale></utd-navigation-principale><!-- à venir -->
                </header>
                <div class="utd-container">
                </div>

            </div>            
            <utd-haut-page></utd-haut-page>
            <footer>
                <utd-pied-page-site></utd-pied-page-site>
                <utd-piv-pied-page></utd-piv-pied-page>
            </footer>
        </body>
    </html>
</code>
</div>
<h2>Structure HTML minimale</h2>

<p>Charger le script à la fin du <span class="utd-emphase-gris">body</span> de la page.</p>
<CodeSource idElementCodeSource="test">
</CodeSource>   

<style>
</style>