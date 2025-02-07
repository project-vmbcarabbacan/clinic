const AppointmentRepository = require("../../application/repositories/AppointmentRepository");

class AppointmentRepositoryImpl extends AppointmentRepository {

    constructor(AppointmentModel) {
        super()
        this.appointmentModel = AppointmentModel
    }

    async store(data) {
        try {
            const appointment = new this.appointmentModel(data)
            return await appointment.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async countByDate(date) {
        try {
            return await this.appointmentModel.countDocuments({ date })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllAppointmentByDate(date) {
        try {
            return await this.appointmentModel.findOne({ date })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAppointByUserId(user_id) {
        try {
            return await this.appointmentModel.findOne({ user_id })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAppointmentById(id) {
        try {
            return await this.appointmentModel.findById(id)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getHoursAndMinutes() {
        const date = new Date()
        
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if(minutes > 0 && minutes <= 30) {
            minutes = 30
        } else {
            minutes = 0
            if(hours <= 24) 
                hours++
        }

        return {
            hours, minutes
        }
    }

}

module.exports = AppointmentRepositoryImpl;
