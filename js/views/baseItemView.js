define(
[
'underscore',
'marionette'
],
function (_, Marionette) {
    var BaseItemView = Marionette.ItemView.extend({
        initialize: function() {
            _.extend(this, this.options);
            this.onInitialize && this.onInitialize();
        }
    });

    return Marionette.LayoutView.extend(_.omit(BaseItemView.prototype, 'constructor'));
});
