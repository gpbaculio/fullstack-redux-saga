import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Promise from 'bluebird'

import { auth, user, todo } from './routes'

dotenv.config()
const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 8000;
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/todo', todo)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
    app.use(favicon(path.join(__dirname, '../../frontend/build', 'favicon.ico')))
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    });
}



app.listen(port, () => console.log(`Running on port ${port}`))