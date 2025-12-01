(async () => {

    function simulateRightClick(element) {
        // Get the element's position for realistic event coordinates
        const rect = element.getBoundingClientRect();
        const clientX = rect.left + rect.width / 2;
        const clientY = rect.top + rect.height / 2;

        // Create and dispatch the contextmenu event
        const contextMenuEvent = new MouseEvent('contextmenu', {
            bubbles: true,         // The event will bubble up the DOM tree
            cancelable: true,      // The default action can be prevented
            view: window,
            button: 2,             // 0: left, 1: middle, 2: right
            buttons: 2,            // Indicates which buttons are down (bitmask)
            clientX: clientX,
            clientY: clientY
        });

        element.dispatchEvent(contextMenuEvent);
    }

    function getElementByXpath(xpath) {
        return document.evaluate(
            "//*[@class='ytp-menuitem' and .//*[text()='Copy video URL at current time']]",
            document,                 // Evaluate from the entire document
            null,                     // No namespace resolver needed for HTML
            XPathResult.FIRST_ORDERED_NODE_TYPE, // Return the first matching node
            null
        ).singleNodeValue; // Get the actual node object
    }


    function getCopyUrlWithCurrentTimeContextMenuOption() {
        return getElementByXpath("//*[@class='ytp-menuitem' and .//*[text()='Copy video URL at current time']]");
    }
    function getVideoElement() {
        return document.querySelector("video[class*='main-video']");
    }


    const video = getVideoElement();
    simulateRightClick(video);
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for context menu to appear
    const btn = getCopyUrlWithCurrentTimeContextMenuOption();
    btn.click();
})();