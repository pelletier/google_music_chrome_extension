getCurrentTrack = () ->
  $("#playerSongInfo #playerSongTitle").html()

getCurrentArtist = () ->
  $("#playerSongInfo #player-artist").html()

getIsPlaying = () ->
  $(".player-middle button[data-id='play-pause']").hasClass('playing')

getArt = () ->
  $("#playerSongInfo #playingAlbumArt").attr('src')

isThumbUp = () ->
  $(".player-rating-container li[data-rating='5']").hasClass('selected')

isThumbDown = () ->
  $(".player-rating-container li[data-rating='1']").hasClass('selected')

getInfos = () ->
  track: getCurrentTrack()
  author: getCurrentArtist()
  isPlaying: getIsPlaying()
  art: "https:#{getArt()}"
  index: $('.currently-playing').index()
  thumbUp: isThumbUp()
  thumbDown: isThumbDown()

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

like = () ->
  $(".player-rating-container li[data-rating='5']").click()

dislike = () ->
  $(".player-rating-container li[data-rating='1']").click()

chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  switch request.kind
    when "play" then togglePlayPause()
    when "next" then next()
    when "back" then back()
    when "like" then like()
    when "dislike" then dislike()
    else null
  sendUpdate(sendResponse)

lastPlaying = null

checkCurrentlyPlaying = () ->
  now = infosHash()
  if lastPlaying isnt now
    lastPlaying = now
    chrome.runtime.sendMessage({kind: 'nowPlaying', infos: getInfos()}, () ->)

$ () ->
  lastPlaying = infosHash()
  setInterval(checkCurrentlyPlaying, 2000)
