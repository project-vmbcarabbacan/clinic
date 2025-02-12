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

    format_appointment_date(date) {
        return moment(date).tz(Constants.APPLICATION.TIMEZONE).format(Constants.APPLICATION.DATE_APPOINTMENT_FORMAT)
    }

    getWeekNumber(date) {
        // Create a copy of the date
        const currentDate = new Date(date);
        // Set the current date to the start of the year
        currentDate.setHours(0, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);

        // Calculate the number of milliseconds from the start of the year
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const diff = currentDate - startOfYear;

        // Calculate the current week number
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        return Math.ceil(diff / oneWeekInMillis);
    }
}

module.exports = DateService;