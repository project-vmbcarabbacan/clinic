class Constants {

    static get APPLICATION() {
        return {
            PORT: process.env.PORT,
            DATABASE: process.env.DATABASE,
            ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
            API_URL: process.env.API_URL,
            EXPIRES_ACCESS_TOKEN_SECRET_IN: '1',
            EXPIRES_REFRESH_TOKEN_SECRET_IN: '7',
            TOKEN_ALGORITHM: 'HS256',
            ACCESS_TOKEN_OBJECT: process.env.ACCESS_TOKEN_OBJECT,
            TIMEZONE: process.env.TIMEZONE,
            TIME_FORMAT: 'DD/MM/YYYY HH:mm'
        }
    }

    static get STATUS_CODES() {
        return {
            SUCCESS: 200,
            CREATED: 201,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            SERVER_ERROR: 500,
        }
    }

    static get STATUS_MESSAGE() {
        return {
            SUCCESS: 'Success',
            CREATED: 'Created',
            BAD_REQUEST: 'Request body could not be read properly',
            UNAUTHORIZED_TOKEN_MISSING: 'Unauthorized: Token is missing',
            UNAUTHORIZED_TOKEN_PROVIDED: 'Unauthorized: Token is not provided',
            UNAUTHORIZED_TOKEN_NOT_VALID: 'Unauthorized: Token use is not valid',
            UNAUTHORIZED_USER: 'Unauthorized: No user logged in',
            FORBIDDEN: 'Forbidden: Requires role ',
            NOT_FOUND: 'Request URL not found',
            SERVER_ERROR: 'Internal Server Error',
            INVALID: 'Invalid Token',
        }
    }

    static get MESSAGE() {
        return {
            USER: 'Current user',
            USER_CREATED: 'User created',
            USER_UPDATED: 'User update',
            USER_LOGIN: 'User login',
            USER_LOGOUT: 'User logout',
            ACHIEVEMENT_ADD: 'Achievement successfully added',
            ACHIEVEMENT_EDIT: 'Achievement successfully updated',
            ACHIEVEMENT_GET: 'Achievement successfully fetch',
        }
    }
}

module.exports = Constants;