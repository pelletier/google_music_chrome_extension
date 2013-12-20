(function() {
  var Player, player, render;

  render = function(name, data) {
    return Handlebars.templates[name](data);
  };

  Player = (function() {
    function Player(tabId) {
      var _this = this;
      this.tabId = tabId;
      console.log(this.tabId);
      this.state = {};
      if (this.tabId === 0) {
        this.showNotStarted();
      } else {
        this.getInfos().then(function() {
          if (_this.state.track === void 0) {
            return _this.showNoSong();
          } else {
            return _this.showMain();
          }
        });
      }
    }

    Player.prototype.getInfos = function() {
      var deferred,
        _this = this;
      deferred = $.Deferred();
      chrome.tabs.sendMessage(this.tabId, {
        kind: "currentTrack"
      }, function(response) {
        console.log(response);
        _this.state = response;
        return deferred.resolve(response);
      });
      return deferred;
    };

    Player.prototype.showNotStarted = function() {
      $('body').html(render('not_started'));
      return $('.start-google-music').click(function() {
        return chrome.tabs.create({
          active: true,
          url: "https://play.google.com/music/listen",
          pinned: true
        });
      });
    };

    Player.prototype.showNoSong = function() {
      $('body').html(render('no_song'));
      return $('.open-google-music').click(this.switchToMusic.bind(this));
    };

    Player.prototype.switchToMusic = function() {
      chrome.tabs.update(this.tabId, {
        active: true
      });
      return window.close();
    };

    Player.prototype.showMain = function() {
      $('body').html(render('main', this.state));
      $('.play').click(this.sendMessageAndUpdate.bind(this, 'play'));
      $('.next').click(this.sendMessageAndUpdate.bind(this, 'next'));
      $('.back').click(this.sendMessageAndUpdate.bind(this, 'back'));
      return $('.open').click(this.switchToMusic.bind(this));
    };

    Player.prototype.sendMessageAndUpdate = function(message) {
      var _this = this;
      return chrome.tabs.sendMessage(this.tabId, {
        kind: message
      }, function(response) {
        _this.state = response;
        return _this.showMain();
      });
    };

    return Player;

  })();

  player = null;

  $(function() {
    return isGoogleMusicLoaded().then(function(tabId) {
      return player = new Player(tabId);
    });
  });

}).call(this);
