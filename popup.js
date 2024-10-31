document.getElementById('trackButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "trackPrice" });
    });
  });
  
  function displayTrackedProduct() {
    chrome.storage.local.get("trackedProduct", ({ trackedProduct }) => {
      if (trackedProduct) {
        document.querySelector("#trackedProduct .title").innerText = `Title: ${trackedProduct.title}`;
        document.querySelector("#trackedProduct .price").innerText = `Price: $${trackedProduct.price}`;
        document.querySelector("#trackedProduct .lastUpdate").innerText = `Last Update: ${new Date().toLocaleDateString()}`;
      } else {
        document.querySelector("#trackedProduct").style.display = 'none';
      }
    });
  }
  
  displayTrackedProduct();  