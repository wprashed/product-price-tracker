chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "trackPrice") {
      let productTitle = document.querySelector("#productTitle")?.innerText.trim();
      let priceElement = document.querySelector("#priceblock_ourprice") || document.querySelector("#priceblock_dealprice");
      let productPrice = priceElement ? priceElement.innerText.replace('$', '').trim() : null;
  
      if (productTitle && productPrice) {
        chrome.storage.local.set({
          trackedProduct: {
            title: productTitle,
            price: productPrice,
            lastUpdate: new Date().toISOString()
          }
        }, () => {
          alert("Product price tracking started!");
        });
      } else {
        alert("Could not retrieve product information. Please make sure you are on a product page.");
      }
    }
  });
  