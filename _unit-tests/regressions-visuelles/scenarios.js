﻿const viewports = require('./viewports');
module.exports = {
urlBase : "http://localhost:5000",
//urlBase: "https://lively-cliff-018a9540f-23.eastus2.azurestaticapps.net",

paramsDefaut : {
    cookiePath: "backstop_data/engine_scripts/cookies.json",
    referenceUrl: "",
    readyEvent: "",
    readySelector: "",
    delay: 1000,
    hideSelectors: [],
    removeSelectors: [".no-test", "header", "#colonneGauche", "utd-menu-ancres", ".documentation", "footer", "utd-hautpage"],
    postInteractionWait: 1000,
    selectors: [],
    selectorExpansion: false,
    clickSelectors : [],
    hoverSelectors: [],
    expect: 0,
    misMatchThreshold: 0.05,
    requireSameDimensions: true,
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js"  
},
scenarios : [   
    //Toujours utiliser url relative dans les scénarios. L'url de base va lui être ajoutée.
        
    //Accordéon (base)
    {
        label: "Accordeon (Base)", 
        url: "/composants/affichagecontenu/accordeon"
    },
    //Accordéon (focus/ouverture)
    {
        label: "Accordeon (focus/ouverture)", 
        url: "/composants/affichagecontenu/accordeon",
        selectors: ["#exempleAccordeon1"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleAccordeon1", shadowDomSelector: "button"}]
    },
    //Accordéon (focus/fermeture)
    {
        label: "Accordeon (focus/fermeture)", 
        url: "/composants/affichagecontenu/accordeon",
        selectors: ["#exempleAccordeon4"],        
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleAccordeon4", shadowDomSelector: "button"}]
    },    
    //Accordéon (hover) Doit prendre écran au complet sinon ne fonctionne pas... problème bizarre... https://github.com/garris/BackstopJS/issues/689
    {
        label: "Accordeon (hover)", 
        url: "/composants/affichagecontenu/accordeon",
        selectors: ["#exempleAccordeon1"],        
        viewports: viewports.vPhone,
        hoverSelectors: ["#exempleAccordeon1"]
//        shadowHoverSelectors: [{domSelector: "#exempleAccordeon1", shadowDomSelector: "button"}],
    },    
    //Accordéon (contrôle via bouton/fermeture)
    {
        label: "Accordeon (contrôle via bouton/fermeture)", 
        url: "/composants/affichagecontenu/accordeon",
        viewports: viewports.vPhone,
        selectors: ["#exempleAccordeon5"],
        clickSelectors: ["#btnControleExemple5"]
    },
    //Accordéon (contrôle via bouton/ouverture)
    {
        label: "Accordeon (contrôle via bouton/ouverture)", 
        url: "/composants/affichagecontenu/accordeon",
        viewports: viewports.vPhone,
        selectors: ["#exempleAccordeon5"],
        clickSelectors: ["#btnControleExemple5", "#btnControleExemple5"]
    },
    //Avis
    {
        label: "Avis", 
        url: "/composants/affichagecontenu/avis"
    },
    //Boutons
    {
        label: "Boutons base", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
    },
    //Bouton primaire focus
    {
        label: "Boutons primaire (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons1"],
        clickSelectors: ["#exempleBoutons1 button"]
    },
    //Bouton secondaire focus
    {
        label: "Boutons secondaire (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons2"],        
        clickSelectors: ["#exempleBoutons2 button"]
    },
    //Bouton tertiaire focus
    {
        label: "Boutons tertiaire (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons3"],
        clickSelectors: ["#exempleBoutons3 button"]
    },
    //Bouton avertissement focus
    {
        label: "Boutons avertissement (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons4"],
        clickSelectors: ["#exempleBoutons4 button"]
    },
    //Bouton primaire hover
    {
        label: "Boutons primaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons1"],
        hoverSelectors: ["#exempleBoutons1 button"]
    },
    //Bouton secondaire hover
    {
        label: "Boutons secondaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons2"],        
        hoverSelectors: ["#exempleBoutons2 button"]
    },
    //Bouton tertiaire hover
    {
        label: "Boutons tertiaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons3"],
        hoverSelectors: ["#exempleBoutons3 button"]
    },
    //Bouton avertissement hover
    {
        label: "Boutons avertissement (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vTablet,
        selectors: ["#exempleBoutons4"],
        hoverSelectors: ["#exempleBoutons4 button"]
    },
    //Boutons radio (Base)
    {
        label: "Boutons radio (Base) (radioButton)", 
        url: "/composants/formulaire/boutonradio"
    },    
    //Boutons radio (1/2 Actif sur normal et focus+actif sur compact)
    {
        label: "Boutons radio (Actif sur normal et focus+actif sur compact) (radioButton)", 
        url: "/composants/formulaire/boutonradio",
        viewports: viewports.vPhone,
        selectors: ["#exemple3", "#exemple4"],
        clickSelectors: ["#exemple3 input", "#exemple4 input"]
    },
    //Boutons radio (2/2 Actif sur compact et focus+actif sur normal)
    {
        label: "Boutons radio (Actif sur compact et focus+actif sur normal) (radioButton)", 
        url: "/composants/formulaire/boutonradio",
        viewports: viewports.vPhone,
        selectors: ["#exemple3", "#exemple4"],
        clickSelectors: ["#exemple4 input", "#exemple3 input"]
    },
    //Boutons radio (focus sur normal)
    {
        label: "Boutons radio (Focus sur normal) (radioButton)", 
        url: "/composants/formulaire/boutonradio",
        viewports: viewports.vPhone,
        selectors: ["#exemple3"],
        focusSelectors: ["#exemple3 input"]
    },
    //Boutons radio (focus sur compact)
    {
        label: "Boutons radio (Focus sur compact) (radioButton)", 
        url: "/composants/formulaire/boutonradio",
        viewports: viewports.vPhone,
        selectors: ["#exemple4"],
        focusSelectors: ["#exemple4 input"]
    },
    //Cases à cocher (Base)
    {
        label: "Cases à cocher (Base) (checkbox)", 
        url: "/composants/formulaire/casecocher"
    },    
    //Cases à cocher seule (1/2 Actif sur normal et focus+actif sur compact)
    {
        label: "Cases à cocher seule (Actif sur normal et focus+actif sur compact) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple5", "#exemple6"],
        clickSelectors: ["#exemple5 input", "#exemple6 input"]
    },
    //Cases à cocher seule (2/2 Actif sur compact et focus+actif sur normal)
    {
        label: "Cases à cocher seule (Actif sur compact et focus+actif sur normal) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple5", "#exemple6"],
        clickSelectors: ["#exemple6 input", "#exemple5 input"]
    },
    //Cases à cocher seule (focus sur normal)
    {
        label: "Cases à cocher seule (Focus sur normal) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple5"],
        focusSelectors: ["#exemple5 input"]
    },
    //Cases à cocher seule (focus sur compact)
    {
        label: "Cases à cocher seule (Focus sur compact) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple6"],
        focusSelectors: ["#exemple6 input"]
    },
    //Cases à cocher liste (1/2 Actif sur normal et focus+actif sur compact)
    {
        label: "Cases à cocher liste (Actif sur normal et focus+actif sur compact) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple7", "#exemple8"],
        clickSelectors: ["#exemple7 input", "#exemple8 input"]
    },
    //Cases à cocher liste (2/2 Actif sur compact et focus+actif sur normal)
    {
        label: "Cases à cocher liste (Actif sur compact et focus+actif sur normal) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple7", "#exemple8"],
        clickSelectors: ["#exemple8 input", "#exemple7 input"]
    },
    //Cases à cocher liste (focus sur normal)
    {
        label: "Cases à cocher liste (Focus sur normal) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple7"],
        focusSelectors: ["#exemple7 input"]
    },
    //Cases à cocher liste (focus sur compact)
    {
        label: "Cases à cocher liste (Focus sur compact) (checkbox)", 
        url: "/composants/formulaire/casecocher",
        viewports: viewports.vPhone,
        selectors: ["#exemple8"],
        focusSelectors: ["#exemple8 input"]
    },
    //Champs erreur (base)
    {
        label: "Champs_erreur (Base)", 
        url: "/composants/formulaire/champerreur"
    },    
    //Champs erreur (focus)
    {
        label: "Champs_erreur (Focus)", 
        url: "/composants/formulaire/champerreur",
        viewports: viewports.vPhone,
        selectors: ["#exemple1"],
        clickSelectors: ["#exemple1 input"]      
    },    
    //Champs gestion automatique (focus testé via le input #requete)
    {
        label: "Champs_gestion_automatique", 
        url: "/composants/formulaire/champsautomatique",
        clickSelectors: ["#requete"]
    },    
    //Champs textes et autres (focus testé via le input #taille1)
    {
        label: "Champs_textes et autres", 
        url: "/composants/formulaire/champstexte",            
        clickSelectors: ["#taille1"]      
    },
    //Dialogue modal (Base)
    {
        label: "Dialogue modal (Base)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest1"]      
    },    
    //Dialogue modal (Fermeture X)
    {
        label: "Dialogue modal (Fermeture X)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        clickSelectors: ["#btnTest1"],              
        shadowClickSelectors: [{domSelector: "#dialogue1", shadowDomSelector: "button.close"}]
    },    
    //Dialogue modal (Fermeture via méthode masquer)
    {
        label: "Dialogue modal (Fermeture via methode masquer)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],  
        clickSelectors: ["#btnTest1", "#btnAnnuler1"]
    },    
    //Dialogue modal (Fermeture via click outside)
    {
        label: "Dialogue modal (Fermeture via via click outside)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],  
        clickSelectors: ["#btnTest1", "#btnVotreAvis"]
    },    
    //Dialogue modal (Fermeture via escape)
    {
        label: "Dialogue modal (Fermeture via escape)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],  
        clickSelectors: ["#btnTest1"],
        keyPressKeyCode: ["Escape"]
    },
    //Dialogue modal (Focus bouton fermer)
    {
        label: "Dialogue modal (Focus bouton fermer)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],  
        clickSelectors: ["#btnTest1"],
        keyPressKeyCode: ["Tab", "Tab", "Tab", "Tab"]
    },    
    //Dialogue modal (Focus reste dans modale)
    {
        label: "Dialogue modal (Focus reste dans modale)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],  
        clickSelectors: ["#btnTest1"],
        keyPressKeyCode: ["Tab", "Tab", "Tab", "Tab", "Tab"]
    },    
    //Dialogue modal (Focus bloc texte sans visuel)
    {
        label: "Dialogue modal (Focus bloc texte sans visuel)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        clickSelectors: ["#btnTest3"],              
    },    
    //Dialogue modal (Mode message focus bouton primaire)
    {
        label: "Dialogue modal (Mode message focus bouton primaire)", 
        url: "/composants/actions/dialogue",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        clickSelectors: ["#btnTest4"],              
    },    
    //Haut page (Base)
    {
        label: "Haut_page (Base)", 
        url: "/composants/navigation/hautpage",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        scrollToSelector: "#exemple"            
    },    
    //Haut page (Retour haut si click)
    {
        label: "Haut_page (Retour haut si click)", 
        url: "/composants/navigation/hautpage",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        scrollToSelector: "#exemple",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "utd-hautpage", shadowDomSelector: "button"}]
    },    
    //Haut page (Hover)
    {
        label: "Haut_page (Hover)", 
        url: "/composants/navigation/hautpage",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        scrollToSelector: "#exemple",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowHoverSelector: [{domSelector: "utd-hautpage", shadowDomSelector: "button"}]
    },    
    //Haut page (Focus)
    {
        label: "Haut_page (Focus)", 
        url: "/composants/navigation/hautpage",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        scrollToSelector: "#exemple",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowFocusSelectors: [{domSelector: "utd-hautpage", shadowDomSelector: "button"}]
    },    
    //TODO scrollbar non visible pour les feuilles (pe car render considéré comme mobile?)

    //Infobulle (Base)    
    {
        label: "Infobulle (Base)", 
        url: "/composants/affichagecontenu/infobulle"
    },    
    //Infobulle (Affichage via bulle)
    {
        label: "Infobulle (Affichage via bulle)", 
        url: "/composants/affichagecontenu/infobulle",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "#exempleInfobulle1 utd-infobulle", shadowDomSelector: "button"}]
    },    
    //Infobulle (Affichage via texte lié)
    {
        label: "Infobulle (Affichage via texte lie)", 
        url: "/composants/affichagecontenu/infobulle",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        clickSelectors: ['#exempleInfobulle2 utd-infobulle [slot="texte-lie"]']
    },    
    //Infobulle (Fermeture via X)
    {
        label: "Infobulle (Fermeture via X)", 
        url: "/composants/affichagecontenu/infobulle",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "#exempleInfobulle3 utd-infobulle", shadowDomSelector: "button"}, {domSelector: "#exempleInfobulle3 utd-infobulle", shadowDomSelector: "button.close"}],
    },    
    //Infobulle (Fermeture via click outside)
    {
        label: "Infobulle (Fermeture via click outside)", 
        url: "/composants/affichagecontenu/infobulle",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "#exempleInfobulle3 utd-infobulle", shadowDomSelector: "button"}],
        clickSelectors2: ['#exempleInfobulle2 utd-infobulle [slot="texte-lie"]']
    },    
    //Infobulle (Fermeture via Escape)
    {
        label: "Infobulle (Fermeture via escape)", 
        url: "/composants/affichagecontenu/infobulle",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "#exempleInfobulle3 utd-infobulle", shadowDomSelector: "button"}],
        keyPressKeyCode: ["Escape"]
    },    

    //Infobulle (Focus bouton fermer et focus reste dans feuille)
    {
        label: "Infobulle (Focus bouton fermer et focus reste dans feuille)", 
        url: "/composants/actions/dialogue",
        url: "/composants/affichagecontenu/infobulle",
        viewports: viewports.vTablet,
        postInteractionWait: 2000,
        shadowClickSelectors: [{domSelector: "#exempleInfobulle3 utd-infobulle", shadowDomSelector: "button"}],
        keyPressKeyCode: ["Tab", "Tab", "Tab"]
    },    
    //=================================
    //TODO ICI LISTE DEROULANTE     
    //=================================

    //Menu ancres (Base)        
    {
        label: "Menu_ancres (Base)", 
        url: "/composants/navigation/menuancres",
        selectors: ["viewport"],
        removeSelectors: [".no-test", "#colonneGauche"]

    },    
    //Menu ancres (Click sur ancre)
    {
        label: "Menu_ancres (Click sur ancre)", 
        url: "/composants/navigation/menuancres",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test", "#colonneGauche"],
        shadowClickSelectors: [{domSelector: "utd-menu-ancres", shadowDomSelector: 'a[href="#exemple"]'}]
    },    
    //=================================
    //TODO ICI MENU VERTICAL     
    //=================================

    //Message (Base) avertissement avec 2 boutons
    {
        label: "Message (Base) avertissement avec 2 boutons", 
        url: "/composants/actions/message",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest1"]      
    },    
    //Message (type information avec 1 bouton)
    {
        label: "Message (type information avec 1 bouton)", 
        url: "/composants/actions/message",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest2"]      
    },    
    //Message (type succès avec 1 bouton)
    {
        label: "Message (type succès avec 1 bouton)", 
        url: "/composants/actions/message",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest3"]      
    },    
    //Message (type erreur avec 1 bouton)
    {
        label: "Message (type erreur avec 1 bouton)", 
        url: "/composants/actions/message",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest4"]      
    },    
    //Message (type erreur avec 1 bouton)
    {
        label: "Message (sans type avec 2 boutons)", 
        url: "/composants/actions/message",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest5"]      
    },    
    //Message (type erreur avec 1 bouton)
    {
        label: "Message (sans type avec 2 boutons et texte long)", 
        url: "/composants/actions/message",
        viewports: viewports.vLargePhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#btnTest6"]      
    },    

    //Notifications (Base sans stacking) teste aussi type positif avec titre
    {
        label: "Notification (Base sans stacking, positif avec titre)", 
        url: "/composants/actions/notifications",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#test1"],
        scrollToSelector2: "h1"      
    },    
    
    //Notifications (Base + stacking) teste aussi type positif sans titre et negatif avec titre
    {
        label: "Notification (Base + stacking, succes sans titre et negatif avec titre)", 
        url: "/composants/actions/notifications",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#test2", "#test3"]      
    },    
    //Notifications (negatif sans titre et neutre avec et sans titre) 
    {
        label: "Notifications (negatif sans titre et neutre avec et sans titre) ", 
        url: "/composants/actions/notifications",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#test4", "#test5", "#test6"]      
    },    
    //Notifications (Fermeture via click)
    {
        label: "Notification (Fermeture via click)", 
        url: "/composants/actions/notifications",
        viewports: viewports.vPhone,
        selectors: ["viewport"],
        removeSelectors: [".no-test"],        
        clickSelectors: ["#test1", "#utdZoneNotifications .notification"],
    },    
    
]}