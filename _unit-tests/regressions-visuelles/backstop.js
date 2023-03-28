const backstop = require('backstopjs');
const fs = require('fs-extra');
const args = require('yargs').argv;
const repertoireBitmapsTest = 'backstop_data/bitmaps_test';


const supprimerFichiersRepertoire = function(chemin) {
  if (fs.existsSync(chemin)) {
    const files = fs.readdirSync(chemin)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(chemin + "/" + filename).isDirectory()) {
          fs.removeSync(chemin + "/" + filename);
        } else {
          fs.unlinkSync(chemin + "/" + filename);
        }
      })
    } else {
      console.log("Aucun fichier trouvé dans le répertoire.")
    }
  } else {
    console.log("Chemin de fichiers non trouvé.")
  }
}

const obtenirCommande = function() {  
  if (args.reference) {
    return "reference";
  } else if (args.test) {
      return "test";
  } else if(args.approve) {
      return "approve";
  } else if(args.openReport) {
      return "openReport";
  } else if(args.remote) {
    return "remote";
  }
}


process.argv = []; 

supprimerFichiersRepertoire(repertoireBitmapsTest);

backstop(obtenirCommande(), { config: 'backstopConfig' });
//backstop(commandToRun, { docker: true, config: 'backstop.json' });
