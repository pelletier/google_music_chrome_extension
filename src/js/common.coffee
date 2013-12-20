# Returns false of the ID of the tab containing google music
# Deferred
@isGoogleMusicLoaded = () ->
  deferred = $.Deferred()
  chrome.tabs.query url: "https://play.google.com/music/*", (arrayOfTabs)->
    deferred.resolve(arrayOfTabs.length && arrayOfTabs[0].id)
  deferred


class @Options
  constructor: () ->
    @data = {
      stats: true,
      notifications: true
    }
    @load()

  load: () ->
    data = localStorage['conf']
    if data
      @data = JSON.parse(data)

  save: () ->
    localStorage['conf'] = JSON.stringify(@data)
