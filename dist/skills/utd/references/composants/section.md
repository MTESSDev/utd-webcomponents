# Section (`utd-section`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/section · Bundle : `utd-webcomponents.min.js`

Bloc de contenu titré, repliable ou non, avec ou sans bordure.

Extensible et réduite par défaut : `reduit="false"` pour l'ouvrir, `extensible="false"` pour une section fixe. Titre riche : slot `titre`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `extensible` | true | Indique si la section doit être extensible ou non. Défaut "true" (extensible). |
| `reduit` | true | Indique si la section doit être réduite ou développée. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développée/réduite). Défaut "true" (réduite). |
| `bordure` | true | Indique si la section doit être affichée avec bordure ou non. Défaut "true" (avec bordure). |
| `titre` |  | Titre affiché dans l'entête de la section. |
| `tag-titre` | h2 | Balise html à utiliser pour le titre de l'entête. Défaut "h2". |
| `conserver-etat-affichage` | false | Indique si l'état d'affichage (développé/réduit) de la section doit être conservé pendant la session (tant que le fureteur est ouvert). Défaut "false". IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-section doit avoir un id, et idéalement un id qui est unique dans votre site. |
| `padding` | true | Indique si un padding est présent ou non. Défaut "true". À noter que si le padding est retiré, la bordure le sera également. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `changementEtat` | `reduit` |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de la section. |
| `titre` | Contenu html injecté dans l'entête de la section. Exemple d'utilisation : Ajout d'une icône à gauche du titre. |

## Exemples

### Section extensible ouverte

```html
<utd-section titre="Informations personnelles" reduit="false" tag-titre="h3">
    <p>Contenu.</p>
</utd-section>
```

### Section fixe sans bordure ni padding

`padding="false"` retire aussi la bordure.

```html
<utd-section titre="Liste des employés" extensible="false" padding="false">
    <table class="utd-table">...</table>
</utd-section>
```

### Section contrôlée par code, état conservé pendant la session

`conserver-etat-affichage` exige un `id` unique.

```html
<utd-section id="sectionVehicules" reduit="false" bordure="false" conserver-etat-affichage="true">
    <span slot="titre"><span class="utd-icone-ms" aria-hidden="true">directions_car</span> Véhicules</span>
    <p>Contenu.</p>
</utd-section>
<button type="button" id="btnVehicules" class="utd-btn secondaire compact">Réduire / développer</button>
<script>
    const section = document.getElementById('sectionVehicules');
    document.getElementById('btnVehicules').addEventListener('click', () => {
        section.setAttribute('reduit', section.getAttribute('reduit') === 'true' ? 'false' : 'true');
    });
    section.addEventListener('changementEtat', (e) => {
        console.log(e.detail.reduit ? 'réduite' : 'développée');
    });
</script>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/section
