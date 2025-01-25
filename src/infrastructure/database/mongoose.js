const mongoose = require('mongoose')
const Constants = require('../utils/Constants')

async function connectDatabase() {
    await mongoose.connect(Constants.APPLICATION.DATABASE, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
}

async function withTransaction(callback) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await callback(session)
        await session.commitTransaction()
        return result;
    } catch (error) {
        await session.abortTransaction()
        throw error;
    } finally {
        session.endSession()
    }
}

module.exports = { connectDatabase, withTransaction }