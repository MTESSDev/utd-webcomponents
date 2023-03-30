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
    misMatchThreshold: 0.01,
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
        viewports: viewports.vDesktop,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domElementSelector: "#exempleAccordeon1", shadowDomElementSelector: "button"}]
    },
    //Accordéon (focus/fermeture)
    {
        label: "Accordeon (focus/fermeture)", 
        url: "/composants/affichagecontenu/accordeon",
        selectors: ["#exempleAccordeon4"],        
        viewports: viewports.vDesktop,
        removeSelectors: [".no-test"],
        shadowClickSelectors: [{domElementSelector: "#exempleAccordeon4", shadowDomElementSelector: "button"}]
    },    
    //Accordéon (hover) Doit prendre écran au complet sinon ne fonctionne pas... problème bizarre... https://github.com/garris/BackstopJS/issues/689
    {
        label: "Accordeon (hover)", 
        url: "/composants/affichagecontenu/accordeon",
        viewports: viewports.vDesktop,
        shadowHoverSelectors: [{domElementSelector: "#exempleAccordeon1", shadowDomElementSelector: "button"}],
    },    
    //Accordéon (contrôle via bouton/fermeture)
    {
        label: "Accordeon (contrôle via bouton/fermeture)", 
        url: "/composants/affichagecontenu/accordeon",
        viewports: viewports.vDesktop,
        selectors: ["#exempleAccordeon5"],
        clickSelectors: ["#btnControleExemple5"]
    },
    //Accordéon (contrôle via bouton/ouverture)
    {
        label: "Accordeon (contrôle via bouton/ouverture)", 
        url: "/composants/affichagecontenu/accordeon",
        viewports: viewports.vDesktop,
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
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons1"],
        clickSelectors: ["#exempleBoutons1 button"]
    },
    //Bouton secondaire focus
    {
        label: "Boutons secondaire (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons2"],        
        clickSelectors: ["#exempleBoutons2 button"]
    },
    //Bouton tertiaire focus
    {
        label: "Boutons tertiaire (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons3"],
        clickSelectors: ["#exempleBoutons3 button"]
    },
    //Bouton avertissement focus
    {
        label: "Boutons avertissement (focus)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons4"],
        clickSelectors: ["#exempleBoutons4 button"]
    },
    //Bouton primaire hover
    {
        label: "Boutons primaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons1"],
        hoverSelectors: ["#exempleBoutons1 button"]
    },
    //Bouton secondaire hover
    {
        label: "Boutons secondaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons2"],        
        hoverSelectors: ["#exempleBoutons2 button"]
    },
    //Bouton tertiaire hover
    {
        label: "Boutons tertiaire (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons3"],
        hoverSelectors: ["#exempleBoutons3 button"]
    },
    //Bouton avertissement hover
    {
        label: "Boutons avertissement (hover)", 
        url: "/composants/actions/boutons",
        viewports: viewports.vDesktop,
        selectors: ["#exempleBoutons4"],
        hoverSelectors: ["#exempleBoutons4 button"]
    },
    //Champs textes et autres (focus testé via le input #taille1)
    {
        label: "Champs_textes et autres", 
        url: "/composants/formulaire/champstexte",            
        clickSelectors: ["#taille1"]      
    },
    //Champs gestion automatique (focus testé via le input #requete)
    {
        label: "Champs_gestion_automatique", 
        url: "/composants/formulaire/champsautomatique",
        clickSelectors: ["#requete"]
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


]}