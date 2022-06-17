const express = require('express')
const file = express.Router()
const cloudinary=require('cloudinary')
const User=require('../../models/Users')
const fetchUser = require('../../Middleware/fetchUser')


cloudinary.config({
  cloud_name:"cybergeek",
  api_key:"712964797895313",
  api_secret:"KFNzQ1L_ENkh7vEFMZQErAzq5Uc"
})



file.post('/update_profile',fetchUser, async function (req, res, next) {
  const userId=req.User.id
  const image=req.body.image
  const data= req.body.data

  try{
    const user=await User.findById(userId).select("-password")
    const upload = await cloudinary.v2.uploader.upload(image,{
      upload_preset:'profilePicture'
    })
  const update =  await User.updateMany({
      profile:upload.secure_url,
      email:data.email,
      fullname:data.fullname
    })
    
res.status(200).json({
  Updated:"Data updated successfully"
})
  }catch(err){
    console.log(err)
  }

  })

  




module.exports= file