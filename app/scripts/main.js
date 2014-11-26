/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    'routes/player',
    'views/player'
], function (Backbone, PlayerRouter, PlayerView) {

   

    var router = new PlayerRouter({
        routes: {
            'player': 'player'
        }
    });

    var playerview = new PlayerView({
        el: '.jumbotron',
        render: function(){
            this.$el.html('joooooooooo')
        }
    });


    router.on('route:player', function(){
        console.log("loaded player page");
        playerview.render();
    });

    Backbone.history.start();
});

 
