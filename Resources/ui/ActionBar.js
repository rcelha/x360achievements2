var _ = require("/lib/underscore");

function ActionBar (options, btnText) {
	options = (options) ? options : {};
	var title = (options.title) ? options.title : "";
	btnText = btnText || "...";
	
	options = _.extend({
		backgroundColor: '#5B7663',
		top: 0, left: 0, height: 45, width: Ti.UI.FILL, // fullscreen
	}, _.omit(options, "title"));
	
	var self = Ti.UI.createView(options);
	
	self.toggleButton = Ti.UI.createButton({
		title: btnText,
		borderRadius: 5,
		color: '#FFF',
		backgroundColor: '#437653',
		borderColor: '#1C2920',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		left: 3, top: 3, bottom: 3, width: 30,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	self.add(self.toggleButton);
	
	var t = Ti.UI.createLabel({
		text: title,
		left: 0, right: 0,
		color: '#291c1c',
		font: {fontSize: 24, fontFamily: 'Verdana', fontStyle: 'normal'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	self.add(t);
	
	return self;
}

module.exports = ActionBar;