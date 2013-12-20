chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  opts = new Options()
  if opts.data.notifications
    if sender.tab and request.kind is 'nowPlaying' and not chrome.extension.getViews({type: 'popup'}).length
      state = request.infos
      xhr = new XMLHttpRequest()
      xhr.open('GET', state.art, true)
      xhr.responseType = 'blob'
      xhr.onload = (e) ->
        chrome.notifications.clear 'gmusic.notification', () ->
        imgSrc = window.webkitURL.createObjectURL(@response)
        opts =
          type: 'basic'
          title: "Now playing"
          message: "#{state.track} - #{state.author}"
          iconUrl: imgSrc
          buttons: [
            {title: 'Skip this track', iconUrl: 'static/imgs/forward.png'}
          ]
        chrome.notifications.create('gmusic.notification', opts, () ->)
      xhr.send()

chrome.notifications.onButtonClicked.addListener (notificationId, buttonIndex) ->
  isGoogleMusicLoaded().then (tabId) ->
    switch buttonIndex
      when 0 then chrome.tabs.sendMessage tabId, {kind: 'next'}
