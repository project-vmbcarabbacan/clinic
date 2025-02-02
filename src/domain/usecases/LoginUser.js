class LoginUser {
    constructor(userRepository, validatorService) {
        this.userRepository = userRepository
        this.validatorService = validatorService
    }

    async execute(id) {
        const isValid = await this.validatorService.validateId(id);
        if(!isValid) {
            throw new Error("Invalid id given");
        }

        return await this.userRepository.findId(id)
    }
}

module.exports = LoginUser