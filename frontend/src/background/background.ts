// TODO: background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch(request.url)
  .then((response) => response.json())
  .then((data) => sendResponse({body: data.data}))
  return true;
}
)

export {}
