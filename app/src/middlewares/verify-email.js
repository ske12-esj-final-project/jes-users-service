const { User } = require('../models')

const verifyEmail = (req, res, next) => {
    User.find({ email: req.body.email }, (err, users) => {
        if (err) {
            console.error('verify-email-error', err)
            return res.status(500).json('verifyEmail error')
        }
        if (users != null && users.length > 0) {
            console.log('This email is used')
            return res.json('This email is used')
        }
        next()
    })
}

module.exports = verifyEmail