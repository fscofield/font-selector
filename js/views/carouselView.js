define(
[
'jquery',
'underscore',
'carousel',
'views/baseItemView'
],
function($, _, Carousel, BaseItemView) {
	return BaseItemView.extend({
		template: "#carousel-font-template",
		initialize: function() {
			this.compiledTemplate = _.template($(this.template).html());

			$(document).bind('keydown', function(e){
				if(e.keyCode == 37) {
					Carousel.previous();
				} else if(e.keyCode == 39) {
					Carousel.next();
				}
			}.bind(this));

			this.listenTo(Carousel, 'next', function(progress) {
                this.render();
            }.bind(this));

            this.listenTo(Carousel, 'previous', function(progress) {
                this.render();
            }.bind(this));
		},
		render: function() {
			this.$el.html(this.compiledTemplate({
				fonts: Carousel.fonts
			}));
			$(".paragraph").css("font-family", Carousel.fonts.at(1).get("family"));
		}
	});
});