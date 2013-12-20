FILES=icon.png icon128.png icon16.png icon48.png manifest.json options.html popup.html popout.html vendor/* static/css static/css/common.css static/css/main.css static/css/settings.css static/css/popout.css static/js static/js/background.js static/js/common.js static/js/ga.js static/js/options.js static/js/popup.js static/js/script.js static/templates static/templates/main.js static/templates/no_song.js static/templates/not_started.js

small_player.zip: $(FILES)
	zip $@ $(FILES)
