(async () => {

  async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text);
      })
      .catch(err => {
        console.error('Failed to copy to clipboard: ', err);
      });
  }
  
  function getMarkdownLink() {
    const url = window.location.href;
    const title = document.title;
    const markdownLink = `[${title}](${url})`;
    return markdownLink;
  }

  const markdownLink = getMarkdownLink();
  await copyToClipboard(markdownLink);

})();
