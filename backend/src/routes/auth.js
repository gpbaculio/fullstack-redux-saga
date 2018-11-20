import express from 'express'
import { User } from '../models'

const router = express.Router()

router.post('/', (req, res) => {
    const { credentials } = req.body
    User
        .findOne({
            email: credentials.email
        })
        .then(user => {
            if (user && user.isValidPassword(credentials.password)) {
                res.json({
                    user: user.toAuthJSON()
                })
            } else {
                res
                    .status(400)
                    .json({
                        errors: {
                            global: 'Invalid Credentials'
                        }
                    })
            }
        })
})

router.post('/confirmation', (req, res) => {
    const { token } = req.body
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: '', confirmed: true },
        { new: true }
    ).then(user => {
        return user ? res.json({ success: true }) :
            res.status(400).json({
                errors: {
                    global: 'Invalid Token'
                }
            }) // error response as for token must be invalid
    }).catch(e => {
        console.log('e = ', e)
    })
})

export default router