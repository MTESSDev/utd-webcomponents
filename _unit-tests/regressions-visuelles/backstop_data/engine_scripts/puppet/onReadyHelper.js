  //Ajout MESS
  getShadowDomElement = async function(page, domSelector, shadowDomSelector) {
    if (domSelector && shadowDomSelector) {
        await page.waitForSelector(domSelector); 
        const domElement = await page.$(domSelector);

        if(domElement){
          const shadowDomElement = await domElement.$(`pierce/${shadowDomSelector}`);
          return shadowDomElement;
        } 
    }
    return null;
  }

  handleShadowEvent = async function(eventName, page, selector, postInteractionWait) {
    //Ajout MESS
    if (selector) {
      for (const selectorIndex of [].concat(selector)) {                
        const shadowDomElement = await getShadowDomElement(page, selectorIndex.domElementSelector, selectorIndex.shadowDomElementSelector);
  
        if(shadowDomElement){
          await executeShadowEvent(eventName, shadowDomElement);
          await handlePostInteractionWait(page, postInteractionWait);        
        }
      }
    }
  }

  executeShadowEvent = async function(eventName, shadowDomElement) {
    switch (eventName) {
      case "click":
        await shadowDomElement.click();
        break;
      case "hover":
        await shadowDomElement.hover(shadowDomElement);
        break;
      
      default:
        break;
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
  const shadowFocusSelector = scenario.shadowFocusSelectors || scenario.shadowFocusSelector;
  const shadowClickSelector = scenario.shadowClickSelectors || scenario.shadowClickSelector;
  const shadowClickSelector2 = scenario.shadowClickSelectors2 || scenario.shadowClickSelector2;
  const shadowHoverSelector = scenario.shadowHoverSelectors || scenario.shadowHoverSelector;

  const shadowHoverSelector2 = scenario.shadowHoverSelectors2 || scenario.shadowHoverSelector2;

  handleScrollTo = async function(selector) {
    if (selector) {
      await page.waitForSelector(selector);
      await page.evaluate(selector => {
        document.querySelector(selector).scrollIntoView();
      }, selector);

      await handlePostInteractionWait(page, postInteractionWait);  
    }
  }

  handleClick = async function(selector) {
    if (selector) {
      for (const selectorIndex of [].concat(selector)) {
        await page.waitForSelector(selectorIndex);
        await page.click(selectorIndex);
        await handlePostInteractionWait(page, postInteractionWait);    
      }
    }
  }

  handleHover = async function(selector) {
    if (selector) {
      for (const selectorIndex of [].concat(selector)) {
        await page.waitForSelector(selectorIndex);
        await page.hover(selectorIndex);
        await handlePostInteractionWait(page, postInteractionWait);    
      }
    }
  }




  //Si un sélecteur est spécifié on ajoute la classe de test en cours sur le body
  if(scenario.selectors.length){
    await page.$eval('body', (b => b.classList.add("bs-test-in-progress")));
  }

  await handleScrollTo(scrollToSelector);

  await handleHover(hoverSelector);

  await handleClick(clickSelector);

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      await handlePostInteractionWait(page, postInteractionWait);    
    }
  }

  
  //Ajout MESS
  if (focusSelector) {
    for (const focusSelectorIndex of [].concat(focusSelector)) {
      await page.waitForSelector(focusSelectorIndex);
      await page.focus(focusSelectorIndex);
      await handlePostInteractionWait(page, postInteractionWait);    
    }
  }

  await handleShadowEvent("hover", page, shadowHoverSelector, postInteractionWait);

  //Ajout MESS
  if (shadowFocusSelector) {
    for (const focusSelectorIndex of [].concat(shadowFocusSelector)) {
      await page.waitForSelector(focusSelectorIndex.domElementSelector);

      const domElement = await page.$(focusSelectorIndex.domElementSelector);

      if(domElement){
        const shadowDomElement = await domElement.$(`pierce/${focusSelectorIndex.shadowDomElementSelector}`);

        if(shadowDomElement){
          await shadowDomElement.focus();
          await handlePostInteractionWait(page, postInteractionWait);    
        }
      }    
    }
  }

  console.log('avant shadowClick!!!!');
  await handleShadowEvent("click", page, shadowClickSelector, postInteractionWait);  
  console.log('après shadowClick!!!!');
  //Ajout MESS
  if (keyPressKeyCode) {
    for (const keyPressKeyCodeIndex of [].concat(keyPressKeyCode)) {
      page.keyboard.press(keyPressKeyCodeIndex);
      console.log('PRESS!!!!');
//      await page.waitForSelector(keyPressSelectorItem.selector);
//      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      await handlePostInteractionWait(page, postInteractionWait);    
    }    
  }
  
  //2ème passe
  await handleScrollTo(scrollToSelector2);  
  await handleClick(clickSelector2);
  await handleHover(hoverSelector2);  

  await handleShadowEvent("click", page, shadowClickSelector2, postInteractionWait);  
  await handleShadowEvent("hover", page, shadowHoverSelector2, postInteractionWait);
};
