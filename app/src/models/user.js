const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    friends:Array
})
mongoose.model('User',UserSchema)

module.exports = mongoose.model('User')