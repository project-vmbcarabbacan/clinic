const express = require('express')
const container = require('../../di/Container')
const Types = require('../../utils/Types')
const router = express.Router()
const USER = require('../../utils/Users')

const controller = container.resolve(Types.CONTROLLER.USER);
const adminRole = container.resolve(Types.MIDDLEWARE.AUTHORIZATION_ROLE).factory(USER.ADMIN);

router.get('/current-user', controller.getLoginUser);
router.get('/user-by-id/:user_id', controller.getUserById);
router.get('/achievement-by-id/:user_id/:achievement_id', controller.getAchievement);
router.post('/create', adminRole.handle(), controller.create);
router.post('/achievement-add', controller.addAchievement);
router.post('/change-:field', adminRole.handle(), controller.updateOneField);
router.put('/update', controller.update);
router.put('/achievement-edit', controller.editAchievement);

module.exports = router