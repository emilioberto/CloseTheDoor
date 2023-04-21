chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: "icon-click.js" });
});
