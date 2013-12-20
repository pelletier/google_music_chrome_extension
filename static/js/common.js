(function() {
  this.isGoogleMusicLoaded = function() {
    var deferred;
    deferred = $.Deferred();
    chrome.tabs.query({
      url: "https://play.google.com/music/*"
    }, function(arrayOfTabs) {
      return deferred.resolve(arrayOfTabs.length && arrayOfTabs[0].id);
    });
    return deferred;
  };

  this.Options = (function() {
    function Options() {
      this.data = {
        stats: true,
        notifications: true
      };
      this.load();
    }

    Options.prototype.load = function() {
      var data;
      data = localStorage['conf'];
      if (data) {
        return this.data = JSON.parse(data);
      }
    };

    Options.prototype.save = function() {
      return localStorage['conf'] = JSON.stringify(this.data);
    };

    return Options;

  })();

}).call(this);
