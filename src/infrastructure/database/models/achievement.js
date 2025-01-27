const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, trim: true, lowercase: true },
    description: { type: String },
    date: { type: Date },
    image: { type: String },
})

achievementSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
    }
});

achievementSchema.statics.checkTitle = async function (user_id, title, id = null) {
    let condition = {
        user_id,
        title: title.toLowerCase()
    }
    if (id)
        condition._id = { $ne: id }

    const achievement = await this.findOne(condition)
    return achievement ? true : false
}

module.exports = mongoose.model('Achievement', achievementSchema);
