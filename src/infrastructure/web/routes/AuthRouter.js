const express = require('express')
const container = require('../../di/Container')
const Types = require('../../utils/Types')
const router = express.Router()

const controller = container.resolve(Types.CONTROLLER.AUTH);
const auth = container.resolve(Types.MIDDLEWARE.AUTHORIZATION);

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/logout/:user_id', auth.handle(), controller.logout)

module.exports = router