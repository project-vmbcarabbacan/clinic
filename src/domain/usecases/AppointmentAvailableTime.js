const Constants = require('../../infrastructure/utils/Constants')

class AppointmentAvailableTime {

    constructor(AppointmentRepository, DateService, ValidatorService) {
        this.appointmentRepository = AppointmentRepository
        this.date = DateService
        this.validate = ValidatorService
    }

    async execute(date) {
        try {
            if(!this.validate.validateAppointmentDate(date))
                throw new Error('Date is invalid') 

            const targetDate = new Date(date);
            const today = new Date();
            
            today.setUTCHours(0, 0, 0, 0);

            const day = targetDate.getDay();

            let setTime = targetDate.setHours(Constants.APPOINTMENT.TIMING_START, 0, 0, 0)
            if(this.date.format_date_only(today.toISOString()) === this.date.format_date_only(targetDate.toISOString())) {
                const { hours, minutes } = this.appointmentRepository.getHoursAndMinutes(targetDate);
                setTime = targetDate.setHours(hours, minutes, 0, 0)
            } 

            if(!Constants.APPOINTMENT.AVAILABLE_DAY.includes(day))
                throw new Error(`Appointment only available every During Week Days (${Constants.APPOINTMENT.WEEK_START} to ${Constants.APPOINTMENT.WEEK_END})`)
            
            const availableSlots = [];
            let currentTime = new Date(setTime); // Start at 8 AM
            const now = new Date(); // Current system time

            while (currentTime.getHours() >= Constants.APPOINTMENT.TIMING_START && currentTime.getHours() < Constants.APPOINTMENT.TIMING_END) { // Until 5 PM
                // Skip past times if today is the selected date
                if (targetDate.getTime() === today.getTime() && currentTime < now) {
                currentTime = new Date(currentTime.getTime() + Constants.APPOINTMENT.TIMING_INTERVAL * 60000); // Move to the next slot
                continue;
                }

                // Count how many appointments exist for this time slot
                const existingAppointmentsCount = await this.appointmentRepository.countByDate(currentTime)

                if (existingAppointmentsCount < Constants.APPOINTMENT.SLOTS) { // If slot is not fully booked
                availableSlots.push({
                    date: currentTime.toISOString(),
                    time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    remaining_slots: Constants.APPOINTMENT.SLOTS - existingAppointmentsCount // Remaining slots count
                });
                }

                currentTime = new Date(currentTime.getTime() + Constants.APPOINTMENT.TIMING_INTERVAL * 60000); // Move to the next slot
            }

            

            return availableSlots

        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = AppointmentAvailableTime;