const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const verifyEmail = require('../middlewares/verify-email')
const VerifyToken = require('../middlewares/verify-token')

const { SECRET } = require('../constants')
console.log('secret', SECRET)
router.get('/ping', (req, res) => {
    res.json('ok')
})
router.post('/login', (req, res) => {
    console.log('login')
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).send('Server login error')
        }
        if (!user) {
            return res.status(404).send('User not found')
        }
        let checkPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!checkPassword) {
            return res.status(401).send({ auth: false, token: null })
        }

        var token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: 86400
        })
        res.status(200).send({ auth: true, token: token })
    })
})

router.post('/register', verifyEmail, (req, res) => {
    const hasedPassword = bcrypt.hashSync(req.body.password, 8)
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hasedPassword
    },
        ((err, user) => {
            if (err) {
                console.error(error)
                return res.status(500).json("Registering the user error")
            }

            let token = jwt.sign({ id: user._id }, SECRET, {
                expiresIn: 86400
            })

            res.status(200).json({ auth: true, token: token })
            console.log('created')
        })
    )
})

router.get('/logout', (req, res) => {
    return res.status(200).send({ auth: false, token: null })
})


router.get('/me', VerifyToken, (req, res, next) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) { return res.status(500).send("error to find user") }
        if (!user) { return res.status(404).send("user is not found") }
        let { id, username, friends, email, clothIndex } = user
        let response = { id, username, friends, email, clothIndex }
        res.status(200).send(response)
    })
})

router.get('/auth', VerifyToken, (req, res) => {
    console.log('pass verify auth')
    console.log(req.userId)
    res.status(200).send({ auth: true, userId: req.userId })
})

/**
 *  path : /v1/users
 */

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send("Error can't find users")
        let response = users
            .map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                friends: user.friends
            }))
        res.status(200).send(response)
    })
})

/**
*  path : /v1/users/u/:id
*/
router.get('/u/:id', function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send("Error can't find user by id")
        }
        if (!user) {
            return res.status(404).send("User not found")
        }
        let { username, email, friends, score, clothIndex } = user
        let response = { username, email, friends, score, clothIndex }
        res.status(200).send(response)
    })
})

router.put('/u/:id/cloth', (req, res) => {
    let userID = req.params.id
    let updateData = {
        clothIndex: req.body.clothIndex
    }

    User.findByIdAndUpdate(userID, updateData, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send("User not found")
            }
            let { username, email, friends, score, clothIndex } = user
            let response = { username, email, friends, score, clothIndex }
            res.status(200).send(response)
        })
        .catch(err => {
            if (err) {
                return res.status(500).send("Error can't update user by id")
            }
        })
})

router.put('/u/:id/score', (req, res) => {
    let userID = req.params.id
    let newScore = req.body.score

    User.findByIdAndUpdate(userID, { $inc: { score: newScore } }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send("User not found")
            }
            let { username, email, friends, score, clothIndex } = user
            let response = { username, email, friends, score, clothIndex }
            res.status(200).send(response)
        })
        .catch(err => {
            if (err) {
                return res.status(500).send("Error can't update user by id")
            }
        })
})


router.get('/email/:email', (req, res) => {
    User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Error can't find user by email");
        }
        if (!user) {
            return res.status(404).send("User not found")
        }
        let { username, email, friends } = user
        let response = { username, email, friends }
        res.status(200).send(response)
    })
})



module.exports = router