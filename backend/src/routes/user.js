import express from "express";
import { User } from '../models'
import parseErrors from '../utils/parseErrors'
import { authenticate } from '../middlewares'

const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body.user
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

router.get("/current_user", authenticate, (req, res) => {
    console.log('req current user', req.currentUser)
    res.json({
        user: {
            email: req.currentUser.email,
            confirmed: req.currentUser.confirmed,
            username: req.currentUser.username
        }
    });
});

export default router