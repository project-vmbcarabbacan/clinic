class AppointmentRepository {

    store(data) {
        throw new Error("Method 'store()' must be implemented");
    }

    countByDate(date) {
        throw new Error("Method 'countByDate()' must be implemented");
    }

    getAllAppointmentByDate(date) {
        throw new Error("Method 'getAllAppointmentByDate()' must be implemented");
    }

    getAppointByUserId(user_id) {
        throw new Error("Method 'getAppointByUserId()' must be implemented");
    }

    getAppointmentById(id) {
        throw new Error("Method 'getAppointmentById()' must be implemented");
    }

}

module.exports = AppointmentRepository