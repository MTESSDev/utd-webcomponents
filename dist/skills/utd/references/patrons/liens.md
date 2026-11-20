# Liens

Démo : https://lively-cliff-018a9540f.azurestaticapps.net/bases/liens

Liens de contenu : internes, externes, documents.

Libellé compris hors contexte (jamais « cliquez ici »). Lien externe : `target="_blank"` puis appeler `utd.ajusterAccessibiliteLiens()` au chargement de la page et après toute injection de contenu ; l'icône et son texte lecteur d'écran sont ajoutés. Document : `a.utd-lien-document` avec type et poids ; liste : `ul.utd-liste-liens-documents`.

## Exemples

### Lien externe

```html
<a href="https://www.quebec.ca" target="_blank">Portail Québec.ca</a>
```

```js
utd.ajusterAccessibiliteLiens();
```

### Lien vers un document

```html
<a class="utd-lien-document" href="/docs/guide.pdf">
    <span class="utd-titre-doc">Guide du demandeur</span>
    <span class="utd-infos-doc">(PDF 1,2 Mo)</span>
</a>
```

Autres exemples : https://lively-cliff-018a9540f.azurestaticapps.net/bases/liens
