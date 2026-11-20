# PIV pied de page (`utd-piv-pied-page`)

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/pivpiedpage · Bundle : `utd-webcomponents.min.js`

Pied de page gouvernemental obligatoire (Accessibilité, Politiques).

Dans le `footer`, en dernier. Slot `liens` : structure `ul > li > a`, sans CSS à prévoir.

## Attributs

| Attribut | Défaut | Description |
|---|---|---|
| `texte-titre-sr-liens` | (calculé) | Texte du titre "h2" lu au lecteur écran pour le menu de liens. Défaut : "Liens vers informations complémentaires" / "Links to additional information". |
| `url-logo` | (calculé) | Url à ouvrir dans un nouvel onglet lorsque l'utilisateur clique sur le logo. Défaut : "https://www.mtess.gouv.qc.ca/" / "https://www.mtess.gouv.qc.ca/index_en.asp". |
| `alt-logo` | (calculé) | Texte alternatif du logo. Défaut : "Ministère du Travail, de l'Emploi et de la Solidarité sociale". |
| `src-logo` | (calculé) | Source (attribut "src") du logo. Défaut logo du MESS "/images/logo_piv_bas_page.png" inclu avec les composants utd. |
| `width-logo` | 210 | Largeur du logo. Défaut : "210". |
| `height-logo` | 81 | Hauteur du logo. Défaut : "81". |
| `texte-copyright` | "© Gouvernement du Québec, " | Texte du copyright. Défaut "© Gouvernement du Québec, ". |
| `annee-copyright` | l'année courante | Année du copyright : indiquer l'année de publication du site. Défaut : l'année courante. |
| `url-copyright` | (calculé) | Url à ouvrir dans un nouvel onglet lorsque l'utilisateur clique sur le copyright. Défaut : "https://www.quebec.ca/droit-auteur" / "https://www.quebec.ca/en/copyright". |
| `texte-sr-ouverture-nouvel-onglet` | (calculé) | Texte lu au lecteur écran indiquant qu'un lien est ouvert dans un nouvel onglet. Défaut ". Ce lien sera ouvert dans un nouvel onglet." / ". This link will open in a new tab.". |

## Slots

| Slot | Description |
|---|---|
| `liens` | Contenu html (normalement "ul" avec des "li" contenant des hyperliens) dans le menu de liens. Aucun css à prévoir si la structure "ul", "li", "a" est respectée. (Voir exemple) |

## Exemples

### PIV pied de page

```html
<footer class="utd">
    <utd-piv-pied-page annee-copyright="2025">
        <div slot="liens">
            <ul>
                <li><a href="/accessibilite">Accessibilité</a></li>
                <li><a href="/confidentialite">Politique de confidentialité</a></li>
            </ul>
        </div>
    </utd-piv-pied-page>
</footer>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/composants/entetepiedpage/pivpiedpage
