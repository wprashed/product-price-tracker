chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ trackedProduct: null });
});
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      chrome.tabs.sendMessage(tabId, { action: "checkPrice" });
    }
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkPrice" && request.price) {
      chrome.storage.local.get("trackedProduct", ({ trackedProduct }) => {
        if (trackedProduct && trackedProduct.price > request.price) {
          const notificationOptions = {
            type: "basic",
            iconUrl: "icon.png",
            title: "Price Drop Alert!",
            message: `${trackedProduct.title} is now $${request.price} (was $${trackedProduct.price})`
          };
          chrome.notifications.create("priceDropAlert", notificationOptions);
          chrome.storage.local.set({ trackedProduct: { ...trackedProduct, price: request.price } });
        }
      });
    }
});  