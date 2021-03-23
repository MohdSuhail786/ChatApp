const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const {connectToMongoDB} = require('../backend/config/db') 

app.use(express.json({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser({defer: true}))

connectToMongoDB()

app.use('',require('../backend/routes/api'))

app.listen('5500')