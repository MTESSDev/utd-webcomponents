const puppeteer = require('puppeteer');

async function startBrowser(){
	let browser;
	try {
	    console.log("Ouverture du navigateur......");
	    browser = await puppeteer.launch({
	        headless: true,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    });
	} catch (err) {
	    console.log("Impossible de créer l'instance du navigateur => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};