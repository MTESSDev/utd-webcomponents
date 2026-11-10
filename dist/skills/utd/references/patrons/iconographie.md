# Iconographie

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographie

Icônes Material Symbols : `utd-icone-ms`, toujours décoratives.

Icône Material Symbols : nom de l'icône comme texte de `span.utd-icone-ms`, toujours `aria-hidden="true"` (le sens est porté par le texte voisin). Classes combinables : taille `t12` à `t72`, graisse `light|medium|sbold|bold`, couleur, `filled`, rotation `utd-rotate-90|180|270`.

## Accessibilité

Une icône est toujours considérée comme **décorative** : elle illustre visuellement un sens déjà exprimé par le texte adjacent. Il faut donc systématiquement lui ajouter `aria-hidden="true"` afin que les lecteurs d'écran l'ignorent et ne lisent pas le nom technique de l'icône (ex. *check_circle*).

La seule exception concerne les **boutons avec icône seulement**, où c'est le bouton lui-même (et non l'icône) qui doit porter un libellé accessible. Consultez la page [Boutons](https://lively-cliff-018a9540f.azurestaticapps.net/composants/actions/boutons) pour les détails.

## Exemples

### Icône décorative

```html
<span class="utd-icone-ms t24 vert filled" aria-hidden="true">check_circle</span> Demande approuvée
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/bases/iconographie
