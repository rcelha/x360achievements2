var _ = require("/lib/underscore");

function AboutWindow (options) {
	options = options || {};
	options = _.extend({
		
	}, options);
	var self = Ti.UI.createView(options);
	var lbl = Ti.UI.createLabel({
		text: "About"
	});
	self.add(lbl);
	return self; 
}

module.exports = AboutWindow;