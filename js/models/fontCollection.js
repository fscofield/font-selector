define(
[
'jquery',
'underscore',
'backbone'
],
function($, _, Backbone) {
	var fontCssTemplate = _.template($("#font-css").html())

	return Backbone.Collection.extend({
		apiKey: "AIzaSyAI9GUOji4E6mZGMp0FhGK-upWTX72he1A",
		url: function() {
			return "https://www.googleapis.com/webfonts/v1/webfonts?key="+this.apiKey;
		},
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
		fetch: function() {
			var def = new $.Deferred();

			$.ajax({
				url: this.url()
			}).done(function(data){
				console.log(data.items);
				this.add(data.items);
				def.resolve();
			}.bind(this));

			return def.promise();
		}
	});
});