const Types = require('../utils/Types')

/* infrastructure\database\models */
const UserModel = require('../database/models/user')
const UserLogModel = require('../database/models/userLog')
const UserInformationModel = require('../database/models/userInformation')
const AchievementModel = require('../database/models/achievement')

/* application\repositories */
const AuthenticationRepositoryImpl = require("../repositories/AuthenticationRepositoryImpl")
const UserLogRepositoryImpl = require("../repositories/UserLogRepositoryImpl")
const UserRepositoryImpl = require("../repositories/UserRepositoryImpl")
const AchievementRepositoryImpl = require("../repositories/AchievementRepositoryImpl")

/* domain\usecases */
const Login = require('../../domain/usecases/Login')
const Logout = require('../../domain/usecases/Logout')
const Signup = require('../../domain/usecases/Signup')
const UserUpdate = require('../../domain/usecases/UserUpdate')
const UpdateOne = require('../../domain/usecases/UpdateOne')
const AchievementAdd = require('../../domain/usecases/AchievementAdd')
const AchievementEdit = require('../../domain/usecases/AchievementEdit')
const AchievementGet = require('../../domain/usecases/AchievementGet')
const LoginUser = require('../../domain/usecases/LoginUser')

/* domain\services */
const ValidatorService = require('../../domain/services/ValidatorService')
const DateService = require('../../domain/services/DateService')
const ImageService = require('../../domain/services/ImageService')

/* domain\entities */
const LoginEntity = require('../../domain/entities/LoginEntity')
const SignupEntity = require('../../domain/entities/SignupEntity')
const UserEntity = require('../../domain/entities/UserEntity')
const UserLogEntity = require('../../domain/entities/UserLogEntity')
const UpdateOneEntity = require('../../domain/entities/UpdateOneEntity')
const AchievementAddEntity = require('../../domain/entities/AchievementAddEntity')
const AchievementEditEntity = require('../../domain/entities/AchievementEditEntity')

/* infrastructure\web\controllers */
const AuthController = require('../web/controllers/AuthController')
const UserController = require('../web/controllers/UserController')

/* middlewares */
const AuthorizationMiddleware = require('../middleware/AuthorizationMiddleware')
const AuthRoleMiddleware = require('../middleware/AuthRoleMiddleware')

class Container {
    constructor() {
        this.services = new Map();
    }

    register(name, service) {
        this.services.set(name, service);
    }

    resolve(name) {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }
}

// Setup DI Container
const container = new Container()

/* models */
container.register(Types.MODEL.USER, UserModel)
container.register(Types.MODEL.USER_LOG, UserLogModel)
container.register(Types.MODEL.USER_INFORMATION, UserInformationModel)
container.register(Types.MODEL.ACHIEVEMENT, AchievementModel)

/* services */
container.register(Types.SERVICE.VALIDATOR, new ValidatorService())
container.register(Types.SERVICE.DATE, new DateService())
container.register(Types.SERVICE.IMAGE, new ImageService())

/* entities */
container.register(Types.ENTITY.LOGIN, new LoginEntity(container.resolve(Types.SERVICE.VALIDATOR)))
container.register(Types.ENTITY.SIGNUP, new SignupEntity(container.resolve(Types.SERVICE.VALIDATOR)))
container.register(Types.ENTITY.USER, new UserEntity(container.resolve(Types.SERVICE.VALIDATOR), container.resolve(Types.SERVICE.DATE)))
container.register(Types.ENTITY.USER_LOG, new UserLogEntity(container.resolve(Types.SERVICE.DATE)))
container.register(Types.ENTITY.UPDATE_ONE, new UpdateOneEntity(container.resolve(Types.SERVICE.VALIDATOR), container.resolve(Types.SERVICE.IMAGE)))
container.register(Types.ENTITY.ACHIEVEMENT_ADD, new AchievementAddEntity(container.resolve(Types.SERVICE.IMAGE)))
container.register(Types.ENTITY.ACHIEVEMENT_EDIT, new AchievementEditEntity(container.resolve(Types.SERVICE.IMAGE)))

/* repositories */
container.register(Types.REPOSITORY.AUTHENTICATION, new AuthenticationRepositoryImpl(container.resolve(Types.MODEL.USER), container.resolve(Types.MODEL.USER_INFORMATION)))
container.register(Types.REPOSITORY.USER_LOG, new UserLogRepositoryImpl(container.resolve(Types.MODEL.USER_LOG)))
container.register(Types.REPOSITORY.USER, new UserRepositoryImpl(container.resolve(Types.MODEL.USER), container.resolve(Types.MODEL.USER_INFORMATION), container.resolve(Types.SERVICE.DATE)))
container.register(Types.REPOSITORY.ACHIEVEMENT, new AchievementRepositoryImpl(container.resolve(Types.MODEL.ACHIEVEMENT)))

/* usecases */
container.register(Types.USECASE.LOGIN, new Login(container.resolve(Types.REPOSITORY.AUTHENTICATION), container.resolve(Types.REPOSITORY.USER_LOG), container.resolve(Types.ENTITY.LOGIN), container.resolve(Types.ENTITY.USER_LOG)))
container.register(Types.USECASE.SIGNUP, new Signup(container.resolve(Types.REPOSITORY.AUTHENTICATION), container.resolve(Types.REPOSITORY.USER_LOG), container.resolve(Types.ENTITY.SIGNUP), container.resolve(Types.ENTITY.USER_LOG)))
container.register(Types.USECASE.LOGOUT, new Logout(container.resolve(Types.REPOSITORY.USER), container.resolve(Types.REPOSITORY.USER_LOG), container.resolve(Types.ENTITY.USER_LOG)))
container.register(Types.USECASE.USER_UPDATE, new UserUpdate(container.resolve(Types.REPOSITORY.USER), container.resolve(Types.REPOSITORY.USER_LOG), container.resolve(Types.ENTITY.USER), container.resolve(Types.ENTITY.USER_LOG)))
container.register(Types.USECASE.UPDATE_ONE, new UpdateOne(container.resolve(Types.REPOSITORY.USER), container.resolve(Types.REPOSITORY.USER_LOG), container.resolve(Types.ENTITY.UPDATE_ONE), container.resolve(Types.ENTITY.USER_LOG)))
container.register(Types.USECASE.ACHIEVEMENT_ADD, new AchievementAdd(container.resolve(Types.REPOSITORY.ACHIEVEMENT), container.resolve(Types.ENTITY.ACHIEVEMENT_ADD)))
container.register(Types.USECASE.ACHIEVEMENT_EDIT, new AchievementEdit(container.resolve(Types.REPOSITORY.ACHIEVEMENT), container.resolve(Types.ENTITY.ACHIEVEMENT_EDIT)))
container.register(Types.USECASE.ACHIEVEMENT_GET, new AchievementGet(container.resolve(Types.REPOSITORY.ACHIEVEMENT), container.resolve(Types.SERVICE.VALIDATOR)))
container.register(Types.USECASE.LOGIN_USER, new LoginUser(container.resolve(Types.REPOSITORY.USER), container.resolve(Types.SERVICE.VALIDATOR)))

/* controllers */
container.register(Types.CONTROLLER.AUTH, new AuthController(container.resolve(Types.USECASE.LOGIN), container.resolve(Types.USECASE.SIGNUP), container.resolve(Types.USECASE.LOGOUT), container.resolve(Types.REPOSITORY.USER)))
container.register(Types.CONTROLLER.USER, new UserController(container.resolve(Types.USECASE.SIGNUP), container.resolve(Types.USECASE.USER_UPDATE), container.resolve(Types.USECASE.UPDATE_ONE), container.resolve(Types.USECASE.ACHIEVEMENT_ADD), container.resolve(Types.USECASE.ACHIEVEMENT_EDIT), container.resolve(Types.USECASE.LOGIN_USER), container.resolve(Types.USECASE.ACHIEVEMENT_GET)))

/* middlewares */
container.register(Types.MIDDLEWARE.AUTHORIZATION, new AuthorizationMiddleware())
container.register(Types.MIDDLEWARE.AUTHORIZATION_ROLE, {
    factory: (role) => new AuthRoleMiddleware(role)
})


module.exports = container;