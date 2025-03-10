class Types {

    static get SOCKET() {
        return {
            SOCKET: 'io'
        }
    }

    static get MODEL() {
        return {
            USER: 'user_model',
            USER_LOG: 'user_log_model',
            USER_INFORMATION: 'user_information_model',
            ACHIEVEMENT: 'achievement_model',
            APPOINTMENT: 'appointment_model',
        }
    }

    static get SERVICE() {
        return {
            VALIDATOR: 'validator_service',
            DATE: 'date_service',
            IMAGE: 'image_service',
        }
    }

    static get ENTITY() {
        return {
            LOGIN: 'login_entity',
            SIGNUP: 'signup_entity',
            USER: 'user_entity',
            USER_LOG: 'user_log_entity',
            VALIDATION: 'validation_entity',
            UPDATE_ONE: 'update_one_entity',
            ACHIEVEMENT_ADD: 'achievement_add_entity',
            ACHIEVEMENT_EDIT: 'achievement_edit_entity',
        }
    }

    static get REPOSITORY() {
        return {
            AUTHENTICATION: 'authentication_repository_impl',
            USER: 'user_repository_impl',
            USER_LOG: 'user_log_repository_impl',
            ACHIEVEMENT: 'achievement_repository_impl',
            APPOINTMENT: 'appointment_repository_impl',
            WHATSAPP: 'whatsapp_repository_impl',
        }
    }

    static get USECASE() {
        return {
            LOGIN: 'login_usecase',
            LOGOUT: 'logout_usecase',
            SIGNUP: 'signup_usecase',
            USER_UPDATE: 'user_update_usecase',
            UPDATE_ONE: 'update_one_usecase',
            ACHIEVEMENT_ADD: 'achievement_add_usecase',
            ACHIEVEMENT_EDIT: 'achievement_edit_usecase',
            ACHIEVEMENT_GET: 'achievement_get_usecase',
            LOGIN_USER: 'login_user_usecase',
            APPOINTMENT_AVAILABLE_DAYS: 'appointment_available_days_usecase',
            APPOINTMENT_AVAILABLE_TIME: 'appointment_available_time_usecase',
            APPOINTMENT_ADD: 'appointment_add_usecase',
        }
    }

    static get CONTROLLER() {
        return {
            AUTH: 'auth_controller',
            USER: 'user_controller',
            APPOINTMENT: 'appointment_controller',
        }
    }

    static get MIDDLEWARE() {
        return {
            AUTHORIZATION: 'auth_middleware',
            AUTHORIZATION_ROLE: 'user_middleware',
        }
    }
}

module.exports = Types;