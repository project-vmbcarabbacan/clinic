class AchievementAdd {

    constructor(AchievementRepository, AchievementAddEntity) {
        this.achievementRepository = AchievementRepository
        this.achievementAddEntity = AchievementAddEntity
    }

    async execute(achievementData) {
        try {
            const entity = this.achievementAddEntity
            entity.setData(achievementData)
            const filePath = entity.getImage()

            await this.achievementRepository.add(entity.getData(filePath))
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AchievementAdd;