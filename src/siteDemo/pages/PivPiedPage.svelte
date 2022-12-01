<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let tableauParametres = [];
  let tableauSlots = [];

  onMount(() => {
    tableauParametres = obtenirTableauParametres()
    tableauSlots = obtenirTableauSlots()
  })

  function obtenirTableauParametres() {
      return [
        {nom: "url-logo", type: "String (Optionnel)", description: `Url à ouvrir dans un nouvel onglet lorsque l'utilisateur clique sur le logo. Défaut : "https://www.mtess.gouv.qc.ca/" / "https://www.mtess.gouv.qc.ca/index_en.asp".`},
        {nom: "alt-logo", type: "String (Optionnel)", description: `Texte alternatif du logo. Défaut : "Ministère de l'Emploi et de la Solidarité sociale".`},
        {nom: "src-logo", type: "String (Optionnel)", description: `Source (attribut "src") du logo. Défaut logo du MESS "/images/logo_piv_bas_page.png" inclu avec les composants utd.`},
        {nom: "width-logo", type: "Integer (Optionnel)", description: `Largeur du logo. Défaut : "210".`},
        {nom: "height-logo", type: "Integer (Optionnel)", description: `Hauteur du logo. Défaut : "81".`},
        {nom: "texte-copyright", type: "String (Optionnel)", description: `Texte du copyright. Défaut "© Gouvernement du Québec, ".`},     
        {nom: "annee-copyright", type: "Integer (Optionnel)", description: `Année du copyright. Défaut "2022".`},     
        {nom: "url-copyright", type: "String (Optionnel)", description: `Url à ouvrir dans un nouvel onglet lorsque l'utilisateur clique sur le copyright. Défaut : "https://www.quebec.ca/droit-auteur" / "https://www.quebec.ca/en/copyright".`},     
        {nom: "texte-sr-ouverture-nouvel-onglet", type: "String (Optionnel)", description: `Texte lu au lecteur écran indiquant qu'un lien est ouvert dans un nouvel onglet. Défaut ". Ce lien sera ouvert dans un nouvel onglet." / ". This link will open in a new tab.".`}
      ]
  }

  function obtenirTableauSlots() {
      return [
        {nom: "liens", description: `<p>Contenu html (normalement "ul" avec des "li" contenant des hyperliens) dans le menu de liens. Aucun css à prévoir si la structure "ul", "li", "a" est respectée. (Voir exemple)</p>`}
      ]
  }

</script>

<h1>PIV pied de page</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>PIV de pied de page gouvernemental. Inclu le menu de liens.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible. <a href="https://www.piv.gouv.qc.ca/fileadmin/documents/guide/section4_numerique.pdf" target="_blank">Voir les spécifications du guide des communications électronique gouvernementales</a>.</p>

<h2>Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>Slots disponibles</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>


<h2>Exemple</h2>
<p>L'exemple contient le piv de pied de page du présent site de démonstration.</p>

<CodeSource idElementCodeSource="pivPiedPage" outerhtml="true">
</CodeSource>

<style>
</style>