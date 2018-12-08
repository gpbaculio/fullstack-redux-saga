import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    },
    confirmationToken: {
        type: String,
        default: ''
    }
},
    { timestamps: true })

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password)
}

schema.methods.setPassword = function setPassword(password) {
    this.password = bcrypt.hashSync(password, 10)
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
    )
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT()
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST || 'http://localhost:3000'}/confirmation/${this.confirmationToken}`
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        id: this._id, // _id is mongoose id
        email: this.email,
        token: this.generateJWT(),
        confirmed: this.confirmed
    }
}

export default mongoose.model('User', schema)