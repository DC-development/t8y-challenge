/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PlayerView = Backbone.View.extend({
        template: JST['app/scripts/templates/player.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        
        render: function () {
            this.$el.html(this.template({}));
        }
    });

    return PlayerView;
});
