const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is require to be added in blacklist"],
    },

}, {
    timestamps: true
})

const blacklistTokenModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = blacklistTokenModel

