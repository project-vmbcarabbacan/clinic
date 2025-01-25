class UpdateOneEntity {

    constructor(ValidatorService) {
        this.validatorService = ValidatorService;
    }

    setData({ id, field, value }) {
        this.id = id
        this.field = field
        this.value = value
    }

    setUpdate() {
        return {
            [this.field]: this.value
        }
    }

    validateId() {
        const isValid = this.validatorService.validateId(this.id);
        if (!isValid) {
            throw new Error("Invalid id given");
        }
        return true;
    }

    validateEmail() {
        const isValid = this.validatorService.validateEmail(this.value);
        if (!isValid) {
            throw new Error("Invalid email format");
        }
        return true;
    }

    validatePassword() {
        const isValid = this.validatorService.validatePassword(this.value);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        return true;
    }

}

module.exports = UpdateOneEntity