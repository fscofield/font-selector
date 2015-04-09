define(
[
'jquery',
'underscore',
'backbone',
'fonts',
'carousel',
'views/toolView',
'views/carouselView',
],
function($, _, Backbone, Fonts, Carousel, ToolView, CarouselView) {
	var toolView = new ToolView(),
		carouselView = new CarouselView();


	return {
		regions: {
			tools: toolView,
			carousel: carousel
		},
		init: function(){
			Fonts.instance().fetch().done(function(){
				Carousel.loadFontsAtIndex();
				carouselView.render();
			});
		}
	}
});