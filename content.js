chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "trackPrice") {
      // Define the URLs you want to support
      const supportedUrls = [
        "example.com/product/", // Example URL
        "anotherexample.com/item/"
        // Add more URLs as needed
      ];
  
      const currentUrl = window.location.href;
  
      // Check if the current URL is one of the supported URLs
      const isSupported = supportedUrls.some(url => currentUrl.includes(url));
  
      if (!isSupported) {
        alert("This extension only works on supported product pages.");
        return;
      }
  
      let productTitle = document.querySelector('h1')?.innerText.trim(); // Adjust based on the actual title selector
      let priceElement = document.querySelector('.price') || document.querySelector('.offer-price'); // Adjust based on the actual price selector
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
  