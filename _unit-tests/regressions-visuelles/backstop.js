const backstop = require('backstopjs');
const fs = require('fs-extra');
//const path = require('path');
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

let commandToRun = "";

if (args.reference) {
    commandToRun = "reference";
}

if (args.test) {
    commandToRun = "test";
}

if (args.approve) {
    commandToRun = "approve";
}

if (args.openReport) {
    commandToRun = "openReport";
}


process.argv = []; 

supprimerFichiersRepertoire(repertoireBitmapsTest);

backstop(commandToRun, { config: 'backstopConfig' });
//backstop(commandToRun, { docker: true, config: 'backstop.json' });
