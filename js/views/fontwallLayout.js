define(
[
'jquery',
'marionette',
'views/fontwallCollectionView',
'fonts'
],
function ($, Marionette, FontwallCollectionView, Fonts) {
    var FontWallCollection = Backbone.Collection.extend({
        offset: 0,
        buffer: 70,
        fetch: function() {
            var def = new $.Deferred();

            for (var i = this.offset; i < this.offset + this.buffer; i++) {
                Fonts.instance().at(i).load();
                this.add(Fonts.instance().at(i));
            }

            return def.resolve();
        }
    })


    return Marionette.LayoutView.extend({
        template: '#fontwall-layout-template',
        className: 'fontwall',

        regions: {
            wall: '.wall',
        },

        onShow: function() {
            this.wall.show(new FontwallCollectionView({
                collection: new FontWallCollection()
            }));
        },

        // bindParagraphToTools: function() {
        //     this.listenTo(this.tools.currentView, 'newLineHeight', function(newLineHeight) {
        //         this.$el.find(".paragraph p").css('line-height', newLineHeight);
        //     }.bind(this));

        //     this.listenTo(this.tools.currentView, 'newFontSize', function(newFontSize) {
        //         this.$el.find(".paragraph p").css('font-size', newFontSize);
        //     }.bind(this));
        // },


    });
});
