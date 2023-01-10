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
          {nom: "titre", type: "String (Optionnel)", description: `Titre affiché au dessus du menu (si titre-visible="true") ou au lecteur écran seulement sinon. Défaut : "Menu secondaire" / "Secondary menu".`},
          {nom: "titre-visible", type: "Boolean (Optionnel)", description: `Indique si le titre du menu est affiché ou non. Défaut : "true" (titre visible).`},
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
        {nom: "défaut", description: `<p>Slot par défaut. Aucun nom à fournir.</p><p>Contenu html entre les balises du contrôle. Ne devrait contenir que des composants <span class="utd-emphase-gris">utd-menu-vertical-item</span>.</p>`}
      ];
  }


</script>

<h1>Menu vertical</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Menu vertical à deux niveaux. Il est généré à partir de deux composants, soit <span class="utd-emphase-gris">utd-menu-vertical</span> et <span class="utd-emphase-gris">utd-menu-vertical-item</span>.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-vertical</span> contient l'ensemble du menu.</p>
<p>Le composant <span class="utd-emphase-gris">utd-menu-vertical-item</span> correspond à un élément du menu et peut contenir d'autres composants <span class="utd-emphase-gris">utd-menu-vertical-item</span> (menu/sous-menu).</p>
<p>Pour le moment seuls deux niveaux sont supportés.</p>

<h2>utd-menu-vertical - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres}">
</TableauParams>

<h2>utd-menu-vertical-item - Attributs disponibles</h2>
<TableauParams parametres="{tableauParametres2}">
</TableauParams>

<h2>Slots disponibles (utd-menu-vertical et utd-menu-vertical-item)</h2>
<TableauSlots parametres="{tableauSlots}">
</TableauSlots>

<h3>Référence système de design Quebec.ca</h3>
<p>Non disponible.</p>

<h2>Exemple</h2>
<p>L'exemple contient le menu vertical du présent site de démonstration.</p>

<CodeSource idElementCodeSource="menuVertical" outerhtml="true">
</CodeSource>


<style>
</style>