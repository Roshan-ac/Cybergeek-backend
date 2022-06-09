var express=require('express')
const MongoConnect=require('./db')
var path=require('path')
var app=express()
var Port=5000
const cors = require('cors')
const serverless=require('serverless-http')
const router=require('./Routes/auth')

app.use(cors())
//middleware to use json data
app.use(express.json())
app.use('/auth',router)




MongoConnect();

module.exports.handler=serverless(app)
