module.exports = async (page, scenario) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  const keyPressKeyCode = scenario.keyPressKeyCodes || scenario.keyPressKeyCode;
  const focusSelector = scenario.focusSelectors || scenario.focusSelector;
  const shadowClickSelector = scenario.shadowClickSelectors || scenario.shadowClickSelector;
  const shadowHoverSelector = scenario.shadowHoverSelectors || scenario.shadowHoverSelector;

  //Si un sélecteur est spécifié on ajoute la classe de test en cours sur le body
  if(scenario.selectors.length){
    await page.$eval('body', (b => b.classList.add("bs-test-in-progress")));
  }

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex);
      await page.hover(hoverSelectorIndex);
    }
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitForSelector(clickSelectorIndex);
      await page.click(clickSelectorIndex);
    }
  }

  //Ajout MESS
  if (keyPressKeyCode) {
    for (const keyPressKeyCodeIndex of [].concat(keyPressKeyCode)) {
      page.keyboard.press(keyPressKeyCodeIndex);
//      await page.waitForSelector(keyPressSelectorItem.selector);
//      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
    }
    
  }
  
  //Ajout MESS
  if (focusSelector) {
    for (const focusSelectorIndex of [].concat(focusSelector)) {
      await page.waitForSelector(focusSelectorIndex);
      await page.focus(focusSelectorIndex);
    }
  }

  //Ajout MESS
  if (shadowClickSelector) {
    for (const clickSelectorIndex of [].concat(shadowClickSelector)) {
      await page.waitForSelector(clickSelectorIndex.domElementSelector);

      const domElement = await page.$(clickSelectorIndex.domElementSelector);

      if(domElement){
        const shadowDomElement = await domElement.$(`pierce/${clickSelectorIndex.shadowDomElementSelector}`);

        if(shadowDomElement){
          await shadowDomElement.click();
        }
      }    
    }
  }

  //Ajout MESS
  if (shadowHoverSelector) {
    for (const hoverSelectorIndex of [].concat(shadowHoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex.domElementSelector);

      const domElement = await page.$(hoverSelectorIndex.domElementSelector);

      if(domElement){
        const shadowDomElement = await domElement.$(`pierce/${hoverSelectorIndex.shadowDomElementSelector}`);

        if(shadowDomElement){
          await shadowDomElement.hover(shadowDomElement);
        }
      }    
    }
  }

  if (postInteractionWait) {
    await page.waitForTimeout(postInteractionWait);
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
