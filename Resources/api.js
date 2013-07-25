var API = {
	
	generalFailure: function () {
		alert("Failure while accessing API");
		console.log(arguments);
	},
	
	getGameAchievements: function (gamerTag, gameID, cb, failure) {
		gamerTag = gamerTag.replace(/ /gi, '+');
		failure = failure || API.generalFailure;
		var url = "https://www.xboxleaders.com/api/2.0/achievements.json?gamertag=" + gamerTag + "&gameid=" + gameID;
		xhr.get(url, function (r) {
			r.data = JSON.parse(r.data);
			cb(r.data.data);
		}, failure);
	},
	
	getUserGames: function (gamerTag, cb, failure) {
		gamerTag = gamerTag.replace(/ /gi, '+');
		failure = failure || API.generalFailure;
		var url = "https://www.xboxleaders.com/api/2.0/games.json?gamertag=" + gamerTag;
		xhr.get(url, function (r) {
			r.data = JSON.parse(r.data);
			cb(r.data.data);
		}, failure);
	},
	
	getProfile: function (gamerTag, cb, failure) {
		gamerTag = gamerTag.replace(/ /gi, '+');
		failure = failure || API.generalFailure;
		var url = "https://www.xboxleaders.com/api/2.0/profile.json?gamertag=" + gamerTag;
		xhr.get(url, function (r) {
			r.data = JSON.parse(r.data);
			cb(r.data.data);
		}, failure);
	}
};

module.exports = API;
