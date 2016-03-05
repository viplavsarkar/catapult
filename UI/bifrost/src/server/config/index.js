var path = require('path');

var config = {};

config.views = path.join(__dirname, '..', 'views');
config.i18n = path.join(__dirname, '..', 'i18n');

config.supportedLanguages = [
    {
        code: 'en',
        locale: 'US',
        culture: 'en-US',
        displayName: 'English (US)',
        isRTL: false
    },
    {
        code: 'ar',
        locale: 'AE',
        culture: 'ar-AE',
        displayName: 'Arabic (UAE)',
        isRTL: true
    }
];

config.defaultLanguage = {
    code: 'en',
    locale: 'US',
    culture: 'en-US',
    displayName: 'English (US)',
    isRTL: false
};

module.exports = config;