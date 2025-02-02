const mongoose = require('mongoose');
const Users = require('../../utils/Users')
const DateServices = require('../../../domain/services/DateService')
const bcrypt = require('bcrypt');

const cDate = new DateServices()

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    status: { type: String, default: "Active" },
    image: { type: String },
    role: { type: Number },
    created_at: { type: String, default: cDate.now() },
    updated_at: { type: String, default: cDate.now() },
});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.getByUsername = async function (username) {
    return await this.findOne({ username })
}

userSchema.statics.getByEmail = async function (email) {
    return await this.findOne({ email })
}

userSchema.statics.getDoctors = async function () {
    return await this.findOne({ role: Users.DOCTOR })
}

userSchema.statics.emailExist = async function (email, id) {
    const user = await this.findOne({ email, _id: { $ne: id } })
    return user ? true : false
}

userSchema.statics.usernameExist = async function (username, id) {
    const user = await this.findOne({ username, _id: { $ne: id } })
    return user ? true : false
}

userSchema.virtual('information', {
    ref: 'User_information',
    localField:'_id',
    foreignField: 'user_id',
    justOne: true
})

userSchema.virtual('achievements', {
    ref: 'Achievement',
    localField:'_id',
    foreignField: 'user_id',
    justOne: false
})

module.exports = mongoose.model('User', userSchema);
