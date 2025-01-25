const Constants = require('../utils/Constants')

class TokenizationMiddleware {

    constructor(userModel) {
        this.userModel = userModel;
    }

    handle() {
        return async (req, res, next) => {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, Constants.APPLICATION.ACCESS_TOKEN_SECRET)

            const user = await this.userModel.findOne({ _id: decoded.user_id })
        }
    }


}

module.exports = TokenizationMiddleware;