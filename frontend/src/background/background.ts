// TODO: background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch(request.url)
  .then((response) => {
    return response.json()}
  )
  .then((data) => sendResponse({body: data.trend}))
  return true;
}
)

export {}
