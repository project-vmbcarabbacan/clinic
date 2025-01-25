class Users {

    static ADMIN = 1
    static RECEPTION = 2
    static DOCTOR = 3

    static get ROLES() {
        return [
            {
                label: 'Admin',
                value: 1
            },
            {
                label: 'Reception',
                value: 2
            },
            {
                label: 'Doctor',
                value: 3
            },
        ]
    }
}

module.exports = Users;