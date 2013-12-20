(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var opts, state, xhr;
    opts = new Options();
    if (opts.data.notifications) {
      if (sender.tab && request.kind === 'nowPlaying' && !chrome.extension.getViews({
        type: 'popup'
      }).length) {
        state = request.infos;
        xhr = new XMLHttpRequest();
        xhr.open('GET', state.art, true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          var imgSrc;
          chrome.notifications.clear('gmusic.notification', function() {});
          imgSrc = window.webkitURL.createObjectURL(this.response);
          opts = {
            type: 'basic',
            title: "Now playing",
            message: "" + state.track + " - " + state.author,
            iconUrl: imgSrc,
            buttons: [
              {
                title: 'Skip this track',
                iconUrl: 'static/imgs/forward.png'
              }
            ]
          };
          return chrome.notifications.create('gmusic.notification', opts, function() {});
        };
        return xhr.send();
      }
    }
  });

  chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    return isGoogleMusicLoaded().then(function(tabId) {
      switch (buttonIndex) {
        case 0:
          return chrome.tabs.sendMessage(tabId, {
            kind: 'next'
          });
      }
    });
  });

}).call(this);
