const Constants = require('../../utils/Constants')

class AppointmentController {
    constructor(AppointmentAvailableDaysUsecase, AppointmentAvailableTimeUsecase) {
        this.availableDays = AppointmentAvailableDaysUsecase
        this.availableTime = AppointmentAvailableTimeUsecase

        this.getAvailableDays = this.getAvailableDays.bind(this);
        this.getAvailableTime = this.getAvailableTime.bind(this);
    }

    async getAvailableDays(req, res) {
        try {
            const available = await this.availableDays.execute(req.query)
            res.status(Constants.STATUS_CODES.SUCCESS).json({ messagage: Constants.MESSAGE.APPOINTMENT_AVAILABLE, data: { available } })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${error.message}` })
        }
    }

    async getAvailableTime(req, res) {
        try {
            const available = await this.availableTime.execute(req.query.date)
            res.status(Constants.STATUS_CODES.SUCCESS).json({ messagage: Constants.MESSAGE.APPOINTMENT_AVAILABLE, data: { available } })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${error.message}` })
        }
    }
}

module.exports = AppointmentController
