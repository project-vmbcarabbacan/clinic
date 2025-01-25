class Signup {
    constructor(authenticationRepository, userLogRepository, signupEntity, userLogEntity) {
        this.authenticationRepository = authenticationRepository
        this.userLogRepository = userLogRepository
        this.signupEntity = signupEntity
        this.userLogEntity = userLogEntity
    }

    async execute(userData) {
        try {
            const entity = this.signupEntity
            entity.setData(userData)
            entity.validateEmail(entity.email)
            entity.validatePassword(entity.password)

            const user = await this.authenticationRepository.signup(entity)

            const log = this.userLogEntity
            log.setData({
                user_id: user._id,
                action_name: userData.name_user ?? 'System'
            })

            await this.userLogRepository.create(log.new())

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Signup;