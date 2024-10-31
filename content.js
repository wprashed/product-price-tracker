chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "trackPrice") {
      let productTitle = document.getElementById('productTitle')?.innerText.trim();
      console.log("Product Title:", productTitle); // Debug log
  
      let priceElement = document.querySelector("#priceblock_ourprice") || document.querySelector("#priceblock_dealprice");
      let productPrice = priceElement ? priceElement.innerText.replace('$', '').trim() : null;
      console.log("Product Price Element:", priceElement); // Debug log
      console.log("Product Price:", productPrice); // Debug log
  
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
  