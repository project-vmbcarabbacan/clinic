class AchievementEdit {

    constructor(AchievementRepository, AchievementEditEntity) {
        this.achievementRepository = AchievementRepository
        this.achievementEditEntity = AchievementEditEntity
    }

    async execute(achievementData) {
        const entity = this.achievementEditEntity
        await entity.setData(achievementData)

        await this.achievementRepository.update(entity.id, await entity.setUpdate())
    }
}

module.exports = AchievementEdit;