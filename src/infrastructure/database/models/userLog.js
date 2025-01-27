const mongoose = require('mongoose');
const DateServices = require('../../../domain/services/DateService')

const cDate = new DateServices()

const userLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    description: { type: String, required: true },
    action_by: { type: String },
    created_at: { type: Date, default: cDate.now() }
})

userLogSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
    }
});

module.exports = mongoose.model('User_log', userLogSchema);