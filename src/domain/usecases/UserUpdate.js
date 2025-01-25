class UserUpdate {

    constructor(userRepository, userLogRepository, userEntity, userLogEntity) {
        this.userRepository = userRepository
        this.userLogRepository = userLogRepository
        this.userEntity = userEntity
        this.userLogEntity = userLogEntity
    }

    async execute(userData) {
        try {
            const entity = this.userEntity
            entity.setData(userData)
            entity.validateId(entity.id)
            entity.validateEmail(entity.email)

            const user = await this.userRepository.update(entity.id, entity.setUpdate())
            await this.userRepository.updateInformation(entity.id, entity.setInformationUpdate())

            const log = this.userLogEntity
            log.setData({
                user_id: entity.id,
                action_name: userData.name_user ?? 'System'
            })

            await this.userLogRepository.create(log.update())
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UserUpdate