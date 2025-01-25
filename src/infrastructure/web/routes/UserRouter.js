const express = require('express')
const container = require('../../di/Container')
const Types = require('../../utils/Types')
const router = express.Router()
const USER = require('../../utils/Users')

const controller = container.resolve(Types.CONTROLLER.USER);
const adminRole = container.resolve(Types.MIDDLEWARE.AUTHORIZATION_ROLE).factory(USER.ADMIN);

router.post('/create', adminRole.handle(), controller.create);
router.patch('/change-:field', adminRole.handle(), controller.updateOneField);
router.put('/update', controller.update);
router.post('/achievement-add', controller.addAchievement);
router.put('/achievement-edit', controller.editAchievement);

module.exports = router