requirejs.config({
    paths: {
        jquery: ['lib/jquery', 'jquery'],
        backbone: ['lib/backbone', 'backbone'],
        underscore: ['lib/underscore', 'underscore'],
    }
});

require(
[
'jquery',
'app',
],
function($, App) {
    $(function() {
        App.init();
    });
});
