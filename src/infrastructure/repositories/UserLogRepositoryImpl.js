const UserLogRepository = require('../../application/repositories/UserLogRepository')

class UserLogRepositoryImpl extends UserLogRepository {
    constructor(UserLogModel) {
        super()
        this.userLogModel = UserLogModel
    }

    async create(logData) {
        try {
            const log = new this.userLogModel(logData)
            return await log.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UserLogRepositoryImpl;
