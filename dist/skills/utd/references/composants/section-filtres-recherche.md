# Section filtres de recherche (`utd-section-filtres-recherche`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/sectionFiltresRecherche · Bundle : `utd-webcomponents.min.js`

Zone repliable qui regroupe les filtres d'une recherche.

Champs dans le slot par défaut, boutons dans le slot `boutons`.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `extensible` | true | Indique si la section doit être extensible ou non. Défaut "true" (extensible). |
| `reduit` | true | Indique si la section doit être réduite ou développée. Peut être mis à jour une fois le contrôle généré afin de modifier son état d'affichage (développée/réduite). Défaut "true" (réduite). |
| `titre` | "Filtres/Filters" | Titre affiché dans l'entête de la section. Défaut "Filtres/Filters". |
| `tag-titre` | h2 | Balise html à utiliser pour le titre de l'entête. Défaut "h2". |
| `conserver-etat-affichage` | false | Indique si l'état d'affichage (développé/réduit) de la section doit être conservé pendant la session (tant que le fureteur est ouvert). Défaut "false". IMPORTANT! Afin que la fonctionnalité de conservation d'état d'affichage fonctionne, le composant utd-section-filtres-recherche doit avoir un id, et idéalement un id qui est unique dans votre site. |

## Événements

Émis sur l'élément, sans `bubbles` : écouter avec `addEventListener` sur le composant lui-même.

| Événement | Clés de `detail` |
|---|---|
| `changementEtat` | `reduit` |

## Slots

| Slot | Description |
|---|---|
| (défaut) | Slot par défaut. Aucun nom à fournir. Contenu html entre les balises du contrôle. Est injecté dans la zone de contenu de la section. |
| `boutons` | Contenu html injecté dans le pied de la section. Exemple d'utilisation : Ajout des boutons permettant d'activer ou effacer les filtres. |

## Exemples

### Filtres de recherche

```html
<utd-section-filtres-recherche>
    <utd-champ-form libelle="Mots-clés" format="xl">
        <input type="text">
    </utd-champ-form>
    <div slot="boutons">
        <button type="button" class="utd-btn compact primaire">Appliquer les filtres</button>
        <button type="button" class="utd-btn compact tertiaire comme-lien">Effacer les filtres</button>
    </div>
</utd-section-filtres-recherche>
```

### Filtres ouverts, titre personnalisé, état conservé pendant la session

`conserver-etat-affichage` exige un `id` unique.

```html
<utd-section-filtres-recherche id="filtresDossiers" titre="Filtrer les dossiers" tag-titre="h3" reduit="false" conserver-etat-affichage="true">
    <utd-champ-form libelle="Province">
        <utd-liste-deroulante>
            <select>
                <option value="QC">Québec</option>
                <option value="ON">Ontario</option>
            </select>
        </utd-liste-deroulante>
    </utd-champ-form>
    <utd-champ-form format="compact">
        <label>
            <input type="checkbox" name="actifsSeulement" value="true">
            <span>Dossiers actifs seulement</span>
        </label>
    </utd-champ-form>
    <div slot="boutons">
        <button type="button" class="utd-btn compact primaire">Appliquer les filtres</button>
    </div>
</utd-section-filtres-recherche>
<script>
    document.getElementById('filtresDossiers').addEventListener('changementEtat', (e) => {
        console.log(e.detail.reduit ? 'réduite' : 'développée');
    });
</script>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/affichagecontenu/sectionFiltresRecherche
