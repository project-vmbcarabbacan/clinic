class AppointmentAdd {

    constructor(WhatsappAppointment, UserRepository, AppointmentAvailableDays, AppointmentAvailableTime, dateService) {
        this.whatsappAppointment = WhatsappAppointment
        this.userRepository = UserRepository
        this.days = AppointmentAvailableDays
        this.time = AppointmentAvailableTime
        this.date = dateService
    }

    async execute(req) {

        try {
            const { entry } = req.body

            if (!this.whatsappAppointment.checkRequest(entry))
                throw new Error("Invalid request")

            const changes = entry[0].changes[0].value
            const metadata = changes.metadata ? changes.metadata : null
            const contacts = changes.contacts ? changes.contacts[0] : null
            const message = changes.messages ? changes.messages[0] : null

            let userInformation = null
            if (contacts) {
                userInformation = await this.userRepository.getUserByPhoneNumber(contacts.wa_id)
                if (!userInformation)
                    userInformation = await this.userRepository.addCustomer(contacts)
            }

            if (message) {
                let body = null
                let type = 'text'
                let reply = null

                switch (message.type) {
                    case 'text':
                        if (message.text.body.toLowerCase() === 'hello') {
                            body = { body: `Hello ${userInformation.user_id.name}` }
                            type = 'text'
                            reply = message.id
                        }
                        else if (message.text.body.toLowerCase() === 'hi') {
                            body = this.whatsappAppointment.setStartConversation(userInformation.user_id.name)
                            type = 'interactive'
                            reply = null
                        }
                        else {
                            body = { body: 'Say "Hi" to start a conversation' }
                            type = 'text'
                            reply = null
                        }
                        break
                    case 'interactive':
                        if (message.interactive.type === 'list_reply')
                            if (message.interactive.list_reply.id.includes('conversation_appointment')) {
                                const days = await this.days.execute({ week: this.date.getWeekNumber(new Date()), year: new Date().getFullYear() })
                                body = this.whatsappAppointment.setAppointmentDate(days.hasAvailableSlots)
                                type = 'interactive'
                                reply = null
                            }
                            else if (message.interactive.list_reply.id.includes('available_date')) {
                                console.log(JSON.stringify(message))
                                const times = await this.time.execute(message.interactive.list_reply.title)
                                console.log({ date: message.interactive.list_reply.title })
                                console.log({ times })
                                body = this.whatsappAppointment.setAppointmentTime(times)
                                type = 'interactive'
                                reply = null
                            }
                            else {
                                body = { body: 'Thank you, we have booked your appointment' }
                                type = 'text'
                                reply = null
                            }
                        break

                    default:
                        body = { body: 'Say "Hi" to start a conversation' }
                        type = 'text'
                        reply = null
                        break
                }

                await this.whatsappAppointment.sendMessage(message.from, body, type, reply)
            }

        } catch (error) {
            console.log({ error })
            throw new Error(error.message)
        }

    }
}

module.exports = AppointmentAdd;
