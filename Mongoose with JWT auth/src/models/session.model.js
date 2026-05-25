const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:  [true, 'user is require']
    },
    refreshToken: {
        type: String,
        required: [true, 'Refresh token required']
    },
    ip: {
        type: String,
        required: [true, 'Ip is required']
    },
    userAgent: {
        type: String,
        required: [true, 'user agent is required']
    },
    revoked: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const sessionModel = mongoose.model('sessions',sessionSchema)

module.exports = sessionModel
