const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance){
	let navigateur;
	try{
		navigateur = await browserInstance;
		let donneesExtraites = await pageScraper.scraper(navigateur);
		console.log("Fermeture du navigateur...");
		await navigateur.close();
		fs.writeFile("donneesRecuperees.json", JSON.stringify(donneesExtraites, null, "\t"), 'utf8', function(err){
			if(err){
				return console.log("Erreur lors de l'enregistrement du fichier => " + err);
			}
			console.log("Les donnees ont été extirpées avec succès et mises dans le fichier ./donneesRecuperees.json");
		});
	}
	catch(err){
		console.log("Erreur lors des opérations de navigation => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)