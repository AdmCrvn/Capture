/*jslint*/

(function(){
    
    
    function teardown() {
        $('#testElement').remove();
    }

    function setup() {
        $('body').append('<div id="testElement"><div class="double first"></div><div class="double second"></div></div>');
    }

    module("Methods and properties", {teardown: teardown, setup: setup });
        
        test('All methods are inherited from base-class', function() {
            var picture = $.capture.view({});
            var newPic = $('#testElement').capture(picture);


            ok(newPic.remove, 'remove has been inherited from base-class');
            ok(newPic.removeEvents, 'removeEvents has been inherited from base-class');
            ok(newPic.reattachEvents, 'reattachEvents has been inherited from base-class');

        });
        
        
		test('"this.element" property is the element captured', function() {
			var viewController = { init:function(){} };
			var boundViewController = $.capture('#testElement', viewController);
			
			equal(boundViewController.element[0], $('#testElement')[0], 'captured element is same');
		});

        
        test('"remove" method removes element', function() {
            var picture = $.capture.view({});
            var newPic = $('#testElement').capture(picture);

            equal($('#testElement').length, 1, '#testElement exists');
            
            newPic.remove();
            
            equal($('#testElement').length, 0, '#testElement removed');

        });
        
        test('"removeEvents" method unbinds all events attached to the view', function() {
            var clickCount = 0;
            var picture = $.capture.view({
                onclick : {
                    element : function (e) {
                        clickCount++;
                    }
                }
            });
            
            var newPic = $('#testElement').capture(picture);

            $('#testElement').click();
            equal(1, clickCount, '#testElement has been clicked');
            
            newPic.removeEvents();
            $('#testElement').click();
            equal(1, clickCount, '#testElement no longer responds to events');
        });
        
        test('"reattachEvents" method reattachs all events to the view', function() {
            var clickCount = 0;
            var picture = $.capture.view({
                onclick : {
                    element : function (e) {
                        clickCount++;
                    }
                }
            });
            
            var newPic = $('#testElement').capture(picture);

            $('#testElement').click();
            equal(clickCount, 1, '#testElement has been clicked');
            
            newPic.removeEvents();
            $('#testElement').click();
            equal(clickCount, 1, '#testElement no longer responds to events');
            
            newPic.reattachEvents();
            $('#testElement').click();
            equal(clickCount, 2, '#testElement responds to events again');
            
        });
        
        test('"reattachEvents" method first removes existing methods before reattaching', function() {
            var clickCount = 0;
            var picture = $.capture.view({
                onclick : {
                    element : function (e) {
                        clickCount++;
                    }
                }
            });
            
            var newPic = $('#testElement').capture(picture);

            
            newPic.reattachEvents();
            newPic.reattachEvents();
            newPic.reattachEvents();
            $('#testElement').click();
            equal(clickCount, 1, '#testElement responds to events again');
            
        });

    
}());