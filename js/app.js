define(
[
'jquery',
'backbone',
'marionette',
'fonts',
'views/paragraphLayout',
'views/fontwallLayout'
],
function($, Backbone, Marionette, Fonts, ParagraphLayout, FontwallLayout) {

	App = new Marionette.Application();

    App.addInitializer(function(options) {
        App.addRegions({
            'content': '#content',
            'sidemenu': '#sidemenu',
        });
    });

    App.on("start", function() {
      document.title = 'Font Forrest';

      Fonts.fetch().then(function(){
          App.content.show(new ParagraphLayout());
      });

      $('.show-font-wall').click(function(){
        App.content.show(new FontwallLayout());
      });

      $('.show-paragraph').click(function(){
        App.content.show(new ParagraphLayout());
      })

      $(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        var root = location.protocol + "//" + location.host;

        if (href.prop && href.prop.slice(0, root.length) === root) {
          evt.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
      });
    });

    return App;
});