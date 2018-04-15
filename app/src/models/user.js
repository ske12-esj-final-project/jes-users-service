const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    friends: Array,
    score: { type: Number, default: 0 },
    clothIndex: { type: Number, default: 0 }
})

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')