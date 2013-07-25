var _ = require("/lib/underscore");

function AchievementListItem (options, data) {
	options = options || {};
	options = _.extend({
		height: 76,
		left: 5, right: 5,
		backgroundColor: "#FFF", 
		borderRadius: 12
	}, options);
	var self = Ti.UI.createView(options);
	
	var cover = Ti.UI.createImageView({
		image: (data.artwork.unlocked) ? data.artwork.unlocked : data.artwork.locked,
		borderRadius: 12,
		top: 6,  left: 6, width: 64, height: 64
	});
	
	var name = Ti.UI.createLabel({
		text: data.title,
		top: 0, left: 76, height: 76
	});
	
	var button = Ti.UI.createButton({
		title: "+",
		borderRadius: 15,
		top: 23, right: 6, height: 30, width: 30,
		color: '#FFF',
		backgroundColor: '#437653',
		borderColor: '#1C2920',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	button.addEventListener("click", function () {
		self.fireEvent("buttonClick", {view: self, data: data});
	});
	
	self.add(cover);
	self.add(name);
	self.add(button);
	
	return self;
}

function AchievementList (options) {

	var self = Ti.UI.createScrollView({
		width: Ti.UI.FILL,
		layout: "vertical",
		
		height: Ti.UI.FILL,
		contentHeight:'auto'
	});
		var SPACING = self.SPACING = 10;
	
	self.clearList = function () {
		self.removeAllChildren();
	}
	
	self.addAchievement = function (data) {
		if (!_.isArray(data)) {
			data = [data];
		}
		
		_.each(data, function (v, k, all) {
			var i = AchievementListItem({
				top: SPACING
			}, all[k]);
			self.add(i);
		});
	}
	
	return self;
}

function AchievementProgressWindow (options) {
	options = options || {};
	var localAchievements = options.localAchievements ? true : false;
	options = _.chain({
			layout: "vertical",
			backgroundColor: "#9FBAA7",
			height: Ti.UI.FILL,
		})
		.omit('localAchievements')
		.extend(options).value();
		
	var self = Ti.UI.createView(options);
	
	var aList = AchievementList();
	self.add(aList);
	self.achievementList = aList;
	
	if (localAchievements) {
		aList.addAchievement(App.Data.achievements);
	}
	
	return self; 
}

module.exports = AchievementProgressWindow;