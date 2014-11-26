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
    'routes/home',
    'views/home',
    'routes/player',
    'views/player'
], function (Backbone, HomeRouter, HomeView, PlayerRouter, PlayerView ) {

    var playerRouter = new PlayerRouter({
        routes: {
            'player': 'player'
        }
    });

    var playerView = new PlayerView({
        el: '#content'
    });

    playerRouter.on('route:player', function(){
        console.log("loaded player page");
        playerView.render();
    });

//----------------------------------------
    
    var homeRouter = new HomeRouter({
        routes: {
            '': 'home'
        }
    });

    var homeView = new HomeView({
        el: '#content'
    });

    homeRouter.on('route:home', function(){
        console.log("loaded home page");
        homeView.render();
    });
    
    Backbone.history.start();
});

 
