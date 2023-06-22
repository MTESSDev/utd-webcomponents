<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let tableauParametres = [];
  let tableauSlots = [];
  let mounted = false;

  onMount(() => {
      tableauParametres = obtenirTableauParametres()
      tableauSlots = obtenirTableauSlots()
      mounted = true
  })

  function chargerContenuRecherche() {
        document.querySelector("utd-piv-entete").addEventListener("initialiser", e => {
            //Ici votre code pour obtenir le contenu de recherche
            fetch('/testsLocaux/recherche2Niveaux.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status)
                    }                
                    response.json().then((monContenuRecherche) => {
                        //Appel à la méthode permettant de définir le contenu de recherche
                        e.detail.definirContenuRecherche({contenu: monContenuRecherche})                    
                    })
            })                    
        })
    }

  function obtenirTableauParametres() {
      return [
        {nom: "titre-site1", type: "String (Obligatoire)", description: `Texte ligne 1 pour le nom du site ou de service.`},
        {nom: "titre-site2", type: "String (Optionnel)", description: `Texte ligne 2 pour le nom du site ou de service.`},
        {nom: "url-titre-site", type: "String (Obligatoire)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur la zone de titre du site ou de service.`},
        {nom: "src-logo", type: "String (Optionnel)", description: `Source (attribut "src") du logo. Défaut logo du gouvernement du québec "/images/utd-sprite.svg#QUEBEC_blanc" inclu avec les composants utd.`},
        {nom: "url-logo", type: "String (Optionnel)", description: `Url du logo. Défaut : "/".`},
        {nom: "alt-logo", type: "String (Optionnel)", description: `Texte alternatif du logo. Défaut : "Signature du gouvernement du Québec." / "Québec government signature".`},
        {nom: "url-langue-alternative", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Si non spécifié, le lien n'est pas affiché.`},     
        {nom: "texte-langue-alternative", type: "String (Optionnel)", description: `Texte du lien de langue alternative. Défaut "Français" / "English".`},     
        {nom: "url-nous-joindre", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Si non spécifié, le lien n'est pas affiché.`},     
        {nom: "texte-nous-joindre", type: "String (Optionnel)", description: `Texte du lien "Nous joindre". Défaut "Nous joindre" / "Contact us".`},     
        {nom: "passer-contenu", type: "Boolean (Optionnel)", description: `Indique si le lien "Passer au contenu" est intégré ou non. Défaut "true".`},     
        {nom: "url-passer-contenu", type: "String (Optionnel)", description: `Url vers laquelle rediriger lorsque l'utilisateur clique sur le lien. Devrait être une ancre de la page. Défaut "#main".`},     
        {nom: "texte-passer-contenu", type: "String (Optionnel)", description: `Texte du lien. Défaut "Passer au contenu" / "Skip to content".`},
        {nom: "afficher-recherche", type: "Boolean (Optionnel)", description: `Indique s'il faut afficher ou non le contrôle de recherche (Loupe + contrôle de saisie du texte recherché). Défaut "false".`},                
        {nom: "url-contenu-recherche", type: "String (Optionnel)", description: `Si spécifié, url à laquelle un appel (fetch) sera effectué afin d'obtenir le contenu de recherche au format attendu en JSON. Voir le composant <a href="/composants/actions/barrerecherche">barre de recherche</a> pour plus de détails.`}                
      ]
  }

  function obtenirTableauSlots() {
      return [
        {nom: "boutonRecherche", description: `<p>Contenu html à insérer dans la zone prévue pour le bouton de recherche. Normalement un lien ou un bouton avec une loupe.</p>`},
        {nom: "boutonRechercheMobile", description: `<p>Contenu html à insérer dans la zone prévue pour le bouton de recherche en mode mobile. Normalement un lien ou un bouton avec une loupe.</p>`},
        {nom: "zoneRecherche", description: `<p>Contenu html à insérer dans la zone prévue pour la zone de recherche. Normalement une boîte de texte avec autocomplétion ou un bouton qui lance la recherche. Peut aussi contenir un contrôle permettant d'afficher les résultats de recherche.</p>`}            
      ]
  }
</script>

<h1>PIV entête</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>PIV d'entête gouvernemental. Il inclu le lien "Passer au contenu" (possible de ne pas le générer au besoin), ainsi qu'une barre de recherche si requis.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible. <a href="https://xd.adobe.com/view/b098e26e-f500-4d59-b2cb-48ef475bbab3-e5cb/screen/130e1bf9-39c8-454f-bd97-f076a698361a/specs/" target="_blank">Voir les spécifications sur le XD de design Quebec.ca</a>.</p>

<h3>Particularités vs. le système de design Quebec.ca</h3>
<p>Nous avons 2 lignes potentielles pour le titre du site ou du service.</p>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h2>Événements disponibles</h2>
<p>Aucun événement spécifique au contrôle de piv d'entête. Cependant l'événement <span class="utd-emphase-gris">initialiser</span> du contrôle barre de recherche peut être nécessaire si la recherche à l'intérieur du PIV est activée.</p>
<p>Le code source de la section "Exemple" de la présente page contient un exemple de définition du contenu de recherche avec un callback.</p>
<p>Voir le composant <a href="/composants/actions/barrerecherche">barre de recherche</a> pour plus de détails.</p>

<h2>Exemple</h2>
<p>L'exemple contient le piv d'entête du présent site de démonstration.</p>

<CodeSource idElementCodeSource="pivEntete" outerhtml="true" titre="Code source (Html)">
</CodeSource>

{#if mounted}
    <CodeSource codeSource="{chargerContenuRecherche.toString()}" titre="Code source (js pour la recherche)" language="language-javascript">
    </CodeSource>   
{/if}   


<style>
</style>