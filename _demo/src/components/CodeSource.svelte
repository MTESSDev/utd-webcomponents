<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import {HighlightJS} from "highlight.js"
  import {html_beautify} from "js-beautify"
  import {js_beautify} from "js-beautify"
  
  export let titre = "Code source"
  export let idElementCodeSource = ""
  export let codeSource = ""
  export let language = "language-html"
  export let outerhtml = "false"
  export let breakAfter = ""

  let controleCodeSource = null  
  let estSuccesCopie = false
  const idConteneurCode = genererId()
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

  /**
   * Génère un id unique. ATTENTION ici on fait exprès de ne pas utiliser la méthode genererId de notre classe Utils car ca provoque des bugs dans les anciens fureteurs (ex. Safari < 14.1). Si on utilise Babel comme pour notre librairie, nous avons d'autres problèmes.
   * Comme c'est la seule méthode utilisée, on la recopie ici afin d'éviter les problèmes. Sera peut-être à creuser éventuellement.
   * @returns L'id unique généré.
   */
  function genererId() {
      return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
  }

  function obtenirCodeSourceFormate(code) {

    const options = {
      "indent":"auto",
      "indent-spaces":4,
      "wrap":300,
      "markup":true,
//      "preserve-newlines": true,
      "preserve-newlines": false,
      "max_preserve_newlines": 1,
      "output-xml":true,
      "numeric-entities":true,
      "quote-marks":true,
      "quote-nbsp":false,
      "show-body-only":false,
      "quote-ampersand":false,
//      "break-before-br":true,
      "break-before-br":false,
      "uppercase-tags":false,
      "uppercase-attributes":false,
      "drop-font-tags":true,
      "tidy-mark":false,
    }

    let codeSource = code

    const tagsUtd = [... new Set(codeSource.match(/<utd-.[^<]*>/gi))]
    tagsUtd.forEach((tag) => {
      codeSource = codeSource.replace(tag, tag + "\r\n")
    })

    const divs = [... new Set(codeSource.match(/<div.[^<]*>/gi))]
    divs.forEach((tag) => {
      codeSource = codeSource.replace(tag, tag + "\r\n")
    })

    const ba = breakAfter.replace(/\s/g,'').split(",")
    ba.forEach((tag) =>{
      const regEx = new RegExp(`<\/${tag}>`, "g");
      codeSource = codeSource.replace(regEx, `</${tag}>\r\n`)
    })

    //Ajout de sauts de ligne sur certaines balises afin d'avoir un plus beau formatage
    codeSource = codeSource.replace(/<span/g, "\r\n<span")
    codeSource = codeSource.replace(/<\/span>/g, "</span>\r\n")
    codeSource = codeSource.replace(/<\/a>/g, "</a>\r\n")
    codeSource = codeSource.replace(/<button/g, "\r\n<button")
    codeSource = codeSource.replace(/<div/g, "\r\n<div")
    codeSource = codeSource.replace(/<label/g, "\r\n<label")
    codeSource = codeSource.replace(/<\/label>/g, "</label>\r\n")
    codeSource = codeSource.replace(/<input/g, "\r\n<input")

    codeSource = codeSource.replace(/\r\n<\/utd-menu-vertical-item>/g, "</utd-menu-vertical-item>")
    codeSource = codeSource.replace(/\r\n<\/utd-menu-ancres>/g, "</utd-menu-ancres>")
    codeSource = codeSource.replace(/\r\n<\/utd-hautpage>/g, "</utd-hautpage>")

    codeSource = codeSource.replace(/\r\n\r\n/g, "\r\n")
    codeSource = codeSource.replace(/\r\n\s\r\n/g, "\r\n")
    codeSource = codeSource.replace(/\r\n\r\n/g, "\r\n")      
    codeSource = codeSource.replace(/\r\n\r\n/g, "\r\n")

//    codeSource = codeSource.replace(/<sl><\/sl>/g, "\r")
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

