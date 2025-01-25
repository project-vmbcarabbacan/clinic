const jwt = require('jsonwebtoken')
const Constants = require('../utils/Constants')
const userInformationModel = require('../database/models/userInformation')

class AuthorizationMiddleware {

    handle() {
        return async(req, res, next) => {
            const authorizationHeader = req.header('Authorization')

            if (!authorizationHeader)
                return res.status(Constants.STATUS_CODES.UNAUTHORIZED).json({ error: Constants.STATUS_MESSAGE.UNAUTHORIZED_TOKEN_MISSING })

            const token = authorizationHeader.replace('Bearer ', '')
            if (!token)
                return res.status(Constants.STATUS_CODES.UNAUTHORIZED).json({ error: Constants.STATUS_MESSAGE.UNAUTHORIZED_TOKEN_PROVIDED })

            req.token = token

            jwt.verify(token, Constants.APPLICATION.ACCESS_TOKEN_SECRET, async (err, user) => {
                if (err) return res.status(Constants.STATUS_CODES.FORBIDDEN).json({ message: Constants.STATUS_MESSAGE.INVALID })
                const existToken = await userInformationModel.findOne({
                    user_id: user.user_id,
                    tokens: { $elemMatch: { token } }
                })

                if(!existToken)
                    return res.status(Constants.STATUS_CODES.UNAUTHORIZED).json({ error: Constants.STATUS_MESSAGE.UNAUTHORIZED_TOKEN_NOT_VALID })


                req.body.id_user = user.user_id
                req.body.name_user = user.name
                req.body.role_user = user.role
                req.user = user
                next();
            });

        }
    }
}

module.exports = AuthorizationMiddleware;