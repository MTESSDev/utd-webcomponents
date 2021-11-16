export class Utils {
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
            return element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
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

        html.classList.add("modale-ouverte")      
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
        html.classList.remove("modale-ouverte")
    }

    static slotExiste(slots, nomSlot) {
        return slots.some(s => s.slot === nomSlot)
    }
}