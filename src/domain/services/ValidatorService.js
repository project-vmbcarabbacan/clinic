const { Types } = require('mongoose');

class ValidatorService {
    validateId(id) {
        return Types.ObjectId.isValid(id)
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return regex.test(password)
    }

    validateAppointmentDate(date) {
        if(!date) return false

        const theDate = new Date(date)
        if (isNaN(theDate.getTime())) return false

        const today = new Date()
        today.setUTCHours(0, 0, 0, 0)
        const enteredDate = new Date(date)
        if(today > enteredDate) return false

        return true
    }
}

module.exports = ValidatorService;