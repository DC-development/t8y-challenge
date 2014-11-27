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

    $(document).ready(function() {

        var $window = $(window);

        //Vars for calculating focussed objects position    
        var imgHeight = 540; 
        var inertia = 4; //Alter this value to adjust the slow-down effect
        var parkHeight = imgHeight / inertia;
        var parkStep = parkHeight / imgHeight;

        $.fn.scrollEnd = function(callback, timeout) {
            $(this).scroll(function(){ 
                var $this = $(this);
                if ($this.data('scrollTimeout')) {
                    clearTimeout($this.data('scrollTimeout'));
                }
                $this.data('scrollTimeout', setTimeout(callback,timeout));
            }); 
        };
       
        $(window).scrollEnd(function(){
 
            var parallaxContent = $(".parallax-content.in-focus");
            var parentContainer = $(".parallax-content.in-focus").parent();
            
            //var yPos = Math.floor(parallaxContent.offset().top - $window.scrollTop());
            var yPosAbsolute = Math.floor(parentContainer.offset().top); 
            
            var yPosNextSibling = Math.floor(parentContainer.next().offset().top - $window.scrollTop());
            var yPosNextSiblingAbsolute = Math.floor(parentContainer.next().offset().top);
             
            if(yPosNextSibling < 200){
                //window.scrollTo(0,yPosNextSiblingAbsolute);
                var body = $("html, body");
                body.animate({scrollTop:yPosNextSiblingAbsolute}, '500', 'swing', function() {
                   // alert("Finished animating"); 
                    var block = false;
                });
            }else{
                var body = $("html, body");
                body.animate({scrollTop:yPosAbsolute}, '500', 'swing', function() {
                   // alert("Finished animating");
                    var block = false;
                });
            } 
            
            //console.log('stopped scrolling focused objects is at:'+ yPos+' and at absolute: '+ yPosAbsolute); 
            //console.log('next to focused object is at:'+ yPosNextSibling +'and at absolute: '+ yPosNextSiblingAbsolute); 
        }, 500);
   
        $window.scroll(function() { 
             
            /**
             * Get all parallax containers within the function
             * @Todo: Would be better to fetch it on init once but the way the script doesnt fire in response on backbone-route
             */
            var parallaxContainers = $(".parallax-content"); 
 
            //This is called for every scrollstep 
            $.each(parallaxContainers, function( index, value ) {

                //fetch the current container from the array and wrap it as a jQuery-Object
                var container = $(parallaxContainers[index]);
                //To use it like this to get its parent offset cause we test for <0 and set the child 
                //to top:0
                var yPos = Math.floor(container.parent().offset().top - $window.scrollTop());
                var id = container.attr('id');
                
                if(yPos<=0&&yPos>-imgHeight){
                    container.addClass("in-focus"); 
                    var ps = Math.floor(container.parent().next().offset().top - $window.scrollTop());
                    var d = (imgHeight - ps) * parkStep;
                    container.css('top', -d); 
                    //console.log(imgHeight +"-"+ ps +"*"+parkStep+"="+ d); 
                }else if(container.css("position")=="fixed"){ 
                    container.removeClass("in-focus");
                    container.css('top', '');
                }
                 
                //container.find(".pos").text(yPos +"-"+ ps); 
                //console.log(p , id); 
            });
        });

    });
    
    return ParallaxView;
});

