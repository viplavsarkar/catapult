var config = require('../config/config');
var fs = require('fs');
var path = require('path');
var Language = require('./Language');

var _root = config.i18n;

console.log('====> LOADED - index.js');
var i18n = function(language){
    console.log('====> CONSTRUCTOR - i18n');
     global.messages = {};
        global.language = new Language(language);

        console.log('Language set to: ' + global.language.displayName);

        this._initializeLocalizedStrings();
}
i18n.prototype.getLocalizedStrings = function(language){
     var root = _root;
        var filename = path.join(_root,
            language.code,
            language.culture,
            language.culture + '.json');
        //console.log('language file =>' + filename);
        // TODO: This needs to be cached
        var data = fs.readFileSync(filename, 'utf8');
        //console.log(data);
        return JSON.parse(data);
}
i18n.prototype._initializeLocalizedStrings = function() {
        var _this = this;
        var supportedLanguages = global.language.getSupportedLanguages(); 
        //console.log('supportedLanguages > ');
        //console.log(supportedLanguages);
        if (supportedLanguages !== undefined) {
            supportedLanguages.forEach(function (_language) {
                console.log('_language > ');
                console.log(_language);
                global.messages[_language.culture] = _this.getLocalizedStrings(_language);
            });
        }
    }
    /*
class i18n {

    constructor(language) {
        global.messages = {};
        global.language = new Language(language);

        console.log('Language set to: ' + global.language.displayName);

        this._initializeLocalizedStrings();
    }

    
    // * Reads localized strings from file
    // *
    // * @param {object} language Code and Locale
    // * @return {object} JSON
    //
    getLocalizedStrings(language) {
        var root = _root;
        var filename = path.join(_root,
            language.code,
            language.culture,
            language.culture + '.json');

        // TODO: This needs to be cached
        var data = fs.readFileSync(filename, 'utf8');

        return JSON.parse(data);
    }

    //
    // * Reads messages from storage and sets them globally
    //
    _initializeLocalizedStrings() {
        var _this = this;
        var supportedLanguages = global.language.getSupportedLanguages();

        if (supportedLanguages !== undefined) {
            supportedLanguages.forEach(function (_language) {
                global.messages[_language.culture] = _this.getLocalizedStrings(_language);
            });
        }
    }
}
*/
module.exports = i18n;