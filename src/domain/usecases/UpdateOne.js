class UpdateOne {

    constructor(userRepository, userLogRepository, updateOneEntity, userLogEntity) {
        this.userRepository = userRepository
        this.userLogRepository = userLogRepository
        this.updateOneEntity = updateOneEntity
        this.userLogEntity = userLogEntity
    }

    async execute(userData) {
        try {
            const entity = this.updateOneEntity
            entity.setData(userData)
            entity.validateId(entity.id)

            const log = this.userLogEntity
            log.setData({
                user_id: entity.id,
                action_name: userData.name_user ?? 'System'
            })

            const prev = await this.userRepository.findId(entity.id)

            let logData = null
            switch (entity.field) {
                case 'password':
                    entity.validatePassword()
                    logData = log.changePassword()
                    break
                case 'image':
                    logData = log.uploadAvatar()
                    break
                case 'status':
                    logData = log.status(prev.status, entity.value)
                    break
                case 'username':
                    logData = log.updateUsername()
                    break
                case 'email':
                    entity.validateEmail()
                    logData = log.updateEmail()
                    break
                default:
                    throw new Error('url does not exists')
            }

            const user = await this.userRepository.changeOneField(entity.id, entity.field, entity.value)

            if (logData)
                await this.userLogRepository.create(logData)

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = UpdateOne