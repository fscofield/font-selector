define(
[
'jquery',
'underscore',
'fonts',
'carousel',
'views/baseItemView'
],
function($, _, Fonts, Carousel, BaseItemView) {
	return BaseItemView.extend({
		template: "#tools-template",
		className: 'tools',
		maxLineHeight: 3,
		minLineHeight: 0.5,

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
			$('html').addClass("dark");
		},
		showLight: function(e) {
			$('.theme i').toggleClass('selected');
			$('html').removeClass("dark");
		},
		setFontSize: function() {
			var newFontSize = $("#font-size-range").val() + 'px';
			this.trigger('newFontSize', newFontSize);
			this.$el.find('.font-size span').html(newFontSize);
		},
		setLineHeight: function() {
			var newLineHeight = $("#line-height-range").val(),
				scaledLineHeight = this.scaleLineHeight(newLineHeight) + "em";

			this.trigger('newLineHeight', scaledLineHeight);
			this.$el.find('.line-height span').html(scaledLineHeight);
		},
		scaleLineHeight: function(x) {
			return ( ( this.maxLineHeight - this.minLineHeight ) * ( x - 0 ) / 100 ) + this.minLineHeight;
		}
	})
});