class AchievementGet {
    constructor(achievementRepository, validatorService) {
        this.achievementRepository = achievementRepository
        this.validatorService = validatorService
    }

    async execute(user_id, achievement_id) {
        const isValidUserId = await this.validatorService.validateId(user_id)
        if(!isValidUserId)
            throw new Error('Invalid user id given')
        const isValidAchievementId = await this.validatorService.validateId(achievement_id)
        if(!isValidAchievementId)
            throw new Error('Invalid achievement id given')

        return await this.achievementRepository.findId(user_id, achievement_id)
    }
}

module.exports = AchievementGet;
