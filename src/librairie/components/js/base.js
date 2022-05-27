//TODO ajouter possibilité que utd reçoive les textes de langue requis. De quelle façon?
//A- En paramètre des méthodes qui en ont besoin
//B- Globalement via une initialisation de texte UTD qui serait faite une fois.

/*======================================================================================================================*/
/* -10- FENÊTRES DE MESSAGE
/*======================================================================================================================*/
export const message = (function () {

    const elementsPublics = {};

    /**
     * Affiche une fenêtre de message (dialog).
     * @param {Object} parametres Paramètres.
     * @param {Object} parametres.type Type de message ("erreur", "information", "avertissement", "succes"  pour l'instant, autres types à venir). Défaut "avertissement".
     * @param {Object} parametres.titre Titre du message. Texte brut ou HTML (ex. Annuler les modifications) Défaut "". 
     * @param {Object} parametres.corps Corps du message. Texte brut ou HTML (ex. Désirez-vous annuler les modifications ou poursuivre?.) Défaut "".
     * @param {Object} parametres.texteBoutonPrimaire Texte du bouton primaire. (Celui le plus à droite). Si vide n'est pas affiché.
     * @param {Object} parametres.texteBoutonSecondaire Texte du bouton secondaire. (Situé à la gauche du bouton primaire). Si vide n'est pas affiché.
     * @param {Object} parametres.texteBoutonFermer Texte du bouton de fermeture du message. Défaut "Fermer" ou "Close en anglais".
     * @param {Object} parametres.afficherBoutonFermer Afficher le bouton pour fermer la fenêtre de message. Défaut true.
     * @param {Object} parametres.idControleFocusFermeture Id du contrôle auquel on redonne le focus à la fermeture de la fenêtre de message. Si non spécifié, focus redonné à l'élément actif avant l'affichage du message.
     * @returns {Object} Une promesse jQuery qui contiendra éventuellement un objet contenant la raison de fermeture. (ex. objet.primaire ou objet.secondaire)
     * @example afficherMessage(parametres)
                .done(function (resultat) {
                    if (resultat.primaire) {
                        alert("Très bon choix! Poursuivre aurait pu causer une rupture du continuum espace temps!");
                    } else if (resultat.secondaire) {
                        alert("Mauvais choix! Vous auriez-du poursuivre. À cause de vous le continuum espace temps risque de se briser!");
                    } else {
                        alert("Vous vous êtes contenté de fermer la fenêtre sans faire de choix... La prochaine fois assumez-vous! L'avenir du monde est entre vos mains!");
                    }
                });
    * @references https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/alertdialog.html
    * @notes Le titre et les boutons sont lus 2 fois dans NVDA... ça semble faire partie du pattern (voir lien ci-dessus). 
    */

    elementsPublics.afficher = function(parametres) {
       
        const valeursDefaut = {
            type: "",
            titre: "",
            corps: "",
            texteBoutonPrimaire: "",
            texteBoutonSecondaire: "",
            texteBoutonFermer: obtenirLanguePage() === 'fr' ? "Fermer" : "Close", 
            afficherBoutonFermer: false,
            estBoutonsTexteLong: false,
            idControleFocusFermeture: null
        };
    
        parametres = extend(valeursDefaut, parametres);
    
        parametres.idControleFocusFermeture = obtenirIdControleFocusFermeture(parametres);
    
        const conteneurFenetreMessage = ajouterControle(parametres);
        const fenetreMessage = conteneurFenetreMessage.querySelector('utd-dialog');  
    
        const boutons = conteneurFenetreMessage.querySelectorAll('[slot="pied"] > button')    
        boutons.forEach(btn => {
            btn.addEventListener("click", function() {
                const raison = this.getAttribute('raison-fermeture');
                fenetreMessage.setAttribute('raisonfermeture', raison);
                fenetreMessage.setAttribute('afficher', 'false');
            });    
        });
        
        //Définir une promesse qui sera résolue à la fermeture de la fenêtre.
        return new Promise((resolve) => {        
            definirEvenementFermeture(fenetreMessage, resolve)      
            fenetreMessage.setAttribute('afficher', 'true');    
        });    
    }
    /**
     * (Privée)
     * Obtient l'id du contrôle auquel il faut redonner le focus lors de la fermeture.
     * @param {Object} parametres Paramètres de la function afficherMessage.
     * @returns Id du contrôle auquel il faut redonner le focus à la fermeture du message.
     */
    function obtenirIdControleFocusFermeture(parametres) {
        if (!parametres.idControleFocusFermeture) {
            if (document.activeElement) {
                let id = document.activeElement.id;

                if (!id) {
                    id = genererId();
                    document.activeElement.id = id;
                }

                parametres.idControleFocusFermeture = id;
                return id;
            }
        }
        return parametres.idControleFocusFermeture;
    }

    /**
     * (Privée)
     * Ajoute le contrôle de fenêtre de message au DOM.
     * @param {Object} parametres Paramètres de la function afficherMessage.
     * @returns Object correspondant au conteneur de la fenêtre de message.
     */
    function ajouterControle(parametres) {
    //    var classeIcone = obtenirClasseIcone(parametres.type);

        let html = `
        <utd-dialog titre="${parametres.titre}" idfocus="${parametres.idControleFocusFermeture}" estfenetremessage="true" estboutonstextelong="${parametres.estBoutonsTexteLong}" type="${parametres.type}" >
            <div slot="contenu">
                ${parametres.corps}
            </div>
            <div slot="pied">`;   
        
        const htmlBoutonPrimaire = `<button type="button" class="utd-btn primaire compact" raison-fermeture="primaire" data-ga-action="${parametres.titre}">${parametres.texteBoutonPrimaire}</button>`;
        const htmlBoutonSecondaire = parametres.texteBoutonSecondaire ? `<button type="button" class="utd-btn secondaire compact" raison-fermeture="secondaire" data-ga-action="${parametres.titre}">${parametres.texteBoutonSecondaire}</button>` : '';
                
        html += `
                ${htmlBoutonSecondaire}${htmlBoutonPrimaire}                        
            </div>
        </utd-dialog>`

        const id = genererId();
        const conteneurFenetreMessage = document.createElement('div');
        conteneurFenetreMessage.id = id;
        conteneurFenetreMessage.innerHTML = html;

        document.body.appendChild(conteneurFenetreMessage);

        return conteneurFenetreMessage;
    }

    /*TODO à implémenter pe pour ECS éventuellement*/
    function obtenirClasseIcone(type) {
        switch (type) {
            case "erreur":
                return "erreur";
            case "avertissement":
                return "averti";
            case "succes":
                return "succes";
            default:
                return "inform";
        }
    }

    /**
     * (Privéee)
     * Compléter la promesse indiquant de quelle façon la fenêtre s'est fermée et supprimer l'élément du DOM une fois qu'il n'est plus affiché.
     * @param {Object} fenetreMessage Objet correspondant à la fenêtre de message.
     * @param {Promise} resolve Résolution de promesse.
     */
    function definirEvenementFermeture(fenetreMessage, resolve) {
        fenetreMessage.addEventListener("fermeture", e => {        
            resolve(e.detail.raisonFermeture);
            fenetreMessage.parentElement.remove();
        });
    }

    return elementsPublics;
})();


/*======================================================================================================================*/
/* -11- DIALOGUE
/*======================================================================================================================*/
export const dialogue = (function () {

    const elementsPublics = {};

    /**
    * Affiche une fenêtre de dialogue modal.
    * @param {Object} parametres Paramètres.
    * @param {Object} parametres.idDialogue Id du contrôle utd-dialog à afficher.
    * @param {Object} parametres.idControleFocusFermeture Id du contrôle auquel on redonne le focus à la fermeture du dialogue. Si non spécifié, focus redonné à l'élément actif avant l'affichage du message.
    */

    elementsPublics.afficher = function(idDialogue, idControleFocusFermeture) {
         
        if(!idDialogue){
            console.error('utd.dialogue.afficher -> Aucun id de dialogue spécifié.');
            return;
        }

        idControleFocusFermeture = idControleFocusFermeture || obtenirIdControleFocusFermeture();

        const dialogue = document.getElementById(idDialogue);

        if(dialogue){
            dialogue.setAttribute('afficher', 'true');    

            if(idControleFocusFermeture){
                dialogue.setAttribute('idfocus', idControleFocusFermeture);    
            }   
        } else {
            console.error(`utd.dialogue.afficher -> Contrôle utd-dialog "${dialogue}" non trouvé.`);
        }
    }

    elementsPublics.masquer = function(idDialogue) {
         
        if(!idDialogue){
            console.error('utd.dialogue.masquer -> Aucun id de dialogue spécifié.');
            return;
        }

        const dialogue = document.getElementById(idDialogue);

        if(dialogue){
            dialogue.setAttribute('afficher', 'false');    

            const idFocus = dialogue.getAttribute('idfocus');

            if(idFocus){
                const controleFocus = document.getElementById(idFocus);
                if(controleFocus){
                    controleFocus.focus();
                } else {
                    console.log(`utd.dialogue.masquer -> Contrôle "${idFocus}" à qui redonner le focus non trouvé.`);        
                }
            }   
        } else {
            console.error(`utd.dialogue.masquer -> Contrôle utd-dialog "${dialogue}" non trouvé.`);
        }
    }

    /**
     * (Privée)
     * Obtient l'id du contrôle auquel il faut redonner le focus lors de la fermeture.
     * @returns Id du contrôle auquel il faut redonner le focus à la fermeture du message.
     */
    function obtenirIdControleFocusFermeture() {

        if (document.activeElement) {
            let id = document.activeElement.id;

            if (!id) {
                id = genererId();
                document.activeElement.id = id;
            }

            return id;
        }

        return null;
    }

    return elementsPublics;
})();


/*======================================================================================================================*/
/* -20- TRAITEMENT EN COURS
/*======================================================================================================================*/
export const traitementEnCours = (function () {

    let elementsPublics = {};

    elementsPublics.debuter = function(element, avecOverlay) {

        avecOverlay = avecOverlay !== undefined ? avecOverlay : true;

        if (element) {

            //Ajouter un overlay global pendant le traitement en cours s'il y a lieu (défaut oui)  
            if (avecOverlay) {
                const overlay = document.createElement("div");

                //Si un overlay est déjà présent, on ajoute le nouveau mais on le masque (il sera peut-être éventuellement réaffiché dans le traitement terminer du traitement en cours)
                if (document.getElementsByClassName('utd-overlay').length > 0) {
                    overlay.classList.add('utd-d-none');
                }

                overlay.classList.add('utd-overlay');
                document.body.appendChild(overlay);
            } 

            element.setAttribute('overlay', avecOverlay ? 'true' : 'false');

            if (element.tagName.toLowerCase() === 'button' || (element.tagName.toLowerCase() === 'input' && element.type.toLowerCase() === 'submit')) {

                element.classList.add("utd-traitement-en-cours");
                const htmlTraitementEnCours = '<div class="utd-spinner"></div>';

                if (element.getElementsByClassName('utd-spinner').length === 0) {
                    element.innerHTML += htmlTraitementEnCours;
                }

                //Si aucun overlay on désactive le bouton
                if (!avecOverlay) {
                    element.disabled = true;
                }
            }
            else {
                //TODO éventuellement implanter traitement pour autres éléments que des boutons?
            }

            notifierTraitementEnCoursLecteurEcran(element);
        } else {
            //TODO éventuellement implanter un traitement en cours global?
        }


    }

    elementsPublics.terminer = function(element) {

        if(element) {
            const spinner = element.querySelector('.utd-spinner');
            if(spinner){
                spinner.remove();
            }               

            element.classList.remove("utd-traitement-en-cours");
            element.disabled = false;
   
            supprimerOverlay(element);

            element.removeAttribute('overlay');
            notifierTraitementEnCoursLecteurEcran(element, true);
        }
    }

    function supprimerOverlay(element) {
        //Si le traitement en cours sur l'élément avait un overlay on le retire.
        const avecOverlay = element.getAttribute('overlay');
        if(avecOverlay === 'true'){
            
            //Retrait du overlay 
            const overlayTraitementEnCours = document.getElementsByClassName('utd-overlay');

            if (overlayTraitementEnCours.length > 1) {
                
                //On enlève 1 overlay, si un masqué existe c'est lui qu'on enlève. S'il y en a d'autres ils seront fermés éventuellement.
                const overlayInvisibles = document.getElementsByClassName('utd-overlay utd-d-none');
                if(overlayInvisibles.length > 0){
                    overlayInvisibles[0].remove();    
                } else {
                    //Si aucun overlay invisible, on enlève le 1er trouvé.
                    overlayTraitementEnCours[0].remove();
                }
            } else if(overlayTraitementEnCours.length === 1){
                overlayTraitementEnCours[0].remove();
            }
        }
    }
    function notifierTraitementEnCoursLecteurEcran(element, estTraitementTermine){

        //Générer un id à l'élément qui va contenir le spinner de traitement en cours
        if(!element.id){
            element.id = genererId();            
        }

        const idZoneNotification = `zoneNotification_${element.id}`;

        //Ajouter la zone de notification hors écran si elle n'existe pas déjà.
        let zoneNotificationsLecteurEcran = document.getElementById(idZoneNotification);
        if(!zoneNotificationsLecteurEcran){
            zoneNotificationsLecteurEcran = document.createElement("div");
            zoneNotificationsLecteurEcran.id = idZoneNotification;
            zoneNotificationsLecteurEcran.classList.add('utd-sr-only');
            document.body.appendChild(zoneNotificationsLecteurEcran);
        }

        let texte = "";

        if(estTraitementTermine){
            texte = obtenirLanguePage() === 'fr' ? "Traitement terminé." : "Processing complete."
        } else {
            texte = obtenirLanguePage() === 'fr' ? "Traitement en cours." : "Processing..."
        }

        zoneNotificationsLecteurEcran.innerHTML = texte;
    }

    return elementsPublics;
})();


/*======================================================================================================================*/
/* -30- NOTIFICATIONS
/*======================================================================================================================*/
export const notification = (function () {

    const elementsPublics = {};

    /**
     * Affiche une notification (toast).
     * @param {Object} parametres Paramètres.
     * @param {Object} parametres.type Type de notification (positif, negatif ou neutre). Défaut "positif".
     * @param {Object} parametres.titre Titre de la notification (ex. Succès) Défaut "Succès" ou "Échec".
     * @param {Object} parametres.message Message de la notification (ex. Enregistrement effectué avec succès.) Défaut "".
     * @param {Object} parametres.texteBoutonFermer Texte du bouton de fermeture de la notification. Défaut "Fermer".
     * @param {Object} parametres.delaiFermeture Délai (en ms) de fermeture automatique de la notification. Défaut 5000.
     */

    elementsPublics.emettre = function(parametres) {
       
        const valeursDefaut = {
            type: "positif",
            titre: "", //parametres.type == "echec" ? "Échec" : "Succès",
            message: "",
            texteBoutonFermer: obtenirLanguePage() === 'fr' ? "Fermer" : "Close", 
            delaiFermeture: 5000
        };

        parametres = extend(valeursDefaut, parametres);       
       
        const zoneNotifications = obtenirZoneNotifications();

        const notification = ajouterNotification(zoneNotifications, parametres);

        retirerNotificationApresDelai(notification, parametres);
    }
    /**
     * Obtient la node correspondant à la zone de notifications utd.
     * @returns {object} La zone de notifications utd.
     */
    function obtenirZoneNotifications() {
        let zoneNotifications = document.getElementById('utdZoneNotifications');
        
        if(!zoneNotifications){
            zoneNotifications = document.createElement('div');
            zoneNotifications.id = 'utdZoneNotifications';
            zoneNotifications.classList.add('utd-notifications')
            zoneNotifications.setAttribute('role', 'alert');
            zoneNotifications.setAttribute('aria-atomic', 'true');
            document.body.appendChild(zoneNotifications);    
        }

        return zoneNotifications;
    }
    /**
     * (Privée)
     * Ajoute une notification dans la zone des notifications.
     * @param {Object} zoneNotifications Node correspondant à la zone de notifications.
     * @param {Object} parametres Paramètres de la méthode emettre (qui permet d'émettre une notification).
     * @returns {Object} Node correspondant à la notification ajoutée.
     */
    function ajouterNotification(zoneNotifications, parametres) {

        const notification = document.createElement('div');
        notification.classList.add("notification", parametres.type);        

        const possedeTitre = !!parametres.titre
        if(!possedeTitre){
            notification.classList.add("sans-titre");
        }

        notification.innerHTML = obtenirHtmlNotification(parametres, possedeTitre);

        definirEvenementClick(notification);

        zoneNotifications.appendChild(notification);

        afficherNotification(notification);

        return notification;
    }
    /**
     * 
     * @param {Object} parametres Paramètres de la méthode emettre (qui permet d'émettre une notification).
     * @param {Boolean} possedeTitre Indique si la notification possède un titre ou non.
     * @returns 
     */
    function obtenirHtmlNotification(parametres, possedeTitre) {
        let html = `
            <button type="button">
                <span class="utd-sr-only">${parametres.texteBoutonFermer}</span>
                <span class="utd-icone-svg x-fermer-blanc" aria-hidden="true"></span>
            </button>`
            
        if(possedeTitre){
            const classeIcone = obtenirClasseIcone(parametres.type)
            html += `
                <div class="titre">
                    <span class="utd-icone-svg ${classeIcone} md" aria-hidden="true"></span>
                    <span class="texte">${parametres.titre}</span>
                </div>            
            `
        }

        html += `
            <div class="message">
                ${parametres.message}
            </div>`;

        return html;
    }
    /**
     * Obtient la classe de l'icône de titre.
     * @param {string} type Type de notification
     * @returns {string} Classe de l'icône de titre pour le type spécifié.
     */
    function obtenirClasseIcone(type) {
        switch (type) {
            case "negatif":
                return "erreur-blanc";
            case "neutre":
                return "information-blanc";
            default:
                return "succes-blanc";
        }
    }
    /**
     * Affiche la notification en effectuant un fade in.
     * @param {Object} notification Node notification à afficher.
     */
    function afficherNotification(notification) {
        setTimeout(() => {
            notification.classList.add('visible'); 
         }, 10); 
    }
    /**
     * Retire la notification après le délai prévu.
     * @param {Object} notification Node correspondant à la notification à retirer.
     * @param {Object} parametres Paramètres de la méthode emettre (qui permet d'émettre une notification).
     */
    function retirerNotificationApresDelai(notification, parametres) {
        setTimeout(() => {                        
            retirerNotification(notification);
        }, parametres.delaiFermeture);
    }

    /**
     * Retire la notification du dom et en effectuant un fade out.
     * @param {Object} notification Node correspondant à la notification à retirer.
     */
    function retirerNotification(notification) {
        const dureeAnimationMs = 500;
        
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, dureeAnimationMs);            
    }

    /**
     * (Privéee)
     * Définit le traitement à effectuer sur le click d'une notification.
     * @param {Object} notification Node de notification sur laquelle on doit appliquer l'événement.
     */
    function definirEvenementClick(notification) {
        notification.addEventListener("click", e => {        
            retirerNotification(notification);
        });
    }

    return elementsPublics;
})();


/* ============================================================= */
/* ======================== UTILITAIRES ======================== */
/* ============================================================= */

/**
 * 
 * @param {Object} cible Objet dans lequel on doit copier les données. 
 * @param {Object} source Objet contenant les infos à copier dans l'objet cible. 
 * @returns 
 */
export function extend(cible, source) {
    for (var sourceProp in source) {
        var sourceVal = source[sourceProp];
        // Is this value an object?  If so, iterate over its properties, copying them over
        if (sourceVal && Object.prototype.toString.call(sourceVal) === "[object Object]") {
            cible[sourceProp] = cible[sourceProp] || {};
            extend(cible[sourceProp], sourceVal);
        }
        else {
            cible[sourceProp] = sourceVal;
        }
    }
    return cible;
}

/**
 * Génère un id unique.
 * @returns Un id unique.
 */
export function genererId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Obtient la langue de la page courante.
 * @returns {string} Code de langue de la page courante (fr/en).
 */
 export function obtenirLanguePage() {
    return document.getElementsByTagName("html")[0].getAttribute("lang") || "fr";
}


export function ajusterAccessibiliteLiens(texteAccessibilite) {
    texteAccessibilite = texteAccessibilite || obtenirLanguePage() === 'fr' ? ". Ce lien sera ouvert dans un nouvel onglet." : ". This link will open in a new tab.";

    document.querySelectorAll('main a[target="_blank"]').forEach(lien => { 

        //Ne pas traiter les liens sans href et les liens
        if (!lien.getAttribute('href')) {
            return;
        }
        //Ne pas traiter les liens vers des fichiers pdf ou les liens ayant explicitement une classe indiquant de ne pas les considérer comme lien externe(sans-lien-externe).  TODO éventuellement rafiner la condition afin de traiter uniquement les liens vers des pages web...
        if (lien.getAttribute('href').endsWith(".pdf") || lien.classList.contains("utd-sans-lien-externe")) {
            return;
        }

        //Ajouter la classe lien-externe afin d'afficher l'icône d'ouverture dans une nouvelle fenêtre.
        if (!lien.classList.contains("utd-lien-externe") && !lien.querySelector('.utd-lien-externe')) {
            lien.classList.add("utd-lien-externe");
        }

        //Ajouter le texte pour accessibilité nouvelle fenêtre si on détecte qu'il n'est pas là. TODO rafiner cette vérification éventuellement au besoin, il pourrait arriver qu'un .sr-only soit là pour autre chose dans le lien (très peu probable)
        if (!lien.querySelector(".utd-sr-only")) {
            lien.innerHTML = lien.innerHTML + `<span class="utd-sr-only">${texteAccessibilite}</span>`
        }
    });

};
