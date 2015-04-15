define(
[
'jquery',
'underscore',
'backbone'
],
function($, _, Backbone) {
	var fontsInstance = null,
		fontCssTemplate = _.template($("#font-css").html()),
		API_KEY = "AIzaSyAI9GUOji4E6mZGMp0FhGK-upWTX72he1A";


	var Font = Backbone.Model.extend({
        load: function() {
            $("#font-styles").append(fontCssTemplate({
                family: this.get("family"),
                file: this.get("files").regular
            }));

            this.set('loaded', true);
        },
    });

	var FontCollection = Backbone.Collection.extend({
		model: Font,
		loadFont: function(index) {
			if (!this.at(index).get('loaded')) {
				this.at(index).load();
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
		fetch: function() {
            if (fontsInstance) throw new Error('history has already been fetched');

			var def = new $.Deferred(),
				tempInstance = new FontCollection();

			tempInstance.fetch().then(function(){
				fontsInstance = tempInstance;
				def.resolve(fontsInstance);
			});

			return def.promise();
		},


		instance: function() {
            if (!fontsInstance) throw new Error('fonts has no instance');
			return fontsInstance;
		}
	};
});