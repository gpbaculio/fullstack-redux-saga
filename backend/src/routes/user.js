import express from "express";
import { User } from '../models'
import parseErrors from '../utils/parseErrors'

const router = express.Router()

router.post('/', (req, res) => {
    const {email, password} = req.body.user
    const user = new User({
        email
    })
    user.setPassword(password)
    user
        .save()
        .then(user => {
            console.log('user = ', user)
            return res.json({
                user: user.toAuthJSON()
            })
        })
        .catch(err => {
            console.log('errors = ', err)
            return res.status(400).json({
                errors: parseErrors(err.errors)
            })
        })
})

export default router