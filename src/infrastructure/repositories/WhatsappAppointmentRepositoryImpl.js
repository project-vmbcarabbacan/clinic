const crypto = require("crypto")
const axios = require("axios")
const WhatsappAppointmentRepository = require('../../application/repositories/WhatsappAppointmentRepository')
const Constants = require('../utils/Constants')

class WhatsappAppointmentRepositoryImpl extends WhatsappAppointmentRepository {

    signatureValid(req) {
        if (!Constants.APPLICATION.APP_SECRET) {
            throw new Error("App Secret is not set up")
            return true
        }

        const signatureHeader = req.get("x-hub-signature-256")
        const signatureBuffer = Buffer.from(signatureHeader.replace("sha256=", ""), "utf-8")

        const hmac = crypto.createHmac("sha256", Constants.APPLICATION.APP_SECRET)
        const digestStrong = hmac.update(req.rawBody).digest('hex')
        const digestBuffer = Buffer.from(digestStrong, "utf-8")

        if (!crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
            throw new Error("Error: Request Signature did not match")
            return false
        }

        return true
    }

    decryptRequest(body) {
        const { encrypted_aes_key, encrypted_flow_data, initial_vector } = body

        const privateKey = crypto.createPrivateKey({ key: Constants.APPLICATION.PRIVATE_KEY, passphrase: Constants.APPLICATION.PASSPHRASE })
        let decryptedAESKey = null
        try {
            decryptedAESKey = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256"
                },
                Buffer.from(encrypted_aes_key, "base64")
            )

            const flowDataBuffer = Buffer.from(encrypted_flow_data, "base64")
            const initialVectorBuffer = Buffer.from(initial_vector, "base64")

            const TAG_LENGTH = decryptedAESKey.length
            const encrypted_flow_data_body = flowDataBuffer.subarray(0, -TAG_LENGTH)
            const encrypted_flow_data_tag = flowDataBuffer.subarray(-TAG_LENGTH)

            const decipher = crypto.createDecipheriv(
                "aes-128-gcm",
                decryptedAESKey,
                initialVectorBuffer
            )
            decipher.setAuthTag(encrypted_flow_data_tag)

            const decryptedJSONString = Buffer.concat([
                decipher.update(encrypted_flow_data_body),
                decipher.final(),
            ]).toString("utf-8")

            return {
                decryptedBody: JSON.parse(decryptedJSONString),
                aesKeyBuffer: decryptedAESKey,
                initialVectorBuffer,
            }

        } catch (error) {
            throw new Error("Failed to decrypt the request. Please verify your private key.")
        }
    }

    encryptResponse(response, aesKeyBuffer, initialVectorBuffer) {
        const flipped_iv = []
        for (const pair of initialVectorBuffer.entries()) {
            flipped_iv.push(~pair[1])
        }

        const cipher = crypto.createCipheriv(
            "aes-128-gcm",
            aesKeyBuffer,
            Buffer.from(flipped_iv)
        )

        return Buffer.concat([
            cipher.update(JSON.stringify(response), "utf-8"),
            cipher.final(),
            cipher.getAuthTag(),
        ]).toString("base64")
    }

    async nextScreen(decryptedBody) {
        const { screen, data, version, action, flow_token } = decryptedBody

        if (action === 'ping') {
            return {
                data: {
                    status: 'active'
                }
            }
        }

        if (data?.error) {
            return {
                data: {
                    acknowledged: true,
                },
            };
        }



    }

    async sendMessage(to, body = null, type = 'text', reply = null) {
        try {
            await axios(this.setAxiosData(to, body, type, reply))
        } catch (error) {
            throw new Error(error.message)
        }
    }

    checkRequest(entry) {
        if (!entry || entry.length === 0) false

        const changes = entry[0].changes
        if (!changes || changes.length === 0) return false

        return true
    }

    setAxiosData(to, body, type, reply) {
        let axios = {
            url: Constants.APPLICATION.WHATASAPP_MESSAGE_URL,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${Constants.APPLICATION.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        }

        let data = {
            messaging_product: 'whatsapp',
            to,
            type,
            [type]: body
        }

        if (reply) {
            data.context = { message_id: reply }
        }

        axios.data = data

        return axios
    }

    setStartConversation(name) {
        return {
            type: 'list',
            header: {
                type: 'text',
                text: `Hi ${name}!`
            },
            body: {
                text: 'How can we help you today?'
            },
            action: {
                button: 'Tap to see options',
                sections: [
                    {
                        title: '',
                        rows: [
                            {
                                id: 'conversation_appointment',
                                title: 'Set Appointment',
                            },
                        ]
                    }
                ]
            }
        }
    }

    setAppointmentDate(rows) {
        return {
            type: 'list',
            header: {
                type: 'text',
                text: 'Select Appointment Date'
            },
            body: {
                text: 'Select a date'
            },
            action: {
                button: 'Tap to see dates',
                sections: [
                    {
                        title: '',
                        rows
                    }
                ]
            }
        }
    }

    setAppointmentTime(rows) {
        return {
            type: 'list',
            header: {
                type: 'text',
                text: 'Select Appointment Time'
            },
            body: {
                text: 'Select a time'
            },
            action: {
                button: 'Tap to see timings',
                sections: [
                    {
                        title: '',
                        rows
                    }
                ]
            }
        }
    }

}

module.exports = WhatsappAppointmentRepositoryImpl;
