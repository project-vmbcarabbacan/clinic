class AchievementEdit {

    constructor(AchievementRepository, AchievementEditEntity) {
        this.achievementRepository = AchievementRepository
        this.achievementEditEntity = AchievementEditEntity
    }

    async execute(achievementData) {
        const entity = this.achievementEditEntity
        entity.setData(achievementData)

        await this.achievementRepository.update(entity.id, entity.setUpdate())
    }
}

module.exports = AchievementEdit;