class AchievementAdd {

    constructor(AchievementRepository, AchievementAddEntity) {
        this.achievementRepository = AchievementRepository
        this.achievementAddEntity = AchievementAddEntity
    }

    async execute(achievementData) {
        const entity = this.achievementAddEntity
        entity.setData(achievementData)

        await this.achievementRepository.add(entity)
    }
}

module.exports = AchievementAdd;