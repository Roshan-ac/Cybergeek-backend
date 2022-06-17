var express=require('express')
const MongoConnect=require('./db')
var app=express()
const Port=5000
const cors = require('cors')
const serverless=require('serverless-http')
const router=require('./Routes/auth')
const file=require('./Routes/files')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')




app.use(fileUpload({
    useTempFiles:true
}))

app.use(cors())
//middleware to use json data
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(bodyParser.json())
app.use('/auth',router)
app.use('/profile',file)

/*
app.listen(Port,()=>{
    console.log(`server started successfully, listening on port:${Port}`)
})
*/
MongoConnect();

module.exports.handler=serverless(app)
