var toggle = false

// Get Extension status from Chrome local storage
chrome.storage.local.get('OpenInFigmaStat', function (data) {
  if (data.OpenInFigmaStat || data.OpenInFigmaStat == undefined) {
    toggle = true
  }
  setAppearance(toggle)
})

// On/Off Extension
chrome.action.onClicked.addListener(function () {
  toggle = !toggle
  setAppearance(toggle)
  chrome.storage.local.set({ OpenInFigmaStat: toggle })
})

// Get response from content_scripts
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request === 'closeTab') {
    sender.tab?.id && chrome.tabs.remove(sender.tab.id)
  }
})

function setAppearance(argument) {
  if (argument) {
    chrome.action.setIcon({
      path: {
        16: '../public/icons/icon-on-16.png',
        32: '../public/icons/icon-on-32.png',
        48: '../public/icons/icon-on-48.png',
        128: '../public/icons/icon-on-128.png',
      },
    })
    chrome.action.setBadgeText({ text: '' })
  } else {
    chrome.action.setIcon({
      path: {
        16: '../public/icons/icon-off-16.png',
        32: '../public/icons/icon-off-32.png',
        48: '../public/icons/icon-off-48.png',
        128: '../public/icons/icon-off-128.png',
      },
    })
    chrome.action.setBadgeText({ text: 'OFF' })
    chrome.action.setBadgeBackgroundColor({ color: '#F24E1E' })
  }
}
