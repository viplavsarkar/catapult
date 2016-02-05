app.ready(function(){
    defaultPage = 'notifications'
    delayBetweenSameServerCalls = 60 // Seconds.
    fileTypes = { // If content/object/type id doesn't match, it looks for objecttype, which starts at 100+.
        0: 'unknown',
        1: 'ppt', 2: 'pdf', 4: 'word', 6: 'xls',
        3: 'video', 5: 'audio',
        7: 'flash',
        8: 'youtube', 9: 'authorstream', 11: 'scribd', 13: 'slideshare',
        101: 'class', 103: 'test', 104: 'assignment'
    }

    inaccessibles = /assignment|flash|unknown/
    mode = {
        bellurbis: 'http://blmobile.wiztest.authordm.com',
        dev: 'http://mobile.wiztest.authordm.com',
        qe: 'http://mobileapp.wizqe.authordm.com',
        preProd: 'http://api.wiziq.authordm.com/glmobileapp',
        prod: 'http://api.wiziq.com/glmobileapp'
    }.prod

    phoneNumber = '1-800-3000-1771'
    resultsPerPage = 25
    toastDuration = 3000
    version = '2.0'

    /* If you change anything below this line, there's a 97.3% possibility that it will
     * create a paradox in the space-time continuum and the universe will cease to exist.
     *
     * ~ Doc Brown
    **/

    app.back = function(){
        location.href.has('testFrame') ? $(window).trigger('message', {errorcode: '-1'}) : $('header back').trigger('click')
    }

    app.getFileData = function(signature, callback){
        var courseId = signature.split('/')[0]
        if (courseId !== '0')
            server.getCourseSchedule({courseId: courseId}).okay(function(response){
                var found = false
                response.course.section.some(function(section){
                    getFilesFromSection(section).some(function(object){
                        if (object.path){
                            var storage = JSON.parse(window.localStorage.storage)
                            if (storage.downloaded[signature]){
                                object.path = storage.downloaded[signature].path
                            }
                        }

                        if ([courseId, object.typeid || 0, object.objectid].join('/') === signature){
                            callback(object)
                            return (found = true)
                        }
                    })
                    return found
                })
            })
        else server.getClassDetail({classId: signature.split('/')[2]}).okay(callback)
    }

    app.getFilesFromSection = function(section){
        var files = [];
        section.objects ? (files = section.objects) : // Sections based courses.
        ((section.subsection || []).concat(section.allweek || [])).map(function(subSection){ // Weeks based courses.
            files = files.concat(
            (subSection.objects || []).map(function(object){
                object.date = (subSection.date ? subSection.date : 'All week')+' - '
                object.subSectionId = subSection.subsectionid
                // subSection.date &&
                // (object.date = window.parseInt(subSection.date.split(' ')[0])) &&
                // (object.nth = object.date.nth())
                return object
            }))
        })

        files.map(function(file){ file.sectionId = section.sectionid })
        return files
    }

    app.fileHref = function(o){
        var signature = [o.courseid, o.contenttypeid || o.typeid || 0, o.contentid || o.objectid].join('/')
        return o.type === 'class' ? 'liveClass/'+(o.classid || o.objectid) :
        /audio|video/.test(o.type) ? 'media/'+signature :
        /pdf|ppt|word|xls/.test(o.type) ? 'document/'+signature :
        o.type === 'test' ? 'test/'+[o.courseid, o.sectionId || 0, o.subSectionId || 0, o.objectid || o.testid].join('/') :
        /youtube|authorstream|scribd|slideshare/.test(o.type) ? 'embed/'+signature :
        ''
    }

    app.inaccessible = function(type){ return inaccessibles.test(type) ? 'inaccessible' : '' }
})