const puppeteer = require('puppeteer');

async function startBrowser(){
	let navigateur;
	try {
	    console.log("Ouverture du navigateur...");
	    navigateur = await puppeteer.launch({
	        headless: true,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    });
	} catch (err) {
	    console.log("Impossible de créer l'instance du navigateur => : ", err);
	}
	return navigateur;
}

module.exports = {
	startBrowser
};