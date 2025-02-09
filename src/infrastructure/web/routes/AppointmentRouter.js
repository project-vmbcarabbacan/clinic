const express = require('express')
const router = express.Router()
const container = require('../../di/Container')
const Types = require('../../utils/Types')

const controller = container.resolve(Types.CONTROLLER.APPOINTMENT);

router.get('/available-days', controller.getAvailableDays);
router.get('/available-time', controller.getAvailableTime);
router.post('/data', controller.addAppointment)

module.exports = router