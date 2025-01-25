const Constants = require('../utils/Constants')

class AuthRoleMiddleware {
    constructor(requiredRole) {
        this.requiredRole = requiredRole;
    }

    handle() {
        return (req, res, next) => {
            const { role_user } = req.body;

            if (!role_user) {
                return res.status(Constants.STATUS_CODES.UNAUTHORIZED).json({ error: Constants.STATUS_MESSAGE.UNAUTHORIZED_USER })
            }

            let roles = this.requiredRole.toString().split(",")

            if (!roles || !roles.includes(role_user)) {
                return res
                    .status(Constants.STATUS_CODES.UNAUTHORIZED)
                    .json({ error: `${Constants.STATUS_MESSAGE.FORBIDDEN} "${this.requiredRole}"` });
            }

            next();
        };
    }
}

module.exports = AuthRoleMiddleware;