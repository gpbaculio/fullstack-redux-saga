import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password)
}

schema.methods.setPassword = function setPassword(password) {
    this.password = bcrypt.hashSync(password, 10)
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET)
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT(),
        confirmed: this.confirmed
    }
}

schema.plugin(uniqueValidator, {
    message: 'This email is already taken'
})

export default mongoose.model('User', schema)