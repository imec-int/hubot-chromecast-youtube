// Description:
//   Plays a YouTube video on the Google Chromecast
//
// Dependencies:
//   "chromecast": ">= 0.0.4"
//
// Configuration:
//   HUBOT_CHROMECAST_NAME (will play on all Chromecasts if not set)
//
// Commands:
//   hubot cast <youtube-url>

var chromecast = require('chromecast')();

module.exports = function(robot) {
	robot.respond(/cast\s.+?youtube\.com\/watch\?v=(.+)?/i, function (msg){

		var youtubeId = msg.match[1];

		chromecast.on('device', function (device){

			if(process.env.HUBOT_CHROMECAST_NAME !== undefined && device.name != process.env.HUBOT_CHROMECAST_NAME) return;

			device.launch('YouTube', {
				v: youtubeId
			});

		});

		chromecast.discover();

	});
};
