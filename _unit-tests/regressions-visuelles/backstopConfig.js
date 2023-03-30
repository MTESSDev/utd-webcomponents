
const scenarios = require('./scenarios');
const viewports = require('./viewports');

const obtenirScenarios = function(){

    return scenarios.scenarios.map(s => {
        const scenario = {...scenarios.paramsDefaut, ...s};
        scenario.url = scenarios.urlBase + scenario.url;
        return scenario;        
    });      
}

module.exports = {
    id: 'UTD',
    viewports :  viewports.vDefaults,
    scenarios: obtenirScenarios(),
    paths: {
      engine_scripts: 'backstop_data/engine_scripts',
      bitmaps_reference: 'backstop_data/bitmaps_reference',
      bitmaps_test: 'backstop_data/bitmaps_test',
      html_report: 'backstop_data/html_report',
      ci_report: 'backstop_data/ci_report'
    },
    report: ["browser"],
    engine: "puppeteer",
    engineOptions: {
      args: ["--no-sandbox"]
    },
    asyncCaptureLimit: 10,
    asyncCompareLimit: 100,
    debug: false,
    debugWindow: false,
    scenarioLogsInReports: true
};

