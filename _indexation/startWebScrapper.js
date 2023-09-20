const objetNavigateur = require('./browser');
const scraperController = require('./pageController');

// Creer le navigateur web ainsi qu'une instance de ce dernier
let instanceNavigateur = objetNavigateur.startBrowser();

// Envoie l'instance de navigateur au controlleur d'extraction
scraperController(instanceNavigateur)