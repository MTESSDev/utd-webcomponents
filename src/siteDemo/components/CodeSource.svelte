<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import {HighlightJS} from "highlight.js"
  import {html_beautify} from "js-beautify"
  import {js_beautify} from "js-beautify"
  import { Utils } from '../../librairie/components/utils.js'
  
  export let titre = "Code source"
  export let idElementCodeSource = ""
  export let codeSource = ""
  export let language = "language-html"

  let controleCodeSource = null  
  let estSuccesCopie = false
  const idConteneurCode = Utils.genererId()
  const idBoutonCopier = 'copier' + idConteneurCode
  const estCopieSupportee = ClipboardJS.isSupported()

  let clipboard = null

  onMount(() => {
    if(!codeSource){
      controleCodeSource = document.getElementById(idElementCodeSource)
      codeSource = obtenirCodeSourceFormate(controleCodeSource.outerHTML)
    } else {
      codeSource = obtenirCodeSourceFormate2(codeSource)
    }

    setTimeout(function(){ 
      const conteneurCode = document.getElementById(idConteneurCode)
      HighlightJS.highlightElement(conteneurCode)
      if(estCopieSupportee){
        clipboard = new ClipboardJS('#' + idBoutonCopier)

        clipboard.on('success', function(e) {
          e.clearSelection()
          estSuccesCopie = true
          setTimeout(() => {
            estSuccesCopie = false
          }, 3000);
        })

        clipboard.on('error', function(e) {
          console.log('Erreur le de la copie dans le presse-papier.')
        })
      }
    }, 100);
    
  })

  function obtenirCodeSourceFormate(code) {

    const options = {
      "indent":"auto",
      "indent-spaces":4,
      "wrap":300,
      "markup":true,
      "output-xml":true,
      "numeric-entities":true,
      "quote-marks":true,
      "quote-nbsp":false,
      "show-body-only":false,
      "quote-ampersand":false,
      "break-before-br":true,
      "uppercase-tags":false,
      "uppercase-attributes":false,
      "drop-font-tags":true,
      "tidy-mark":false,
      "new-blocklevel-tags": "utd-avis"
    }

    let codeSource = code
    codeSource = codeSource.replace(/<span/g, "\r\n<span")
    codeSource = codeSource.replace(/<button/g, "\r\n<button")

    codeSource = html_beautify(codeSource, options) 
    return codeSource.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function obtenirCodeSourceFormate2(code) {

    const options = {
      "indent":"auto",
      "indent-spaces":4,
      "wrap":300,
      "markup":true,
      "output-xml":true,
      "numeric-entities":true,
      "quote-marks":true,
      "quote-nbsp":false,
      "show-body-only":false,
      "quote-ampersand":false,
      "break-before-br":true,
      "uppercase-tags":false,
      "uppercase-attributes":false,
      "drop-font-tags":true,
      "tidy-mark":false
    }

    let codeSource = code

    codeSource = js_beautify(codeSource) 
    return codeSource.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  }
</script>

<utd-accordeon titre="{titre}">
  <span slot="contenu">

    <div class="code-source">
      <pre>
        <code class="{language}" id={idConteneurCode}>
          {@html codeSource}
        </code>
      </pre>
      {#if estCopieSupportee}
        <div class="zone-copie">
          <button type="button" class="utd-btn secondaire compact avec-icone-droite copier" id="{idBoutonCopier}" data-clipboard-target="#{idConteneurCode}">
            <span class="texte">Copier le code</span>
            <span class="utd-icone-svg clipboard md copier" aria-hidden="true"></span>
          </button>
          {#if estSuccesCopie}
            <span class="message-copie" transition:fly>Copié!</span>
          {/if}
        </div>
      {/if}

    </div>
  </span>
</utd-accordeon>
<style>
</style>

