const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		let scrapedData = await pageScraper.scraper(browser);
		await browser.close();
		fs.writeFile("donneesRecuperees.json", JSON.stringify(scrapedData, null, "\t"), 'utf8', function(err){
			if(err){
				return console.log(err);
			}
			console.log("Les donnees ont été extirpées et mis dans le fichier ./donneesRecuperees.json");
		});
	}
	catch(err){
		console.log("Impossible de trouve l'instance du navigateur => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)