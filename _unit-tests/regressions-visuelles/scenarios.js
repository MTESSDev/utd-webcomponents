module.exports = {
urlBase : "http://localhost:5000",

paramsDefaut : {
    cookiePath: "backstop_data/engine_scripts/cookies.json",
    referenceUrl: "",
    readyEvent: "",
    readySelector: "",
    delay: 50,
    hideSelectors: [],
    removeSelectors: [".no-test", "header", "utd-menu-ancres", "utd-accordeon", "footer", "utd-hautpage"],
    postInteractionWait: 50,
    selectors: [],
    selectorExpansion: true,
    clickSelectors : [],
    hoverSelectors: [],
    expect: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js"  
},
scenarios : [   
    //Toujours utiliser url relative dans les scénarios. L'url de base va lui être ajoutée.
    
    //Champs textes et autres (focus testé via le input #taille1)
    {
        "label": "Champs textes et autres", 
        "url": "/composants/formulaire/champstexte",            
        "clickSelectors": ["#taille1"]      
    },

    //Champs gestion automatique (focus testé via le input #requete)
    {
        "label": "Champs gestion automatique", 
        "url": "/composants/formulaire/champsautomatique",
        "clickSelectors": ["#requete"]
    }

    
]}