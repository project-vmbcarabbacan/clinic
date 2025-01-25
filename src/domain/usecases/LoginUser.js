class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(id) {
        return await this.userRepository.findId(id)
    }
}

module.exports = LoginUser