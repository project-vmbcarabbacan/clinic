const UserRepository = require('../../application/repositories/UserRepository')
const Constants = require('../utils/Constants')

class UserRepositoryImpl extends UserRepository {
    constructor(UserModel, UserInformationModel, DateService) {
        super()
        this.userModel = UserModel
        this.userInformationModel = UserInformationModel
        this.dateService = DateService
    }

    async findId(id) {
        const user = await this.userModel.findById(id)
            .populate({
                path: 'information',
                select: '-__v -_id -tokens'
            })
            .populate({
                path: 'achievements',
                select: '-__v'
            })
            .select('-password')
            .exec()

        if (!user)
            throw new Error('User not found!')

        return user
    }

    async findUserInformationId(user_id) {
        const userInformation = await this.userInformationModel.findOne({ user_id })
        if (!userInformation)
            throw new Error('User Information not found!')

        return userInformation
    }

    async update(id, updateData) {
        try {
            if (await this.userModel.emailExist(updateData.email, id))
                throw new Error('Email already taken')

            const options = { new: true, runValidators: true }
            const update = await this.userModel.findByIdAndUpdate(id, updateData, options)

            if (!update)
                throw new Error('User not founds')

            return update
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async changeOneField(id, field, value) {
        try {
            const options = { new: true, runValidators: true }

            if (field === 'email' && await this.userModel.emailExist(value, id)) {
                throw new Error('Email already taken')
            }

            if (field === 'username' && await this.userModel.usernameExist(value, id))
                throw new Error('Username already taken')

            const update = await this.userModel.findOneAndUpdate(
                { _id: id },
                { $set: { [field]: value, updated_at: this.dateService.now() } },
                options
            );

            if (!update)
                throw new Error('User not found')

            return update
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateInformation(user_id, updateData) {
        try {

            const options = { new: true, runValidators: true }
            const update = await this.userInformationModel.findOneAndUpdate(
                { user_id },
                { $set: updateData },
                options
            )

            if (!update)
                throw new Error('User not found')

            return update
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addToken(user_id, token) {
        try {
            const userInformation = await this.userInformationModel.findOne({ user_id })

            if (userInformation) {
                userInformation.tokens.push({ token })
                if (userInformation.tokens.length > 5) {
                    userInformation.tokens.shift();
                }

                userInformation.status_type = "Available",
                    await userInformation.save()
            } else {
                const newInformation = new this.userInformationModel({
                    user_id,
                    status_type: "Available",
                    title: '',
                    address: '',
                    biography: '',
                    contact_number: [],
                    tokens: [{ token }]
                })
                await newInformation.save()
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteToken(user_id, token) {
        try {
            const userInformation = await this.userInformationModel.findOne({ user_id })

            userInformation.tokens = userInformation.tokens.filter(
                (tk) => tk.token !== token
            );

            userInformation.status_type = "Logout",

                await userInformation.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = UserRepositoryImpl;
