const Constants = require('../../utils/Constants')

class AppointmentController {
    constructor(AppointmentAvailableDaysUsecase, AppointmentAvailableTimeUsecase, AppointmentAddUsecase) {
        this.availableDays = AppointmentAvailableDaysUsecase
        this.availableTime = AppointmentAvailableTimeUsecase
        this.appointmentAdd = AppointmentAddUsecase

        this.getAvailableDays = this.getAvailableDays.bind(this);
        this.getAvailableTime = this.getAvailableTime.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
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

    async addAppointment(req, res) {
        try {
            const data = await this.appointmentAdd.execute(req)
            res.status(200).send('webhook processed')
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${error.message}` })
        }
    }
}

module.exports = AppointmentController
