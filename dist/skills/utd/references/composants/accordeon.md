# Accordéon (`utd-accordeon`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/accordeon · Bundle : `utd-webcomponents.min.js`

Section repliable sous un titre ; en série pour une FAQ.

Réduit par défaut : `reduit="false"` pour l'ouvrir. Titre riche : slot `titre` (sans élément interactif).

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `reduit` | true | Indique si l'accordéon doit être réduit ou développé. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développé/réduit). Défaut "true" (réduit). |
| `type` | "general" | Type de l'accordéon (icône/couleur). Valeurs possibles : `information`, `avertissement`, `succes`, `erreur`, ou `general`. Défaut "general". |
| `titre` |  | Titre affiché dans l'entête de l'accordéon. |
| `tag-titre` | h2 | Balise html à utiliser pour le titre de l'entête. Défaut "h2". |
| `contenu` |  | Texte à afficher dans la zone de contenu de l'accordéon. |
| `conserver-etat-affichage` | false | Indique si l'état d'affichage (développé/réduit) de l'accordéon doit être conservé pendant la session (tant que le fureteur est ouvert). Défaut "false". IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-accordeon doit avoir un id, et idéalement un id qui est unique dans votre site. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `changementEtat` | `reduit` |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de l'accordéon. |
| `titre` | Contenu html injecté dans l'entête de l'accordéon. Exemple d'utilisation : Ajout d'une icône à gauche du titre. Ne pas y placer d'élément interactif (lien, bouton) : le titre est déjà contenu dans un bouton. |

## Exemples

### Accordéon

```html
<utd-accordeon titre="Comment renouveler mon permis?" tag-titre="h3">
    <p>Remplissez le formulaire en ligne au moins 30 jours avant l'échéance.</p>
</utd-accordeon>
```

### FAQ ouverte par défaut, état conservé pendant la session

`conserver-etat-affichage` exige un `id` unique.

```html
<utd-accordeon id="faqDelais" reduit="false" tag-titre="h3" conserver-etat-affichage="true">
    <span slot="titre"><span class="utd-icone-ms" aria-hidden="true">schedule</span> Quels sont les délais de traitement?</span>
    <p>De 10 à 15 jours ouvrables.</p>
</utd-accordeon>
<script>
    document.getElementById('faqDelais').addEventListener('changementEtat', (e) => {
        console.log(e.detail.reduit ? 'réduit' : 'développé');
    });
</script>
```

### Accordéon typé (sites internes seulement)

`type` : `information`, `avertissement`, `succes`, `erreur`. Texte simple possible par `contenu` au lieu du slot.

```html
<utd-accordeon titre="Validation réussie" type="succes" contenu="Aucune erreur détectée dans le dossier."></utd-accordeon>
<utd-accordeon titre="Erreurs à corriger" type="erreur" reduit="false">
    <p>Le numéro de dossier est invalide.</p>
</utd-accordeon>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/accordeon
