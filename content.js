chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "trackPrice") {
      // Assume we are tracking Amazon and the price selector is `#priceblock_ourprice`
      const priceElement = document.querySelector("#priceblock_ourprice") || 
                           document.querySelector("#price_inside_buybox");
      const titleElement = document.querySelector("#productTitle");
  
      if (priceElement && titleElement) {
        const priceText = priceElement.innerText.replace(/[^0-9.]/g, "");
        const titleText = titleElement.innerText.trim();
        const price = parseFloat(priceText);
  
        chrome.storage.local.set({ trackedProduct: { title: titleText, price: price } });
        alert(`Started tracking price: ${titleText} at $${price}`);
      } else {
        alert("Unable to find product price on this page.");
      }
    }
});