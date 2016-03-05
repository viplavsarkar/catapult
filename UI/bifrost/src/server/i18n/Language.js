var config = require('../config');

// Right now we are reading supported languages from config
var _supportedLanguages = config.supportedLanguages;

function Language(language) {
    var _this = this;
    this.getSupportedLanguages = _getSupportedLanguages;

    var parsedLang = _parse(language);

    if (parsedLang === undefined || !_isLanguageSupported(parsedLang)) {
        console.log('Language not supported: ' + language);
        return Object.assign(this, _getDefaultLanguage());
    }

    this.code = parsedLang.code;
    this.locale = parsedLang.locale;
    this.culture = parsedLang.culture;
    _supportedLanguages.forEach(function (_language) {
        if (parsedLang.code === _language.code && parsedLang.locale === _language.locale) {
            _this.displayName = _language.displayName;
            _this.isRTL = _language.isRTL;
            return;
        }
    });
    this.toString = function () {
        return this.culture;
    }

    return this;
}

/**
 * Parses language culture string to Code and Locale
 *
 * @param {string} language Language culture
 * @return {object} Code and Locale
 */
function _parse(language) {
    var regEx = /^([a-z]{2})-([A-Z]{2})$/;

    var languageComponents = regEx.exec(language);

    if (languageComponents.length !== 3)
        return;

    return {
        code: languageComponents[1],
        locale: languageComponents[2],
        culture: languageComponents[1] + '-' + languageComponents[2]
    };
}

/**
 * Returns array of supported languages
 *
 * @return {array} List of supported languages
 */
function _getSupportedLanguages() {
    return _supportedLanguages;
}

/**
 * Returns default language from config
 *
 * @return {object} Default language
 */
function _getDefaultLanguage() {
    return config.defaultLanguage;
}

/**
 * Checks if language is supported or not
 *
 * @param {object} language Code and Locale
 * @return {bool}
 */
function _isLanguageSupported(language) {
    var isSupported = false;
    _supportedLanguages.forEach(function (_language) {
        if (_language.code == language.code && _language.locale == language.locale)
            isSupported = true;
    });

    return isSupported;
}

module.exports = Language;