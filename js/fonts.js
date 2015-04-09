define(
[
'jquery',
'underscore',
'backbone'
],
function($, _, Backbone) {
	var fontsInstance = null,
		loadedFonts = null,
		API_KEY = "AIzaSyAI9GUOji4E6mZGMp0FhGK-upWTX72he1A",
		fontCssTemplate = _.template($("#font-css").html());


	var FontCollection = Backbone.Collection.extend({
		loadFont: function(index) {
			if (!this.at(index).loaded) {
				$("#font-styles").append(fontCssTemplate({
					family: this.at(index).get("family"),
					file: this.at(index).get("files").regular
				}));

				this.at(index).loaded = true;
			}

			return this.at(index);
		},
		filterByStyle: function(style) {
			if (style == "all") {
				this.reset(fonts);
			} else {
				this.reset(_.where(fonts, {
					"category": style
				}));
			}
		},
		fetch: function() {
			var def = new $.Deferred();

			$.ajax({
				url: "https://www.googleapis.com/webfonts/v1/webfonts?key=" + API_KEY
			}).done(function(data){
				fonts = data.items;
				this.add(data.items);
				def.resolve();
			}.bind(this));

			return def.promise();
		}
	});

	return {
		instance: function() {
			if (fontsInstance) {
				return fontsInstance;
			}

			fontsInstance = new FontCollection();

			return fontsInstance;
		}
	};
});