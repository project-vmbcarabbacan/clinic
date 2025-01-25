const AchievementRepository = require('../../application/repositories/AchievementRepository')

class AchievementRepositoryImpl extends AchievementRepository {

    constructor(AchievementModel) {
        super()
        this.achievementModel = AchievementModel
    }

    async add(achievementData) {
        try {
            if(await this.achievementModel.checkTitle(achievementData.user_id, achievementData.title))
                throw new Error('achievement already exists')

            const achievement = this.achievementModel(achievementData)
            await achievement.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id, achievementData) {
        try {
            if(await this.achievementModel.checkTitle(achievementData.user_id, achievementData.title, id))
                throw new Error('achievement already exists')

            const options = { new: true, runValidators: true }
            const achievement =  await this.achievementModel.findByIdAndUpdate(id, achievementData, options)
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = AchievementRepositoryImpl;
