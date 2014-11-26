/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ParallaxView = Backbone.View.extend({
        template: JST['app/scripts/templates/parallax.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        render: function () {
            this.$el.html(this.template({}));
        }
    });

    return ParallaxView;
});
