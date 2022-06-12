var express=require('express')
const MongoConnect=require('./db')
var path=require('path')
var app=express()
var Port=5000
const cors = require('cors')
const serverless=require('serverless-http')
const router=require('./Routes/auth')
const profile =require('./Routes/profile')

app.use(cors())
//middleware to use json data
app.use(express.json())
app.use('/auth',router)
app.use('/profile',profile)



MongoConnect();

module.exports.handler=serverless(app)
