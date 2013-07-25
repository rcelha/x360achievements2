var _ = require("/lib/underscore");
var ActionBar = require("/ui/ActionBar");
var LeftMenu = require("/ui/LeftMenu");

// secondary windows
var SecondaryWindows = {};

function MainWindow () {
	var self = Ti.UI.createWindow({  
	    title: null,
	    backgroundColor: '#fff' 
	});
	
	/*
	self.setOrientationModes([
		Ti.UI.PORTRAIT,
		Ti.UI.LANDSCAPE_LEFT,
		Ti.UI.LANDSCAPE_RIGHT,
	]);
	*/

	/*
	 * Main Area Layout
	 */
	self.actionBar = ActionBar({
		title: "Achievements"
	});
	
	self.mainView = Ti.UI.createView({
		height: Ti.UI.FILL,
		layout: 'vertical',
		width: '100%'
	});
	
	self.contentArea = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: '100%',
		contentHeight:'auto'
	})
	
	self.mainView.add(self.actionBar);
	self.mainView.add(self.contentArea);
	self.add(self.mainView);
	
	
	/*
	 * LeftMenu layout
	 */
	self.leftMenu = LeftMenu({
		width: 250,
		backgroundColor: '#1C2920'
	});
	
	// Left menu items
	self.leftMenu.addMenuItem("Xbox Live Profile").addEventListener("click", function(){
		self.openWindow("ProfileWindow");
	});
	self.leftMenu.addMenuItem("|");
	self.leftMenu.addMenuItem("Stared Guides").addEventListener("click", function () {
		self.openWindow("GuidesWindow");
	});
	self.leftMenu.addMenuItem("Achievements in progress").addEventListener("click", function () {
		self.openWindow("AchievementProgressWindow");
	});
	self.leftMenu.addMenuItem("|");
	self.leftMenu.addMenuItem("About").addEventListener("click", function () {
		self.openWindow("AboutWindow");
	});
	self.leftMenu.addMenuItem("|");
	self.leftMenu.addMenuItem("Logout").addEventListener("click", function () {
		App.Data.logout();
		self.openWindow("ProfileWindow");
	});
	
	// left menu must be the last one!
	self.add(self.leftMenu);
	
	/*
	 * Event handlers
	 */
	self.actionBar.toggleButton.addEventListener("click", function () {
		var flag = self.leftMenu.toggleMenu();
		if (flag) {
			self.mainView.setLeft(self.leftMenu.getWidth());
		} else {
			self.mainView.setLeft(0);
		}
	});
	
	self.openWindow = function (target) {
		if (!SecondaryWindows[target]) {
			SecondaryWindows[target] = require("/ui/" + target);
		}
		var win = SecondaryWindows[target]({localAchievements: true});
		self.contentArea.removeAllChildren();
		self.contentArea.add(win);
		
		self.leftMenu.hideMenu();
		self.mainView.setLeft(0);
		
		win.addEventListener("gamertagChange", function (data) {
			self.openWindow("ProfileWindow");
		});
	}
	
	return self;
}

module.exports = MainWindow;
