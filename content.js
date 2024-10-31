chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "trackPrice") {
      let productTitle = document.querySelector('h1')?.innerText.trim() ||
                         document.querySelector('.product-title')?.innerText.trim() ||
                         document.querySelector('.title')?.innerText.trim();
  
      let priceElement = document.querySelector('.price') ||
                         document.querySelector('.current-price') ||
                         document.querySelector('.offer-price') ||
                         document.querySelector('.discount-price'); 
  
      // Handle cases where the price element might not be found
      let productPrice = priceElement ? priceElement.innerText.replace(/[^0-9.]/g, '').trim() : null;
  
      if (productTitle && productPrice) {
        // Get existing products from storage
        chrome.storage.local.get('trackedProducts', (data) => {
          let trackedProducts = data.trackedProducts || [];
  
          // Create a new product object
          const newProduct = {
            title: productTitle,
            price: productPrice,
            lastUpdate: new Date().toISOString()
          };
  
          // Check if the product already exists
          const existingProductIndex = trackedProducts.findIndex(product => product.title === newProduct.title);
          
          if (existingProductIndex > -1) {
            // Update the existing product's price and last update time
            trackedProducts[existingProductIndex].price = newProduct.price;
            trackedProducts[existingProductIndex].lastUpdate = newProduct.lastUpdate;
          } else {
            // Add the new product to the list
            trackedProducts.push(newProduct);
          }
  
          // Save updated product list back to storage
          chrome.storage.local.set({ trackedProducts: trackedProducts }, () => {
            alert("Product price tracking updated!");
          });
        });
      } else {
        alert("Could not retrieve product information. Please make sure you are on a product page.");
      }
    }
  });
  