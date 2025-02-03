class AchievementGet {
    constructor(achievementRepository, validatorService) {
        this.achievementRepository = achievementRepository
        this.validatorService = validatorService
    }

    async execute(id) {
        const isValid = await this.validatorService.validateId(id)
        if(!isValid)
            throw new Error('Invalid id given')

        return await this.achievementRepository.findId(id)
    }
}

module.exports = AchievementGet;
