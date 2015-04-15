define(
[
'jquery',
'marionette',
'carousel',
'views/carouselView',
'views/toolsView',
],
function ($, Marionette, Carousel, CarouselView, ToolsView) {
    return Marionette.LayoutView.extend({
        template: '#paragraph-layout-template',
        className: 'paragraph-wrap',

        regions: {
            carousel: '.carousel',
            tools: '.tools',
        },

        onShow: function() {
            Carousel.loadFontsAtIndex();
            this.carousel.show(new CarouselView());
            this.tools.show(new ToolsView());
            this.bindParagraphToTools();

        },

        bindParagraphToTools: function() {
            this.listenTo(this.tools.currentView, 'newLineHeight', function(newLineHeight) {
                this.$el.find(".paragraph p").css('line-height', newLineHeight);
            }.bind(this));

            this.listenTo(this.tools.currentView, 'newFontSize', function(newFontSize) {
                this.$el.find(".paragraph p").css('font-size', newFontSize);
            }.bind(this));
        },


    });
});
