_ = require("/lib/underscore");
xhr = new (require("/lib/xhr"))();
API = require("/api");

(function () {
	App = {
		Data: {
			// gamertag: Ti.App.Properties.getList("gamertag"),
			gamertag: "RCFOX BR",
			staredGuides: (function () {
				var v = Ti.App.Properties.getList("staredGuides");
				return (v) ? v : [];
			})(),
			achievements: (function () {
				var v = Ti.App.Properties.getList("achievements");
				return (v) ? v : [];
			})(),
			
			achievements: [
				{
	                "id": 169,
	                "title": "Ashes to Ashes",
	                "artwork": {
	                    "locked": "https:\/\/live.xbox.com\/tiles\/mD\/im\/0jc8P2NhbC9EXBtUGltTWDE5L2FjaC8wL2YwAAAAAVBQUP2JOIQ=.jpg",
	                    "unlocked": ""
	                },
	                "description": "In Castle DLC matchmaking, disintegrate 6 enemies using Forerunner weapons.",
	                "gamerscore": 10,
	                "unlocked": true,
	                "unlockdate": "1368077965"
	            }
            ],
			
			logout: function () {
				App.Data.gamertag = null,
				Ti.App.Properties.setString("gamertag", "");
			},
			
			login: function (gamertag) {
				App.Data.gamertag = gamertag,
				Ti.App.Properties.setString("gamertag", gamertag);
			},
			
			addStar: function (game) {
				App.Data.staredGuides.push(game);
				Ti.App.Properties.setList("staredGuides", App.Data.staredGuides);
			},
			removeStar: function (game) {
				App.Data.staredGuides = _.without(App.Data.staredGuides, game);
				Ti.App.Properties.setList("staredGuides", App.Data.staredGuides);
			},
			
			addAchievement: function (v) {
				App.Data.achievements.push(v);
				Ti.App.Properties.setList("achievements", App.Data.achievements);
			},
			removeAchievements: function (v) {
				App.Data.achievements = _.without(App.Data.achievements, v);
				Ti.App.Properties.setList("achievements", App.Data.achievements);
			}
		}
	};
	
	Titanium.UI.setBackgroundColor('#000');
	
	var mainWindow = require("/ui/MainWindow")();
	mainWindow.open();
})();