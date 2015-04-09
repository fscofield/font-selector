define(
[
'jquery',
'underscore',
'backbone',
'fonts'
],
function($, _, Backbone, Fonts) {
	var fonts = new Backbone.Collection([]);

	return _.extend({}, Backbone.Events, {
		plc: 1,
		fonts: fonts,
		next: function(){
			this.plc++;
			this.loadFontsAtIndex();
			this.trigger('next');
		},
		previous: function(){
			this.plc--;
			this.loadFontsAtIndex();
			this.trigger('previous');
		},
		loadFontsAtIndex: function() {
			this.fonts.reset([
				Fonts.instance().loadFont(this.plc-1),
				Fonts.instance().loadFont(this.plc),
				Fonts.instance().loadFont(this.plc+1)
			]);
		},
		filterByStyle: function(style) {
			Fonts.instance().filterByStyle(style);
			this.plc = 0;
			this.next();
		}
	});

});