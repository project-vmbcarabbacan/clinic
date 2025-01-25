class Login {
    constructor(authenticationRepository, userLogRepository, loginEntity, userLogEntity) {
        this.authenticationRepository = authenticationRepository
        this.userLogRepository = userLogRepository
        this.loginEntity = loginEntity
        this.userLogEntity = userLogEntity
    }

    async execute(userData) {
        const entity = this.loginEntity
        entity.setData(userData)
        entity.validatePassword(entity.password)

        const user = await this.authenticationRepository.login(entity)

        const log = this.userLogEntity
        log.setData({
            user_id: user._id,
            action_name: userData.name_user ?? 'System'
        })
        await this.userLogRepository.create(log.login())

        return user
    }
}

module.exports = Login;