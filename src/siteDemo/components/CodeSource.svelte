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
  export let outerhtml = "false"

  let controleCodeSource = null  
  let estSuccesCopie = false
  const idConteneurCode = Utils.genererId()
  const idBoutonCopier = 'copier' + idConteneurCode
  const estCopieSupportee = ClipboardJS.isSupported()

  let clipboard = null

  onMount(() => {
    if(codeSource){
      if(language === 'language-javascript'){
        codeSource = obtenirCodeSourceFormate2(codeSource)
      } else {
        codeSource = obtenirCodeSourceFormate(codeSource)  
      }      
    } else {
      controleCodeSource = document.getElementById(idElementCodeSource)
      codeSource = obtenirCodeSourceFormate(outerhtml === 'true' ? controleCodeSource.outerHTML : controleCodeSource.innerHTML)
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
      "preserve-newlines": true,
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
    //Ajout de sauts de ligne sur certaines balises afin d'avoir un plus beau formatage
    codeSource = codeSource.replace(/<span/g, "\r\n<span")
    codeSource = codeSource.replace(/<button/g, "\r\n<button")
    codeSource = codeSource.replace(/<div/g, "\r\n<div")
    codeSource = codeSource.replace(/<label/g, "\r\n<label")
    codeSource = codeSource.replace(/<input/g, "\r\n<input")

    return nettoyerCode(html_beautify(codeSource, options))
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

    return nettoyerCode(js_beautify(codeSource))    
  }

  function nettoyerCode(code) {
    return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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

