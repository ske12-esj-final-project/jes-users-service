const { User } = require('../models')

const verifyUsername = (req, res, next) => {
    User.find({ username: req.body.username }, (err, users) => {
        if (err) {
            console.error('verify-username-error', err)
            return res.status(500).json('verify username error')
        }
        if (users != null && users.length > 0) {
            console.log('This username is used', users)
            return res.json('This username is used')
        }
        next()
    })
}

module.exports = verifyUsername