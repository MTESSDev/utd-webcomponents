<script>
  import { onMount } from 'svelte';
  import CodeSource from '../components/CodeSource.svelte'; 
  import TableauParams from '../components/TableauParams.svelte'; 
  import TableauSlots from '../components/TableauSlots.svelte'; 

  let tableauParametres = [];
  let tableauParametres2 = [];
  let tableauSlots = [];

  onMount(() => {
      tableauParametres = obtenirTableauParametres();
      tableauParametres2 = obtenirTableauParametres2();
      tableauSlots = obtenirTableauSlots();
  })

  function obtenirTableauParametres() {
      return [
          {nom: "titre", type: "String (Optionnel)", description: `Titre lu au lecteur écran seulement. Défaut : "Menu principal de navigation" / "Main navigation menu".`},
          {nom: "largeur-viewport-menu-burger", type: "Integer (Optionnel)", description: `Largeur d'écran à partir de laquelle l'affichage du menu est forcé en mobile, i.e Affichage d'un seul élément de menu (menu burger) nommé "Menu". Défaut : 475.`},          
          {nom: "afficher-icone-accueil", type: "Booléen (Optionnel)", description: `Indique si le lien "accueil/home" (icône "maison") doit être affiché ou non. Défaut : false.`},          
          {nom: "titre-accueil", type: "String (Optionnel)", description: `Title (icône maison) et texte (dans le menu burger) associé au lien "accueil" si affiché. Sera aussi le texte affiché  Défaut : Accueil / Home.`},          
          {nom: "url-accueil", type: "String (Optionnel)", description: `Url vers laquelle le lien "accueil" doit rediriger. Défaut : "/".`}
      ];
  }

  function obtenirTableauParametres2() {
      return [
          {nom: "libelle", type: "String", description: `Texte du lien associé à l'item de menu. Il est possible d'ajouter "&lt;br/&gt;" afin de forcer un saut de ligne dans le texte.`},
          {nom: "href", type: "String (Optionnel)", description: `Valeur de l'attribut "href" du lien dans l'item de menu.`},
      ];
  }

  function obtenirTableauSlots() {
      return [
        {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Ne devrait contenir que des composants <span class="utd-emphase-gris">utd-menu-horizontal-item</span>.</p>`}
      ];
  }


</script>

<h1>Menu horizontal</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Menu de navigation horizontal applicatif à deux niveaux. Il est généré à partir de deux composants, soit <span class="utd-emphase-gris">utd-menu-horizontal</span> et <span class="utd-emphase-gris">utd-menu-horizontal-item</span>.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-horizontal</span> contient l'ensemble du menu.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-horizontal-item</span> correspond à un élément du menu et peut contenir d'autres composants <span class="utd-emphase-gris">utd-menu-horizontal-item</span> (menu/sous-menu).</p>
<p>Comme il s'agit d'un menu horizontal "applicatif" et non "informationnel", seuls deux niveaux sont supportés.</p>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h3>Références d'accessibilité</h3>
<p>Le "disclosure pattern" <a href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/" target="_blank">tel que défini au W3C</a> a été utilisé.</p>

<h3>Particularités</h3>
<p>Le menu horizontal faire partie du "bandeau principal" qui est constitué du menu principal (le présent) et d'une zone de raccourcis et d'éléments liés à la connexion.</p>
<p>La zone de raccourcis et d'éléments liés à la connexion/déconnexion ne fait pas partie du menu horizontal, et son contenu devrait se restreindre à quelques icônes de raccourcis et un bouton de connexion/déconnexion.</p>
<p>Cependant les deux doivent être intégrés dans une structure html particulière. Voir les éléments de classe <span class="utd-emphase-gris">utd-bandeau-principal</span>, <span class="utd-emphase-gris">utd-container</span> et <span class="utd-emphase-gris">utd-zone-raccourcis-connexion</span> dans l'<a href="#exemple">exemple</a>.</p>

<h2>utd-menu-horizontal - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>utd-menu-horizontal-item - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres2}">
</TableauParams>

<h2>Slots disponibles (utd-menu-horizontal et utd-menu-horizontal-item)</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>



<h2 id="exemple">Exemple</h2>
<p>L'exemple contient le menu horizontal du présent site de démonstration avec quelques éléments fictifs supplémentaires visibles uniquement dans la présente page.</p>

<utd-avis titre="Important!">
    <p>Le menu horizontal doit être intégré dans une structure html particulière. Voir les éléments de classe <span class="utd-emphase-gris">utd-bandeau-principal</span> et <span class="utd-emphase-gris">utd-container</span> dans l'exemple.</p>
</utd-avis>
<CodeSource idElementCodeSource="bandeauPrincipal" outerhtml="true">
</CodeSource>


<style>
</style>