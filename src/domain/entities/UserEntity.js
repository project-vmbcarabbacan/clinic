class UserEntity {

    constructor(ValidatorService, DateService) {
        this.validatorService = ValidatorService;
        this.dateService = DateService;
    }

    setData({ id, name, email, title, address, biography, contact_number }) {
        this.id = id
        this.name = name
        this.email = email
        this.title = title
        this.address = address
        this.biography = biography
        this.contact_number = contact_number
    }

    setUpdate() {
        return {
            name: this.name,
            email: this.email,
            updated_at: this.dateService.now()
        }
    }

    setInformationUpdate() {
        return {
            title: this.title,
            address: this.address,
            biography: this.biography,
            contact_number: this.contact_number,
        }
    }


    validateEmail() {
        const isValid = this.validatorService.validateEmail(this.email);
        if (!isValid) {
            throw new Error("Invalid email format");
        }
        return true;
    }

    validateId() {
        const isValid = this.validatorService.validateId(this.id);
        if (!isValid) {
            throw new Error("Invalid id given");
        }
        return true;
    }
}

module.exports = UserEntity