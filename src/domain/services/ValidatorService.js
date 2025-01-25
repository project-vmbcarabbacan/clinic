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
}

module.exports = ValidatorService;