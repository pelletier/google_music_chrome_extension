render = (name, data) ->
  Handlebars.templates[name](data)

class Player
  constructor: (@tabId) ->
    @state = {}
    if @tabId is 0
      @showNotStarted()
    else
      @getInfos().then () =>
        if @state.track is undefined
          @showNoSong()
        else
          @showMain()
    chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
      if sender.tab and request.kind is 'nowPlaying'
        location.reload()

  getInfos: () ->
    deferred = $.Deferred()
    chrome.tabs.sendMessage @tabId, {kind: "currentTrack"}, (response) =>
      @state = response
      deferred.resolve(response)
    deferred

  showNotStarted: () ->
    $('body').html(render('not_started'))
    $('.start-google-music').click () -> chrome.tabs.create
      active: true
      url: "https://play.google.com/music/listen"
      pinned: true

  showNoSong: () ->
    $('body').html(render('no_song'))
    $('.open-google-music').click @switchToMusic.bind(this)

  switchToMusic: () ->
      chrome.tabs.update(@tabId, active: true)
      window.close()

  showMain: () ->
    $('body').html(render('main', @state))
    $('.play').click @sendMessageAndUpdate.bind(this, 'play')
    $('.next').click @sendMessageAndUpdate.bind(this, 'next')
    $('.back').click @sendMessageAndUpdate.bind(this, 'back')
    $('.up').click @sendMessageAndUpdate.bind(this, 'like')
    $('.down').click @sendMessageAndUpdate.bind(this, 'dislike')
    $('.open').click @switchToMusic.bind(this)
    $('.popout').click () -> window.open(chrome.extension.getURL("popout.html"),"gc-popout-window","width=290,height=122,resizable=0")

  sendMessageAndUpdate: (message) ->
    chrome.tabs.sendMessage @tabId, {kind: message}, (response) =>
      @state = response
      @showMain()


player = null
$ ()->
  isGoogleMusicLoaded().then (tabId) ->
    player = new Player(tabId)
