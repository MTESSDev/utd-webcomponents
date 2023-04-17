  //Ajout MESS
  getDomElement = async function(page, domSelector) {
      await page.waitForSelector(domSelector); 
      return await page.$(domSelector);
  }


  getShadowDomElement = async function(page, domSelector, shadowDomSelector) {
    if (domSelector && shadowDomSelector) {
        const domElement = await getDomElement(page, domSelector);

        if(domElement){
          const shadowDomElement = await domElement.$(`pierce/${shadowDomSelector}`);
          return shadowDomElement;
        } 
    }
    return null;
  }

  handleShadowDomEvent = async function(eventName, page, selector, postInteractionWait) {
    //Ajout MESS
    if (selector) {
      for (const selectorIndex of [].concat(selector)) {                
        const shadowDomElement = await getShadowDomElement(page, selectorIndex.domSelector, selectorIndex.shadowDomSelector);
        if(shadowDomElement){
          await executeEvent(eventName, page, shadowDomElement, selector);
          await handlePostInteractionWait(page, postInteractionWait);        
        }
      }
    }
  }

  executeEvent = async function(eventName, page, element, selector) {
    switch (eventName) {
      case "click":
        await element.click();
        break;
      case "hover":
        await element.hover(element);
        break;
      case "focus":
        await element.focus();
        break;
      case "scrollTo":
        await page.evaluate(selector => {
          document.querySelector(selector).scrollIntoView();
        }, selector);
        break; 
      default:
        break;
    }
  }

  handleDomEvent = async function(eventName, page, selector, postInteractionWait){

    if (selector) {
      for (const selectorIndex of [].concat(selector)) {                
        const element = await getDomElement(page, selectorIndex);
  
        if(element){
          await executeEvent(eventName, page, element, selector);
          await handlePostInteractionWait(page, postInteractionWait);        
        }
      }
    }
  }


  handlePostInteractionWait = async function(page, postInteractionWait){
    if (postInteractionWait) {
      await page.waitForTimeout(postInteractionWait);
    }  
  }


module.exports = async (page, scenario) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  const hoverSelector2 = scenario.hoverSelectors2 || scenario.hoverSelector2;
  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const clickSelector2 = scenario.clickSelectors2 || scenario.clickSelector2;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const scrollToSelector2 = scenario.scrollToSelector2;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  const keyPressKeyCode = scenario.keyPressKeyCodes || scenario.keyPressKeyCode;
  const focusSelector = scenario.focusSelectors || scenario.focusSelector;
  const focusSelector2 = scenario.focusSelectors2 || scenario.focusSelector2;
  const shadowHoverSelector = scenario.shadowHoverSelectors || scenario.shadowHoverSelector;
  const shadowHoverSelector2 = scenario.shadowHoverSelectors2 || scenario.shadowHoverSelector2;
  const shadowFocusSelector = scenario.shadowFocusSelectors || scenario.shadowFocusSelector;
  const shadowFocusSelector2 = scenario.shadowFocusSelectors2 || scenario.shadowFocusSelector2;
  const shadowClickSelector = scenario.shadowClickSelectors || scenario.shadowClickSelector;
  const shadowClickSelector2 = scenario.shadowClickSelectors2 || scenario.shadowClickSelector2;

  //Si un sélecteur est spécifié on ajoute la classe de test en cours sur le body
  if(scenario.selectors.length){
    if(scenario.selectors[0] !== 'document'){
      await page.$eval('body', (b => b.classList.add("bs-test-in-progress")));
    }
  }

  //Phase 1

  //Dom events
  await handleDomEvent("scrollTo", page, scrollToSelector, postInteractionWait);
  await handleDomEvent("hover", page, hoverSelector, postInteractionWait);
  await handleDomEvent("focus", page, focusSelector, postInteractionWait);
  await handleDomEvent("click", page, clickSelector, postInteractionWait);

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      await handlePostInteractionWait(page, postInteractionWait);    
    }
  }

  //Shadow events
  await handleShadowDomEvent("hover", page, shadowHoverSelector, postInteractionWait);
  await handleShadowDomEvent("focus", page, shadowFocusSelector, postInteractionWait);  
  await handleShadowDomEvent("click", page, shadowClickSelector, postInteractionWait);  

  //Ajout MESS
  if (keyPressKeyCode) {
    for (const keyPressKeyCodeIndex of [].concat(keyPressKeyCode)) {
      page.keyboard.press(keyPressKeyCodeIndex);
//      await page.waitForSelector(keyPressSelectorItem.selector);
//      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      await handlePostInteractionWait(page, postInteractionWait);    
    }    
  }
  
  //Phase 2

  //Dom events
  await handleDomEvent("scrollTo", page, scrollToSelector2, postInteractionWait);
  await handleDomEvent("hover", page, hoverSelector2, postInteractionWait);
  await handleDomEvent("focus", page, focusSelector2, postInteractionWait);
  await handleDomEvent("click", page, clickSelector2, postInteractionWait);

  //ShadowDom events
  await handleShadowDomEvent("hover", page, shadowHoverSelector2, postInteractionWait);
  await handleShadowDomEvent("focus", page, shadowFocusSelector2, postInteractionWait);  
  await handleShadowDomEvent("click", page, shadowClickSelector2, postInteractionWait);  

};
