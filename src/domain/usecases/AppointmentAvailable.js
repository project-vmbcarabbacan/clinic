const Constants = require('../../infrastructure/utils/Constants')

class AppointmentAvailable {

    constructor(AppointmentRepository, DateService) {
        this.appointmentRepository = AppointmentRepository
        this.date = DateService
    }

    async execute(date) {
        try {
            if(!date)
                throw new Error('Datedsadsad is required');
            
            if(!this.date.check(date))
                throw new Error('Datasdase is invalid') 
            
            const targetDate = new Date(date);

            const day = targetDate.getDay();

            if(!Constants.APPOINTMENT.AVAILABLE_DAY.includes(day))
                throw new Error(`Appointment only available every During Week Days (${Constants.APPOINTMENT.WEEK_START} to ${Constants.APPOINTMENT.WEEK_END})`)

            let availableSlots = [];
            let currentTime = new Date(targetDate.setHours(Constants.APPOINTMENT.TIMING_START, 0, 0, 0));

            while (currentTime.getHours() < Constants.APPOINTMENT.TIMING_END) {
                const nextTimings = new Date(currentTime.getTime() + Constants.APPOINTMENT.TIMING_INTERVAL * 60000)

                const existingAppointmentCount = await this.appointmentRepository.countByDate(nextTimings)

                if(existingAppointmentCount < Constants.APPOINTMENT.SLOTS) {
                    availableSlots.push({
                        date: this.date.format_date_only(currentTime.toISOString()),
                        time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        remaining_slots: Constants.APPOINTMENT.SLOTS - existingAppointmentCount
                    })
                }
                currentTime = nextTimings
            }

            return availableSlots


        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = AppointmentAvailable;