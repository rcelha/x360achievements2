/*
 * Events : gamertagChange
 */

function NoProfileWindow (options) {
	options = options || {};
	options = _.extend({
		layout: "vertical"
	}, options);
	var self = Ti.UI.createView(options);
	
	var gamertagTextbox = Ti.UI.createTextField({
		returnKeyType: Ti.UI.RETURNKEY_SEND,
		borderColor: 'black',
		top: 45,
		height: 30,
		width: "90%"
	});
	self.add(gamertagTextbox);
	
	var acceptButton = Ti.UI.createButton({
		title: "Ok",
		borderRadius: 5,
		color: '#FFF',
		backgroundColor: '#437653',
		borderColor: '#1C2920',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		width: "90%",
		height: 30,
		top: 30,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	self.add(acceptButton);
	
	self.changeGamertag = function (e) {
		App.Data.login(gamertagTextbox.value);
		self.fireEvent("gamertagChange", {view: self});
	}
	
	acceptButton.addEventListener("click", self.changeGamertag);
	gamertagTextbox.addEventListener("return", self.changeGamertag);
	
	return self;
}

function ProfileWindow (options) {
	options = options || {};
	options = _.extend({
		width: '100%',
		height: '100%',
		layout: "horizontal"
	}, options);
	
	if (!App.Data.gamertag) {
		return NoProfileWindow();
	}
	
	var self = Ti.UI.createView(options);
	
	var leftCol = Ti.UI.createView({
		width: "50%",
		layout: "vertical"
	});
	self.add(leftCol);
	
	var rightCol = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: "50%",
		layout: "vertical"
	});
	self.add(rightCol);
	
	// Left columns
	var tagLabel = Ti.UI.createLabel({
	});
	var avatarImage = Ti.UI.createImageView({
	});
	var gamerscoreLabel = Ti.UI.createLabel({
	});
	
	leftCol.add(tagLabel);
	leftCol.add(avatarImage);
	leftCol.add(gamerscoreLabel);

	// Right Column
	rightCol.add(Ti.UI.createLabel({
		text: "Recent Activity"
	}));
	
	var activityImg = [];
	_.each(_.range(5), function (v, k, all) {
		var img = Ti.UI.createImageView({
			 top: 10
		});
		rightCol.add(img);
		activityImg.push(img);
	});

	self.loadProfile = function () {
		API.getProfile(App.Data.gamertag, function (data) {
			var gamertag = data.gamertag,
				avatar = encodeURI(data.avatar.full),
				gscore = data.gamerscore,
				activities = _.filter(data.recentactivity, function (v) {return (v) ? !v.isapp : false;});
			
			tagLabel.setText(gamertag);
			avatarImage.setImage(avatar);
			gamerscoreLabel.setText("(G) " + gscore);
			_.each(activities, function (v, k, all) {
				activityImg[k].setImage(v.artwork.small);
			});
		});
	}
	
	self.loadProfile();
	
	return self; 
}

module.exports = ProfileWindow;