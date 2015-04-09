$(document).ready(function(){

	$(".next").click(function(){
		fontCarousel.next();
	});

	$(".previous").click(function(){
		fontCarousel.previous();
	});

	$("body").keydown(function(e) {
		if(e.keyCode == 37) {
			fontCarousel.previous();
		} else if(e.keyCode == 39) {
			fontCarousel.next();
		}
	});

	var fontCssTemplate = _.template($("#font-css").html())

	var FontCollection = Backbone.Collection.extend({
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

				this.at(index).loaded = true
			}
		},
		loadFontsAt: function(index) {
			this.loadFont(index-1)
			this.loadFont(index)
			this.loadFont(index+1)
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

	var FontCarousel = Backbone.View.extend({
		el: "#carousel",
		template: "#carousel-font-template",
		plc: 1,
		next: function(){
			this.plc++;
			this.render();
		},
		previous: function(){
			this.plc--;
			this.render();
		},
		initialize: function() {
			this.compiledTemplate = _.template($(this.template).html());
		},
		render: function() {
			this.$el.html("");
			this.collection.loadFontsAt(this.plc);
			this.setBodyFont();
			this.$el.append(this.buildTemplate());
		},
		setBodyFont: function() {
			$(".preview-text p").css("font-family", this.collection.at(this.plc).get("family"));
		},
		buildTemplate: function() {
			var font1, font2, font3;
				font1 = this.collection.at(this.plc-1);
				font2 = this.collection.at(this.plc);
				font3 = this.collection.at(this.plc+1);

			var template = this.compiledTemplate({
				font1: font1,
				font2: font2,
				font3: font3
			});

			return template
		}
	});

	fontCollection = new FontCollection();

	fontCarousel = new FontCarousel({
		collection: fontCollection
	});

	fontCollection.fetch().done(function(){
		fontCarousel.render();
	});

});