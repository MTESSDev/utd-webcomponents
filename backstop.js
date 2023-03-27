const backstop = require('backstopjs');
const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;
const repertoireUnitTests = './_unit-tests/regressions-visuelles';
const repertoireBitmapsTest = repertoireUnitTests + '/backstop_data/bitmaps_test';


const supprimerFichiersRepertoire = function(cheminRepertoire) {
    repertoire = path.join(__dirname, cheminRepertoire)    
    if (fs.existsSync(repertoire)) {
      const files = fs.readdirSync(repertoire)
  
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fs.statSync(repertoire + "/" + filename).isDirectory()) {
            supprimerFichiersRepertoire(repertoire + "/" + filename)
          } else {
            fs.unlinkSync(repertoire + "/" + filename)
          }
        })
      } else {
        console.log("No files found in the directory.")
      }
    } else {
      console.log("Directory path not found.")
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

backstop(commandToRun, { config: './_unit-tests/regressions-visuelles/backstopJs' });
//backstop(commandToRun, { docker: true, config: 'backstop.json' });
