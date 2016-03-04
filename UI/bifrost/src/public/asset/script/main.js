var APP = APP || {}; //Global Namespace

// Some Global methods and properties available with APP Object.
(function($, window, document, undefined) {
    $.extend(APP, {
        document: $(document),
        eventTarget: $('body')
    });
})(jQuery, this, this.document);

(function($, window, document, undefined) {
    APP.subModules = (function() {
        function _subModules() {
            this.init = function() {
                slideUpDown('#courseListing .sorting > a', 'slide', 'hide');
            };
            this.pluginInit = function() {};
            this.onWindowLoad = function() {};

            var slideUpDown = function(selector, transform, hideClass) {
                var $selector = APP.eventTarget.find(selector),
                    $options = $selector.parent().find('.options'),
                    currentVal = $selector.data('val'),
                    newVal;
                    

                var eventHandling = function(e) {
                    e.preventDefault();

                    var $this = $(this);

                    if (newVal == undefined) {
                        newVal = currentVal;
                    };

                    $options.find('li').removeClass('active').end().find('li[data-val=' + newVal + ']').addClass('active');

                    switch (transform) {
                        case 'slide':
                            $options.show();

                            setTimeout(function(){
                                $this.parent().toggleClass(transform).toggleClass(hideClass);
                                if ($this.parent().hasClass(hideClass)) {
                                    $options.show(0).delay(301).hide(0);    
                                };
                            },100);
                            break;
                    };
                };

                var optionsEventHandling = function(e) {
                    e.preventDefault();

                    var $this = $(this);
                    
                    newVal = $this.data('val');

                    $options.find('li').removeClass('active');
                    $this.addClass('active');
                    $selector.html(newVal);
                    
                };

                var makeItHidden = function(e){
                    if ($selector.parent().hasClass(transform) && !$selector.is(e.target)  && $selector.has(e.target).length === 0 && !$options.is(e.target) && !$options.find('li, li a').is(e.target)) {
                        $selector.parent().removeClass(transform).addClass(hideClass);
                        $options.show(0).delay(301).hide(0);
                    };
                };

                $selector.on('click', eventHandling);
                $selector.parent().on('click', '.options li', optionsEventHandling);
                APP.document.on('mouseup', makeItHidden);
            };
        }
        return new _subModules();
    }());
})(jQuery, this, this.document);

//Global code to be run on all pages
(function($, window, document, undefined) {
    $(function() {
        APP.subModules.pluginInit();
        APP.subModules.init();
    });

    // Global window load event.
    $(window).load(function() {
        APP.subModules.onWindowLoad();
    });
})(jQuery, this, this.document);
