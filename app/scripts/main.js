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
    'routes/challenge',
    'views/home',
    'views/player',
    'views/parallax'
], function (Backbone, AppRouter, HomeView, PlayerView, ParallaxView ) {

    var appRouter = new AppRouter({
        routes: {
            ''          :   'home',
            'player'    :   'player',
            'parallax'  :   'parallax'
        }
    });
    
    var contentContainer = "#content";
    
    var playerView = new PlayerView({
        el: contentContainer
    });

    var homeView = new HomeView({
        el: contentContainer
    });

    var parallaxView = new ParallaxView({
        el: contentContainer
    });

    appRouter.on('route:home', function(){
        console.log("loaded home page");
        homeView.render();
    })
        .on('route:player', function(){
            console.log("loaded player page");
            playerView.render();
        })
       .on('route:parallax', function(){
        console.log("loaded parallax page");
            parallaxView.render();
        });


    
    Backbone.history.start();
});

 
