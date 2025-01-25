class LoginEntity {

    constructor(validatorService) {
        this.validatorService = validatorService;
    }

    setData({ username, password }) {
        this.username = username
        this.password = password
    }

    validatePassword() {
        const isValid = this.validatorService.validatePassword(this.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        return true;
    }
}

module.exports = LoginEntity;