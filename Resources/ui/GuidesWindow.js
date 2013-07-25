var AchievementProgressWindow = require("/ui/AchievementProgressWindow");
var ActionBar = require("/ui/ActionBar");

function GameListItem (options, data) {
	options = options || {};
	options = _.extend({
		height: 130,
		left: 5, right: 5,
		backgroundColor: "#FFF", 
		borderRadius: 12
	}, options);
	var self = Ti.UI.createView(options);
	
	self.data = data;
	
	var cover = Ti.UI.createImageView({
		image: data.image,
		borderRadius: 12,
		top: 5,  left: 5, width: 85, height: 120
	});
	
	var name = Ti.UI.createLabel({
		text: data.name,
		top: 5, left: 95, height: 120
	});
	
	var button = Ti.UI.createButton({
		title: ">",
		borderRadius: 15,
		top: 50, right: 5, height: 30, width: 30,
		color: '#FFF',
		backgroundColor: '#437653',
		borderColor: '#1C2920',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	var starImage = Ti.UI.createImageView({
		bottom: 0,
		right: 0,
		image: "stared.png"
	});
	
	self.refreshStar = function () {
		starImage.setVisible(data.stared);
	}
	self.refreshStar();
	
	self.add(cover);
	self.add(name);
	self.add(button);
	self.add(starImage);
	
	self.button = button;
	
	self.addEventListener("swipe", function () {
		data.stared = !data.stared;
		self.refreshStar();
		if (data.stared) {
			App.Data.addStar(data.name);
		} else {
			App.Data.removeStar(data.name);
		}
		self.fireEvent("itemstared", {data: data, view: self});
	});
	
	button.addEventListener("click", function () {
		self.fireEvent("itemclick", {item: self, data: data});
	})
	
	return self;
}

function GameList () {
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
	
	self.addGame = function (data) {
		if (!_.isArray(data)) {
			data = [data];
		}
		
		_.each(data, function (v, k, all) {
			var i = GameListItem({
				top: SPACING
			}, all[k]);
			self.add(i);
		});
	}
	
	return self;
}


function GuidesWindow (options) {
	options = options || {};
	options = _.extend({
		layout: "vertical",
		backgroundColor: "#9FBAA7"
	}, options);
	var self = Ti.UI.createView(options);
	
	var searchField = Ti.UI.createSearchBar({
		barColor: "#FFF"
	});
	self.add(searchField);
	
	var gameList = GameList();
	self.add(gameList);
	
	self.loadGameList = function () {
		if (!App.Data.gamertag) {
			alert("Please, go to profile screen and insert your GamerTag");
			return;
		}
		
		API.getUserGames(App.Data.gamertag, function (data) {
			var games = _.where(data.games, {isapp: false});
			games = _.map(games, function (v) {
				var name = v.title.replace (/&#{0,1}[a-z0-9]+;/ig, "");
				return {
					id: v.id,
					name: name,
					image: v.artwork.small,
					stared: (_.indexOf(App.Data.staredGuides, name) > -1)
				}
			});
			
			if (App.Data.staredGuides) {
				games = _.sortBy(games, function (v, k) {
					if (v.stared) {
						return -1;
					} else {
						return k;
					}
				});	
			}
			
			gameList.addGame(games);
		});
	};
	self.loadGameList();
	
	searchField.addEventListener("change", function (e) {
		var val = searchField.value.toLowerCase();
		var SPACING = gameList.SPACING;
		
		_.map(gameList.children, function (v) {
			if(v.data.name.toLowerCase().search(val) == -1) {
				v.setHeight(0);
				v.setTop(0);
				v.hide();
			} else {
				v.setHeight(130);
				v.setTop(SPACING);
				v.show();
			}
		});
	});
	
	searchField.addEventListener("return", function() {
		searchField.blur();
	});
	
	searchField.addEventListener("cancel", function() {
		searchField.blur();
	});
		
	self.addEventListener("click", function () {
		searchField.blur();
	});
	
	gameList.addEventListener("itemclick", function (e) {
		var tmpWin = Ti.UI.createWindow({
			layout: "vertical"
			
		});
		var actionBar = ActionBar({
			title: e.data.name
		}, "<");
		
		var view = AchievementProgressWindow({
		});
		
		actionBar.toggleButton.addEventListener("click", function () {
			tmpWin.close();
		});
		
		tmpWin.add(actionBar);
		tmpWin.add(view);
		tmpWin.open();
		
		API.getGameAchievements(App.Data.gamertag, e.data.id, function (v) {
			view.achievementList.addAchievement(v.achievements);
		});
		
		view.achievementList.addEventListener("buttonClick", function (e) {
			App.Data.addAchievement(e.data);
			
			var animation = Titanium.UI.createAnimation();
			animation.backgroundColor = '#763838'; 
			animation.duration = 200;
			
			var animationHandler = function() {
				animation.removeEventListener('complete',animationHandler);
				animation.backgroundColor = 'white';
				animation.duration = 500;
				e.view.animate(animation);
			};
			animation.addEventListener('complete',animationHandler);

			e.view.animate(animation);
		});
	})
	
	return self; 
}

module.exports = GuidesWindow;