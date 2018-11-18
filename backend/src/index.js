import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Promise from 'bluebird'

import { auth, user } from './routes'

dotenv.config()
const app = express()
app.use(bodyParser.json())
mongoose['Promise'] = Promise;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

app.use('/api/auth', auth)
app.use('/api/user', user)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8000, () => console.log('Running on localhost:8000'))