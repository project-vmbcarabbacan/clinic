const Constants = require('../../infrastructure/utils/Constants')

class AppointmentAvailableDays {

  constructor(AppointmentRepository, ValidatorService) {
    this.appointmentRepository = AppointmentRepository
    this.validate = ValidatorService
  }

  async execute({ month, week, year }) {
    try {

      let startDate, endDate;

      const targetDate = new Date();

      if (week) {
        if (Number(week) <= 0 || Number(week) > 52) throw new Error('Invalid week entered')

        let start = new Date(year, 0, 1); // January 1st of the given year
        let dayOfWeek = start.getDay();

        // Find the first Monday of the year
        let firstMonday = new Date(start);
        if (dayOfWeek !== 1) {
          firstMonday.setDate(firstMonday.getDate() + (dayOfWeek === 0 ? 1 : (8 - dayOfWeek)));
        }

        // Move forward (weekNumber - 1) weeks to get to the desired week
        startDate = new Date(firstMonday);
        startDate.setDate(startDate.getDate() + ((week - 1) * 7));

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

      }
      else if (month) {

        if (Number(month) <= 0 || Number(month) > 12) throw new Error('Invalid month entered')

        startDate = new Date(Date.UTC(year, month - 1, 1)); // Month is zero-based in JS
        endDate = new Date(Date.UTC(year, month, 0));
      }

      else {
        throw new Error('Please provide either a month or a week number.')
      }

      const hasAvailableSlots = [];
      const fullyBooked = [];

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();

        // Skip weekends (Saurday = 6, Sunday = 0) and past dates
        if (Constants.APPOINTMENT.AVAILABLE_DAY.includes(dayOfWeek) && currentDate >= targetDate) {
          let totalSlots = 0;
          let bookedSlots = 0;

          let timeSlot = new Date(currentDate.setHours(Constants.APPOINTMENT.TIMING_START, 0, 0, 0)); // Start at 8 AM
          while (timeSlot.getHours() < Constants.APPOINTMENT.TIMING_END) { // Until 5 PM
            const existingAppointmentsCount = await this.appointmentRepository.countByDate(timeSlot)
            totalSlots++; // Increment total slot count (for reference)

            if (existingAppointmentsCount >= Constants.APPOINTMENT.SLOTS) {
              bookedSlots++; // Fully booked slot count
            }

            timeSlot = new Date(timeSlot.getTime() + Constants.APPOINTMENT.TIMING_INTERVAL * 60000); // Move to the next slot
          }

          if (bookedSlots < totalSlots) {
            hasAvailableSlots.push({
              id: `available_date_${currentDate.toISOString().split('T')[0]}`,
              title: currentDate.toISOString().split('T')[0]
            });
          } else {
            fullyBooked.push(currentDate.toISOString().split('T')[0]);
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (hasAvailableSlots.length == 0) {
        const data = { year }
        if (month) data.month = month++
        if (week) data.week = week++

        await this.execute(data)
      }

      return {
        hasAvailableSlots,
        fullyBooked
      }


    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = AppointmentAvailableDays;
