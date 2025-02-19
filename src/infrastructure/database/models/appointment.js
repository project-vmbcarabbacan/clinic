const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" },
})

module.exports = mongoose.model('Appointment', appointmentSchema)