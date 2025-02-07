const moment = require('moment-timezone')
const Constants = require('../../infrastructure/utils/Constants')

class DateService {

    now() {
        return moment.tz(Constants.APPLICATION.TIMEZONE).valueOf()
    }

    format(date) {
        return moment(date).tz(Constants.APPLICATION.TIMEZONE).format(Constants.APPLICATION.TIME_FORMAT)
    }

    now_format() {
        return moment().tz(Constants.APPLICATION.TIMEZONE).format(Constants.APPLICATION.TIME_FORMAT)
    }

    format_date_only(date) {
        return moment(date).tz(Constants.APPLICATION.TIMEZONE).format(Constants.APPLICATION.DATE_FORMAT)
    }
}

module.exports = DateService;