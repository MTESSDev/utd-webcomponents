const viewports = require('./viewports');
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
    onReadyScript: "puppet/onReady.js", 
    appendBsTestHash : false  
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

    //Barre de recherche (base)
    {
        label: "Barre_recherche (Base)", 
        url: "/composants/actions/barrerecherche"
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
        clickSelectors: ["#btnTest1", "#btnTest3"]
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
    //Liste déroulante (Base)        
    {
        label: "Liste_deroulante (Base)", 
        url: "/composants/formulaire/listederoulante",
    },
    //Liste déroulante (Simple ouverte click)        
    {
        label: "Liste_deroulante (Simple ouverte click)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
    },
    //Liste déroulante (Simple ouverte clavier)        
    {
        label: "Liste_deroulante (Simple ouverte clavier)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowFocusSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Enter"]
    },
    //Liste déroulante (Multiple ouverte click)        
    {
        label: "Liste_deroulante (Multiple ouverte click)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
    },
    //Liste déroulante (Multiple ouverte clavier)        
    {
        label: "Liste_deroulante (Multiple ouverte clavier)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowFocusSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Enter"]
    },       
    //Liste déroulante (Combinée simple ouverte click)        
    {
        label: "Liste_deroulante (Combinée simple ouverte click)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
    },    
    //Liste déroulante (Combinée simple ouverte clavier)
    {
        label: "Liste_deroulante (Combinée simple ouverte clavier)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowFocusSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Enter"]
    },     
    //Liste déroulante (Combinée multiple ouverte click)        
    {
        label: "Liste_deroulante (Combinée multiple ouverte click)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
    },
    //Liste déroulante (Combinée multiple ouverte clavier)        
    {
        label: "Liste_deroulante (Combinée multiple ouverte clavier)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowFocusSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Enter"]
    },   
    //Liste déroulante (Combinée multiple recherche precise ouverte)       
    {
        label: "Liste_deroulante (Combinée multiple recherche precise ouverte)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        shadowClickSelectors: [{domSelector: "#exemple6 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        shadowHoverSelectors2: [{domSelector: "#exemple6 utd-liste-deroulante", shadowDomSelector: ".recherche"}]
    },
    //Liste déroulante (Simple fermeture escape)        
    {
        label: "Liste_deroulante (fermeture escape)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vDefaults,
        selectors: ["#exemple2a"],
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Escape"]
    },    
    //Liste déroulante (Multiple fermeture escape)        
    {
        label: "Liste_deroulante (Multiple fermeture escape)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple3"],
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Escape"]
    },    
    //Liste déroulante (Combinée simple fermeture escape)        
    {
        label: "Liste_deroulante (Combinée simple fermeture escape)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple4"],
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Escape"]
    },    
    //Liste déroulante (Combinée multiple fermeture escape)        
    {
        label: "Liste_deroulante (Combinée multiple fermeture escape)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple5"],
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Escape"]
    },
    //Liste déroulante (Simple fermeture Tab)        
    {
        label: "Liste_deroulante (fermeture Tab)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple2a"],
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Tab"]
    },    
    //Liste déroulante (Multiple fermeture Tab)        
    {
        label: "Liste_deroulante (Multiple fermeture Tab)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple3"],
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Tab"]
    },    
    //Liste déroulante (Combinée simple fermeture Tab)        
    {
        label: "Liste_deroulante (Combinée simple fermeture Tab)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple4"],
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Tab"]
    },    
    //Liste déroulante (Combinée multiple fermeture Tab)        
    {
        label: "Liste_deroulante (Combinée multiple fermeture Tab)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple5"],
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Tab"]
    },
    //Liste déroulante (Simple Hover item)        
    {
        label: "Liste_deroulante (Simple Hover item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        shadowHoverSelectors2: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}]
    },
    //Liste déroulante (Multiple Hover item)        
    {
        label: "Liste_deroulante (Multiple Hover item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}]
    },
    //Liste déroulante (Combinée simple Hover item)        
    {
        label: "Liste_deroulante (Combinée simple Hover item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        postInteractionWait: 3000,
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        shadowHoverSelectors2: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alaska"]'}]
    },
    //Liste déroulante (Combinée multiple Hover item)        
    {
        label: "Liste_deroulante (Combinée multiple Hover item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        shadowHoverSelectors2: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alaska"]'}]
    },    
    //Liste déroulante (Simple selection item)        
    {
        label: "Liste_deroulante (Simple selection item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple2a"],
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}],
    },    
    //Liste déroulante (Simple selection item avec espace)        
    {
        label: "Liste_deroulante (Simple selection item avec espace)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple2a"],
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown","Space"]
    },
    //Liste déroulante (Simple selection item avec enter)        
    {
        label: "Liste_deroulante (Simple selection item avec enter)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple2a"],
        shadowClickSelectors: [{domSelector: "#exemple2a utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown","Enter"]
    },   
    //Liste déroulante (Multiple selection 3 items)        
    {
        label: "Liste_deroulante (Multiple selection 3 items)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Ontario"]'}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Nouvelle-Écosse"]'}],
    },    
    //Liste déroulante (Multiple selection 3 items ferméee)        
    {
        label: "Liste_deroulante (Multiple selection 3 items fermée)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Ontario"]'}, {domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Nouvelle-Écosse"]'}],
        keyPressKeyCode: ["Escape"]        
    },    

    //Liste déroulante (Combinée simple selection item)        
    {
        label: "Liste_deroulante (Combinée simple selection item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        selectors: ["#exemple4"],
        postInteractionWait: 3000,
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alaska"]'}],
    },
    //Liste déroulante (Combinée multiple selection 3 items)        
    {
        label: "Liste_deroulante (Combinée multiple selection 3 items)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alaska"]'},{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Colorado"]'}, {domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Connecticut"]'}],
    },     
    //Liste déroulante (Combinée multiple selection 3 items fermée)        
    {
        label: "Liste_deroulante (Combinée multiple selection 3 items fermée)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}, {domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alaska"]'},{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Colorado"]'}, {domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Connecticut"]'}],
        keyPressKeyCode: ["Escape"]         
    },     
    //Liste déroulante (avec option sélectionnée par défaut)        
    {
        label: "Liste_deroulante (Option sélectionnée par défaut)", 
        url: "/essaislistederoulante",
        viewports: viewports.vTablet
    },
    //Liste déroulante (Multiple ouverte fleche bas)        
    {
        label: "Liste_deroulante (Multiple ouverte fleche bas)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte double fleche bas)
    {
        label: "Liste_deroulante (Multiple ouverte double fleche bas)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown","ArrowDown"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte fleche haut)        
    {
        label: "Liste_deroulante (Multiple ouverte fleche haut)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowUp"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte double fleche haut)        
    {
        label: "Liste_deroulante (Multiple ouverte double fleche haut)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowUp","ArrowUp"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte fleche bas puis fleche haut)        
    {
        label: "Liste_deroulante (Multiple ouverte fleche bas puis fleche haut)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown","ArrowUp"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte cinq fleche bas)        
    {
        label: "Liste_deroulante (Simple ouverte cinq fleche bas)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte cinq fleche haut)        
    {
        label: "Liste_deroulante (Simple ouverte cinq fleche haut)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte fleche gauche)        
    {
        label: "Liste_deroulante (Simple ouverte fleche gauche)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowLeft"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte double fleche gauche)        
    {
        label: "Liste_deroulante (Simple ouverte double fleche gauche)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowLeft","ArrowLeft"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte fleche droite)        
    {
        label: "Liste_deroulante (Simple ouverte fleche droite)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowRight"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte double fleche droite)        
    {
        label: "Liste_deroulante (Simple ouverte double fleche droite)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowRight","ArrowRight"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte Home)        
    {
        label: "Liste_deroulante (Simple ouverte Home)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Home"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte Home)        
    {
        label: "Liste_deroulante (Multiple ouverte Home)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["Home"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Simple ouverte End)        
    {
        label: "Liste_deroulante (Simple ouverte End)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["End"],
        shadowHoverSelectors2: [{domSelector: "#exemple2b utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple ouverte End)        
    {
        label: "Liste_deroulante (Multiple ouverte End)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["End"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Multiple selection 1 item et hover autre item)        
    {
        label: "Liste_deroulante (Multiple selection 1 item et hover autre item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"},{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Alberta"]'}],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}]
    },
    //Liste déroulante (Multiple fleche bas et hover autre item)        
    {
        label: "Liste_deroulante (Multiple fleche bas et hover autre item)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        keyPressKeyCode: ["ArrowDown"],
        shadowHoverSelectors2: [{domSelector: "#exemple3 utd-liste-deroulante", shadowDomSelector: 'li[aria-label="Manitoba"]'}]
    },
    //Liste déroulante (Combine simple ouverte ecrire Floride)        
    {
        label: "Liste_deroulante (Combine simple ouverte ecrire Floride)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        textInput: ["Floride"],
        shadowHoverSelectors2: [{domSelector: "#exemple4 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Combine multiple ouverte ecrire Floride)        
    {
        label: "Liste_deroulante (Combine multiple ouverte ecrire Floride)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        textInput: ["Floride"],
        shadowHoverSelectors2: [{domSelector: "#exemple5 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },
    //Liste déroulante (Combine multiple recherche precise ouverte ecrire Floride)        
    {
        label: "Liste_deroulante (Combine multiple recherche precise ouverte ecrire Floride)", 
        url: "/composants/formulaire/listederoulante",
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: "#exemple6 utd-liste-deroulante", shadowDomSelector: ".utd-form-control"}],
        textInput: ["Floride"],
        shadowHoverSelectors2: [{domSelector: "#exemple6 utd-liste-deroulante", shadowDomSelector: ".utd-precision"}]
    },

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
    
    //Menu horizontal (Base)        
   {
        label: "Menu_horizontal (Base)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: [".utd-bandeau-principal"],
        removeSelectors: [".no-test"],
        appendBsTestHash: true
    },    
    //Menu horizontal (Hover niveau 1 sans enfants)        
    {
        label: "Menu_horizontal (Hover niveau 1 sans enfants)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: [".utd-bandeau-principal"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktop, 
        hoverSelectors: ['utd-menu-horizontal-item[href="/"]'],
        appendBsTestHash: true
    },    
    //Menu horizontal (Hover niveau 1 avec enfants)        
    {
        label: "Menu_horizontal (Hover niveau 1 avec enfants)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: [".utd-bandeau-principal"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktop, 
        hoverSelectors: ['utd-menu-horizontal-item[libelle="Recherche de documents<br/>confidentiels et sensibles"]'],
        appendBsTestHash: true
    },    
    //Menu horizontal (Hover niveau 1 Plus)        
    {
        label: "Menu_horizontal (Hover niveau 1 Plus)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: [".utd-bandeau-principal"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        hoverSelectors: ['utd-menu-horizontal-item[libelle="Plus"]'],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click niveau 1 avec enfants)        
    {
        label: "Menu_horizontal (Click niveau 1 avec enfants)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click niveau 1 avec enfants et fermeture via Escape)        
    {
        label: "Menu_horizontal (Click niveau 1 avec enfants et fermeture via Escape)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]', shadowDomSelector: "a"}],
        keyPressKeyCode: ["Escape"],       
        appendBsTestHash: true
    },    

    //Menu horizontal (Click niveau 1 avec enfants et fermeture via click body)        
    {
        label: "Menu_horizontal (Click niveau 1 avec enfants et fermeture via click body)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-vertical', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    

    //Menu horizontal (Click niveau 1 avec enfants et hover niveau 2)        
    {
        label: "Menu_horizontal (Click niveau 1 avec enfants et hover niveau 2)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu vertical"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click niveau 1 avec enfants et hover niveau 2 actif)        
    {
        label: "Menu_horizontal (Click niveau 1 avec enfants et hover niveau 2 actif)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet,
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu horizontal"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    


    //Menu horizontal (Click Plus)        
    {
        label: "Menu_horizontal (Click Plus)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    

    //Menu horizontal (Click Plus et fermeture via Escape)        
    {
        label: "Menu_horizontal (Click Plus et fermeture via Escape)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}],
        keyPressKeyCode: ["Escape"],       
        appendBsTestHash: true
    },    


    // Menu horizontal (Click Plus et hover niveau 1)        
    {
        label: "Menu_horizontal (Click Plus et hover niveau 1)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    

    //Menu horizontal (Click Plus et click niveau 1)        
    {
        label: "Menu_horizontal (Click Plus et click niveau 1)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click Plus et click niveau 1 et fermeture via Escape)        
    {
        label: "Menu_horizontal (Click Plus et click niveau 1 et fermeture via Escape)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        keyPressKeyCode: ["Escape"], 
        appendBsTestHash: true
    },    

    //Menu horizontal (Click Plus et click niveau 1 et hover niveau 2)        
    {
        label: "Menu_horizontal (Click Plus et click niveau 1 et hover niveau 2)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vTablet, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Plus"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none) utd-menu-horizontal-item[libelle="Validation de la facture"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },        
    //Menu horizontal (Click Burger)        
    {
        label: "Menu_horizontal (Click Burger)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Burger click menu fermeture)        
    {
        label: "Menu_horizontal (Burger click menu fermeture)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Burger fermeture via click body)        
    {
        label: "Menu_horizontal (Burger fermeture via click body)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}],
        scrollToSelector2: "#exemple",
        shadowClickSelectors2: [{domSelector: "utd-hautpage", shadowDomSelector: "button"}],
        appendBsTestHash: true        
    },    

    //Menu horizontal (Click Burger et click niveau 1)        
    {
        label: "Menu_horizontal (Click Burger et click niveau 1)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click Burger et click niveau 1 et hover niveau 2)        
    {
        label: "Menu_horizontal (Click Burger et click niveau 1 et hover niveau 2)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Facturation"]:not(.utd-d-none) utd-menu-horizontal-item[libelle="Pénalité au fournisseur"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    

    //Menu horizontal (Click Burger et click niveau 1 actif)        
    {
        label: "Menu_horizontal (Click Burger et click niveau 1 actif)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click Burger et click niveau 1 actif et hover niveau 2)        
    {
        label: "Menu_horizontal (Click Burger et click niveau 1 actif et hover niveau 2)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]:not(.utd-d-none) utd-menu-horizontal-item[libelle="Menu vertical"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },    
    //Menu horizontal (Click Burger et click niveau 1 actif et hover niveau 2 actif)        
    {
        label: "Menu_horizontal (Click Burger et click niveau 1 actif et hover niveau 2 actif)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vPhone, 
        shadowClickSelectors: [{domSelector: 'utd-menu-horizontal-item[libelle="Menu"]', shadowDomSelector: "a"}, {domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]:not(.utd-d-none)', shadowDomSelector: "a"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-horizontal-item[libelle="Navigation"]:not(.utd-d-none) utd-menu-horizontal-item[libelle="Menu horizontal"]', shadowDomSelector: "a"}],
        appendBsTestHash: true
    },
    //Menu horizontal (tab 7 fois entre dans menu)        
    {
        label: "Menu_horizontal (tab 7 fois entre dans menu)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet, 
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu fleche droite select version)        
    {
        label: "Menu_horizontal (tab 7 fois entre dans menu fleche droite select version)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu fleche bas select version)        
    {
        label: "Menu_horizontal (tab 7 fois entre dans menu fleche bas select version)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu deux fleche droite select navigation)        
    {
        label: "Menu_horizontal (tab 7 fois entre dans menu deux fleche droite select navigation)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu deux fleche bas select navigation)        
    {
        label: "Menu_horizontal (tab 7 fois entre dans menu deux fleche bas select navigation)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu deux fleche bas un gauche select version)        
    {
        label: "Menu_horizontal (entre dans menu deux fleche bas un gauche select version)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown","ArrowLeft"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu deux fleche droite un haut select version)        
    {
        label: "Menu_horizontal (entre dans menu deux fleche droite un haut select version)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","ArrowUp"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu deux fleche droite quatre gauche select home)        
    {
        label: "Menu_horizontal (entre dans menu deux fleche droite quatre gauche select home)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","ArrowLeft","ArrowLeft","ArrowLeft","ArrowLeft"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans menu une fleche droite deux gauche select home)        
    {
        label: "Menu_horizontal (entre dans menu une fleche droite deux gauche select home)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowLeft","ArrowLeft"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation enter ouvre navigation)        
    {
        label: "Menu_horizontal (entre dans navigation enter ouvre navigation)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter"],
        appendBsTestHash: true
    },
    //Menu horizontal (ouvre navigation clavier escape ferme navigation)        
    {
        label: "Menu_horizontal (ouvre navigation clavier escape ferme navigation)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","Escape"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation fleche droite selection element un)        
    {
        label: "Menu_horizontal (entre dans navigation fleche droite selection element un)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","ArrowRight"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation double fleche droite selection element deux)        
    {
        label: "Menu_horizontal (entre dans navigation double fleche droite selection element deux)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","ArrowRight","ArrowRight"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation fleche double droite gauche selection element un)        
    {
        label: "Menu_horizontal (entre dans navigation fleche double droite gauche selection element un)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","ArrowRight","ArrowRight","ArrowLeft"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation fleche bas selection element un)        
    {
        label: "Menu_horizontal (entre dans navigation fleche bas selection element un)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","ArrowDown"],
        appendBsTestHash: true
    },
    //Menu horizontal (entre dans navigation fleche bas triple haut selection element un)        
    {
        label: "Menu_horizontal (entre dans navigation fleche bas triple haut selection element un)", 
        url: "/composants/navigation/menuhorizontal",
        selectors: ["viewport"],
        removeSelectors: [".no-test"],
        viewports: viewports.vDesktopTablet,
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowRight","ArrowRight","Enter","ArrowDown","ArrowUp","ArrowUp","ArrowUp"],
        appendBsTestHash: true
    },

    //Menu vertical (Base)        
    {
        label: "Menu_vertical (Base)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        removeSelectors: [".no-test"]
    },    
    //Menu vertical (Base mobile)        
    {
        label: "Menu_vertical (Base-mobile)", 
        url: "/composants/navigation/menuvertical",
        viewports: viewports.vTabletPhone,
        selectors: ["utd-menu-vertical"],        
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}]
    },    
    //Menu vertical (Hover niveau 1 sans enfants - Desktop)        
    {
        label: "Menu_vertical (Hover niveau 1 sans enfants)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        hoverSelectors: ['utd-menu-vertical-item[href="/composants/versions"]']
    },    
    //Menu vertical (Hover niveau 1 sans enfants - Mobile)        
    {
        label: "Menu_vertical (Hover niveau 1 sans enfants - Mobile)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"], 
        viewports: viewports.vTabletPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}],
        hoverSelectors2: ['utd-menu-vertical-item[href="/composants/versions"]']
    },    
    //Menu vertical (Hover niveau 1 avec enfants - Desktop)        
    {
        label: "Menu_vertical (Hover niveau 1 avec enfants - Desktop)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        hoverSelectors: ['utd-menu-vertical-item[libelle="Action"]']
    },    
    //Menu vertical (Hover niveau 1 avec enfants - Mobile)        
    {
        label: "Menu_vertical (Hover niveau 1 avec enfants - Mobile)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"], 
        viewports: viewports.vTabletPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}],
        hoverSelectors2: ['utd-menu-vertical-item[libelle="Action"]']
    },    
    //Menu vertical (Hover niveau 1 actif avec enfants - Desktop)        
    {
        label: "Menu_vertical (Hover niveau 1 actif avec enfants - Desktop)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        shadowHoverSelectors: [{domSelector: 'utd-menu-vertical-item[libelle="Navigation"]', shadowDomSelector: "a"}],
    },    
    //Menu vertical (Hover niveau 1 actif avec enfants - Mobile)        
    {
        label: "Menu_vertical (Hover niveau actif 1 avec enfants - Mobile)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"], 
        viewports: viewports.vTabletPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}],
        shadowHoverSelectors2: [{domSelector: 'utd-menu-vertical-item[libelle="Navigation"]', shadowDomSelector: "a"}],
    },    
    //Menu vertical (Hover niveau 2 - Desktop)        
    {
        label: "Menu_vertical (Hover niveau 2)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        hoverSelectors: ['utd-menu-vertical-item[libelle="Haut de page"]']
    },    
    //Menu vertical (Hover niveau 2  - Mobile)        
    {
        label: "Menu_vertical (Hover niveau 2 - Mobile)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"], 
        viewports: viewports.vTabletPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}],
        hoverSelectors2: ['utd-menu-vertical-item[libelle="Haut de page"]']
    },    
    //Menu vertical (Hover niveau 2 actif - Desktop)        
    {
        label: "Menu_vertical (Hover niveau 2 actif)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        hoverSelectors: ['utd-menu-vertical-item[libelle="Menu vertical"]']
    },    
    //Menu vertical (Hover niveau 2 actif  - Mobile)        
    {
        label: "Menu_vertical (Hover niveau 2 actif - Mobile)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"], 
        viewports: viewports.vTabletPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "utd-menu-vertical", shadowDomSelector: "a.toggle"}],
        hoverSelectors2: ['utd-menu-vertical-item[libelle="Menu vertical"]']
    },    
    //Menu vertical (fleche bas)        
    {
        label: "Menu_vertical (fleche bas)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown"]
    },     
    //Menu vertical (deux fleche bas)        
    {
        label: "Menu_vertical (deux fleche bas)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown"]
    },
    //Menu vertical (deux fleche bas)        
    {
        label: "Menu_vertical (deux fleche bas)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown"]
    },
    //Menu vertical (deux fleche bas fleche droite)        
    {
        label: "Menu_vertical (deux fleche bas fleche droite)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown","ArrowRight"]
    },
    //Menu vertical (deux fleche bas fleche droite deux bas)        
    {
        label: "Menu_vertical (deux fleche bas fleche droite deux bas)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown","ArrowRight","ArrowDown","ArrowDown"]
    },
    //Menu vertical (deux fleche bas droite deux bas une haut)        
    {
        label: "Menu_vertical (deux fleche bas droite deux bas une haut)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown","ArrowRight","ArrowDown","ArrowDown","ArrowUp"]
    },
    //Menu vertical (deux fleche bas droite gauche ferme menu)        
    {
        label: "Menu_vertical (deux fleche bas droite gauche ferme menu)", 
        url: "/composants/navigation/menuvertical",
        selectors: ["utd-menu-vertical"],
        viewports: viewports.vDesktop, 
        removeSelectors: [".no-test"],
        keyPressKeyCode: ["Tab","Tab","Tab","Tab","Tab","Tab","Tab","Tab","ArrowDown","ArrowDown","ArrowRight","ArrowLeft"]
    },

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
    //Pied page site (Base)
    {
        label: "Pied_page_site (Base)", 
        url: "/composants/entetepiedpage/piedpagesite",
        removeSelectors: [".no-test"]
    },    
    //Piv entête (Base - 2 lignes MO, 2 liens langue et nous joindre)
    {
        label: "Piv_entete (Base)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],  
        removeSelectors: [".no-test"]
    },    
    //Piv entête (1 ligne MO, 1 lien nous joindre)
    {
        label: "Piv_entete (1 ligne MO, 1 lien nous joindre)", 
        url: "/composants/entetepiedpage/pivpiedpage",
        selectors: ["utd-piv-entete"],
        removeSelectors: [".no-test"]  
    },    
    //Piv entête (1 ligne MO, Aucun lien)
    {
        label: "Piv_entete (1 ligne MO, Aucun lien)", 
        url: "/gabarit1colonne",
        selectors: ["utd-piv-entete"],
        removeSelectors: [".no-test"]  
    },
    //Piv entête avec barre de recherche (base)
    {
        label: "Piv_entete avec barre recherche (Base)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],  
        removeSelectors: [".no-test"]
    },
    //Piv entête afficher recherche (hover de la loupe)
    {
        label: "Piv_entete avec barre recherche (hover de la loupe)", 
        url: "/composants/entetepiedpage/piventete",
        viewports: viewports.vDesktopTablet,
        selectors: ["utd-piv-entete"],  
        removeSelectors: [".no-test"],
        shadowHoverSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}]
    },
    //Piv entête afficher recherche (hover de la loupe mobile)
    {
        label: "Piv_entete avec barre recherche (hover de la loupe mobile)", 
        url: "/composants/entetepiedpage/piventete",
        viewports: viewports.vPhone,
        selectors: ["utd-piv-entete"],  
        removeSelectors: [".no-test"],
        shadowHoverSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}]
    },
    //Piv entête afficher recherche (clic loupe affiche barre de recherche )
    {
        label: "Piv_entete avec barre recherche (clic loupe affiche barre de recherche )", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}]
    },
    //Piv entête afficher recherche (clic loupe affiche barre de recherche mobile)
    {
        label: "Piv_entete avec barre recherche (clic loupe affiche barre de recherche mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}]
    },
    //Piv entête afficher recherche (deux clic loupe ferme ouvre ferme recherche)
    {
        label: "Piv_entete avec barre recherche (deux clic loupe ouvre ferme recherche)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"},{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}]
    },
    //Piv entête afficher recherche (deux clic loupe ouvre ferme recherche mobile)
    {
        label: "Piv_entete avec barre recherche (deux clic loupe ouvre ferme recherche mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"},{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}]
    },
    //Piv entête afficher recherche (clic loupe clic body enleve focus sur recherche)
    {
        label: "Piv_entete avec barre recherche (clic loupe clic body enleve focus sur recherche)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (clic loupe clic body enleve focus sur recherche mobile)
    {
        label: "Piv_entete avec barre recherche (clic loupe clic body enleve focus sur recherche mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (loupe body barre de recherche remet focus sur barre recherche)
    {
        label: "Piv_entete avec barre recherche (loupe body barre de recherche remet focus sur barre recherche)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"},{domSelector: "utd-piv-entete", shadowDomSelector: ".controle-recherche"}]
    },
    //Piv entête afficher recherche (loupe body barre de recherche remet focus sur barre recherche mobile)
    {
        label: "Piv_entete avec barre recherche (loupe body barre de recherche remet focus sur barre recherche mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"},{domSelector: "utd-piv-entete", shadowDomSelector: ".controle-recherche"}]
    },
    //Piv entête afficher recherche (clic loupe tab donne focus controle suivant)
    {
        label: "Piv_entete avec barre recherche (clic loupe tab donne focus controle suivant)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["Tab"]
    },
    //Piv entête afficher recherche (clic loupe tab donne focus controle suivant mobile)
    {
        label: "Piv_entete avec barre recherche (clic loupe tab donne focus controle suivant mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["Tab"]
    },
    //Piv entête afficher recherche (ecrire s aucune recherche executee)
    {
        label: "Piv_entete avec barre recherche (ecrire s aucune recherche executee)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s"]
    },
    //Piv entête afficher recherche (ecrire s aucune recherche executee mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire s aucune recherche executee mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s"]
    },
    //Piv entête afficher recherche (ecrire se aucune recherche executee)
    {
        label: "Piv_entete avec barre recherche (ecrire se aucune recherche executee)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["se"]
    },
    //Piv entête afficher recherche (ecrire se aucune recherche executee mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire se aucune recherche executee mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["utd-piv-entete"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["se"]
    },
    //Piv entête afficher recherche (ecrire sec trouve des resultats)
    {
        label: "Piv_entete avec barre recherche (ecrire sec trouve des resultats)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["sec"]
    },
    //Piv entête afficher recherche (ecrire sec trouve des resultats mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec trouve des resultats mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["sec"]
    },
    //Piv entête afficher recherche (ecrire sec body ferme resultats recherche et laisse sec dans champ)
    {
        label: "Piv_entete avec barre recherche (ecrire sec body ferme resultats recherche et laisse sec dans champ)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["sec"],
        shadowClickSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (ecrire sec body ferme resultats recherche et laisse sec dans champ mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec body ferme resultats recherche et laisse sec dans champ mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["sec"],
        shadowClickSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (ecrire sec escape ferme resultats recherche et laisse sec dans champ)
    {
        label: "Piv_entete avec barre recherche (ecrire sec escape ferme resultats recherche et laisse sec dans champ)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","Escape"]
    },
    //Piv entête afficher recherche (ecrire sec escape ferme resultats recherche et laisse sec champ mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec escape ferme resultats recherche et laisse sec champ mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","Escape"]
    },
    //Piv entête afficher recherche (sec double escape ferme resultats recherche et laisse pas sec dans champ)
    {
        label: "Piv_entete avec barre recherche (sec double escape ferme resultats recherche et laisse pas sec dans champ)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","Escape","Escape"]
    },
    //Piv entête afficher recherche (sec double escape ferme resultats recherche et laisse pas sec dans champ mobile)
    {
        label: "Piv_entete avec barre recherche (sec double escape ferme resultats recherche et laisse pas sec dans champ mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","Escape","Escape"]
    },
    //Piv entête afficher recherche (ecrire sec tab la recherche se ferme et on va sur X)
    {
        label: "Piv_entete avec barre recherche (ecrire sec tab la recherche se ferme et on va sur X)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","Tab"]
    },
    //Piv entête afficher recherche (ecrire sec tab la recherche se ferme et on va sur X mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec tab la recherche se ferme et on va sur X mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","Tab"]
    },
    //Piv entête afficher recherche (ecrire cont affiche resultat)
    {
        label: "Piv_entete avec barre recherche (ecrire cont affiche resultat)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["cont"]
    },
    //Piv entête afficher recherche (ecrire cont affiche resultat mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire cont affiche resultat mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["cont"]
    },
    //Piv entête afficher recherche (ecrire sect accent affiche resultat sect)
    {
        label: "Piv_entete avec barre recherche (ecrire sect accent affiche resultat sect)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["séct"]
    },
    //Piv entête afficher recherche (ecrire sect accent affiche resultat sect mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sect accent affiche resultat sect mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["séct"]
    },
    //Piv entête afficher recherche (ecrire *c/on% affiche resultat con)
    {
        label: "Piv_entete avec barre recherche (ecrire *c/on% affiche resultat con)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["*c/on%"]
    },
    //Piv entête afficher recherche (ecrire *c/on% affiche resultat con mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire *c/on% affiche resultat con mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["*c/on%"]
    },
    //Piv entête afficher recherche (ecrire ahm affiche Aucun resultat)
    {
        label: "Piv_entete avec barre recherche (ecrire ahm affiche Aucun resultat)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["ahm"]
    },
    //Piv entête afficher recherche (ecrire ahm affiche Aucun resultat mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire ahm affiche Aucun resultat mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["ahm"]
    },
    //Piv entête afficher recherche (ecrire sec clic X reset le champ)
    {
        label: "Piv_entete avec barre recherche (ecrire sec puis clic X reset le champ)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["sec"],
        shadowClickSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".reinitialiser-recherche"}]
    },
    //Piv entête afficher recherche (ecrire sec puis clic X reset le champ mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec puis clic X reset le champ mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["sec"],
        shadowClickSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".reinitialiser-recherche"}]
    },
    //Piv entête afficher recherche (ecrire sec hover resultat souligne et met fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec hover resultat souligne et met fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["sec"],
        shadowHoverSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".lien-resultat"}]
    },
    //Piv entête afficher recherche (ecrire sec hover resultat souligne et met fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec hover resultat souligne et met fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["sec"],
        shadowHoverSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".lien-resultat"}]
    },
    //Piv entête afficher recherche (ecrire sec hover resultat hover body resultat pas souligne mais fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec hover resultat hover body resultat pas souligne mais fond bleu)",
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["sec"],
        shadowHoverSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".lien-resultat"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (ecrire sec hover resultat hover body resultat pas souligne mais fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec hover resultat hover body resultat pas souligne mais fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["sec"],
        shadowHoverSelectors2:[{domSelector: "utd-piv-entete", shadowDomSelector: ".lien-resultat"},{domSelector: "utd-piv-entete", shadowDomSelector: ".utd-piv-entete"}]
    },
    //Piv entête afficher recherche (ecrire sec fleche bas selection premier resultat et fond bleu dessus)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche bas selection premier resultat et fond bleu dessus)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec fleche bas selection premier resultat et fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche bas mobile selection premier resultat et fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec double fleche bas selection deuxieme resultat et fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec double fleche bas selection deuxieme resultat et fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec double fleche bas selection deuxieme resultat et fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec double fleche bas selection deuxieme resultat et fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec fleche haut selection dernier resultat et fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche haut selection dernier resultat et fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec fleche haut selection dernier resultat et fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche haut selection dernier resultat et fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec double fleche haut selection avant dernier resultat et fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec double fleche haut selection avant dernier resultat et fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowUp","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec double fleche haut selection avant dernier resultat et fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec double fleche haut selection avant dernier resultat et fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowUp","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec fleche bas fleche haut selection dernier resultat et fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche bas fleche haut selection dernier resultat et fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec fleche bas fleche haut selection dernier resultat et fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche bas fleche haut selection dernier resultat et fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec fleche gauche deplace curseur dans texte)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche gauche deplace curseur dans texte)",
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowLeft"]
    },
    //Piv entête afficher recherche (ecrire sec fleche gauche deplace curseur dans texte mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche gauche deplace curseur dans texte mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowLeft"]
    },
    //Piv entête afficher recherche (ecrire sec fleche droite deplace curseur dans texte)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche droite deplace curseur dans texte)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowRight"]
    },
    //Piv entête afficher recherche (ecrire sec fleche droite deplace curseur dans texte mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec fleche droite deplace curseur dans texte mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowRight"]
    },
    //Piv entête afficher recherche (ecrire sec douze fleche bas selection premier resultat fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec douze fleche bas selection premier resultat fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec douze fleche bas selection premier resultat fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec douze fleche bas selection premier resultat fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire sec douze fleche haut selection dernier resultat fond bleu)
    {
        label: "Piv_entete avec barre recherche (ecrire sec douze fleche haut selection dernier resultat fond bleu)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vDesktopTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec douze fleche haut selection dernier resultat fond bleu mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec douze fleche haut selection dernier resultat fond bleu mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire sec Home deplace curseur au debut du texte)
    {
        label: "Piv_entete avec barre recherche (ecrire sec Home deplace curseur au debut du texte)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","Home"]
    },
    //Piv entête afficher recherche (ecrire sec Home deplace curseur au debut texte mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec Home deplace curseur au debut texte mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","Home"]
    },
    //Piv entête afficher recherche (ecrire sec End deplace curseur a la fin texte)
    {
        label: "Piv_entete avec barre recherche (ecrire sec End deplace curseur a la fin texte)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["s","e","c","End"]
    },
    //Piv entête afficher recherche (ecrire sec End deplace curseur a la fin texte mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire sec End deplace curseur a la fin texte mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["s","e","c","End"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        textInput: ["con"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        textInput: ["con"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat 11 fleche bas selection msg erreur)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat 11 fleche bas selection msg erreur)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["c","o","n","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat 11 fleche bas selection msg erreur mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat 11 fleche bas selection msg erreur mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["c","o","n","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown","ArrowDown"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat fleche haut selection msg erreur)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat fleche haut selection msg erreur)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vTablet,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: ".bouton-toggle-recherche"}],
        keyPressKeyCode: ["c","o","n","ArrowUp"]
    },
    //Piv entête afficher recherche (ecrire con max 10 resultat fleche haut selection msg erreur mobile)
    {
        label: "Piv_entete avec barre recherche (ecrire con max 10 resultat fleche haut selection msg erreur mobile)", 
        url: "/composants/entetepiedpage/piventete",
        selectors: ["viewport"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors:[{domSelector: "utd-piv-entete", shadowDomSelector: "#btnToggleRecherchePIVmobile"}],
        keyPressKeyCode: ["c","o","n","ArrowUp"]
    },

    //Piv pied page (Base)
    {
        label: "Piv_pied_page (Base)", 
        url: "/composants/entetepiedpage/pivpiedpage",
        selectors: ["footer"],  
        removeSelectors: [".no-test"]
    },
    //Points suspension (Base)
    {
        label: "Points_suspension (Base)", 
        viewports: viewports.vDesktopPhones,
        selectors: [".backstop-test"],
        url: "/composants/affichagecontenu/pointssuspension"
    },    
    //Points suspension (Click ...)
    {
        label: "Points_suspension (Click ...)",
        viewports: viewports.vDesktopPhones,
        selectors: [".backstop-test"],         
        url: "/composants/affichagecontenu/pointssuspension",
        shadowClickSelectors: [{domSelector: "#exemplePointsSuspension1 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension2 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension3 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension4 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension5 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension6 utd-points-suspension", shadowDomSelector: 'a'}, {domSelector: "#exemplePointsSuspension7 utd-points-suspension", shadowDomSelector: 'a'}]
    },    
    //Points suspension (reinitialisation ...)
    {
        label: "Points_suspension (Reinitialisation)",
        viewports: viewports.vPhone,
        selectors: ["#exemplePointsSuspension6"],         
        url: "/composants/affichagecontenu/pointssuspension",
        shadowClickSelectors: [{domSelector: "#exemplePointsSuspension6 utd-points-suspension", shadowDomSelector: 'a'}],
        clickSelectors2: ["#btnTest6"]
    },    

    //Section (base)
    {
        label: "Section (Base)", 
        url: "/composants/affichagecontenu/section"
    },
    //Section (avec accordéons)
    {
        label: "Section (avec accordéons)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection2"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleSection2", shadowDomSelector: "button"}]
    },
    //Section (sans bordure)
    {
        label: "Section (sans bordure)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection3"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleSection3", shadowDomSelector: "button"}]
    },
    //Section (non extensible)
    {
        label: "Section (non extensible)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection4"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
    },
    //Section (non extensible, sans bordure)
    {
        label: "Section (non extensible,sans bordure)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection5"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
    },
    //Section (ouverte et titre h3)
    {
        label: "Section (ouverte et titre h3)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection6"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
    },
    //Section (focus/ouverture)
    {
        label: "Section (focus/ouverture)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection1"],
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleSection1", shadowDomSelector: "button"}]
    },
    //Section (focus/fermeture)
    {
        label: "Section (focus/fermeture)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection6"],        
        viewports: viewports.vPhone,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domSelector: "#exempleSection6", shadowDomSelector: "button"}]
    },    
    //Section (hover)
    {
        label: "Section (hover)", 
        url: "/composants/affichagecontenu/section",
        selectors: ["#exempleSection1"],        
        viewports: viewports.vPhone,
        hoverSelectors: ["#exempleSection1"]
    },    
    //Section (contrôle via bouton/fermeture)
    {
        label: "Section (contrôle via bouton/fermeture)", 
        url: "/composants/affichagecontenu/section",
        viewports: viewports.vPhone,
        selectors: ["#exempleSection7", "#resultat7"],
        clickSelectors: ["#btnControleExemple7"]
    },
    //Section (contrôle via bouton/ouverture)
    {
        label: "Section (contrôle via bouton/ouverture)", 
        url: "/composants/affichagecontenu/section",
        viewports: viewports.vPhone,
        selectors: ["#exempleSection7", "#resultat7"],
        clickSelectors: ["#btnControleExemple7", "#btnControleExemple7"]
    },
]}