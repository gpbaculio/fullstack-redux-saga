import express from "express";
import { User } from '../models'
import { authenticate } from '../middlewares'
import { sendConfirmationEmail } from '../mailer'

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body.user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
        res.status(400).json({ error: 'Email already used' })
    } else {
        const newUser = new User({ email })
        newUser.setPassword(password)
        newUser.setConfirmationToken()
        newUser
            .save()
            .then(userRecord => {
                sendConfirmationEmail(userRecord)
                res.json({ user: userRecord.toAuthJSON() })
            })
    }
})

router.get("/current_user", authenticate, (req, res) => {
    const { _id: id, email, confirmed } = req.currentUser
    if (id) {
        res.json({
            user: {
                email,
                confirmed,
                id,
            }
        });
    } else {
        res.status(400).json({ error: 'failed to retrieve user' })
    }
});

export default router