const pauseTraitement = ms => new Promise(res => setTimeout(res,ms));
const scraperObject = {
	urlMain: 'https://lively-cliff-018a9540f-32.eastus2.azurestaticapps.net',
	urlComposants: '/composants/versions',
	
	async scraper(browser){
		const page = await browser.newPage();
		const donneesExtraites = [];
		
		/**
		 * Fonction permettant de recuprer le contenu textuel d'un page web
		 * @param {*} currentPage la page que à partir de laquelle nous souhaitons extraire le contenu
		 * @param {*} categorie identificateur du premier niveau
		 * @param {*} resultat identificateur du deuxieme niveau (= categorie si on a pas de deuxieme niveau)
		 * @param {*} hyperlien href de la page actuelle
		 */
		async function scrapCurrentPage(currentPage, categorie, resultat, hyperlien){
			// On attend que le DOM soit rendered
			await currentPage.waitForSelector('#main');
			await pauseTraitement(1000);
			const texte = await currentPage.$$eval('#main', links => {
				links = links.map(el => el.innerText)
				return links;
			});
			await pauseTraitement(1000);
			donneesExtraites.push({c: categorie, r: resultat, h: hyperlien, t: texte[0], mc: ""});
		}

		/**
		 * Fonction permettant d'aller chercher toutes les categories, resultats et hyperlien des elements d'un menu vertical à deux niveaux maximum
		 * @param {*} selecteurNiveau1 querySelector du premier niveau
		 * @param {*} selecteurNiveau2 querySelector du deuxieme niveau
		 * @returns 
		 */
		async function extraireNiveaux(selecteurNiveau1, selecteurNiveau2){
			const extraction = await page.evaluate((selecteurNiveau1, selecteurNiveau2) => {
				const niveau1 = document.querySelectorAll(selecteurNiveau1);
				const listeRetour = [];

				for(i = 0; i < niveau1.length; i++){
					const niveau1Courant = niveau1.item(i);
					
					if(niveau1Courant.querySelector(selecteurNiveau2)){
						//On a des enfants, on va les chercher
						const niveau2 = niveau1Courant.querySelectorAll(selecteurNiveau2);

						for(j = 0; j < niveau2.length; j++){
							const niveau2Courant = niveau2.item(j);
							//url - categorie - resultat
							listeRetour.push([niveau2Courant.getAttribute("href"), niveau1Courant.getAttribute("libelle"), niveau2Courant.getAttribute("libelle")]);
						}
					}else{
						//c est aussi r
						listeRetour.push([niveau1Courant.getAttribute("href"), niveau1Courant.getAttribute("libelle"), niveau1Courant.getAttribute("libelle")]);
					}
				}
				return listeRetour;
			},selecteurNiveau1,selecteurNiveau2);
			return extraction;
		}

		/**
		 * Fonction permettant d'aller chercher le contenu de toutes les pages du site a partir de leur href dans le menu vertical
		 * @param {*} urlMain Url du site principal : <p>http://mon-site.com</p>
		 * @param {*} refPage suite de l'url pour une page spécifique : <p>/parametres/profil</p>
		 */
		async function bouclerDansMenuVertical(urlMain, refPage = ""){
			await page.goto(`${urlMain + refPage}`);
			await page.waitForSelector('#main');
			await pauseTraitement(1000);

			//On cherche le liens vers toute les pages, ainsi que leur categorie et resultat
			const urls = await extraireNiveaux("utd-menu-vertical > utd-menu-vertical-item","utd-menu-vertical-item");
			await pauseTraitement(1000);

			//On cherche le contenu de toute les pages
			for(i = 0; i < urls.length; i++){
				const urlActuel = urls[i];
				if(urlActuel[0] !== null){
					
					//On a bien l'url (Sinon on a juste une categorie)
					const urlPage = urlMain + urlActuel[0];
					console.log(`Navigation vers ${urlPage}...`);
					await page.goto(`${urlPage}`);
					await scrapCurrentPage(page, urlActuel[1], urlActuel[2], urlPage);
				}
			}
		}
		
		//On effectue les operations d'extraction
		await bouclerDansMenuVertical(this.urlMain);
		await bouclerDansMenuVertical(this.urlMain, this.urlComposants);
		await pauseTraitement(500);
		await page.close();
		return donneesExtraites;
	}
}	

module.exports = scraperObject;