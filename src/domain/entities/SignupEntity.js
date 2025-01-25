class SignupEntity {
    constructor(validatorService) {
        this.validatorService = validatorService;
    }

    setData({ name, username, email, password, status, role }) {

        this.name = name
        this.username = username
        this.email = email
        this.password = password
        this.status = status
        this.role = role

    }

    validateEmail() {
        const isValid = this.validatorService.validateEmail(this.email);
        if (!isValid) {
            throw new Error("Invalid email format");
        }
        return true;
    }

    validatePassword() {
        const isValid = this.validatorService.validatePassword(this.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        return true;
    }
}

module.exports = SignupEntity; 