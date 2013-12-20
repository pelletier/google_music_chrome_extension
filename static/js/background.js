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
          imgSrc = window.webkitURL.createObjectURL(this.response);
          opts = {
            type: 'basic',
            title: "Now playing",
            message: "" + state.track + " - " + state.author,
            iconUrl: imgSrc
          };
          return chrome.notifications.create('', opts, function() {});
        };
        return xhr.send();
      }
    }
  });

}).call(this);
