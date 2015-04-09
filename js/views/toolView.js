define(
[
'jquery',
'underscore',
'backbone',
'fonts',
'carousel'
],
function($, _, Backbone, Fonts, Carousel) {
	return Backbone.View.extend({
		el: "#tools",
		template: "#carousel-font-template",

		events: {
            'click .fa-moon-o': 'showDark',
            'click .fa-sun-o': 'showLight',
            'click .style ul li': 'filterStyle',
            'input #font-size-range': 'setFontSize',
            'input #line-height-range': 'setLineHeight'
		},
		initialize: function() {
			this.setFontSize();
			this.setLineHeight();
		},
		filterStyle: function(e) {
			var newStyle = $(e.currentTarget).data('style');
			Carousel.filterByStyle(newStyle);
			$('.current-style').html(newStyle);
		},
		showDark: function(e) {
			$('.theme i').toggleClass('selected');
			$('body').addClass("dark");
		},
		showLight: function(e) {
			$('.theme i').toggleClass('selected');
			$('body').removeClass("dark");
		},
		setFontSize: function() {
			var newFontSize = $("#font-size-range").val() + 'px';
			$('.preview-text p').css('font-size', newFontSize);
			$('.font-size span').html(newFontSize);
		},
		setLineHeight: function() {
			var newLineHeight = $("#line-height-range").val() + 'px';
			$('.preview-text p').css('line-height', newLineHeight);
			$('.line-height span').html(newLineHeight);
		}
	})
});