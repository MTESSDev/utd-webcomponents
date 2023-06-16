
export class Utils {
    static relativeBasePath = document.currentScript.getAttribute('relative-base-path') || '';
    static cssRelativePath = `${this.relativeBasePath.replace(/\/$/, '')}/css/`
    static imagesRelativePath = `${this.relativeBasePath.replace(/\/$/, '')}/images/`
    static cssFullPath = `${this.cssRelativePath}utd-webcomponents.min.css?v=_vUtd_`

    static conserverFocusElement(componentShadow, componentRoot) {
        const elementsFocusablesShadow = Array.from(this.obtenirElementsFocusables(componentShadow))
        const elementsFocusablesRoot = Array.from(this.obtenirElementsFocusables(componentRoot))
        const elementsFocusables = elementsFocusablesShadow.concat(elementsFocusablesRoot)

        const premierElementFocusable = elementsFocusables[0];
        const dernierElementFocusable = elementsFocusables[elementsFocusables.length - 1];
        const KEYCODE_TAB = 9;

        componentShadow.addEventListener('keydown', function(e) {
            let estToucheTab = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

            if (!estToucheTab) {
                return
            }
    
            const elementActif = document.activeElement.shadowRoot ? document.activeElement.shadowRoot.activeElement : document.activeElement
            if (e.shiftKey) /* shift + tab */ {
                if (elementActif === premierElementFocusable) {
                    dernierElementFocusable.focus()
                    e.preventDefault()
                }
            } else /* tab */ {
                if (elementsFocusables.length === 1 || elementActif === dernierElementFocusable ) {
                    premierElementFocusable.focus()
                    e.preventDefault()
                }
            }    
        })
    }
    static obtenirElementsFocusables(element) {
            return element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled])')
        }
    /**
     * Génère un id unique.
     * @returns L'id unique généré.
     */
    static genererId() {
        return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
    }
    /**
     * Créé un événement custom pour un webComponent.
     * @param {*} component Objet associé à notre composant (objet DOM).
     * @param {*} nomEvenement Nom de l'événement. 
     * @param {*} detailsEvenement Détails de l'événement.
     */
    static dispatchWcEvent = (component, nomEvenement, detailsEvenement) => {
        component.dispatchEvent(new CustomEvent(nomEvenement, {
            detail: detailsEvenement,
            composed: true // propage l'événement à travers le shadow DOM (Remonte au document)
        }))
    }

    static estMobile() {
        return navigator.maxTouchPoints || 'ontouchstart' in document.documentElement
    }

    static ajusterInterfaceAvantAffichageModale(html, body) {
        
        if(!this.estMobile()){
            const largeurScrollbarHtml = window.innerWidth - html.offsetWidth

            if(largeurScrollbarHtml > 0){
                html.style['padding-right'] = largeurScrollbarHtml + 'px'
            } 
            else {
                const largeurScrollbarBody = window.innerWidth - body.offsetWidth
                if(largeurScrollbarBody > 0){
                    body.style['padding-right'] = largeurScrollbarBody + 'px'
                }
            }
        }      
        /* On s'assure que le scroll ne changera pas une fois le body modifié avec position fixe */
        const scrollY = window.scrollY;
        html.classList.add("utd-modale-ouverte")
        document.body.style.top = `-${scrollY}px`;
    }

    static ajusterInterfacePendantAffichageModale(body, modale) {

        if(!this.estMobile()){
            const largeurScrollbarModale = window.innerWidth - modale.offsetWidth
            if(largeurScrollbarModale > 0){
                body.style['padding-right'] = largeurScrollbarModale + 'px'
            }     
        }         
    }

    static ajusterInterfaceApresFermetureModale(html, body) {        
        html.style.removeProperty('padding-right')
        body.style.removeProperty('padding-right')
        html.classList.remove("utd-modale-ouverte")

        /* Repositionner l'écran où il était avant l'affichage de la modale. */    
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    static slotExiste(slots, nomSlot) {
        return slots.some(s => s.slot === nomSlot)
    }

    static obtenirSlot(slots, nomSlot) {
        return slots.find(s => s.slot === nomSlot)
    }

    static obtenirTextesDefaut() {
        const textes = {
            texteSrOuvertureNouvelOnglet: this.obtenirLanguePage() === 'fr' ? `. Ce lien sera ouvert dans un nouvel onglet.` : `. This link will open in a new tab.`
        }
        return textes
    }
    /**
     * Obtient la langue de la page courante.
     * @returns {string} Code de langue de la page courante (fr/en).
     */
    static obtenirLanguePage() {
        return document.getElementsByTagName("html")[0].getAttribute("lang") || "fr";
    }

    /**
     * Permet de palier au fait que svelte converti en booleen la valeur d'un attribut si celui-ci est vide (ex. titre="", la valeur considérée par svelte est true, alors que nous c'est une attribut vide, qu'on ne devrait pas traiter. Nos if ne fonctionnent pas comme prévu dans cette situation)
     * On considère donc qu'un attribut est absent, si l'attribut n'est pas spécifié, vide ou true (valeur booléenne que svelte utilise si attribut est vide, et ça ne peut jamais arriver sauf dans cette circonstance car normalement les attributs sont toujours des strings)
     * @param {*} attribut Valeur de l'attribut à vérifier
     * @returns Booléen indiquant si l'attribut doit être considéré comme présent ou non
     */
    static estAttributPresent(attribut) {
        return attribut && attribut !== true
    }    

    static obtenirParents(element) {            
        const parents = []
            
        for ( ; element && element !== document; element = element.parentNode ) {
            parents.push(element)
        }
    
        return parents       
    }        

    /**
     * Permet de debouncer une fonction.
     * @param {Object} func Fonction à debouncer.
     * @param {Number} timeout Délai du debounce.
     */
    static debounce(func, timeout = 400) {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args); }, timeout)
        }
    }

    static extend (first, second) {
        for (var secondProp in second) {
            var secondVal = second[secondProp]
            // Is this value an object?  If so, iterate over its properties, copying them over
            if (secondVal && Object.prototype.toString.call(secondVal) === "[object Object]") {
                first[secondProp] = first[secondProp] || {}
                this.extend(first[secondProp], secondVal)
            }
            else {
                first[secondProp] = secondVal
            }
        }
        return first
    }

    static reafficherApresChargement(composant) {
        setTimeout(() => {
            composant.classList.add('mounted')
        })        
    }

    /**
     * Normalise une chaîne de caractères pour utilisation insensible à la case et aux accents.
     * @param {string} chaineCaracteres Chaîne de caractères.
     * */
    static normaliserChaineCaracteres(chaineCaracteres) {
        return this.normaliserApostrophes(this.remplacerAccents(chaineCaracteres).toLowerCase())
    }   

    /**
    * Normaliser les apostrophes d'une chaîne de caractères.
    * @param {string} chaineCaracteres Chaîne de caractères.
    **/
    static normaliserApostrophes(chaineCaracteres) {
        return chaineCaracteres.replace(/[\u2018-\u2019]/g, '\u0027')
    }

    /**
     * Remplace les accents d'une chaîne de caractères.
     * @param {string} chaineCaracteres Chaîne de caractères.
     * */
    static remplacerAccents(chaineCaracteres) {
        return chaineCaracteres.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    
    /**
     * Génère un id à partir du texte spécifié. Le texte est normalisé, puis tous les caractères non textuels sont remplacés par des underscore "_".
     * @param {string} texte Texte à partir duquel il faut créer un id.
     * @returns Un id généré à partir du texte.
     */
    static obtenirIdSelonTexte(texte){
        const texteNormalise = this.normaliserChaineCaracteres(texte)
        return texteNormalise.replace(/\W/g,'_')        
    }

    /**
     * Creates nested groups by object properties.
     * `properties` array nest from highest(index = 0) to lowest level.
     *
     * @param {String[]} properties
     * @returns {Object}
     */
    static nestGroupsBy(arr, properties) {
        properties = Array.from(properties);
        if (properties.length === 1) {
            return this.groupBy(arr, properties[0]);
        }

        const property = properties.shift();
        var grouped = this.groupBy(arr, property);
        for (let key in grouped) {
            grouped[key] = this.nestGroupsBy(grouped[key], Array.from(properties));
        }
        return grouped;
    }
  
    /**
     * Group objects by property.
     * `nestGroupsBy` helper method.
     *
     * @param {String} property
     * @param {Object[]} conversions
     * @returns {Object}
     */
    static groupBy(conversions, property) {
        return conversions.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
        }, {});
    }    
}

