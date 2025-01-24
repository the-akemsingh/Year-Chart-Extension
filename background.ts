chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (changeInfo.status === 'complete' && tab.url === 'chrome://newtab/') {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['dist/content.js']
      });
    }
  });