const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status_type: { type: String, default: 'Logout' },
    title: { type: String },
    address: { type: String },
    biography: { type: String },
    contact_number: [
        {
            number: { type: Number }
        }
    ],
    tokens: [
        {
            token: { type: String }
        }
    ]
})

module.exports = mongoose.model('User_information', userInformationSchema);