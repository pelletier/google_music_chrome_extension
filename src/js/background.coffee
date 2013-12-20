chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  opts = new Options()
  if opts.data.notifications
    if sender.tab and request.kind is 'nowPlaying' and not chrome.extension.getViews({type: 'popup'}).length
      state = request.infos
      xhr = new XMLHttpRequest()
      xhr.open('GET', state.art, true)
      xhr.responseType = 'blob'
      xhr.onload = (e) ->
        imgSrc = window.webkitURL.createObjectURL(@response)
        opts =
          type: 'basic'
          title: "Now playing"
          message: "#{state.track} - #{state.author}"
          iconUrl: imgSrc
        chrome.notifications.create('', opts, () ->)
      xhr.send()
