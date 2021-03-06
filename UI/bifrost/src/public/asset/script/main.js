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
            this.pluginInit = function() {
                APP.eventTarget.find('#courseTabs').tabbing({
                    defaultTab: 1,
                    afterInit: courseAccordion
                });
            };
            this.onWindowLoad = function() {};

            var courseAccordion = function($tabsParent){
                $tabsParent.find('.accordionWrapper').accordion({
                    active: 0,
                    header: '.accordionHead',
                    heightStyle: 'content',
                    collapsible: true
                });
            };

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

//jQuery functions and plug-ins that will be reused across the site

(function($, window, document, undefined) {
    $.fn.extend({
        tabbing: function(config){
            var $tabsParent = $(this);

            var settings = $.extend({
                tab: 'tabsHead', //Tabs parent class
                contentPanel: 'tabsContent', //Content panel parent class
                defaultTab: 0, //Default tab
                afterInit: function($tabsParent){}, //Callback after init
                afterShow: function(){} //Callback after content show 
            }, config);

            var doTabbing = function(){
                var $tabs = $('.' + settings.tab + ' li'),
                    $tabsContent = $('.' + settings.contentPanel + ' .moduleWrapper'),
                    defaultTab = $tabsParent.find($tabs).get(settings.defaultTab),
                    defaultTabContent = $tabsParent.find($tabsContent).get(settings.defaultTab);

                //Show default tab & conetent panel
                $(defaultTab).addClass('active');
                $(defaultTabContent).addClass('active');

                $tabsParent.on('click', '.'+settings.tab +' li', function(event){
                    event.preventDefault();

                    var $this = $(this),
                        getContent = $this.data('tab');

                    if ($this.hasClass('active')) { 
                        return false; //Do nothing if user click on active tab!
                    }else{
                        //Initially removed "active" class from "Tab" & "Content"
                        $tabsParent.find($tabs).removeClass('active').end().find($tabsContent).removeAttr('style').removeClass('active');
                        $(this).addClass('active'); //Add "active" class on current tab
                        $tabsParent.find($tabsContent).filter('[data-tab='+getContent+']').fadeIn(600).addClass('active'); //Add "active" class on content panel tab
                        settings.afterShow.call();
                    };
                });
                settings.afterInit.call(this, $tabsParent);
            };

            //Create Dialog
            return this.each(function() {
                doTabbing();   
            });
        }
    });
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
