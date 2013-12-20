getCurrentTrack = () ->
  $("#playerSongInfo #playerSongTitle").html()

getCurrentArtist = () ->
  $("#playerSongInfo #player-artist").html()

getIsPlaying = () ->
  $(".player-middle button[data-id='play-pause']").hasClass('playing')

getArt = () ->
  $("#playerSongInfo #playingAlbumArt").attr('src')


getInfos = () ->
  track: getCurrentTrack()
  author: getCurrentArtist()
  isPlaying: getIsPlaying()
  art: "https:#{getArt()}"
  index: $('.currently-playing').index()

infosHash = () ->
  i = getInfos()
  [i.track, i.author].join('__')

sendUpdate = (callback) -> callback(getInfos())

togglePlayPause = () ->
  $(".player-middle button[data-id='play-pause']").click()

next = () ->
  $(".player-middle button[data-id='forward']").click()

back = () ->
  $(".player-middle button[data-id='rewind']").click()

chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  debugger
  switch request.kind
    when "play" then togglePlayPause()
    when "next" then next()
    when "back" then back()
    else null
  sendUpdate(sendResponse)

lastPlaying = null

checkCurrentlyPlaying = () ->
  now = infosHash()
  if lastPlaying isnt now
    lastPlaying = now
    chrome.runtime.sendMessage({kind: 'nowPlaying', infos: getInfos()}, () ->)


$ () ->
  debugger
  lastPlaying = infosHash()
  setInterval(checkCurrentlyPlaying, 2000)
