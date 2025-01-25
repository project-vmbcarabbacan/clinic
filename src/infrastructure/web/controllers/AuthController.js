const jwt = require('jsonwebtoken')
const Constants = require('../../utils/Constants')
const { withTransaction } = require('../../../infrastructure/database/mongoose')

class AuthController {
    constructor(loginUsecase, signupUsecase, logoutUsecase, userRepository) {
        this.loginUsecase = loginUsecase
        this.signupUsecase = signupUsecase
        this.logoutUsecase = logoutUsecase
        this.userRepository = userRepository

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

    }

    async signup(req, res) {
        try {
            await withTransaction(async (session) =>
                await this.signupUsecase.execute(req.body)
            );
            res.status(Constants.STATUS_CODES.CREATED).json({ message: Constants.MESSAGE.USER_CREATED })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async login(req, res) {
        try {

            const token = await withTransaction(async (session) => {
                const user = await this.loginUsecase.execute(req.body)

                const access_token = this.generateAccessToken(user._id.toString(), user.name.toString(), user.role.toString())
                const refresh_token = this.generateRefreshToken(user.id.toString(), user.name.toString(), user.role.toString())

                this.userRepository.addToken(user._id, access_token)

                return {
                    access_token,
                    refresh_token
                }
            });

            res.cookie(Constants.APPLICATION.ACCESS_TOKEN_OBJECT, token.access_token, {
                httpOnly: true, // accessible only on web server
                secure: true, // https to be change
                maxAge: Constants.APPLICATION.EXPIRES_ACCESS_TOKEN_SECRET_IN * 24 * 60 * 60 * 1000, // cookie expiry set to match refreshToken
            })

            res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.USER_LOGIN, rt: token.refresh_token })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }

    async logout(req, res) {
        try {
            await withTransaction(async (session) => {
                 await this.logoutUsecase.execute(req.params.user_id, req.body.name_user, req.token)
            })

            res.clearCookie(Constants.APPLICATION.ACCESS_TOKEN_OBJECT)

            res.status(Constants.STATUS_CODES.SUCCESS).json({ message: Constants.MESSAGE.USER_LOGOUT })
        } catch (error) {
            res.status(Constants.STATUS_CODES.BAD_REQUEST).json({ message: `${Constants.STATUS_MESSAGE.BAD_REQUEST} : ${error.message}` })
        }
    }


    generateAccessToken(user_id, name, role) {
        return jwt.sign({ user_id, name, role }, Constants.APPLICATION.ACCESS_TOKEN_SECRET, { algorithm: Constants.APPLICATION.TOKEN_ALGORITHM, expiresIn: `${Constants.APPLICATION.EXPIRES_ACCESS_TOKEN_SECRET_IN}d` })
    }

    generateRefreshToken(user_id, name, role) {
        return jwt.sign({ user_id, name, role }, Constants.APPLICATION.REFRESH_TOKEN_SECRET, { algorithm: Constants.APPLICATION.TOKEN_ALGORITHM, expiresIn: `${Constants.APPLICATION.EXPIRES_REFRESH_TOKEN_SECRET_IN}d` })
    }

    verifyRefreshToken(token) {
        return jwt.verify(token, Constants.APPLICATION.REFRESH_TOKEN_SECRET);
    }

}

module.exports = AuthController