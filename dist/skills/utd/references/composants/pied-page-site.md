# Pied de page de site (`utd-pied-page-site`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/piedpagesite · Bundle : `utd-webcomponents.min.js`

Liens propres au site (sections, réseaux sociaux) en pied de page.

Mise en forme du slot `contenu` à la charge du site. Envelopper dans `footer` (le composant n'en crée pas) et titrer chaque groupe de liens.

## Slots

| Slot | Description |
|---|---|
| `contenu` | Contenu html à insérer dans la zone pied de page de site. Devrait contenir des éléments "nav" contenant des listes de liens. Le composant ne génère pas de balise `footer` : l'envelopper dans un élément `footer` pour exposer le repère contentinfo. Ne pas oublier les headers (visibles ou non) permettant d'identifier les groupes de liens et d'y accéder rapidement au clavier. |

## Exemples

### Pied de page de site

```html
<footer class="utd">
    <utd-pied-page-site>
        <div slot="contenu">
            <nav aria-labelledby="titreLiensPied">
                <h2 id="titreLiensPied" class="utd-sr-only">Liens du site</h2>
                <ul>
                    <li><a href="/nous-joindre">Nous joindre</a></li>
                </ul>
            </nav>
        </div>
    </utd-pied-page-site>
    <utd-piv-pied-page></utd-piv-pied-page>
</footer>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/piedpagesite
