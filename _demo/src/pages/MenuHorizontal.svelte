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
      ];
  }

  function obtenirTableauParametres2() {
      return [
          {nom: "libelle", type: "String", description: `Texte du lien associé à l'item de menu.`},
          {nom: "href", type: "String", description: `Valeur de l'attribut "href" du lien dans l'item de menu.`},
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
<p>Menu de navigation horizontal à deux niveaux. Il est généré à partir de deux composants, soit <span class="utd-emphase-gris">utd-menu-horizontal</span> et <span class="utd-emphase-gris">utd-menu-horizontal-item</span>.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-horizontal</span> contient l'ensemble du menu.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-horizontal-item</span> correspond à un élément du menu et peut contenir d'autres composants <span class="utd-emphase-gris">utd-menu-horizontal-item</span> (menu/sous-menu).</p>
<p>Pour le moment seuls deux niveaux sont supportés.</p>

<h2>utd-menu-horizontal - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>utd-menu-horizontal-item - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres2}">
</TableauParams>

<h2>Slots disponibles (utd-menu-horizontal et utd-menu-horizontal-item)</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h2>Exemple</h2>
<p>L'exemple contient le menu horizontal du présent site de démonstration avec quelques éléments fictifs supplémentaires visibles uniquement dans la présente page.</p>

<CodeSource idElementCodeSource="menuVertical" outerhtml="true">
</CodeSource>


<style>
</style>