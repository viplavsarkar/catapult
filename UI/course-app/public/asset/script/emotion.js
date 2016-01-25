window.app =
new function(){
    var
    app = this,
    cache = {},
    currentView,
    debug = true,
    downloading = {},
    emptyStorage = {
        downloaded: {},
        server: {},
        user: {}
    },
    humanNamesForServerVariables = {
        ci: 'courseId',
        cl: 'classId',
        cu: 'classUrl',
        conid: 'objectId',
        ctid: 'contentTypeId',
        fn: 'firstName',
        ia: 'isAccepted',
        im: 'image',
        isp: 'isPresenter',
        isr: 'isSessionRecurring',
        lan: 'lastAssignmentTime',
        lc: 'lastClassTime',
        lct: 'lastCommentTime',
        lco: 'lastCourseTime',
        lcn: 'lastContentTime',
        lo: 'lastOverdueTime',
        lt: 'lastTestTime',
        ln: 'lastName',
        mi: 'messageId',
        msg: 'message',
        pd: 'password',
        pn: 'pageNumber',
        recst: 'recordingStatus',
        rid: 'replyToUserId',
        rp: 'resultsPerPage',
        rt: 'responseType',
        sc: 'sessionCode',
        sid: 'sectionId',
        sub: 'subject',
        subid: 'subSectionId',
        tid: 'timeZoneId',
        tl: 'title',
        typ: 'type',
        ud: 'userId',
        un: 'userName'
    },
    isDownloading = false,
    os = {},
    serverNamesForHumanVariables = {},
    severTimeStamp = {}, // Timestamps for last server calls made.
    storage = {}, // This guy stays in sync with localStorage.storage.
    timeZone = {india: 33},
    toastTimer = null,
    $ask,
    $back,
    $body,
    $document,
    $downloading,
    $header,
    $html,
    $menu,
    $title,
    $toast,
    $viewContainer,
    $window

    app.defaultPage = null
    app.delayBetweenSameServerCalls = 0
    app.fileTypes = {}
    app.mode = null
    app.phoneNumber = ''
    app.resultsPerPage = 10
    app.toastDuration = 3000
    app.user = {} // Everything related to the current user.
    app.version = 0
    app.view = {} // Views are cached here.

    function backButtonClicked(){
        if ($back.html() === '&nbsp;') $menu.toggle()
        else {
            $('view#embed:visible div').vacate()
            history.go($back.attr('data-level') || -1)
        }
    }

    function bindEvents(){
        $document.ajaxStart(app.showLoader).ajaxStop(app.hideLoader)
        $body.on('click', 'a', function(event){
            !$body.hasClass('message') &&
            /file|http|https/.test($(this).attr('href')) && event.preventDefault()
        })
        
        $body.on('click', 'back:not([href])', backButtonClicked)
        $ask.on('click', 'button:first', stopAsking)
        $body.on('click', '.cancelDownload', cancelDownload)
        $body.on('click', '.deleteFile', deleteFile)
        $body.on('click', '.downloadFile', downloadFile)
        $body.on('click', '[href]', linkClicked)
        $body.on('click', '.inaccessible', inaccessible)
        $body.on('submit', 'form', app.nothing) // Since all forms are ajax based.
        
        $menu.on('click', function(event){ event.target === this && $menu.toggle() })
        $menu.children('li:not(:first)').on('click', function(){ $menu.toggle() })
        $menu.children('li.logout').on('click', app.logout)

        $window.on('hashchange', hashChanged)
        $window.on('offline online', function(){ $html.removeClass().addClass(navigator.onLine ? '' : 'offline') })

        $('reloader').on('click', function(){ !$body.hasClass('message') && !$body.hasClass('messages') && location.reload() })
    }

    function buildDom(){ $('.userName').text(app.user.name) }
    function cancelDownload(){
        app.ask(this, 'Do you want to cancel downloading this file?', 'No', 'Yes', function(){
            var signature = $(this).data('signature'),
                currentlyDownloading = Object.keys(downloading)[0]

            $('[data-signature="'+signature+'"]').removeClass().addClass('downloadFile')
            delete downloading[signature]
            if (currentlyDownloading === signature){
                app.native('cancelDownload')
                downloadNext()
            } else updatedDownloadQueue()
        })
        return false
    }

    function cleanXmlLeftOvers(obj){ // Server converts XML to JSON, so clean it.
        for (var key in obj)
            key === '#cdata-section'
            ? (obj = obj[key])
            : (typeof obj[key] === 'object') && (obj[key] = cleanXmlLeftOvers(obj[key]))
        return obj
    }

    function deleteFile(){
        app.ask(this, 'Do you want to delete this file?', 'No', 'Yes', function(){
            var signature = $(this).data('signature')

            $('view#downloads [data-signature="'+signature+'"]').parent().remove()
            !$('view#downloads li').length && $('view#downloads ul').html('')

            $('[data-signature="'+signature+'"]').removeClass().addClass('downloadFile')
            delete storage.downloaded[signature] && app.save()
            app.native('delete', signature.splitInto('/', 'courseId', 'typeId', 'objectId'))
        })
        return false
    }

    function downloadFile(){
        var $this = $(this),
            signature = $this.data('signature')

        if (!downloading[signature]){
            if ($this.data('path')){
                $('[data-signature="'+signature+'"]').removeClass().addClass('cancelDownload')
                downloading[signature] = $.extend(signature.splitInto('/', 'courseId', 'typeId', 'objectId'), {path: $this.data('path')})
                isDownloading ? updatedDownloadQueue() : downloadNext()
            } else {
                $this.css({
                    'opacity': '0.5',
                    'pointer-events': 'none'
                })

                app.server('downloadContent', {sc: $this.data('sc')}).okay(function(response){
                    $('[data-signature="'+signature+'"]').removeClass().addClass('cancelDownload')
                    downloading[signature] = $.extend(signature.splitInto('/', 'courseId', 'typeId', 'objectId'), {path: response.downloadcontent.url})
                    isDownloading ? updatedDownloadQueue() : downloadNext()
                    $this.css({
                        'opacity': '1',
                        'pointer-events': 'auto'
                    })
                })
            }
        }
        return false
    }

    function downloadNext(){
        var signatures = Object.keys(downloading)
        updatedDownloadQueue()
        if (signatures.length){
            isDownloading = true
            whenReady(function(){ app.native('download', downloading[signatures[0]]) })
        } else isDownloading = false
    }

    function flex(params){
        app.log('Flex - '+params.join(', '))
        os.ios ? (location.href = 'file:///'+params.join('^')) : app.native('relayToFlex', {arg: params.join('^')})
    }

    function firstRun(){
        localStorage.clear() // Delete all saved data.
        app.native('delete') // Delete all user files.

        localStorage.twoPointZero = true
        storage = $.extend(true, {}, emptyStorage)
        app.save()
    }

    function hashChanged(){
        var splits = location.hash.slice(1).split('/')
        if (!isUserLoggedIn() && !/login|forgotPassword/.test(splits[0])){
            app.openPage('home')
            return
        }
        location.data = splits.slice(1)
        openView(splits[0])
    }

    function humanifyJquery(){
        $.fn.compile = function(data){
            return this.each(function(){
                var $this = $(this), template = $this.data('template')
                template && $this.removeClass('nothing').append(template(data)).parent().data('scrollFurther', true)
                whenReady(function(){ data.constructor === Array && !data.length && $this.addClass('nothing') })
            })
        }
        $.fn.exists = function(){ return this.length > 0 }
        $.fn.hasAttr = function(name){ return typeof $(this).attr(name) !== 'undefined' }
        $.fn.tagName = function(){
            var tagName = this.prop('tagName')
            return (tagName && tagName.toLowerCase()) || ''
        }
        $.fn.vacate = function(){
            return this.each(function(){
                $(this)[typeof this.value === 'undefined' ? 'empty' : 'val']('')
            })
        }
        $.fn.value = function(){
            if (!this[0]) return
            var fn = this[typeof this[0].value === 'undefined' ? 'text' : 'val']
            return arguments.length ? fn.call(this, Array.prototype.slice.call(arguments)) : fn.call(this)
        }
    }

    function humanifyNative(){
        Array.prototype.random = function(){ return this[Math.floor(Math.random()*this.length)] }
        Math.randomBetween = function(min, max){ return Math.floor(Math.random()*max) + min }
        Number.prototype.nth = function(){ // Source: http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
            var mod = this % 10
            return this > 3 && this < 21 ? 'th' : mod === 1 ? 'st' : mod === 2 ? 'nd' : mod === 3 ? 'rd' : 'th'
        }
        Object.deleteKeys = function(obj){
            Array.prototype.slice.call(arguments, 1).forEach(function(key){ delete obj[key] })
            return obj
        }
        Object.equals = function(obj1, obj2){ return JSON.stringify(obj1 || {}) === JSON.stringify(obj2 || {}) }
        Object.replaceKeys = function(obj, keys){
            for (var key in obj){
                key[0] === '@' && (obj[key.slice(1)] = obj[key]) && delete obj[key]
                keys[key] && (obj[keys[key]] = obj[key]) && delete obj[key]
                typeof obj[key] === 'object' && Object.replaceKeys(obj[key], keys)
            }
            return obj
        }
        Object.stringify = function(obj){
            var response = ''
            for (var i in obj) response += ' '+i+'='+obj[i]
            return response
        }

        String.prototype.bool = function(){ return this == '1' }
        String.prototype.capitalize = function(){ // Source: http://codereview.stackexchange.com/questions/77614/capitalize-the-first-character-of-all-words-even-when-following-a
            return this.toLowerCase().replace(/\b\w/g, function(m){
                return m.toUpperCase()
            })
        }
        String.prototype.has = function(str){ return this.indexOf(str) !== -1 }
        String.prototype.int = function(){ return window.parseInt(this) }
        String.prototype.splitInto = function(splitter){
            var obj = {}, splits = this.split(splitter)
            for (var i=0; i<Math.max(arguments.length-1, splits.length); i++)
                obj[arguments[i+1]] = splits[i]
            return obj
        }
        String.prototype.stripStyles = function(){ return this.replace(/(style|width)\=\".+?\"/g, '') }
        String.prototype.toHumanString = function(){ return this.replace(/([A-Z])/g, ' $1').capitalize() }
    }

    function inaccessible(event){ app.ask('This file cannot be viewed on a mobile device.') }
    function initVariables(){
        os.android = /android/i.test(navigator.userAgent.toLowerCase())
        os.ios = !os.android

        app.os = os // Raman: Jugaad! It works! But it might break, FIX IT!
        !localStorage.twoPointZero ? firstRun() : (storage = JSON.parse(localStorage.storage))

        $ask = $('ask')
        $body = $('body')
        $document = $(document)
        $downloading = $('downloading')
        $header = $('header')
        $html = $('html')
        $menu = $('.menu')
        $back = $header.find('back')
        $title = $header.find('h1')
        $toast = $('toast')
        $viewContainer = $('view-container')
        $window = $(window)

        app.user = storage.user // Load currently logged in user.
        for (var name in humanNamesForServerVariables) serverNamesForHumanVariables[humanNamesForServerVariables[name]] = name // Reverse map them as well.
        for (var url in storage.server) cache[url] = storage.server[url] // Load saved server calls to memory.
    }

    function isDataStale(url){ return timeStamp() - (severTimeStamp[url] || 0) > app.delayBetweenSameServerCalls }
    function infiniteScrolling(){
        var $this = $(this)
        $this.data('scrollFurther') &&
        (this.scrollHeight-this.offsetHeight) - this.scrollTop < 500 &&
        $this.removeData('scrollFurther').trigger('hittingBottom')
    }

    // function isUserLoggedIn(){ return !!app.user.id }
    function isUserLoggedIn(){ return true }
    function linkClicked(){
        var $this = $(this)
        if ($this.tagName() !== 'a'){
            $this.attr('href') && app.openPage($this.attr('href'))
        }
    }

    function loadController(name, callback){
        $.ajax({ // Get the view's controller.
            url: 'asset/script/controller/'+name+'.js?'+Math.random(),
            dataType: 'text',
            error: callback,
            success: function(response){
                callback(
                    $('<script>').html('(function(){ with(app) with(view) with('+name+'){ var me = app.view.'+name+' \n'
                        +response.replace(/server\.(.+?)\(/g, "server('$1', ")
                    +'\n} })()')
                )
            }
        })
    }

    function openView(name){
        var $view = $('view#'+name)
        $view.exists() ? viewFetched($view) :
        $.get('asset/view/'+name+'.html').done(function(response){
            viewFetched($('<view>').attr('id', name).html(response))
        })

        var $tab = $('footer tab.'+name)
        if ($tab.exists()){
            $('footer tab').removeClass('active')
            $tab.addClass('active')

            if (/aboutCourse|courseSchedule/.test(name))
                $('tab.aboutCourse, tab.courseSchedule').each(function(){
                    var $this = $(this)
                    $this.attr('href', $this.attr('class').replace(' active', '')+'/'+location.data[0])
                })
        }
    }


    function run(){
        app.delayBetweenSameServerCalls *= 1000 // Make it easier to use, since it always ends up being used as milliseconds.
        location.hash ? hashChanged() : app.openPage(app.defaultPage)
    }

    function serverUrl(method, data){ return app.mode+'/restservice?method='+method.toLowerCase()+(data ? '&'+$.param(data) : '') }
    function stopAsking(){ $ask.hide() }
    function timeStamp(){ return new Date().getTime() }
    function updatedDownloadQueue(){ // Updates count in the download bar.
        var count = Object.keys(downloading).length
        count ? $downloading.value('Downloading... '+count+' '+(count === 1 ? 'file' : 'files')+' remaining.').css('display', 'block') : $downloading.hide().removeClass().vacate()
    }

    function viewFetched($view){
        var name = $view.attr('id')
        currentView = $view
        $viewContainer.children(':visible').hide() // Hide current view.
        $body.removeClass().addClass(name) // Let the body know.

        if (app.view[name]){
            $view.show()
            viewOpened(app.view[name])
        } else {
            currentView = app.view[name] = {name: name},
            currentView.$view = $view

            currentView.loaded = currentView.shown = app.nothing
            currentView.titleString = name.toHumanString()

            $view.find('[named]').each(function(){ // Let the controller have access to all named elements.
                var $el = $(this), html = $el.html().trim()
                currentView['$'+$el.attr('named')] = $el
                html.has('{{') && $el.data('template', Handlebars.compile(html)).vacate() &&
                html.indexOf('{{#each') === 0 && $el.parent().on('scroll', infiniteScrolling)
            })

            loadController(name, function(controller){
                controller && $view.appendTo($viewContainer).append(controller).show()
                currentView.loaded()
                viewOpened(currentView)
            })
        }
    }

    function viewOpened(view){
        $back.removeAttr('href').removeAttr('data-level').html('&nbsp;')
        $title.value(view.titleString)
        view.shown()
    }

    function whenReady(callback){ window.setTimeout(callback) }
    app.ask = function(){
        var args = arguments,
            minimumArguments = typeof args[0] === 'string' ? 1 : 2,
            $buttons = $();

        ((args.length > minimumArguments) ? Array.prototype.slice.call(args, minimumArguments, args.length-1) : ['Okay']).forEach(function(button){
            $buttons = $buttons.add($('<button>').text(button))
        })

        $ask
        .find('what').text(args[minimumArguments-1]).end()
        .find('buttons').vacate().append($buttons).end()
        .find('button:last').on('click', function(){
            var callback = args[args.length-1]
            typeof callback === 'function' && callback.call(args[0])
            $ask.hide()
        }).end().show()
    }


    app.backButton = function(name){
        name
        ? $back.attr('href', name).value('Back' || (app.view[name] ? app.view[name].titleString : name.toHumanString()))
        : $back.value('Back')
    }

    app.downloadCompleted = function(file){
        var signature = Object.keys(downloading)[0]
        $('[data-signature="'+signature+'"]').removeClass().addClass('deleteFile')
        delete downloading[signature] && downloadNext()
        app.getFileData(signature, function(response){
            storage.downloaded[signature] = $.extend(file, {
                meta: response,
                when: timeStamp()
            })
            app.save()
            app.view.downloads && $('view#downloads:visible').length && app.view.downloads.shown()
        })

        app.log('Downloading completed'+Object.stringify(file))
    }

    app.downloadFailed = function(){
        var signature = Object.keys(downloading)[0]
        $('[data-signature="'+signature+'"]').removeClass().addClass('downloadFile')
        delete downloading[signature] && downloadNext()
        app.log('Downloading failed.')
    }

    app.downloadedFiles = function(){ return storage.downloaded }
    app.downloadedPath = function(signature) { return storage.downloaded[signature] ? storage.downloaded[signature].path : null }
    app.downloadProgress = function(progress){
        var percentage = Math.round(progress.downloaded/progress.total*100)
        $downloading.removeClass().addClass('p'+percentage)
        app.log('Download progress - '+percentage+'%')
    }

    app.getFileAction = function(signature){ return downloading[signature] ? 'cancelDownload' : storage.downloaded[signature] ? 'deleteFile' : 'downloadFile' }
    app.facebookLoginResponse = function(response){
        app.log('Facebook login response called.')
        response = Object.replaceKeys(cleanXmlLeftOvers(response.rsp), humanNamesForServerVariables)
        !response.err && app.userLoggedIn(response['fblogin'])
    }

    app.fileType = function(id, specialId){ return app.fileTypes[id || (specialId ? '10'+specialId : 0)] || 'unknown' }
    app.hideLoader = function(){ $header.removeClass('loading') }
    app.log = function(anything){ } //debug && $('log').vacate().value(anything).css('display', 'block') && console.log(anything) }
    app.loginViaFacebook = function(){
        flex(['facebookLogin'])
    }

    app.logout = function(){
        app.ask('Are you sure you want to logout? Your downloads will be deleted.', 'No', 'Yes', function(){
            app.native('cancelDownload')
            app.user = {}
            storage = $.extend(true, {}, emptyStorage)
            app.save()

            window.setTimeout(function(){
                app.native('delete')
                os.android ? app.native('reloadView') : location.reload()
            }, 300)
        })
    }

    app.native = function(method, request){
        (request = typeof request !== 'undefined' ? request : {}).fn = method
        var url = 'native://'+(os.ios ? window.encodeURIComponent($.param(request)) : $.param(request))
        location.href = url

        delete request.fn
        method !== 'relayToFlex' && app.log('native/'+method+' '+Object.stringify(request))
    }

    app.nothing = function(){ return false } // This does nothing.
    app.openClass = function(type, lc){
        // First zero is presenter.
        
        var downloaded = app.downloadedPath('0/0/'+lc.classid)
        if (type === 'view' && downloaded) app.native('playMedia', {path: downloaded})
        else flex(
            (type === 'join')
            ? ['joinClass', lc.sessionCode, app.user.email, lc.title, app.user.name, app.user.id, 0, lc.isSessionRecurring, lc.classUrl]
            : ['viewPastClass', lc.sessionCode, app.user.id]
        )
        return false
    };

    app.openPage = function(name){ location.hash = name }
    app.playMedia = function(path){
        // Raman: Jugaad! It works! But it might break, FIX IT!
        os.ios && /\.wma|\.wmv/.test(path) ? app.ask('This file cannot be viewed on a mobile device.') :
        app.native('playMedia', {path: path})
    }
    app.ready = function(callback){ app.ready = new Function(callback.toString().replace(/function \(\)\s?{/, 'with(app){').replace(/server\.(.+?)\(/g, "server('$1', ")) }
    app.save = function(){
        storage.user = app.user
        localStorage['storage'] = JSON.stringify(storage)
    }

    app.server = function(method, humanRequest){
        var that
        new function(){
            that = this
            that.notOkay = function(callback){ that.notOkay = callback; return that }
            that.okay = function(callback){ that.okay = callback; return that }

            var url, serverRequest
            serverRequest = Object.replaceKeys($.extend({}, humanRequest, { // Request object that the server will see.
                responseType: 'json',
                timeZoneId: timeZone.india,
                userId: app.user.id
            }), serverNamesForHumanVariables)

            url = serverUrl(method, Object.deleteKeys($.extend({}, serverRequest), serverNamesForHumanVariables.userId)) // Unmarked url, for caching.
            !humanRequest.dontCache && whenReady(function(){ cache[url] && that.okay(cache[url]) }); // Send the cached copy if it's there.

            isDataStale(url) &&
            (!humanRequest.forceCache || (humanRequest.forceCache && !cache[url])) &&
            $.post(serverUrl(method), serverRequest, function(response){
                !humanRequest.dontCache && (severTimeStamp[url] = timeStamp())
                response = Object.replaceKeys(cleanXmlLeftOvers(response.rsp), humanNamesForServerVariables)
                humanRequest.category && (response.category = humanRequest.category)
                if (response.err) that.notOkay(response)
                else {
                    response = response[response.method]
                    humanRequest.category && (response.category = humanRequest.category)
                    if (humanRequest.dontCache) that.okay(response)
                    else if (!Object.equals(cache[url], response)){
                        if (humanRequest.pageNumber && humanRequest.pageNumber === 1)
                            for (var urlKey in cache)
                                if (urlKey.has('?method='+method.toLowerCase())){
                                    delete cache[urlKey]
                                    delete severTimeStamp[urlKey]
                                }
                        that.okay(cache[url] = response)
                    }

                    if (/replyMessage|sendMessageToUser/.test(method))
                        for (var urlKey in cache)
                            urlKey.has('?method=getmessages') && (severTimeStamp[urlKey] = 0)

                    humanRequest.save &&
                    (cache[url] = storage.server[url] = response) &&
                    app.save()
                }
            })
        }()
        return that
    }

    app.showLoader = function(){ $header.addClass('loading') }
    app.title = function(text){
        $title.value(currentView.titleString = text)
        document.title = text
    }
    
    app.toast = function(text){
        $toast.value(text).addClass('shown')
        window.clearTimeout(toastTimer)
        toastTimer = window.setTimeout(function(){ $toast.removeClass() }, app.toastDuration)
    }

    app.userLoggedIn = function(response){
        app.user = {
            email: response.email,
            id: response.userId,
            name: response.firstName+' '+(response.lastName || ''),
            pic: response.image
        }

        app.save()
        $('.userName').text(app.user.name)
        app.openPage(app.defaultPage)
    }
    
    $(document).ready(function(){
        humanifyNative()
        humanifyJquery()
        initVariables()
        buildDom()
        bindEvents()
        
        app.ready()
        run()
    })

    return this
}