const express = require('express')
const file = express.Router()
const cloudinary=require('cloudinary')
const Image=require('../../models/Image')


cloudinary.config({
  cloud_name:"cybergeek",
  api_key:"712964797895313",
  api_secret:"KFNzQ1L_ENkh7vEFMZQErAzq5Uc"
})



file.post('/upload',  async function (req, res, next) {
  const file=req.files.image
  const upload = await cloudinary.v2.uploader.upload(file.tempFilePath,(err,result)=>{
    if(result){
      res.status(200).json({"success":"Image upload successfully"})
    }
  })

  const image=await Image.create({
    name:file.name,
    image:upload.secure_url,
    email:req.body.email
  })
  })


  file.get('/getprofile', async(req,res)=>{
const image= await Image.findOne({email:req.headers.email}).select("-email")
res.json(image)
  })



module.exports= file