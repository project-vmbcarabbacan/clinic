const express = require('express')
const router = express.Router()
const container = require('../../di/Container')
const Types = require('../../utils/Types')

const controller = container.resolve(Types.CONTROLLER.APPOINTMENT);


router.get('/callback', (req, res) => {
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];

    if (mode && token === process.env.WHATSAPP_VERIFY_TOKEN)
        res.status(200).send(challenge)

    res.sendStatus(403)
})

router.post('/callback', controller.addAppointment)

module.exports = router