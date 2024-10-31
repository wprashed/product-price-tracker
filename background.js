chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Ensure the tab URL exists and is not undefined
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("amazon.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
    }
  });  