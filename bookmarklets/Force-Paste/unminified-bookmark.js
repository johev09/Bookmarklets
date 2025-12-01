javascript: 
(async () => {

  async function getTextFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
      throw error;
    }
  }

  function getElementWithCaret() {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      return null; // No selection or caret
    }

    const range = selection.getRangeAt(0);
    let node = range.startContainer;

    // // If the caret is at the beginning of an element, the startContainer might be the parent
    // if (node.nodeType !== Node.ELEMENT_NODE && range.startOffset === 0 && node.parentNode) {
    //   node = node.parentNode;
    // }

    // Traverse up the DOM tree to find the element node
    while (node && node.nodeType !== Node.ELEMENT_NODE) {
      node = node.parentNode;
    }
    return node;
  }

  function isInput(el) {
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
  }

  function getInput() {
    const elWithCaret = getElementWithCaret();
    return isInput(elWithCaret) ?
      elWithCaret :
      elWithCaret.querySelector("input, textarea");
  }

  const textFromClipboard = await getTextFromClipboard();
  console.log("Got text from clipboard: ", textFromClipboard);
  
  const inputEl = getInput();
  if (inputEl) {
    inputEl.value = textFromClipboard;
  } else {
    console.log("No input found");
  }

})();
