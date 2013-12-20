render = (name, data) ->
  Handlebars.templates[name](data)

class Player
  constructor: (@tabId) ->
    console.log(@tabId)
    @state = {}
    if @tabId is 0
      @showNotStarted()
    else
      @getInfos().then () =>
        if @state.track is undefined
          @showNoSong()
        else
          @showMain()

  getInfos: () ->
    deferred = $.Deferred()
    chrome.tabs.sendMessage @tabId, {kind: "currentTrack"}, (response) =>
      console.log(response)
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
    $('.open').click @switchToMusic.bind(this)

  sendMessageAndUpdate: (message) ->
    chrome.tabs.sendMessage @tabId, {kind: message}, (response) =>
      @state = response
      @showMain()


player = null
$ ()->
  isGoogleMusicLoaded().then (tabId) ->
    player = new Player(tabId)
