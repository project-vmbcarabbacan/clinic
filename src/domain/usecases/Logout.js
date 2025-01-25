class Logout {

    constructor(userRepository, userLogRepository, userLogEntity) {
        this.userRepository = userRepository
        this.userLogRepository = userLogRepository
        this.userLogEntity = userLogEntity
    }

    async execute(user_id, name_user, token) {
        const log = this.userLogEntity
        log.setData({
            user_id,
            action_name: name_user ?? 'System'
        })

        await this.userRepository.deleteToken(user_id, token)

        await this.userLogRepository.create(log.logout())

    }

}

module.exports = Logout;