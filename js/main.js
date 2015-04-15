requirejs.config({
    paths: {
        jquery: ['../node_modules/jquery/dist/jquery', 'jquery'],
        backbone: ['../node_modules/backbone/backbone', 'backbone'],
        underscore: ['../node_modules/underscore/underscore', 'underscore'],
        marionette: ['../node_modules/backbone.marionette/lib/backbone.marionette', 'marionette'],
    }
});

require(
[
'jquery',
'app',
],
function($, App) {
    $(function() {
        App.start();
    });
});
