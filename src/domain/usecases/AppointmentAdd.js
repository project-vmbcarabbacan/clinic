class AppointmentAdd {

    constructor(WhatsappAppointment) {
        this.whatsappAppointment = WhatsappAppointment
    }

    async execute(req) {

        try {
console.log({req})
            this.whatsappAppointment.signatureValid(req)

            let decryptedRequest = this.whatsappAppointment.decryptRequest(req.body)
            
            const { aesKeyBuffer, initialVectorBuffer, decryptedBody } = decryptedRequest

            const screenResponse = await this.whatsappAppointment.nextScreen(decryptedBody)
            
            return this.whatsappAppointment.encryptResponse(screenResponse, aesKeyBuffer, initialVectorBuffer)
        } catch (error) {
            throw new Error(error.message)
        }
            
    }
}

module.exports = AppointmentAdd;
