var config = require('../config');
var fs = require('fs');
var path = require('path');
var Language = require('./Language');

var _root = config.i18n;

function i18n(language) {
    global.messages = {};
    global.language = Language(language);
    this.getLocalizedStrings = _getLocalizedStrings;

    console.log('Language set to: ' + global.language.displayName);

    _initializeLocalizedStrings();
}

/**
 * Reads localized strings from file
 *
 * @param {object} language Code and Locale
 * @return {object} JSON
 */
function _getLocalizedStrings(language) {
    var root = _root;
    var filename = path.join(_root,
        language.code,
        language.culture,
        language.culture + '.json');

    // TODO: This needs to be cached
    var data = fs.readFileSync(filename, 'utf8');

    return JSON.parse(data);
}

/**
 * Reads messages from storage and sets them globally
 */
function _initializeLocalizedStrings() {
    var supportedLanguages = global.language.getSupportedLanguages();

    if (supportedLanguages !== undefined) {
        supportedLanguages.forEach(function (_language) {
            global.messages[_language.culture] = this.getLocalizedStrings(_language);
        });
    }
}

module.exports = i18n;