const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log('verifytoken : init')
const SECRET = process.env.SECRET || 'change-me'
    var token = req.headers['access_token']
    if (!token){
        return res.status(403).send({ auth: false, message: 'No token' })
    }

    jwt.verify(token, SECRET, (err, decoded) =>{
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate' });
        }
        req.userId = decoded.id
        console.log('verifyToken pass')
        next()
    })
}

module.exports = verifyToken