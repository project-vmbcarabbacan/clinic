const AuthenticationRepository = require('../../application/repositories/AuthenticationRepository')

class AuthenticationRepositoryImpl extends AuthenticationRepository {
    constructor(UserModel, UserInformationModel) {
        super()
        this.userModel = UserModel
        this.userInformationModel = UserInformationModel
    }

    async signup(userData) {
        try {

            const usernameExist = await this.userModel.getByUsername(userData.username)
            if (usernameExist) throw new Error('Username already exists');

            const emailExist = await this.userModel.getByEmail(userData.email)
            if (emailExist)
                throw new Error('Email already exists')

            const user = new this.userModel(userData)
            const userModel = await user.save()

            const userInformation = new this.userInformationModel({
                user_id: user._id,
                status_type: "Logout",
                title: '',
                address: '',
                biography: '',
                contact_number: [],
                tokens: []
            })
            await userInformation.save()

            return userModel;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async login(userData) {
        try {
            const user = await this.userModel.getByUsername(userData.username)

            if (!user)
                throw new Error('Username not found')

            const isMatch = await user.comparePassword(userData.password)

            if (!isMatch)
                throw new Error('Password not match')

            return user

        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = AuthenticationRepositoryImpl;