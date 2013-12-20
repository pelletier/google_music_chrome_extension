(function() {
  var back, checkCurrentlyPlaying, dislike, getArt, getCurrentArtist, getCurrentTrack, getInfos, getIsPlaying, infosHash, isThumbDown, isThumbUp, lastPlaying, like, next, sendUpdate, togglePlayPause;

  getCurrentTrack = function() {
    return $("#playerSongInfo #playerSongTitle").html();
  };

  getCurrentArtist = function() {
    return $("#playerSongInfo #player-artist").html();
  };

  getIsPlaying = function() {
    return $(".player-middle button[data-id='play-pause']").hasClass('playing');
  };

  getArt = function() {
    return $("#playerSongInfo #playingAlbumArt").attr('src');
  };

  isThumbUp = function() {
    return $(".player-rating-container li[data-rating='5']").hasClass('selected');
  };

  isThumbDown = function() {
    return $(".player-rating-container li[data-rating='1']").hasClass('selected');
  };

  getInfos = function() {
    return {
      track: getCurrentTrack(),
      author: getCurrentArtist(),
      isPlaying: getIsPlaying(),
      art: "https:" + (getArt()),
      index: $('.currently-playing').index(),
      thumbUp: isThumbUp(),
      thumbDown: isThumbDown()
    };
  };

  infosHash = function() {
    var i;
    i = getInfos();
    return [i.track, i.author].join('__');
  };

  sendUpdate = function(callback) {
    return callback(getInfos());
  };

  togglePlayPause = function() {
    return $(".player-middle button[data-id='play-pause']").click();
  };

  next = function() {
    return $(".player-middle button[data-id='forward']").click();
  };

  back = function() {
    return $(".player-middle button[data-id='rewind']").click();
  };

  like = function() {
    return $(".player-rating-container li[data-rating='5']").click();
  };

  dislike = function() {
    return $(".player-rating-container li[data-rating='1']").click();
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.kind) {
      case "play":
        togglePlayPause();
        break;
      case "next":
        next();
        break;
      case "back":
        back();
        break;
      case "like":
        like();
        break;
      case "dislike":
        dislike();
        break;
      default:
        null;
    }
    return sendUpdate(sendResponse);
  });

  lastPlaying = null;

  checkCurrentlyPlaying = function() {
    var now;
    now = infosHash();
    if (lastPlaying !== now) {
      lastPlaying = now;
      return chrome.runtime.sendMessage({
        kind: 'nowPlaying',
        infos: getInfos()
      }, function() {});
    }
  };

  $(function() {
    lastPlaying = infosHash();
    return setInterval(checkCurrentlyPlaying, 2000);
  });

}).call(this);
