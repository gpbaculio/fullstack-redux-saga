import express from "express";
import { User } from '../models'
import parseErrors from '../utils/parseErrors'
import { authenticate } from '../middlewares'
import { sendConfirmationEmail } from '../mailer'

const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body.user
    const user = new User({
        email
    })
    user.setPassword(password)
    user.setConfirmationToken()
    user
        .save()
        .then(userRecord => {
            sendConfirmationEmail(userRecord)
            return res.json({
                user: userRecord.toAuthJSON()
            })
        })
        .catch(err => res.status(400).json({
            errors: parseErrors(err.errors)
        }))
})

router.get("/current_user", authenticate, (req, res) => {
    const { _id: id, email, confirmed } = req.currentUser
    res.json({
        user: {
            email,
            confirmed,
            id,
        }
    });
});

export default router