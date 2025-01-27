const Constants = require('../../utils/Constants')
const { withTransaction } = require('../../../infrastructure/database/mongoose')

class UserController {

    constructor(SignupUsecase, UserUpdateUsecase, UpdateOneUsecase, AchievementAddUsecase, AchievementEditUsecase, LoginUserUsecase) {
        this.signupUsecase = SignupUsecase
        this.userUpdateUsecase = UserUpdateUsecase
        this.updateOneUsecase = UpdateOneUsecase
        this.achievementAddUsecase = AchievementAddUsecase
        this.achievementEditUsecase = AchievementEditUsecase
        this.loginUserUsecase = LoginUserUsecase

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.updateOneField = this.updateOneField.bind(this);
        this.addAchievement = this.addAchievement.bind(this);
        this.editAchievement = this.editAchievement.bind(this);
        this.getLoginUser = this.getLoginUser.bind(this);
    }

    async getLoginUser(req, res) {
        const user = await this.loginUserUsecase.execute(req.body.id_user)
        res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.USER, data: { user } })
    }

    async create(req, res) {
        try {
            const user = await withTransaction(async (session) => {
                return await this.signupUsecase.execute(req.body)
            });
            res.status(Constants.STATUS_CODES.CREATED).json({ message: Constants.MESSAGE.USER_CREATED, user })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async update(req, res) {
        try {
            const user = await withTransaction(async (session) => {
                return await this.userUpdateUsecase.execute(req.body)
            });
            res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.USER_UPDATED })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async updateOneField(req, res) {
        try {
            const user = await withTransaction(async (session) => {
                const { field } = req.params

                const data = {
                    ...req.body,
                    field
                }

                return await this.updateOneUsecase.execute(data)
            });
            res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.USER_UPDATED })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async addAchievement(req, res) {
        try {
            await withTransaction(async (session) => {
                return await this.achievementAddUsecase.execute(req.body)
            });
            res.status(Constants.STATUS_CODES.CREATED).json({ message: Constants.MESSAGE.ACHIEVEMENT_ADD })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async editAchievement(req, res) {
        try {
            await withTransaction(async (session) => {
                return await this.achievementEditUsecase.execute(req.body)
            });
            res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.ACHIEVEMENT_EDIT })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

}

module.exports = UserController