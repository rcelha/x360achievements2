var _ = require("/lib/underscore");

function MenuItem (options) {
	var self = Ti.UI.createLabel({
		text: options.text,
		color: "#FFF",
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		width: Ti.UI.FILL,
		height: 30, left: 4
	});
	
	return self;
}

function MenuSeparator () {
	var self = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 10,
		backgroundColor: '#437653'
	});
	return self;
}

function LeftMenu (options) {
	options = (options) ? options : {};
	options = _.extend({
		backgroundColor: '#606860', borderColor: "#000", borderWidth: 1,
		top: 0, height: Ti.UI.FILL,
		layout: 'vertical'
	}, options);
	var self = Ti.UI.createView(options);
	self.flagMenu = null;
	
	self.showMenu = function () {
		self.setLeft(0);
		self.flagMenu = true;
	};
	
	self.hideMenu = function () {
		self.setLeft(self.getWidth() * -1);
		self.flagMenu = false;
	}
	
	self.toggleMenu = function () {
		if (self.flagMenu) {
			self.hideMenu();
		} else {
			self.showMenu();
		}
		return self.flagMenu;
	}
	
	self.addMenuItem = function(name) {
		var i;
		if (name === "|") {
			i = MenuSeparator();
		} else {
			i = MenuItem({text: name});	
		}
		self.add(i);
		return i;
	}
	
	self.hideMenu();
	return self;
}

module.exports = LeftMenu;