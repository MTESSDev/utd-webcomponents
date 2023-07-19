const sleep = ms => new Promise(res => setTimeout(res,ms));
const scraperObject = {
	urlMain: 'https://lively-cliff-018a9540f-32.eastus2.azurestaticapps.net',
	urlComposants: '/composants/versions',
	urlPrincipes: '/base/principe',
	urlGabarit1: '/gabarit1colonne',
	urlGabarit1Cnd: '/gabarit1colonneCdn',
	urlGabarit2: '/gabarit2colonnes',
	urlGabarit2Cnd: '/gabarit2colonnesCdn',
	urlNousJoindre: '/base/nousjoindre',
	
	async scraper(browser){
		let page = await browser.newPage();
		let scrapedData = [];
		let listeUrl = [];
		
		async function scrapCurrentPage(currentPage, categorie, resultat, hyperlien){
			// On attend que le DOM soit rendered
			await currentPage.waitForSelector('#main');
			await sleep(1000);
			let texte = await currentPage.$$eval('#main', links => {
				links = links.map(el => el.innerText)
				return links;
			});
			await sleep(1000);
			scrapedData.push({c: categorie, r: resultat, h: hyperlien, t: texte[0], mc: ""});
		}
		
		async function scrapAllPages(listeUrl){
			for(i = 0; i < listeUrl.length; i++){
				console.log(`Navigation vers ${listeUrl[i]}...`);
				await page.goto(listeUrl[i]);
				await scrapCurrentPage(page, "cat", "res", listeUrl[i]);
			}
		}
		
		async function bouclerDansMenuVertical(urlMain, urlComposants){
			await page.goto(`${urlMain + urlComposants}`);
			await page.waitForSelector('#main');
			await sleep(1000);
			//On cherche le liens vers toute les pages
			const urls = await page.evaluate(() => {
				let els = Array.from(document.querySelectorAll("utd-menu-vertical utd-menu-vertical-item"));
				let links = els.map(elementA => {
					return [elementA.getAttribute("href"), elementA.getAttribute("libelle")];
				});
				return links;
			});
			await sleep(1000);
			//console.log(urls);
			//On cherche le contenu de toute les pages
			let categorie = urls[0][1];
			for(i = 0; i < urls.length; i++){
				if(urls[i][0] !== null){
					//On a bien l'url
					let urlPage = urlMain + urls[i][0];
					console.log(`Navigation vers ${urlPage}...`);
					await page.goto(`${urlPage}`);
					await scrapCurrentPage(page, categorie, urls[i][1], urlPage);
				}else{
					//on passe a la prochaine categorie
					if(urls[i][1] !== null){
						categorie = urls[i][1];
					}
				}
			}
		}
		
		//On remplit la liste d'url
		listeUrl.push(this.urlMain);
		listeUrl.push(this.urlMain + this.urlPrincipes);
		listeUrl.push(this.urlMain + this.urlGabarit1);
		listeUrl.push(this.urlMain + this.urlGabarit1Cnd);
		listeUrl.push(this.urlMain + this.urlGabarit2);
		listeUrl.push(this.urlMain + this.urlGabarit2Cnd);
		listeUrl.push(this.urlMain + this.urlNousJoindre);
		
		//On effectue les operations
		await scrapAllPages(listeUrl);
		await bouclerDansMenuVertical(this.urlMain, this.urlComposants);
		await sleep(500);
		await page.close();
		return scrapedData;
	}
}	

module.exports = scraperObject;