const Constants = require('../utils/Constants')

global.url = function(path) {
    return `${Constants.APPLICATION.API_URL}${path}`;
};