const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL||'mongodb://localhost:27017/jes-user-db'
console.log('MONGO_URL',MONGO_URL)
mongoose.connect(MONGO_URL)